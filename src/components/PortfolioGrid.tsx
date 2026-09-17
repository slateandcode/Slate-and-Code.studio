"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cubic, EASE_HOUSE, EASE_OUT } from "@/lib/anim";
import { TEXT_LINK, TEXT_LINK_RULE } from "@/lib/ui";
import { WORKS, type Work } from "@/lib/work";

/* ---------------------------------------------------------------------------
   Every project as a card: the screenshot, then a meta row (number, kind, and
   either the live link or "In progress"), the name, and a line on what it is.

   The screenshot is a link too when the project is live, but it is kept out
   of the tab order and away from screen readers, so each project is reached
   once, through its name row, rather than twice.
--------------------------------------------------------------------------- */

/* live projects lead, since they can be opened; the ones still being built
   follow, each group in the order the list gives it */
const ORDERED = [
  ...WORKS.filter((w) => w.href),
  ...WORKS.filter((w) => !w.href),
];

function Status({ work }: { work: Work }) {
  if (!work.href) {
    return (
      <span className="flex min-h-[24px] items-center gap-[0.7em] text-[length:var(--fs-micro)]">
        <span className="animate-blink block size-[0.42em] rounded-full bg-accent" />
        <span className="micro text-[var(--fg-70)]">In progress</span>
      </span>
    );
  }

  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${TEXT_LINK} inline-flex min-h-[24px] items-center`}
    >
      <span className="relative inline-flex items-center gap-[0.6em]">
        Visit site
        <span aria-hidden>&#8599;</span>
        <span className={TEXT_LINK_RULE} />
      </span>
      <span className="sr-only">: {work.name}, opens in a new tab</span>
    </a>
  );
}

function Shot({ work, index }: { work: Work; index: number }) {
  const image = (
    <Image
      src={work.src}
      alt={work.alt}
      width={1600}
      height={800}
      sizes="(max-width: 768px) 100vw, 50vw"
      loading={index < 2 ? "eager" : "lazy"}
      className="aspect-[2/1] h-auto w-full object-cover object-top transition-transform duration-[900ms] group-hover:scale-[1.03]"
      style={{ transitionTimingFunction: cubic(EASE_OUT) }}
    />
  );

  return (
    <div className="overflow-hidden border border-[var(--rule)] bg-[var(--fg-14)]">
      {work.href ? (
        <a
          href={work.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden
          className="group block"
        >
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
}

function Card({ work, index }: { work: Work; index: number }) {
  return (
    <motion.article
      className="rm-pin flex flex-col"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 1,
        /* cards sharing a row arrive a beat apart */
        delay: (index % 2) * 0.12,
        ease: [...EASE_HOUSE],
      }}
    >
      <Shot work={work} index={index} />

      <div className="mt-[clamp(14px,1.2vw,24px)] flex items-center justify-between gap-[1em]">
        <span className="micro text-[var(--fg-70)]">
          {String(index + 1).padStart(2, "0")}
          <span className="mx-[0.8em] text-[var(--fg-28)]">/</span>
          {work.kind}
        </span>
        <Status work={work} />
      </div>

      <h2 className="mt-[clamp(10px,0.9vw,18px)] text-[length:var(--fs-step)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg)]">
        {work.name}
      </h2>
      <p className="mt-[0.6em] max-w-[52ch] text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)]">
        {work.summary}
      </p>
    </motion.article>
  );
}

export default function PortfolioGrid() {
  return (
    <section className="gut pb-[clamp(70px,9vw,190px)] pt-[clamp(46px,5vw,110px)]">
      <div className="grid grid-cols-1 gap-x-[clamp(16px,1.6vw,36px)] gap-y-[clamp(44px,4.6vw,100px)] md:grid-cols-2">
        {ORDERED.map((work, i) => (
          <Card key={work.name} work={work} index={i} />
        ))}
      </div>

      {/* the ask, once the work has made the case */}
      <div className="mt-[clamp(60px,7vw,160px)] flex flex-wrap items-baseline gap-x-[clamp(18px,2vw,44px)] gap-y-[0.8em] border-t border-[var(--rule)] pt-[clamp(28px,3vw,60px)]">
        <p className="text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
          Have something like this in mind?
        </p>
        <Link
          href="/contact"
          className="group relative text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-accent"
        >
          Start a project
          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </Link>
      </div>
    </section>
  );
}
