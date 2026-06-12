"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// One mount timeline: every element takes its delay via `custom`, so the
// window assembles → code "types" down the editor → the preview builds
// itself → the status bar fills and flips to Live. ~2.3s total.
const rise: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: d, ease: EASE },
  }),
};
const pop: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  show: (d: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: d, ease: EASE },
  }),
};
const fill: Variants = {
  hidden: { scaleX: 0 },
  show: (d: number) => ({
    scaleX: 1,
    transition: { duration: 0.9, delay: d, ease: EASE },
  }),
};

// Editor token bars — blue keywords, ivory plain, gold strings
const CODE_LINES: { indent: string; tokens: string[] }[] = [
  { indent: "", tokens: ["w-6 bg-blue/40", "w-10 bg-ivory/20"] },
  { indent: "pl-3", tokens: ["w-8 bg-ivory/20", "w-12 bg-gold/50"] },
  { indent: "pl-3", tokens: ["w-5 bg-blue/40", "w-7 bg-ivory/20", "w-6 bg-ivory/20"] },
  { indent: "pl-6", tokens: ["w-9 bg-ivory/20", "w-8 bg-gold/50"] },
  { indent: "pl-3", tokens: ["w-7 bg-blue/40", "w-11 bg-ivory/20"] },
  { indent: "", tokens: ["w-4 bg-ivory/20"] },
];

export default function BuildMockup() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      animate="show"
      aria-hidden
      className="relative w-full select-none"
    >
      {/* Soft glow behind the window */}
      <div className="absolute left-1/2 top-1/2 h-[320px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[110px]" />

      {/* Window frame */}
      <motion.div
        variants={rise}
        custom={0.15}
        className="relative overflow-hidden rounded-lg border border-edge bg-surface shadow-[0_12px_24px_rgba(0,0,0,0.4),0_38px_80px_rgba(0,0,0,0.45)]"
      >
        {/* Chrome bar */}
        <motion.div
          variants={rise}
          custom={0.3}
          className="flex items-center gap-2 border-b border-line bg-raised px-3.5 py-2.5"
        >
          <span className="h-2 w-2 rounded-full bg-[#2e2e2e]" />
          <span className="h-2 w-2 rounded-full bg-[#2e2e2e]" />
          <span className="h-2 w-2 rounded-full bg-[#2e2e2e]" />
          <div className="ml-3 flex h-5 items-center rounded bg-well px-2.5">
            <span className="text-[8px] tracking-wider text-fog/70">
              slate-and-code / build
            </span>
          </div>
        </motion.div>

        {/* Body: editor pane building the live preview pane */}
        <div className="grid grid-cols-[0.9fr_1.1fr] divide-x divide-line">
          {/* Editor */}
          <div className="flex gap-3 bg-well p-3.5 sm:p-4">
            <motion.div variants={rise} custom={0.4} className="flex w-5 flex-col gap-1.5">
              <span className="h-1 w-full rounded-sm bg-blue/40" />
              <span className="h-1 w-full rounded-sm bg-ivory/10" />
              <span className="h-1 w-3/4 rounded-sm bg-ivory/10" />
              <span className="h-1 w-full rounded-sm bg-ivory/10" />
            </motion.div>
            <div className="flex-1 space-y-2.5 pt-0.5">
              {CODE_LINES.map((line, i) => (
                <motion.div
                  key={i}
                  variants={rise}
                  custom={0.45 + i * 0.07}
                  className={`flex items-center gap-1.5 ${line.indent}`}
                >
                  <span className="h-1 w-2 shrink-0 rounded-sm bg-ivory/15" />
                  {line.tokens.map((t, j) => (
                    <span key={j} className={`h-1.5 rounded-sm ${t}`} />
                  ))}
                  {i === CODE_LINES.length - 1 && (
                    <span className="caret-blink h-2 w-1 rounded-[1px] bg-gold/80" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Live preview assembling */}
          <div className="p-3.5 sm:p-4">
            <motion.div variants={rise} custom={0.85} className="flex items-center justify-between">
              <span className="h-1.5 w-8 rounded-sm bg-ivory/25" />
              <span className="flex gap-2">
                <span className="h-1 w-5 rounded-sm bg-ivory/10" />
                <span className="h-1 w-5 rounded-sm bg-ivory/10" />
                <span className="h-1 w-5 rounded-sm bg-gold/50" />
              </span>
            </motion.div>
            <div className="mt-4 space-y-2">
              <motion.div variants={rise} custom={0.95} className="h-2.5 w-[85%] rounded-sm bg-ivory/30" />
              <motion.div variants={rise} custom={1.02} className="h-2.5 w-[55%] rounded-sm bg-ivory/30" />
            </div>
            <motion.div variants={pop} custom={1.1} className="mt-3.5 inline-flex h-5 items-center rounded bg-gold px-2">
              <span className="text-[6px] font-bold uppercase tracking-[0.16em] text-pit">
                Launch
              </span>
            </motion.div>
            <div className="mt-3.5 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  variants={rise}
                  custom={1.2 + i * 0.06}
                  className="rounded border border-line bg-well p-2"
                >
                  <span className="block h-1 w-5 rounded-sm bg-gold/40" />
                  <span className="mt-1.5 block h-1 w-full rounded-sm bg-ivory/10" />
                  <span className="mt-1 block h-1 w-2/3 rounded-sm bg-ivory/10" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Status bar: build progress → Live */}
        <motion.div
          variants={rise}
          custom={1.4}
          className="flex items-center justify-between border-t border-line bg-raised px-3.5 py-1.5"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-fog">
              Build
            </span>
            <span className="h-1 w-24 overflow-hidden rounded-full bg-ivory/10">
              <motion.span
                variants={fill}
                custom={1.5}
                className="block h-full origin-left rounded-full bg-gold"
              />
            </span>
          </div>
          <motion.span variants={pop} custom={2.0} className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_rgba(214,168,90,0.7)]" />
            <span className="text-[7px] font-semibold uppercase tracking-[0.2em] text-gold">
              Live
            </span>
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Floating badge overhanging the corner — lands last */}
      <motion.div
        variants={pop}
        custom={2.15}
        className="absolute -right-2 -top-3 rounded border border-gold/40 bg-pit px-2 py-1 shadow-[0_0_18px_rgba(214,168,90,0.18)]"
      >
        <span className="text-[7px] font-semibold uppercase tracking-[0.2em] text-gold">
          Launched
        </span>
      </motion.div>
    </motion.div>
  );
}
