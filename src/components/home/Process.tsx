"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    copy: "Understand the business, audience, offer, and current problems.",
  },
  {
    n: "02",
    title: "Design",
    copy: "Create a sharp visual direction and structure before building.",
  },
  {
    n: "03",
    title: "Build",
    copy: "Develop the website, tool, or content system with clean execution.",
  },
  {
    n: "04",
    title: "Polish + Launch",
    copy: "Refine details, test the experience, and prepare it for real users.",
  },
];

export default function Process() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Desktop: a horizontal rail draws across as the section enters
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.85", "start 0.35"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  // Phone/tablet: steps stack vertically, so the rail runs down the left
  // edge and draws as you scroll through the list
  const { scrollYProgress: vProgress } = useScroll({
    target: railRef,
    offset: ["start 0.85", "end 0.65"],
  });
  const vScale = useSpring(vProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Process"
          title={
            <>
              A clear path from <em className="serif-accent">brief</em> to{" "}
              <em className="serif-accent">launch</em>.
            </>
          }
        />

        <div ref={railRef} className="relative mt-16">
          {/* Horizontal rail + scroll-drawn gold line (desktop) */}
          <div className="absolute inset-x-0 top-[3px] hidden h-px bg-line lg:block" />
          <motion.div
            style={{ scaleX: reduce ? 1 : lineScale }}
            className="absolute inset-x-0 top-[3px] hidden h-px origin-left bg-gradient-to-r from-gold via-gold/70 to-gold/25 lg:block"
          />

          {/* Vertical rail + scroll-drawn gold line (phone/tablet) */}
          <div className="absolute bottom-3 left-[3px] top-1 w-px bg-line lg:hidden" />
          <motion.div
            style={{ scaleY: reduce ? 1 : vScale }}
            className="absolute bottom-3 left-[3px] top-1 w-px origin-top bg-gradient-to-b from-gold via-gold/70 to-gold/25 lg:hidden"
          />

          <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="group relative pl-8 lg:pl-0">
                  {/* Ghost number watermark */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-6 right-0 font-display text-[3.4rem] font-semibold leading-none text-ivory/[0.04] transition-colors duration-500 group-hover:text-ivory/[0.08]"
                  >
                    {s.n}
                  </span>

                  {/* Node sitting on the rail: left rail on phones,
                      top rail on desktop */}
                  <span className="absolute left-0 top-[6px] block h-[7px] w-[7px] rotate-45 bg-gold shadow-[0_0_12px_rgba(214,168,90,0.45)] lg:relative lg:top-0" />

                  <span className="block font-display text-sm font-semibold text-gold lg:mt-6">
                    {s.n}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ivory">
                    {s.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fog">{s.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
