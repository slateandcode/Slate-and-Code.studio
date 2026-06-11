"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/site";

const SERVICES = [
  "Website",
  "Full-stack website",
  "Custom business tool",
  "Reels / shorts",
  "Monthly content system",
  "Complete bundle",
];

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
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // No backend yet — compose a prefilled email in the visitor's mail app
    // so the form still delivers a real inquiry.
    const subject = `Project inquiry — ${data.get("service")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Business / brand: ${data.get("business")}`,
      `Email: ${data.get("email")}`,
      `Instagram: ${data.get("instagram") || "—"}`,
      `Service: ${data.get("service")}`,
      `Estimated budget: ${data.get("budget")}`,
      "",
      "Project details:",
      `${data.get("message")}`,
    ].join("\n");

    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
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
          Your email draft is ready.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-fog">
          We opened a prefilled email in your mail app — hit send and it&apos;s on
          its way. For the fastest reply, message us on Instagram at{" "}
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
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-7 text-[13px] font-medium text-fog underline-offset-4 transition-colors hover:text-ivory hover:underline"
        >
          Back to the form
        </button>
      </motion.div>
    );
  }

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

      <button
        type="submit"
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-gold px-6 text-sm font-semibold tracking-wide text-pit transition-all duration-300 hover:bg-[#e0b468] hover:shadow-[0_0_28px_rgba(214,168,90,0.22)] sm:w-auto"
      >
        Send inquiry
      </button>
      <p className="mt-4 text-xs leading-relaxed text-fog/80">
        Opens a prefilled email in your mail app. Prefer DMs? Instagram is the
        fastest way to reach us.
      </p>
    </form>
  );
}
