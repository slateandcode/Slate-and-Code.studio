"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ButtonPrimary, ButtonSecondary, ArrowIcon } from "@/components/Buttons";
import HeroVisual from "@/components/home/HeroVisual";
import Magnetic from "@/components/Magnetic";
import Marquee from "@/components/Marquee";

// Staircase headline — one line solid, one outlined, one gold
const LINES = [
  { text: "Designer", className: "text-ivory", indent: "" },
  { text: "Developer", className: "text-outline", indent: "ml-[12%] sm:ml-[16%]" },
  { text: "Director", className: "text-gold", indent: "ml-[24%] sm:ml-[34%]" },
];

const MARQUEE_ITEMS = [
  "Websites",
  "Business Tools",
  "Dashboards",
  "Reels",
  "Brand Systems",
  "Redesigns",
  "GCC Clients",
];

export default function Hero() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  // Glow orbs bloom in on load, then wander the hero on long looping paths
  const roam = (duration: number, xs: number[], ys: number[], delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, scale: 0.6 },
          animate: { opacity: 1, scale: 1, x: xs, y: ys },
          transition: {
            opacity: { duration: 1.8, delay, ease: "easeOut" as const },
            scale: {
              duration: 2.4,
              delay,
              ease: [0.22, 1, 0.36, 1] as const,
            },
            x: { duration, repeat: Infinity, ease: "easeInOut" as const },
            y: { duration, repeat: Infinity, ease: "easeInOut" as const },
          },
        };

  return (
    <section className="relative overflow-hidden">
      {/* Ambient background — top spotlight plus three roaming glows */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-ivory/[0.025] blur-[120px]"
        />
        <motion.div
          {...roam(44, [0, 170, 40, -70, 0], [0, 130, 260, 100, 0], 0.25)}
          className="absolute -top-24 left-[6%] h-[420px] w-[420px] rounded-full bg-gold/[0.05] blur-[130px]"
        />
        <motion.div
          {...roam(54, [0, -190, -50, 90, 0], [0, 150, -70, 190, 0], 0.55)}
          className="absolute right-[4%] top-[30%] h-[380px] w-[380px] rounded-full bg-blue/[0.04] blur-[120px]"
        />
        <motion.div
          {...roam(48, [0, 230, -130, 70, 0], [0, -150, -50, -210, 0], 0.85)}
          className="absolute bottom-[-10%] left-[30%] h-[360px] w-[360px] rounded-full bg-gold/[0.035] blur-[120px]"
        />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pb-16 pt-36 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-44">
        <div>
          <motion.p {...rise(0.05)} className="micro text-gold">
            GCC · Digital Studio
          </motion.p>

          <h1 className="mt-7 font-display text-[3.1rem] font-semibold leading-[1.04] tracking-[-0.01em] sm:text-[4.2rem] lg:text-[4.6rem]">
            {LINES.map((l, i) => (
              <span
                key={l.text}
                className={`block overflow-hidden pb-[0.07em] ${l.indent}`}
              >
                <motion.span
                  initial={reduce ? false : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + i * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`block ${l.className}`}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...rise(0.62)}
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-fog sm:text-base"
          >
            A GCC-focused digital studio creating premium websites, business
            tools, and short-form content for brands that care about how their
            work looks, feels, and performs.
          </motion.p>

          <motion.div {...rise(0.74)} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <ButtonPrimary href="/contact" className="btn-sheen">
                Start a Project <ArrowIcon />
              </ButtonPrimary>
            </Magnetic>
            <Magnetic strength={0.12}>
              <ButtonSecondary href="#work">View Work</ButtonSecondary>
            </Magnetic>
          </motion.div>
        </div>

        <HeroVisual />
      </div>

      {/* Ticker strip closing the hero */}
      <motion.div {...rise(0.85)}>
        <Marquee items={MARQUEE_ITEMS} />
      </motion.div>
    </section>
  );
}
