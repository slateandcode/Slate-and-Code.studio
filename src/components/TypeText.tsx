"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts once in view */
  startDelay?: number;
  className?: string;
};

/**
 * Types `text` character by character once scrolled into view, with a
 * blinking gold caret. An invisible ghost copy reserves the final size so
 * the layout never shifts while typing.
 */
export default function TypeText({
  text,
  speed = 70,
  startDelay = 350,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(text.length);
      return;
    }
    // Deriving the text from `count` keeps typing idempotent under
    // StrictMode's dev double-mount.
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            if (interval) clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduce, text, speed, startDelay]);

  return (
    <span
      ref={ref}
      aria-label={text}
      className={`relative inline-block ${className}`}
    >
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0">
        {text.slice(0, count)}
        <span className="caret-blink ml-1 inline-block h-[1.05em] w-[2px] translate-y-[0.18em] bg-gold" />
      </span>
    </span>
  );
}
