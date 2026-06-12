"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide inertia scrolling. Skipped entirely for users who prefer
 * reduced motion; native scrolling still works everywhere (Lenis smooths
 * the real scroll position, so IntersectionObserver and scroll-driven
 * animations keep working).
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, anchors: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
