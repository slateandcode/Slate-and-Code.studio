"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /**
   * Accent of the cursor-tracked glow. Either a named preset or a raw
   * "r, g, b" triplet (e.g. "52, 186, 178") for a per-card color.
   */
  color?: "gold" | "blue" | (string & {});
};

const PRESET_RGB: Record<string, string> = {
  gold: "214, 168, 90",
  blue: "77, 163, 255",
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
  const rgb = PRESET_RGB[color] ?? color;

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
      style={{ "--spot-rgb": rgb } as CSSProperties}
    >
      {children}
    </div>
  );
}
