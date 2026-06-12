"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const BRIEF = "Expand and level up my business";
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A client request typing itself into a brief box, then a gold thread
 * drawing downward into the skills that answer it.
 */
export default function ClientBrief() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const done = count >= BRIEF.length;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(BRIEF.length);
      return;
    }
    // Deriving the text from `count` keeps typing idempotent under
    // StrictMode's dev double-mount.
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= BRIEF.length) {
            if (interval) clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, 70);
    }, 350);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduce]);

  return (
    <div ref={ref} className="mx-auto max-w-2xl">
      <div
        className={`rounded-lg border bg-well p-6 transition-[border-color,box-shadow] duration-700 sm:p-7 ${
          done
            ? "border-gold/40 shadow-[0_0_30px_rgba(214,168,90,0.08)]"
            : "border-line"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="micro text-gold">Client brief</p>
          <p className="micro text-fog">Incoming</p>
        </div>
        <p
          aria-label={BRIEF}
          className="mt-4 min-h-[2.4em] font-display text-xl font-semibold leading-snug text-ivory sm:text-2xl"
        >
          <span aria-hidden>
            &ldquo;{BRIEF.slice(0, count)}
            {done && <>&rdquo;</>}
            <span className="caret-blink ml-1 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-gold" />
          </span>
        </p>
      </div>

      {/* Downward cue into the skills */}
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="micro text-fog"
        >
          Here&apos;s everything it takes
        </motion.p>
        <motion.span
          aria-hidden
          initial={reduce ? false : { scaleY: 0 }}
          animate={done ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="h-12 w-px origin-top bg-gradient-to-b from-gold/60 to-transparent"
        />
      </div>
    </div>
  );
}
