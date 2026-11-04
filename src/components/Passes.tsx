"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { PASSES } from "@/lib/motion";
import { MaskReveal } from "./reveal";

/* ---------------------------------------------------------------------------
   The four passes every reel goes through, one huge word each. A word sits
   as an outline until its row climbs the screen, then fills left to right
   like a progress bar, with its one line fading up beside it. Scroll-linked
   like the steps on the home page, so it runs backwards on the way up.
--------------------------------------------------------------------------- */

function Pass({ pass, index }: { pass: (typeof PASSES)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.4"] });
  const p = useSpring(scrollYProgress, { stiffness: 60, damping: 22, restDelta: 0.0005 });

  const fill = useTransform(p, (v) => `inset(-10% ${(1 - v) * 100}% -10% 0)`);
  const lineOpacity = useTransform(p, [0.45, 1], [0, 1]);
  const lineY = useTransform(p, [0.45, 1], [18, 0]);

  return (
    <div
      ref={ref}
      className="grid items-end gap-x-[clamp(16px,2vw,48px)] gap-y-[0.6em] border-t border-[var(--rule)] py-[clamp(14px,1.6vw,34px)] md:grid-cols-[minmax(0,auto)_minmax(0,1fr)]"
    >
      <div className="flex items-start gap-[clamp(10px,1.2vw,24px)]">
        <span className="micro pt-[0.8em] text-accent">{String(index + 1).padStart(2, "0")}</span>
        {/* on a phone CAPTION, the longest at 2.492em, fills the row beside
            its number; wider screens leave room for the line */}
        <h3 className="display relative text-[32vw] md:text-[15vw] 2xl:text-[min(15vw,360px)]">
          <span className="text-transparent [-webkit-text-stroke:1.5px_color-mix(in_oklab,var(--fg)_30%,transparent)]">
            {pass.word}
          </span>
          <motion.span
            aria-hidden
            className="rm-pin absolute inset-0 text-[var(--fg)]"
            style={{ clipPath: fill }}
          >
            {pass.word}
          </motion.span>
        </h3>
      </div>
      <motion.p
        className="rm-pin max-w-[28ch] pb-[0.6em] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg-70)] md:justify-self-end md:text-right"
        style={{ opacity: lineOpacity, y: lineY }}
      >
        {pass.line}
      </motion.p>
    </div>
  );
}

export default function Passes() {
  return (
    <section className="gut py-[clamp(70px,9vw,190px)]">
      <MaskReveal inView amount={0.4} className="text-center">
        <h2 className="display whitespace-nowrap text-[var(--fg)]" style={{ fontSize: "clamp(30px, 6.4vw, 160px)" }}>
          Every reel, <span className="text-accent">four passes</span>
        </h2>
      </MaskReveal>
      <div className="mt-[clamp(40px,5vw,110px)] border-b border-[var(--rule)]">
        {PASSES.map((pass, i) => (
          <Pass key={pass.word} pass={pass} index={i} />
        ))}
      </div>
    </section>
  );
}
