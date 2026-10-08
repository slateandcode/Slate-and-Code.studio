"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cubic, EASE_OUT } from "@/lib/anim";
import { LINKS } from "@/lib/links";
import { HONEYPOT, LIMITS } from "@/lib/inquiry";
import { track } from "@/lib/pixel";
import {
  QUESTIONS,
  WEBSITE_MAX,
  freeSiteBody,
  freeSiteSubject,
  type Answers,
  type FreeSiteRequest,
  type Question,
} from "@/lib/campaign";

/* The campaign's one-click quote: three questions answered with a single
   tap each, each tap moving straight on to the next, then name, email and an
   optional website. Posts to /api/contact with kind "free-website".

   Unlike the other forms it never launches the visitor's mail app on its
   own: a cold visitor off an ad meets an "open with" dialog and leaves. If
   the send fails, the form stays filled in, the button retries, and an
   email link with the request already written is there to click.

   The number keys pick an option too, so a keyboard visitor can run the
   three questions without leaving the home row. */

const FIELD =
  "w-full rounded-none border-0 border-b border-[var(--rule)] bg-transparent py-[0.7em] text-[length:var(--fs-body)] text-[var(--fg)] caret-accent outline-none transition-colors duration-300 placeholder:text-[var(--fg-28)] focus:border-accent";
const LABEL = "micro mb-[0.4em] block text-[var(--fg-70)]";
const BUTTON_FACE =
  "flex items-center gap-[0.9em] px-[clamp(18px,1.5vw,32px)] py-[clamp(13px,0.95vw,20px)] text-[length:var(--fs-small)] font-medium tracking-[-0.01em]";
const SOFT_LINK =
  "underline decoration-[var(--rule)] underline-offset-4 transition-colors duration-300 hover:text-accent";
const QUESTION =
  "text-[length:clamp(26px,2.3vw,50px)] font-medium leading-[1.08] tracking-[-0.03em] text-balance text-[var(--fg)]";

/* long enough to see the pick land, short enough to still feel like one click */
const ADVANCE_MS = 260;
const STEPS = QUESTIONS.length + 1;

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; name: string }
  | { kind: "error"; message: string }
  /* the server could not send it: retry, or email it by hand */
  | { kind: "failed"; href: string };

export default function FreeSiteQuiz() {
  const [step, setStep] = useState(0);
  /* +1 moving forward, -1 going back, so the slide runs the right way */
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const advancing = useRef(false);
  const moved = useRef(false);
  const reduce = useReducedMotion();
  const id = (f: string) => `free-site-${f}`;

  const go = (to: number) => {
    moved.current = true;
    setDir(to > step ? 1 : -1);
    setStep(to);
  };

  const pick = (key: Question["key"], value: string) => {
    if (advancing.current) return;
    advancing.current = true;
    setAnswers((a) => ({ ...a, [key]: value }));
    window.setTimeout(() => {
      advancing.current = false;
      go(step + 1);
    }, ADVANCE_MS);
  };

  /* 1 to 4 on the keyboard pick the matching option on a question step */
  const question = QUESTIONS[step];
  useEffect(() => {
    if (!question) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= question.options.length) {
        e.preventDefault();
        pick(question.key, question.options[n - 1]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  /* once the visitor has moved, the new step's heading takes focus so a
     screen reader announces it; the first paint leaves focus alone */
  const focusOnMount = (el: HTMLElement | null) => {
    if (el && moved.current) el.focus({ preventScroll: true });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;
    const data = new FormData(e.currentTarget);
    const read = (k: string) => String(data.get(k) ?? "").trim();
    const request: FreeSiteRequest = {
      site: answers.site ?? "",
      business: answers.business ?? "",
      launch: answers.launch ?? "",
      name: read("name"),
      email: read("email"),
      website: read("website"),
    };
    const failed = () =>
      setStatus({
        kind: "failed",
        href: `mailto:${LINKS.email}?subject=${encodeURIComponent(
          freeSiteSubject(request.name)
        )}&body=${encodeURIComponent(freeSiteBody(request))}`,
      });
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...request,
          kind: "free-website",
          [HONEYPOT]: read(HONEYPOT),
        }),
      });
      if (res.ok) {
        /* the conversion the ads optimise for; sent only with consent */
        track("Lead", { content_name: "Free website" });
        setStatus({ kind: "sent", name: request.name.split(/\s+/)[0] });
        return;
      }
      if (res.status >= 500) return failed();
      const body = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      setStatus({
        kind: "error",
        message: body?.error ?? "That did not go through. Try again.",
      });
    } catch {
      failed();
    }
  };

  const sent = status.kind === "sent";
  const shown = sent ? STEPS : step;

  const slide = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: dir * 28 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: dir * -20 },
      };

  return (
    <div className="border border-[var(--rule)] bg-[var(--surface)]">
      {/* where the visitor is: a step count and one bar per step */}
      <div className="border-b border-[var(--rule)] px-[clamp(20px,2.4vw,48px)] pb-[1.1em] pt-[1em]">
        <div className="flex items-center justify-between gap-[1em]">
          <span className="micro text-[var(--fg-70)]" aria-live="polite">
            {sent
              ? "Request sent"
              : `Step ${String(step + 1).padStart(2, "0")} / ${String(STEPS).padStart(2, "0")}`}
          </span>
          <span className="micro text-[var(--fg-70)]">Free website</span>
        </div>
        <div
          className="mt-[0.9em] grid gap-[6px]"
          style={{ gridTemplateColumns: `repeat(${STEPS}, minmax(0, 1fr))` }}
          aria-hidden
        >
          {Array.from({ length: STEPS }, (_, i) => (
            <span key={i} className="h-[2px] bg-[var(--fg-14)]">
              <span
                className="block h-full origin-left bg-accent"
                style={{
                  transform: `scaleX(${i <= shown ? 1 : 0})`,
                  transition: `transform 0.6s ${cubic(EASE_OUT)}`,
                }}
              />
            </span>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden px-[clamp(20px,2.4vw,48px)] py-[clamp(24px,2.6vw,52px)]">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={sent ? "sent" : step}
            {...slide}
            transition={{ duration: reduce ? 0.15 : 0.42, ease: [...EASE_OUT] }}
          >
            {sent ? (
              <div role="status">
                <p className="micro text-accent">You are in</p>
                <p
                  ref={focusOnMount}
                  tabIndex={-1}
                  className={`${QUESTION} mt-[0.6em] max-w-[20ch]`}
                >
                  Thanks{status.name ? `, ${status.name}` : ""}. We are on it.
                </p>
                <p className="mt-[1em] max-w-[38ch] text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)]">
                  You will hear back the same day at the email you gave, with
                  what happens next.
                </p>
              </div>
            ) : question ? (
              <fieldset>
                <legend
                  ref={focusOnMount}
                  tabIndex={-1}
                  className={`${QUESTION} max-w-[22ch]`}
                >
                  {question.question}
                </legend>
                <ul className="mt-[clamp(20px,2vw,40px)] border-b border-[var(--rule)]">
                  {question.options.map((option, i) => {
                    const chosen = answers[question.key] === option;
                    return (
                      <li key={option}>
                        <button
                          type="button"
                          onClick={() => pick(question.key, option)}
                          aria-pressed={chosen}
                          className={`group grid min-h-[56px] w-full grid-cols-[clamp(26px,2.2vw,44px)_minmax(0,1fr)_auto] items-center gap-x-[0.6em] border-t border-[var(--rule)] py-[clamp(14px,1.2vw,24px)] text-left transition-colors duration-300 hover:bg-[var(--surface-hi)] ${chosen ? "bg-[var(--surface-hi)]" : ""}`}
                        >
                          <span
                            className={`micro pl-[0.5em] transition-colors duration-300 ${chosen ? "text-accent" : "text-[var(--fg-45)] group-hover:text-accent"}`}
                          >
                            {i + 1}
                          </span>
                          <span className="text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
                            {option}
                          </span>
                          <span
                            aria-hidden
                            className={`pr-[0.7em] text-[length:var(--fs-lead)] leading-none transition-[color,transform] duration-300 ${chosen ? "translate-x-0 text-accent" : "-translate-x-[0.3em] text-[var(--fg-28)] group-hover:translate-x-0 group-hover:text-accent"}`}
                          >
                            &rarr;
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </fieldset>
            ) : (
              <form onSubmit={submit}>
                <h2
                  ref={focusOnMount}
                  tabIndex={-1}
                  className={`${QUESTION} max-w-[22ch]`}
                >
                  Last step. Where should we send it?
                </h2>
                <div className="mt-[clamp(20px,2vw,40px)] grid gap-[clamp(20px,2.4vw,32px)] sm:grid-cols-2">
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
                      autoComplete="given-name"
                      placeholder="First name is fine"
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
                      placeholder="you@business.com"
                      className={FIELD}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor={id("website")} className={LABEL}>
                      Website{" "}
                      <span className="text-[var(--fg-45)]">(optional)</span>
                    </label>
                    <input
                      id={id("website")}
                      name="website"
                      type="text"
                      inputMode="url"
                      maxLength={WEBSITE_MAX}
                      autoComplete="url"
                      placeholder="yourbusiness.com"
                      className={FIELD}
                    />
                  </div>
                </div>

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

                <SubmitButton sending={status.kind === "sending"} />

                <p
                  className="mt-[1.2em] text-[length:var(--fs-micro)] text-[var(--fg-70)]"
                  aria-live="polite"
                >
                  {status.kind === "failed" ? (
                    <span className="text-[var(--fg)]">
                      That did not send. Hit the button to try again, or{" "}
                      <a href={status.href} className={SOFT_LINK}>
                        email it to us
                      </a>
                      .
                    </span>
                  ) : status.kind === "error" ? (
                    <span className="text-[var(--fg)]">{status.message}</span>
                  ) : (
                    "Free, with no obligation to launch."
                  )}
                </p>
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        {!sent && step > 0 && (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="micro mt-[clamp(20px,2vw,36px)] inline-flex min-h-[24px] items-center gap-[0.6em] text-[var(--fg-70)] transition-colors duration-300 hover:text-[var(--fg)]"
          >
            <span aria-hidden>&larr;</span> Back
          </button>
        )}
      </div>
    </div>
  );
}

function SubmitButton({ sending }: { sending: boolean }) {
  const label = sending ? "Sending" : "Get my free website";
  return (
    <button
      type="submit"
      disabled={sending}
      aria-busy={sending}
      className="group relative mt-[clamp(28px,3vw,44px)] inline-flex w-full overflow-hidden rounded-[3px] bg-accent disabled:cursor-wait sm:w-auto"
    >
      <span className={`${BUTTON_FACE} w-full justify-between text-white sm:justify-start`}>
        {label}
        <span aria-hidden>&#8599;</span>
      </span>
      <span
        className={`${BUTTON_FACE} absolute inset-0 justify-between bg-white text-ink [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)] group-disabled:[clip-path:inset(0_0_100%_0)] sm:justify-start`}
        style={{ transition: `clip-path 0.5s ${cubic(EASE_OUT)}` }}
        aria-hidden
      >
        {label}
        <span>&#8599;</span>
      </span>
    </button>
  );
}
