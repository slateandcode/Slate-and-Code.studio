"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { EASE_HOUSE } from "@/lib/anim";
import { MOTION } from "@/lib/motion";
import { TEXT_LINK, TEXT_LINK_RULE } from "@/lib/ui";
import { PillButton } from "./PillCTA";
import ReelFan from "./ReelFan";

/* ---------------------------------------------------------------------------
   The /motion hero, after the home page's: the mark set edge to edge with
   its letters arriving out of order, a ghost line over it, and the work
   right under it, the fan of reels overlapping the foot of the mark the way
   the wheel of cards sits over the wordmark at home.
--------------------------------------------------------------------------- */

const GLYPHS = [..."MOTION DESIGN."];
/* scattered on purpose, and fixed so the server and client agree */
const ARRIVAL = [4, 11, 0, 8, 2, 13, 6, 10, 1, 12, 3, 9, 5];
const SLOT = new Map(ARRIVAL.map((g, slot) => [g, slot]));

const glyph: Variants = {
  hidden: { y: "115%" },
  visible: (slot: number) => ({
    y: "0%",
    transition: { duration: 1.15, delay: 0.3 + slot * 0.06, ease: [...EASE_HOUSE] },
  }),
};

export default function MotionHero() {
  return (
    <section
      className="relative overflow-hidden pt-[clamp(84px,7.4vw,150px)]"
      /* MOTION DESIGN. sets 4.6em in Thunder Bold: edge to edge */
      style={{ ["--mwm" as string]: "calc((100vw - var(--edge) * 2) / 4.6)" }}
    >
      <div className="px-[var(--edge)] text-center">
        <motion.p
          aria-hidden
          className="rm-ghost display mb-[0.15em] hidden whitespace-nowrap text-[var(--fg)] lg:block"
          style={{ fontSize: "calc(var(--mwm) * 0.16)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.19 }}
          transition={{ duration: 1.1, delay: 1.2, ease: [...EASE_HOUSE] }}
        >
          Talking heads Reels Shorts
        </motion.p>
        <h1
          className="display whitespace-nowrap text-[var(--fg)]"
          style={{ fontSize: "var(--mwm)" }}
          aria-label="Motion design for talking-head reels"
        >
          {GLYPHS.map((ch, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden whitespace-pre align-bottom">
              <motion.span
                className={`rm-pin inline-block will-change-transform ${ch === "." ? "text-accent" : ""}`}
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
      </div>

      {/* the fan rides up over the foot of the mark on a wide screen; on a
          phone the mark is too short to lose any of it */}
      <motion.div
        className="rm-pin relative z-10 mt-[clamp(14px,3vw,28px)] lg:-mt-[calc(var(--mwm)*0.2)]"
        initial={{ opacity: 0, y: 90 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.75, ease: [...EASE_HOUSE] }}
      >
        <ReelFan />
      </motion.div>

      <div className="gut mt-[clamp(44px,5vw,110px)] grid gap-[clamp(18px,2vw,40px)] border-t border-[var(--rule)] pt-[clamp(18px,1.8vw,36px)] md:grid-cols-2 md:items-end">
        <p className="max-w-[24ch] text-[length:clamp(22px,2.4vw,52px)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--fg)]">
          {MOTION.lead}
        </p>
        <div className="flex flex-wrap items-center gap-x-[clamp(20px,2vw,40px)] gap-y-[1em] md:justify-self-end">
          <PillButton label="Start a reel" href="#inquiry" />
          <Link href="#pricing" className={`${TEXT_LINK} inline-flex min-h-[24px] items-center`}>
            From $75 a reel
            <span className={TEXT_LINK_RULE} />
          </Link>
        </div>
      </div>
    </section>
  );
}
