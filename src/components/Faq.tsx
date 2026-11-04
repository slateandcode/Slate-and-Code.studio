"use client";

import { FAQ } from "@/lib/services";
import { LINKS } from "@/lib/links";
import { CtaBlock } from "./PillCTA";
import { MaskReveal } from "./reveal";
import Rich from "./Rich";

/*
  Answers stay on the page rather than hiding behind an accordion, the same
  call made for the process descriptions on the home page.

  /services renders the studio-wide questions; the service and industry
  pages pass their own, which may carry inline links.

  The questions end on the site's ask. A page whose own ask sits right
  around them passes `ask={null}` so it is not made twice in a row.
*/
type Ask = { prompt: string; label: string; href: string };

const DEFAULT_ASK: Ask = {
  prompt: "Not sure which package fits?",
  label: "Send a message",
  href: "/contact",
};

export default function Faq({
  items = FAQ,
  ask = DEFAULT_ASK,
}: {
  items?: { q: string; a: string }[];
  ask?: Ask | null;
}) {
  return (
    <section id="faq" className="gut py-[clamp(70px,9vw,190px)]">
      <MaskReveal inView amount={0.4} className="text-center">
        <h2
          className="display whitespace-nowrap text-[var(--fg)]"
          style={{ fontSize: "clamp(30px, 7vw, 175px)" }}
        >
          Common <span className="text-accent">Questions</span>
        </h2>
      </MaskReveal>

      <div className="mt-[clamp(46px,6vw,140px)] border-b border-[var(--rule)]">
        {items.map(({ q, a }) => (
          <div
            key={q}
            className="grid grid-cols-1 gap-[clamp(10px,1.4vw,34px)] border-t border-[var(--rule)] py-[clamp(24px,2.8vw,58px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
          >
            <h3 className="max-w-[28ch] text-[length:clamp(17px,1.5vw,30px)] font-medium leading-[1.15] tracking-[-0.02em] text-[var(--fg)]">
              {q}
            </h3>
            <p className="max-w-[56ch] text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)]">
              <Rich text={a} />
            </p>
          </div>
        ))}
      </div>

      {ask && (
        <div className="mt-[clamp(46px,5vw,110px)] flex flex-col items-center gap-[clamp(14px,1.4vw,28px)]">
          <CtaBlock {...ask} />
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="micro inline-flex min-h-[24px] items-center text-[var(--fg-70)] transition-colors duration-300 hover:text-accent"
          >
            Or on Instagram
          </a>
        </div>
      )}
    </section>
  );
}
