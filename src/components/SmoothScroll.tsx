"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide inertia scrolling. Skipped entirely for users who prefer
 * reduced motion; native scrolling still works everywhere (Lenis smooths
 * the real scroll position, so IntersectionObserver and scroll-driven
 * animations keep working).
 */
export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, anchors: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Start every route at the very top. Lenis owns the scroll position, so
  // Next's default scroll-to-top is immediately overwritten by Lenis's RAF
  // loop unless we reset Lenis itself. (Reduced-motion users have no Lenis
  // instance; Next's native scroll restoration already lands them at the top.)
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
