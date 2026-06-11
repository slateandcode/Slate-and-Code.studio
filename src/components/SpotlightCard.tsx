"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Accent of the cursor-tracked glow */
  color?: "gold" | "blue";
};

/**
 * Wraps a card with a radial highlight that follows the cursor.
 * Pure CSS painting (see .spotlight in globals.css) — JS only feeds
 * the cursor position into custom properties, so it stays cheap.
 */
export default function SpotlightCard({
  children,
  className = "",
  color = "gold",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      }}
      className={`spotlight ${className}`}
      style={
        {
          "--spot-rgb": color === "blue" ? "77, 163, 255" : "214, 168, 90",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
