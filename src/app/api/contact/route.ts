import { NextResponse } from "next/server";
import { LINKS } from "@/lib/links";
import {
  BUDGET_VALUES,
  HONEYPOT,
  LIMITS,
  TIMELINES,
  inquiryBody,
  inquirySubject,
} from "@/lib/inquiry";

/* ---------------------------------------------------------------------------
   POST /api/contact — emails an inquiry from the contact form to the inbox
   through Resend, with the visitor's address as reply-to.

   Needs RESEND_API_KEY. CONTACT_TO and CONTACT_FROM override the recipient
   and the sender; the sender has to be on a domain verified in Resend.

   Anything that stops the email going out answers 5xx, and the form takes
   that as its cue to hand the message to the visitor's own mail app instead,
   so a missing key or an outage never loses an inquiry. A 4xx means the
   submission itself was wrong and the visitor is shown why.
--------------------------------------------------------------------------- */

export const runtime = "nodejs";

/* Best-effort, per-instance rate limit. Serverless instances do not share
   memory, so this is a cheap first line next to the honeypot, not a wall. */
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

/* any JSON value to a trimmed string, so a number or an object can never
   throw before validation runs */
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/* CR/LF collapsed, so a value placed in the subject cannot fake a header */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

const fail = (error: string, status: number) =>
  NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  if (Number(req.headers.get("content-length") ?? 0) > 16_000) {
    return fail("That message is too long to send.", 413);
  }

  let data: Record<string, unknown>;
  try {
    const parsed = await req.json();
    if (!parsed || typeof parsed !== "object") throw new Error("not an object");
    data = parsed as Record<string, unknown>;
  } catch {
    return fail("That did not go through. Try again.", 400);
  }

  /* a filled honeypot is a bot: log it, so a false positive on a real lead
     is visible, and answer as if it worked so the bot moves on */
  if (str(data[HONEYPOT])) {
    console.warn("Contact honeypot tripped; submission dropped.");
    return NextResponse.json({ ok: true });
  }

  const name = oneLine(str(data.name));
  const email = str(data.email);
  const message = str(data.message);
  const budget = str(data.budget);
  const timeline = str(data.timeline);

  if (!name || !email || !message) {
    return fail("Add your name, email, and a line about the project.", 400);
  }
  if (!isEmail(email) || email.length > LIMITS.email) {
    return fail("That email address does not look right.", 400);
  }
  if (name.length > LIMITS.name || message.length > LIMITS.message) {
    return fail("One of the fields is too long.", 400);
  }
  /* the two selects only ever send values off their own lists */
  if (
    (budget && !BUDGET_VALUES.includes(budget)) ||
    (timeline && !TIMELINES.includes(timeline))
  ) {
    return fail("Pick the budget and timeline from the lists.", 400);
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return fail("Too many messages at once. Give it a minute.", 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; the form falls back to mailto.");
    return fail("Email is not set up here.", 503);
  }

  const to = process.env.CONTACT_TO || LINKS.email;
  const from =
    process.env.CONTACT_FROM || "Slate & Code <inquiries@slateandcode.studio>";

  /* a hung upstream is abandoned rather than holding the request open */
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
        subject: oneLine(inquirySubject(name)),
        text: inquiryBody({ name, email, message, budget, timeline }),
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return fail("That did not go through.", 502);
    }
  } catch (err) {
    console.error("Resend request failed:", err);
    return fail("That did not go through.", 502);
  } finally {
    clearTimeout(timer);
  }

  return NextResponse.json({ ok: true });
}
