"use client";

import { useLayoutEffect, useRef, useState, type FormEvent } from "react";
import { cubic, EASE_OUT } from "@/lib/anim";
import { LINKS } from "@/lib/links";
import { HONEYPOT, LIMITS } from "@/lib/inquiry";
import {
  FORMATS,
  editingBody,
  editingSubject,
  type EditingInquiry,
} from "@/lib/editing";
import Listbox from "./Listbox";

/* The editing inquiry form: the contact form's fields and button, with a
   channel link and a format in place of budget and timeline. Posts to the
   same /api/contact with kind "editing", and falls back to mailto the same way. */

const FIELD =
  "w-full rounded-none border-0 border-b border-[var(--rule)] bg-transparent py-[0.7em] text-[length:var(--fs-body)] text-[var(--fg)] caret-accent outline-none transition-colors duration-300 placeholder:text-[var(--fg-28)] focus:border-accent";
const LABEL = "micro mb-[0.4em] block text-[var(--fg-70)]";
const BUTTON_FACE =
  "flex items-center gap-[0.9em] px-[clamp(18px,1.5vw,32px)] py-[clamp(11px,0.85vw,18px)] text-[length:var(--fs-small)] font-medium tracking-[-0.01em]";
const GROUPS = [{ options: FORMATS.map((f) => ({ value: f, label: f })) }];
const SOFT_LINK =
  "underline decoration-[var(--rule)] underline-offset-4 transition-colors duration-300 hover:text-accent";

/* one line tall to start, growing with what is typed, like the contact form */
function fitToContent(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`;
}

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; name: string }
  | { kind: "mailto"; href: string }
  | { kind: "error"; message: string };

export default function EditingForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const id = (f: string) => `editing-${f}`;

  useLayoutEffect(() => {
    fitToContent(messageRef.current);
    const onResize = () => fitToContent(messageRef.current);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [status.kind]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;
    const data = new FormData(e.currentTarget);
    const read = (k: string) => String(data.get(k) ?? "").trim();
    const inquiry: EditingInquiry = {
      name: read("name"),
      email: read("email"),
      message: read("message"),
      channel: read("channel"),
      format: read("format"),
    };
    const fallBack = () => {
      const href = `mailto:${LINKS.email}?subject=${encodeURIComponent(
        editingSubject(inquiry.name)
      )}&body=${encodeURIComponent(editingBody(inquiry))}`;
      window.location.href = href;
      setStatus({ kind: "mailto", href });
    };
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...inquiry,
          kind: "editing",
          [HONEYPOT]: read(HONEYPOT),
        }),
      });
      if (res.ok) {
        setStatus({ kind: "sent", name: inquiry.name.split(/\s+/)[0] });
        return;
      }
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
      <div role="status">
        <p className="micro text-accent">Inquiry sent</p>
        <p className="mt-[0.7em] max-w-[30ch] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
          Thanks{status.name ? `, ${status.name}` : ""}. It is in the inbox,
          and you will hear back the same day.
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
            placeholder="you@channel.com"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor={id("channel")} className={LABEL}>
            Channel link
          </label>
          <input
            id={id("channel")}
            name="channel"
            type="text"
            maxLength={300}
            placeholder="youtube.com/@yourchannel"
            className={FIELD}
          />
        </div>
        <div>
          <label
            id={id("format-label")}
            htmlFor={id("format")}
            className={LABEL}
          >
            Format
          </label>
          <Listbox
            id={id("format")}
            name="format"
            labelId={id("format-label")}
            groups={GROUPS}
            placeholder="What needs editing?"
            fieldClassName={FIELD}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className={LABEL}>
            Project
          </label>
          <textarea
            ref={messageRef}
            id={id("message")}
            name="message"
            required
            rows={1}
            onInput={(e) => fitToContent(e.currentTarget)}
            maxLength={LIMITS.message}
            placeholder="How many videos, how long, and what style are you after?"
            className={`${FIELD} block max-h-[16em] resize-none overflow-y-auto leading-[1.45]`}
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

      <div className="mt-[clamp(24px,3vw,40px)] flex flex-wrap items-center gap-x-[1.6em] gap-y-[1em]">
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
              <a href={status.href} className={SOFT_LINK}>
                open it again
              </a>
              .
            </>
          ) : status.kind === "error" ? (
            <span className="text-[var(--fg)]">{status.message}</span>
          ) : (
            <>
              Or write directly:{" "}
              <a href={`mailto:${LINKS.email}`} className={SOFT_LINK}>
                {LINKS.email}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  );
}
