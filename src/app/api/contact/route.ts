import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

/* Best-effort, per-instance rate limit. Serverless instances don't share
   memory, so this isn't bulletproof — it's a cheap first line alongside the
   honeypot. Swap for a shared store (e.g. Upstash) if abuse becomes real. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function POST(req: Request) {
  let data: Record<string, string>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real visitors never fill this. Pretend success so bots move on.
  if (data.company_url) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const business = (data.business ?? "").trim();
  const email = (data.email ?? "").trim();
  const instagram = (data.instagram ?? "").trim();
  const service = (data.service ?? "").trim();
  const budget = (data.budget ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !business || !email || !service || !budget || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send the contact email.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO || SITE.email;
  const from = process.env.CONTACT_FROM || "Slate & Code <onboarding@resend.dev>";

  const text = [
    "New project inquiry",
    "",
    `Name: ${name}`,
    `Business / brand: ${business}`,
    `Email: ${email}`,
    `Instagram: ${instagram || "not provided"}`,
    `Service: ${service}`,
    `Estimated budget: ${budget}`,
    "",
    "Project details:",
    message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: email,
        subject: `New inquiry: ${service} — ${name}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return NextResponse.json(
        { error: "Could not send your inquiry. Please try again." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Resend request failed:", err);
    return NextResponse.json(
      { error: "Could not send your inquiry. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
