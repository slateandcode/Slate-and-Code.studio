"use client";

import { motion, useReducedMotion } from "framer-motion";
import BuildMockup from "@/components/services/BuildMockup";

export default function ServicesHero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-faint mask-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-14 pt-32 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:gap-12 lg:pb-16 lg:pt-40">
        <div>
          <motion.p {...rise(0.05)} className="micro text-gold">
            Services
          </motion.p>
          <motion.h1
            {...rise(0.18)}
            className="mt-5 max-w-xl font-display text-3xl font-semibold leading-[1.12] text-ivory sm:text-4xl lg:text-[2.75rem]"
          >
            Services built to upgrade and{" "}
            <em className="serif-accent">launch</em> businesses.
          </motion.h1>
          <motion.p
            {...rise(0.32)}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-fog"
          >
            Websites, business tools, and content. Designed, built, and
            shipped by one studio.
          </motion.p>
        </div>

        <BuildMockup />
      </div>
    </section>
  );
}
