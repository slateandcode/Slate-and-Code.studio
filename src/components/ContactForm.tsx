"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { cubic, EASE_OUT } from "@/lib/anim";
import { LINKS } from "@/lib/links";
import {
  BUDGET_GROUPS,
  BUDGET_OTHER,
  HONEYPOT,
  LIMITS,
  TIMELINES,
  inquiryBody,
  inquirySubject,
  type Inquiry,
  type Option,
} from "@/lib/inquiry";

/*
  The form on the /contact page: micro labels over underline fields and the
  white-wipe accent button from the CTA strip.

  Submitting posts to /api/contact, which emails the inquiry to the inbox, so
  the visitor never leaves the page and needs no mail app. If the API cannot
  send (no key configured, the mail service down, no connection), the form
  falls back to what it did before there was an API: the message is composed
  into the visitor's own mail app via mailto:, with a link to open it again
  in case the browser declined to hand it over.
*/

const FIELD =
  "w-full rounded-none border-0 border-b border-[var(--rule)] bg-transparent py-[0.7em] text-[length:var(--fs-body)] text-[var(--fg)] caret-accent outline-none transition-colors duration-300 placeholder:text-[var(--fg-28)] focus:border-accent";

const LABEL = "micro mb-[0.4em] block text-[var(--fg-70)]";

const BUTTON_FACE =
  "flex items-center gap-[0.9em] px-[clamp(18px,1.5vw,32px)] py-[clamp(11px,0.85vw,18px)] text-[length:var(--fs-small)] font-medium tracking-[-0.01em]";

/* a native select in the field dress: the underline, the caret, and the
   site's arrow in place of the browser's chevron */
function Select({
  id,
  name,
  placeholder,
  groups = [],
  options = [],
}: {
  id: string;
  name: string;
  placeholder: string;
  groups?: { label: string; options: Option[] }[];
  options?: Option[];
}) {
  return (
    <span className="relative block">
      <select
        id={id}
        name={name}
        defaultValue=""
        className={`${FIELD} appearance-none pr-[1.6em] [&:has(option[value='']:checked)]:text-[var(--fg-28)] [&_optgroup]:bg-[var(--color-ink)] [&_optgroup]:text-[var(--color-paper)] [&_option]:bg-[var(--color-ink)] [&_option]:text-[var(--color-paper)]`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {groups.map((g) => (
          <optgroup key={g.label} label={g.label}>
            {g.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </optgroup>
        ))}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[length:var(--fs-body)] text-[var(--fg-70)]"
      >
        &#8595;
      </span>
    </span>
  );
}

function mailtoFor(inquiry: Inquiry) {
  return `mailto:${LINKS.email}?subject=${encodeURIComponent(
    inquirySubject(inquiry.name)
  )}&body=${encodeURIComponent(inquiryBody(inquiry))}`;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; name: string }
  | { kind: "mailto"; href: string }
  | { kind: "error"; message: string };

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const doneRef = useRef<HTMLDivElement>(null);
  const id = (field: string) => `contact-${field}`;

  /* the submit button is gone once sent, so focus moves to the confirmation
     rather than falling back to the top of the document */
  useEffect(() => {
    if (status.kind === "sent") doneRef.current?.focus();
  }, [status.kind]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;

    const data = new FormData(e.currentTarget);
    const read = (key: string) => String(data.get(key) ?? "").trim();
    const inquiry: Inquiry = {
      name: read("name"),
      email: read("email"),
      message: read("message"),
      budget: read("budget"),
      timeline: read("timeline"),
    };

    const fallBack = () => {
      const href = mailtoFor(inquiry);
      window.location.href = href;
      setStatus({ kind: "mailto", href });
    };

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inquiry, [HONEYPOT]: read(HONEYPOT) }),
      });
      if (res.ok) {
        setStatus({ kind: "sent", name: inquiry.name.split(/\s+/)[0] });
        return;
      }
      /* the server could not send it: the visitor's mail app still can */
      if (res.status >= 500) return fallBack();
      const body = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setStatus({
        kind: "error",
        message: body?.error ?? "That did not go through. Try again.",
      });
    } catch {
      fallBack();
    }
  };

  if (status.kind === "sent") {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="outline-none"
      >
        <p className="micro text-accent">Inquiry sent</p>
        <p className="mt-[0.7em] max-w-[30ch] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
          Thanks{status.name ? `, ${status.name}` : ""}. It is in the inbox,
          and you will hear back the same day.
        </p>
        <p className="mt-[1.2em] text-[length:var(--fs-small)] leading-[1.5] text-[var(--fg-70)]">
          The reply comes from{" "}
          <a
            href={`mailto:${LINKS.email}`}
            className="underline decoration-[var(--rule)] underline-offset-4 transition-colors duration-300 hover:text-accent"
          >
            {LINKS.email}
          </a>
          . Anything to add, write to it directly.
        </p>
      </div>
    );
  }

  const sending = status.kind === "sending";
  const label = sending ? "Sending" : "Send inquiry";

  return (
    <form onSubmit={submit}>
      <div className="grid gap-[clamp(20px,2.4vw,32px)] sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className={LABEL}>
            Name
          </label>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            maxLength={LIMITS.name}
            autoComplete="name"
            placeholder="Your name"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor={id("email")} className={LABEL}>
            Email
          </label>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            maxLength={LIMITS.email}
            autoComplete="email"
            placeholder="you@company.com"
            className={FIELD}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className={LABEL}>
            Project
          </label>
          <textarea
            id={id("message")}
            name="message"
            required
            rows={4}
            maxLength={LIMITS.message}
            placeholder="What are you making, and what should it do?"
            className={`${FIELD} resize-none`}
          />
        </div>
        <div>
          <label htmlFor={id("budget")} className={LABEL}>
            Budget
          </label>
          <Select
            id={id("budget")}
            name="budget"
            groups={BUDGET_GROUPS}
            options={BUDGET_OTHER}
            placeholder="Pick a range"
          />
        </div>
        <div>
          <label htmlFor={id("timeline")} className={LABEL}>
            Timeline
          </label>
          <Select
            id={id("timeline")}
            name="timeline"
            options={TIMELINES.map((t) => ({ value: t, label: t }))}
            placeholder="When does it need to exist?"
          />
        </div>
      </div>

      {/* honeypot: clipped to nothing, out of the tab order, ignored by autofill.
          A person never fills it; a bot filling every field does. */}
      <div aria-hidden className="sr-only">
        <label htmlFor={id(HONEYPOT)}>Leave this empty</label>
        <input
          id={id(HONEYPOT)}
          name={HONEYPOT}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-[clamp(24px,3vw,40px)] flex flex-wrap items-center gap-x-[1.6em] gap-y-[1em]">
        {/* same white-wipe accent button as the CTA strip */}
        <button
          type="submit"
          disabled={sending}
          aria-busy={sending}
          className="group relative inline-flex overflow-hidden rounded-[3px] bg-accent disabled:cursor-wait"
        >
          <span className={`${BUTTON_FACE} text-white`}>
            {label}
            <span aria-hidden>&#8599;</span>
          </span>
          <span
            className={`${BUTTON_FACE} absolute inset-0 bg-white text-ink [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)] group-disabled:[clip-path:inset(0_0_100%_0)]`}
            style={{ transition: `clip-path 0.5s ${cubic(EASE_OUT)}` }}
            aria-hidden
          >
            {label}
            <span>&#8599;</span>
          </span>
        </button>

        <p
          className="text-[length:var(--fs-micro)] text-[var(--fg-70)]"
          aria-live="polite"
        >
          {status.kind === "mailto" ? (
            <>
              Your mail app has the message ready. Hit send there, or{" "}
              <a
                href={status.href}
                className="underline decoration-[var(--rule)] underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                open it again
              </a>
              .
            </>
          ) : status.kind === "error" ? (
            <span className="text-[var(--fg)]">{status.message}</span>
          ) : (
            <>
              Or write directly:{" "}
              <a
                href={`mailto:${LINKS.email}`}
                className="text-[var(--fg-70)] underline decoration-[var(--rule)] underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                {LINKS.email}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
