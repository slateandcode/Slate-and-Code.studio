"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const SERVICES = [
  { index: "01", label: "Websites" },
  { index: "02", label: "Business Tools", technical: true },
  { index: "03", label: "Short-Form" },
];

/* Stage geometry (viewBox 0 0 600 400, stretched over the whole stage):
   cards sit in the top row; connectors start under them (y=75) and
   converge at (300, 190), just above the stage center where the studio
   box blooms in — so the line ends tuck behind the box. */
const PATHS = [
  "M100 75 C100 140 300 120 300 190",
  "M300 75 C300 130 300 130 300 190",
  "M500 75 C500 130 300 120 300 190",
];

/* One 4s clock, started when the stage enters view:
   0.0–0.7  cards pop in (staggered)
   0.7–1.5  connector lines draw down to the box position
   1.5–2.1  the full diagram holds on screen
   2.1–2.9  cards shrink and slide to the center, fading out,
            while the lines un-draw back into the box
   2.9–4.0  studio box blooms in at the stage center, glow last

   Everything is driven by module-scope variants so re-renders can
   never restart a child animation mid-flight. */
const T = 4.0;
const t = (s: number) => s / T;
const EASE = [0.22, 1, 0.36, 1] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, x: "0%", y: "0%" },
  play: (i: number) => ({
    opacity: [0, 1, 1, 0],
    scale: [0.85, 1, 1, 0.4],
    x: ["0%", "0%", `${(1 - i) * 112}%`],
    y: ["0%", "0%", "150%"],
    transition: {
      opacity: {
        duration: T,
        times: [t(0.12 * i), t(0.45 + 0.12 * i), t(2.3), t(2.9)],
        ease: "easeInOut",
      },
      scale: {
        duration: T,
        times: [t(0.12 * i), t(0.45 + 0.12 * i), t(2.1), t(2.85)],
        ease: "easeInOut",
      },
      x: { duration: T, times: [0, t(2.1), t(2.85)], ease: "easeInOut" },
      y: { duration: T, times: [0, t(2.1), t(2.85)], ease: "easeInOut" },
    },
  }),
};

/* Draw card → box, hold, then un-draw back into the box: the segment
   start (pathOffset) chases the end, which stays pinned at the box. */
const lineVariants: Variants = {
  hidden: { pathLength: 0, pathOffset: 0, opacity: 0 },
  play: (i: number) => ({
    pathLength: [0, 0, 1, 1, 0],
    pathOffset: [0, 0, 0, 0, 1],
    opacity: [0, 0, 0.6],
    transition: {
      pathLength: {
        duration: T,
        times: [0, t(0.7 + 0.1 * i), t(1.3 + 0.1 * i), t(2.1), t(2.9)],
        ease: "easeInOut",
      },
      pathOffset: {
        duration: T,
        times: [0, t(0.7 + 0.1 * i), t(1.3 + 0.1 * i), t(2.1), t(2.9)],
        ease: "easeInOut",
      },
      opacity: {
        duration: T,
        times: [0, t(0.7 + 0.1 * i), t(0.95 + 0.1 * i)],
        ease: "easeOut",
      },
    },
  }),
};

/* The box animates straight to its final values after a delay — even an
   interrupted animation converges back to fully visible. */
const boxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  play: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { delay: 2.9, duration: 0.6, ease: "easeOut" },
      scale: { delay: 2.9, duration: 0.8, ease: EASE },
    },
  },
};

const glowVariants: Variants = {
  hidden: { opacity: 0 },
  play: {
    opacity: 1,
    transition: { delay: 3.1, duration: 0.9, ease: "easeOut" },
  },
};

function ServiceCardBody({ i }: { i: number }) {
  const s = SERVICES[i];
  return (
    <>
      <span className="font-display text-sm font-semibold text-gold">{s.index}</span>
      <p className={`micro mt-2.5 ${s.technical ? "text-blue" : "text-ivory/80"}`}>
        {s.label}
      </p>
    </>
  );
}

function StudioBoxBody() {
  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <span className="block h-2 w-2 rotate-45 bg-gold" />
        <span className="font-display text-lg font-semibold tracking-[0.18em] text-ivory sm:text-xl">
          SLATE <span className="text-gold">&</span> CODE
        </span>
      </div>
      <p className="micro mt-2.5 text-fog">Studio</p>
    </>
  );
}

const CARD_CLASS =
  "rounded-lg border border-line bg-surface px-3 py-5 text-center shadow-[0_12px_24px_rgba(0,0,0,0.35),0_32px_70px_rgba(0,0,0,0.3)] sm:px-4 sm:py-6";
const BOX_CLASS =
  "relative rounded-lg border border-gold/40 bg-surface px-8 py-6 text-center shadow-[0_12px_28px_rgba(0,0,0,0.45),0_36px_80px_rgba(0,0,0,0.4),0_0_46px_rgba(214,168,90,0.1)] sm:px-12 sm:py-8";

/* Static fallback: the full diagram, mid-convergence */
function StaticScene() {
  return (
    <div className="relative mx-auto mt-12 h-[400px] w-full max-w-3xl sm:h-[440px]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        {PATHS.map((d) => (
          <path
            key={d}
            d={d}
            stroke="#D6A85A"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            fill="none"
          />
        ))}
      </svg>
      <div className="absolute inset-x-0 top-0 grid grid-cols-3 gap-4 sm:gap-6">
        {SERVICES.map((s, i) => (
          <div key={s.index} className={CARD_CLASS}>
            <ServiceCardBody i={i} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={BOX_CLASS}>
          <StudioBoxBody />
        </div>
      </div>
    </div>
  );
}

/**
 * Convergence scene: the three services pop in, gold connectors draw
 * down to the studio mark's spot, the diagram holds for a beat, then the
 * cards dissolve inward while the lines un-draw back into the box — and
 * the studio mark blooms in at the center. Plays once on scroll-into-view.
 */
export default function Convergence() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(stageRef, { once: true, margin: "-120px" });
  const play = inView && !reduce;

  return (
    <section id="studio" className="relative border-t border-line bg-pit">
      <div className="grid-faint mask-fade absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="One Studio"
          title={
            <>
              It all comes <em className="serif-accent">together</em>.
            </>
          }
          align="center"
        />

        {reduce ? (
          <StaticScene />
        ) : (
          <motion.div
            ref={stageRef}
            initial="hidden"
            animate={play ? "play" : "hidden"}
            className="relative mx-auto mt-12 h-[400px] w-full max-w-3xl sm:h-[440px]"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 600 400"
              preserveAspectRatio="none"
              aria-hidden
            >
              {PATHS.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  custom={i}
                  variants={lineVariants}
                  stroke="#D6A85A"
                  strokeWidth={1.5}
                  fill="none"
                />
              ))}
            </svg>

            <div className="absolute inset-x-0 top-0 z-10 grid grid-cols-3 gap-4 sm:gap-6">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.index}
                  custom={i}
                  variants={cardVariants}
                  className={CARD_CLASS}
                >
                  <ServiceCardBody i={i} />
                </motion.div>
              ))}
            </div>

            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  variants={glowVariants}
                  aria-hidden
                  className="absolute -inset-10 rounded-full bg-gold/[0.08] blur-[48px]"
                />
                <motion.div variants={boxVariants} className={BOX_CLASS}>
                  <StudioBoxBody />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
