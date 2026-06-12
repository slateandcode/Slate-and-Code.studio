"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

/**
 * Gold dot that trails the pointer and expands into a ring over anything
 * interactive. Mouse-only (pointer: fine), disabled for reduced motion.
 * The native cursor stays visible; this is an accent, not a replacement.
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 900, damping: 60, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 900, damping: 60, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as Element | null;
      setActive(Boolean(t && t instanceof Element && t.closest(INTERACTIVE)));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: active ? 0 : 1, opacity: visible ? 0.9 : 0 }}
          transition={{ duration: 0.2 }}
          className="-ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold"
        />
      </motion.div>
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <motion.div
          animate={{
            scale: active ? 1 : 0.45,
            opacity: visible ? (active ? 1 : 0.4) : 0,
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="-ml-[19px] -mt-[19px] h-[38px] w-[38px] rounded-full border border-gold/70 bg-gold/[0.06]"
        />
      </motion.div>
    </div>
  );
}
