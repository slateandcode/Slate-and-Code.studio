"use client";

import { motion, type Variants } from "motion/react";
import { EASE_HOUSE } from "@/lib/anim";
import { SET_WIDTH } from "@/lib/type";
import { WORKS } from "@/lib/work";

/* The services hero's construction without the full-screen frame: the word
   is set to span the page on the near-bleed inset and its letters arrive out
   of order, and the work follows straight after instead of a screen later. */
const TITLE_SIZE = `calc((100vw - var(--edge) * 2) / ${SET_WIDTH.portfolio})`;

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
    <section className="pt-[clamp(96px,10vw,210px)]">
      <motion.div
        className="rm-pin gut flex items-end justify-between gap-[1em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [...EASE_HOUSE] }}
      >
        <span className="micro text-[var(--fg-70)]">Selected and live work</span>
        <span className="micro text-[var(--fg-70)]">
          {String(WORKS.length).padStart(2, "0")} Projects
        </span>
      </motion.div>

      <h1
        className="display -mb-[0.143em] mt-[0.12em] block whitespace-nowrap px-[var(--edge)] text-[var(--fg)]"
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

      <div className="gut mt-[clamp(28px,3.4vw,72px)] grid gap-[1em] border-t border-[var(--rule)] pt-[clamp(18px,1.8vw,36px)] md:grid-cols-2">
        <motion.p
          className="rm-pin max-w-[30ch] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [...EASE_HOUSE] }}
        >
          Websites, 3D product sites, and landing pages, designed and built
          by the studio.
        </motion.p>
        <motion.p
          className="rm-pin max-w-[44ch] text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)] md:justify-self-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3, ease: [...EASE_HOUSE] }}
        >
          Every live project opens in a new tab. The ones still being built
          are marked in progress.
        </motion.p>
      </div>
    </section>
  );
}
