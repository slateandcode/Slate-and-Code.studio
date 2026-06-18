"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Fades its children in as the block scrolls up into view — a slow,
 * scroll-linked opacity (tied to scroll position, not a one-shot trigger) so a
 * section emerges gradually from black and cross-dissolves with whatever is
 * fading out above it. Reverses on scroll-up; static under reduced motion.
 */
export default function ScrollFade({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
