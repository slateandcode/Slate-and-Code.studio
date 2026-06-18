"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { SITE, SERVICE_NAMES } from "@/lib/site";

const SERVICES = SERVICE_NAMES;

const BUDGETS = [
  "Under 2,000 AED",
  "2,000–4,000 AED",
  "4,000–8,000 AED",
  "8,000+ AED",
  "Not sure yet",
];

const inputCls =
  "h-12 w-full rounded-lg border border-line bg-well px-4 text-sm text-ivory placeholder:text-fog/55 transition-colors duration-300 focus:border-gold/55 focus:outline-none";

const labelCls = "micro mb-2.5 block text-fog";

type Status = "idle" | "submitting" | "sent" | "error";

/** Builds a prefilled mailto: as a fallback if the server send fails. */
function mailtoFallback(fd: FormData) {
  const subject = `Project inquiry: ${fd.get("service")}`;
  const body = [
    `Name: ${fd.get("name")}`,
    `Business / brand: ${fd.get("business")}`,
    `Email: ${fd.get("email")}`,
    `Instagram: ${fd.get("instagram") || "not provided"}`,
    `Service: ${fd.get("service")}`,
    `Estimated budget: ${fd.get("budget")}`,
    "",
    "Project details:",
    `${fd.get("message")}`,
  ].join("\n");
  return `mailto:${SITE.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 12 7"
      className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-3 -translate-y-1/2 text-fog"
      aria-hidden
    >
      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [mailto, setMailto] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setMailto(mailtoFallback(fd));
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          business: fd.get("business"),
          email: fd.get("email"),
          instagram: fd.get("instagram"),
          service: fd.get("service"),
          budget: fd.get("budget"),
          message: fd.get("message"),
          company_url: fd.get("company_url"), // honeypot
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-lg border border-line bg-surface p-10 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/45 shadow-[0_0_22px_rgba(214,168,90,0.15)]">
          <svg viewBox="0 0 16 16" className="h-5 w-5" aria-hidden>
            <path d="M2.5 8.5l3.5 3.5 7.5-8" stroke="#D6A85A" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-xl font-semibold text-ivory">
          Your inquiry is in.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-fog">
          Thanks for reaching out. We&apos;ll get back to you soon. For the
          fastest reply, message us on Instagram at{" "}
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            {SITE.instagramHandle}
          </a>
          .
        </p>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-line bg-surface p-7 sm:p-9"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="business" className={labelCls}>
            Business / brand
          </label>
          <input id="business" name="business" required placeholder="Company or brand name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={inputCls} />
        </div>
        <div>
          <label htmlFor="instagram" className={labelCls}>
            Instagram handle
          </label>
          <input id="instagram" name="instagram" placeholder="@yourbrand" className={inputCls} />
        </div>
        <div className="relative">
          <label htmlFor="service" className={labelCls}>
            Service needed
          </label>
          <div className="relative">
            <select id="service" name="service" required defaultValue="" className={`${inputCls} appearance-none pr-10`}>
              <option value="" disabled>
                Select a service
              </option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>
        <div className="relative">
          <label htmlFor="budget" className={labelCls}>
            Estimated budget
          </label>
          <div className="relative">
            <select id="budget" name="budget" required defaultValue="" className={`${inputCls} appearance-none pr-10`}>
              <option value="" disabled>
                Select a range
              </option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <Chevron />
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>
            Message / project details
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="What are you building, and what should it do for the business?"
            className={`${inputCls} h-auto resize-none py-3.5 leading-relaxed`}
          />
        </div>
      </div>

      {/* Honeypot — hidden from real users; bots that fill it are dropped */}
      <div className="hidden" aria-hidden>
        <label htmlFor="company_url">Company URL</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p className="mt-6 rounded-lg border border-[#5a2e2e] bg-[#1c1413] px-4 py-3 text-[13px] leading-relaxed text-[#e9b9b0]">
          Something went wrong sending that. You can{" "}
          <a href={mailto} className="font-semibold text-ivory underline underline-offset-2">
            email us directly
          </a>{" "}
          or message us on Instagram at{" "}
          <a
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ivory underline underline-offset-2"
          >
            {SITE.instagramHandle}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-gold px-6 text-sm font-semibold tracking-wide text-pit transition-all duration-300 hover:bg-[#e0b468] hover:shadow-[0_0_28px_rgba(214,168,90,0.22)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Send inquiry"}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-fog/80">
        We&apos;ll reply by email. Prefer DMs? Instagram is the fastest way to
        reach us.
      </p>
    </form>
  );
}
