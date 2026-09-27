import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MaskReveal } from "@/components/reveal";
import { LINKS, MAILTO } from "@/lib/links";

/* The business as it is registered, shared by the privacy policy and the
   terms so the two can never disagree on who is speaking. */
export const LEGAL = {
  name: "Slate & Code Web-Design",
  licence:
    "Sole Establishment, licensed by the Dubai Department of Economy and Tourism (DET), License No. 1644041",
  address: "Dubai, United Arab Emirates",
  phone: "+971 50 685 2009",
  phoneHref: "tel:+971506852009",
};

export const LEGAL_UPDATED = "27 September 2026";

export type LegalSection = { id: string; title: string; body: ReactNode };

/* the email as an inline link, in the prose treatment */
export function Mail() {
  return <a href={MAILTO}>{LINKS.email}</a>;
}

/* the "who we are" block both pages open with */
export function WhoWeAre() {
  return (
    <>
      <p>
        This website is run by <strong>{LEGAL.name}</strong> (&ldquo;Slate
        &amp; Code&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), a{" "}
        {LEGAL.licence}.
      </p>
      <dl>
        <dt>Address</dt>
        <dd>{LEGAL.address}</dd>
        <dt>Email</dt>
        <dd>
          <Mail />
        </dd>
        <dt>Phone</dt>
        <dd>
          <a href={LEGAL.phoneHref}>{LEGAL.phone}</a>
        </dd>
      </dl>
    </>
  );
}

/*
  The privacy policy and the terms, set in the contact page's parts: a micro
  label, a Thunder heading with the accent full stop, a lead line, then the
  sections as numbered rows between hairline rules, the way "What happens
  next" runs. Number, heading and text sit in three columns on desktop and
  stack on a phone. No invert, so the page stays on ink the whole way down.
*/
export default function LegalPage({
  label,
  title,
  intro,
  sections,
}: {
  label: string;
  title: ReactNode;
  intro: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main>
      <Navbar />

      <section className="gut pb-[clamp(70px,9vw,190px)] pt-[clamp(104px,11vw,230px)]">
        <p className="micro text-[var(--fg-70)]">Legal · {label}</p>

        <MaskReveal className="mt-[0.9em]">
          <h1 className="display text-[length:clamp(56px,17vw,190px)] text-[var(--fg)] lg:text-[length:clamp(96px,9vw,240px)]">
            {title}
            <span className="text-accent">.</span>
          </h1>
        </MaskReveal>

        <div className="mt-[clamp(24px,2.4vw,48px)] grid gap-y-[1.2em] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-x-[clamp(40px,5vw,120px)]">
          <p className="micro text-[var(--fg-70)]">
            Last updated: {LEGAL_UPDATED}
          </p>
          <p className="max-w-[40ch] text-[length:var(--fs-lead)] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--fg)]">
            {intro}
          </p>
        </div>

        <ol className="mt-[clamp(48px,6vw,120px)] border-b border-[var(--rule)]">
          {sections.map((s, i) => (
            <li
              key={s.id}
              id={s.id}
              className="grid scroll-mt-[clamp(80px,6.5vw,120px)] grid-cols-[clamp(28px,2.6vw,52px)_minmax(0,1fr)] gap-y-[0.9em] border-t border-[var(--rule)] py-[clamp(24px,2.6vw,52px)] lg:grid-cols-[clamp(28px,2.6vw,52px)_minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-x-[clamp(40px,5vw,120px)]"
            >
              <span className="micro pt-[0.45em] text-[var(--fg-70)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-[length:var(--fs-step)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg)]">
                {s.title}
              </h2>
              <div className="legal-prose col-start-2 lg:col-start-3 lg:row-start-1">
                {s.body}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Footer />
    </main>
  );
}
