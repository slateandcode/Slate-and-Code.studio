"use client";

import { motion, type Variants } from "motion/react";
import { EASE_HOUSE } from "@/lib/anim";
import { SET_WIDTH } from "@/lib/type";
import { WORKS } from "@/lib/work";

/* The services hero's letters arriving out of order, at a fraction of the
   size: the word takes a little over a third of the page beside the intro
   rather than the full width above it, so the first scene is already
   coming up the screen on arrival. On a phone it runs the full width, which
   there is still a modest size. */
const TITLE_SIZE = `min(calc((100vw - var(--gutter) * 2) / ${SET_WIDTH.portfolio}), max(12vw, 64px))`;

const LETTERS = "PORTFOLIO".split("");
const ARRIVAL = [4, 0, 7, 2, 8, 1, 5, 3, 6];
const SLOT = new Map(ARRIVAL.map((i, slot) => [i, slot]));

const glyph: Variants = {
  hidden: { y: "115%" },
  visible: (slot: number) => ({
    y: "0%",
    transition: {
      duration: 1.25,
      delay: 0.3 + slot * 0.065,
      ease: [...EASE_HOUSE],
    },
  }),
};

export default function PortfolioHero() {
  return (
    <section className="gut flex flex-col gap-[clamp(18px,2vw,40px)] pt-[clamp(92px,8vw,150px)] md:flex-row md:items-end md:justify-between">
      <h1
        className="display -mb-[0.1em] block shrink-0 whitespace-nowrap text-[var(--fg)]"
        style={{ fontSize: TITLE_SIZE }}
        aria-label="Portfolio"
      >
        {LETTERS.map((ch, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden whitespace-pre align-bottom"
            aria-hidden
          >
            <motion.span
              className="rm-pin inline-block will-change-transform"
              variants={glyph}
              custom={SLOT.get(i) ?? 0}
              initial="hidden"
              animate="visible"
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </h1>

      {/* the intro sits on the title's baseline, the count over it */}
      <motion.div
        className="rm-pin max-w-[44ch] md:pb-[0.4em] md:text-right"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: [...EASE_HOUSE] }}
      >
        <span className="micro text-[var(--fg-45)]">
          {String(WORKS.length).padStart(2, "0")} Projects
        </span>
        <p className="mt-[0.6em] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
          Websites for custom builders and the businesses around them,
          designed and built by the studio.
        </p>
        <p className="mt-[0.5em] text-[length:var(--fs-small)] leading-[1.45] text-[var(--fg-70)]">
          Previews made for real businesses come first, then live builds and
          the studio&rsquo;s own concepts.
        </p>
      </motion.div>
    </section>
  );
}
