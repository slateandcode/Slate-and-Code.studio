"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/** Count-up figure for the dashboard stat tiles. */
function Counter({
  to,
  pad = 0,
  delay = 0,
}: {
  to: number;
  pad?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const final = String(to).padStart(pad, "0");

  useEffect(() => {
    if (!inView || reduce || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) {
          ref.current.textContent = String(Math.round(v)).padStart(pad, "0");
        }
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, pad, delay]);

  return <span ref={ref}>{reduce ? final : String(0).padStart(pad, "0")}</span>;
}

/**
 * Layered, hand-built interface previews: a website frame, a reporting
 * dashboard, and a vertical reel frame. Pure CSS/SVG — no stock imagery.
 * The whole stage tilts toward the cursor; layers sit at different depths.
 */
export default function HeroVisual() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 22, mass: 0.6 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 22, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 7);
    rx.set(py * -7);
  };

  const onMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const float = (duration: number, distance: number) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
          },
        };

  return (
    <div
      ref={stageRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative h-[400px] w-full select-none [perspective:1200px] sm:h-[480px] lg:h-[560px]"
      aria-hidden
    >
      {/* Backdrop grid + glow */}
      <div className="grid-faint mask-fade absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[110px]" />

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute inset-0"
      >
        {/* ——— Website frame (back layer) ——— */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          style={{ transform: "translateZ(0px)" }}
          className="absolute left-0 top-[6%] w-[76%] overflow-hidden rounded-lg border border-edge bg-surface shadow-[0_12px_24px_rgba(0,0,0,0.35),0_40px_90px_rgba(0,0,0,0.45)]"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-line bg-raised px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-[#2e2e2e]" />
            <span className="h-2 w-2 rounded-full bg-[#2e2e2e]" />
            <span className="h-2 w-2 rounded-full bg-[#2e2e2e]" />
            <div className="ml-3 flex h-5 flex-1 items-center rounded bg-well px-2.5">
              <span className="text-[8px] tracking-wider text-fog/70">client-site.live</span>
            </div>
          </div>
          {/* Site body */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="h-2 w-12 rounded-sm bg-ivory/25" />
              <div className="flex gap-3">
                <div className="h-1.5 w-8 rounded-sm bg-ivory/10" />
                <div className="h-1.5 w-8 rounded-sm bg-ivory/10" />
                <div className="h-1.5 w-8 rounded-sm bg-gold/50" />
              </div>
            </div>
            <div className="mt-7 space-y-2.5">
              <div className="h-3.5 w-[82%] rounded-sm bg-ivory/30" />
              <div className="h-3.5 w-[58%] rounded-sm bg-ivory/30" />
              <div className="mt-4 h-1.5 w-[68%] rounded-sm bg-ivory/10" />
              <div className="h-1.5 w-[44%] rounded-sm bg-ivory/10" />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-6 items-center rounded bg-gold px-2.5">
                <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-pit">
                  Start a project
                </span>
              </div>
              <div className="flex h-6 items-center rounded border border-edge px-2.5">
                <span className="text-[7px] uppercase tracking-[0.18em] text-fog">View work</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded border border-line bg-well p-2.5">
                  <div className="h-1 w-6 rounded-sm bg-gold/40" />
                  <div className="mt-2 h-1 w-full rounded-sm bg-ivory/10" />
                  <div className="mt-1 h-1 w-2/3 rounded-sm bg-ivory/10" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-3 top-12 rounded border border-line bg-pit/80 px-2 py-1">
            <span className="text-[7px] font-semibold uppercase tracking-[0.2em] text-gold">
              Website
            </span>
          </div>
        </motion.div>

        {/* ——— Dashboard card (right, floating) ——— */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          style={{ transform: "translateZ(45px)" }}
          className="absolute right-0 top-[24%] w-[52%]"
        >
          <motion.div
            {...float(9, 7)}
            className="overflow-hidden rounded-lg border border-edge bg-surface shadow-[0_12px_24px_rgba(0,0,0,0.4),0_38px_80px_rgba(0,0,0,0.45),0_0_36px_rgba(77,163,255,0.07)]"
          >
            <div className="flex items-center justify-between border-b border-line bg-raised px-4 py-2.5">
              <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-ivory/70">
                Reports
              </span>
              <span className="rounded border border-blue/30 bg-blue/10 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-blue">
                Internal tool
              </span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Reports", value: 128, pad: 0, delay: 0.6 },
                  { label: "Clients", value: 37, pad: 0, delay: 0.75 },
                  { label: "Queue", value: 4, pad: 2, delay: 0.9 },
                ].map((s) => (
                  <div key={s.label} className="rounded border border-line bg-well px-2 py-2">
                    <p className="text-[6.5px] uppercase tracking-[0.18em] text-fog">{s.label}</p>
                    <p className="mt-1 font-display text-[13px] font-semibold text-ivory">
                      <Counter to={s.value} pad={s.pad} delay={s.delay} />
                    </p>
                  </div>
                ))}
              </div>
              {/* Bar chart — bars grow in, staggered */}
              <div className="mt-3 flex h-16 items-end gap-1.5 rounded border border-line bg-well p-2.5">
                {[34, 52, 40, 68, 48, 80, 58, 90, 64, 74, 96, 70].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.7 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ height: `${h}%` }}
                    className={`flex-1 origin-bottom rounded-sm ${
                      i === 10 ? "bg-blue/80 shadow-[0_0_10px_rgba(77,163,255,0.5)]" : "bg-blue/25"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-3 space-y-1.5">
                {[1, 2].map((r) => (
                  <div key={r} className="flex items-center gap-2 rounded border border-line bg-well px-2 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue/60" />
                    <div className="h-1 flex-1 rounded-sm bg-ivory/10" />
                    <div className="h-1 w-8 rounded-sm bg-ivory/15" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ——— Reel frame (bottom left, floating) ——— */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          style={{ transform: "translateZ(70px)" }}
          className="absolute bottom-0 left-[8%] w-[30%] max-w-[170px]"
        >
          <motion.div
            {...float(11, 6)}
            className="overflow-hidden rounded-lg border border-edge bg-surface shadow-[0_12px_24px_rgba(0,0,0,0.4),0_38px_80px_rgba(0,0,0,0.45)]"
          >
            {/* 9:16 frame */}
            <div className="relative aspect-[9/14] bg-pit">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_42%_36%,rgba(214,168,90,0.13),transparent_62%)]" />
              {/* Play control */}
              <div className="absolute left-1/2 top-[38%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-pit/60">
                <svg viewBox="0 0 10 12" className="ml-0.5 h-3 w-2.5">
                  <path d="M0 0l10 6-10 6z" fill="#F4F1EA" fillOpacity="0.85" />
                </svg>
              </div>
              {/* Caption bars */}
              <div className="absolute inset-x-3 bottom-8 space-y-1.5">
                <div className="h-1.5 w-3/4 rounded-sm bg-ivory/30" />
                <div className="h-1.5 w-1/2 rounded-sm bg-gold/50" />
              </div>
              {/* Progress */}
              <div className="absolute inset-x-3 bottom-3 h-0.5 rounded-full bg-ivory/10">
                <motion.div
                  initial={reduce ? false : { width: "8%" }}
                  animate={{ width: "62%" }}
                  transition={{ duration: 2.2, delay: 0.9, ease: "easeInOut" }}
                  className="h-full rounded-full bg-gold"
                />
              </div>
              <div className="absolute left-2.5 top-2.5 rounded border border-line bg-pit/80 px-1.5 py-0.5">
                <span className="text-[6.5px] font-semibold uppercase tracking-[0.2em] text-gold">
                  Reel
                </span>
              </div>
            </div>
            {/* Timeline strip */}
            <div className="flex gap-1 border-t border-line bg-raised p-2">
              {[5, 8, 4, 10, 6].map((w, i) => (
                <div
                  key={i}
                  style={{ flexGrow: w }}
                  className={`h-2.5 rounded-sm ${i === 2 ? "bg-gold/60" : "bg-ivory/10"}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
