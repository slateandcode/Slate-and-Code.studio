"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Soft fade + rise on every route change. Nav and Footer stay put. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
