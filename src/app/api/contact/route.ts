import { NextResponse } from "next/server";
import { SITE, SERVICE_NAMES, BUDGETS } from "@/lib/site";

export const runtime = "nodejs";

/* Best-effort, per-instance rate limit. Serverless instances don't share
   memory, so this isn't bulletproof, it's a cheap first line alongside the
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

// Coerce any JSON value to a trimmed string, so a bot sending a number, array,
// or object can never throw a TypeError before validation runs.
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
// Collapse CR/LF so a value placed in the subject can't fake extra lines.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

// Per-field caps: roomy for a real inquiry, tight enough to stop inbox floods.
const LIMITS = {
  name: 120,
  business: 160,
  email: 200,
  instagram: 80,
  message: 5000,
} as const;

export async function POST(req: Request) {
  // Reject oversized bodies up front (everything below is concatenated into an email).
  if (Number(req.headers.get("content-length") ?? 0) > 16_000) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let data: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
    data = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot, real visitors never fill this. Log so a false positive (e.g. an
  // autofill extension hitting a real prospect) is visible instead of a
  // silently dropped lead, then pretend success so bots move on.
  if (str(data.company_url)) {
    console.warn("Contact honeypot tripped; submission dropped.");
    return NextResponse.json({ ok: true });
  }

  const name = str(data.name);
  const business = str(data.business);
  const email = str(data.email);
  const instagram = str(data.instagram);
  const service = str(data.service);
  const budget = str(data.budget);
  const message = str(data.message);

  if (!name || !business || !email || !service || !budget || !message) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (
    name.length > LIMITS.name ||
    business.length > LIMITS.business ||
    email.length > LIMITS.email ||
    instagram.length > LIMITS.instagram ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }
  // Service and budget must be real menu values, not arbitrary free text.
  if (
    !(SERVICE_NAMES as readonly string[]).includes(service) ||
    !(BUDGETS as readonly string[]).includes(budget)
  ) {
    return NextResponse.json(
      { error: "Please pick a service and budget from the list." },
      { status: 400 },
    );
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
  const from = process.env.CONTACT_FROM || "Slate & Code <inquiries@slateandcode.studio>";

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

  // Abort a hung upstream instead of holding the request open indefinitely.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
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
        subject: oneLine(`New inquiry: ${service} · ${name}`),
        text,
      }),
      signal: controller.signal,
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
  } finally {
    clearTimeout(timer);
  }

  return NextResponse.json({ ok: true });
}
