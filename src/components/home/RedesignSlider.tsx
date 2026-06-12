"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControls,
} from "framer-motion";

/**
 * Interactive before/after frame for the redesign card. The washed-out
 * "before" layer sits on top, clipped at the divider; dragging the gold
 * handle sweeps between the two. A one-time nudge animation hints that
 * it can be dragged.
 */
export default function RedesignSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(55);
  const [interacted, setInteracted] = useState(false);
  const interactedRef = useRef(false);
  const hintRef = useRef<AnimationPlaybackControls | null>(null);

  // One-time hint: divider eases left and back so it reads as draggable
  useEffect(() => {
    if (!inView || reduce || interactedRef.current) return;
    const controls = animate(55, 38, {
      duration: 0.9,
      delay: 0.7,
      ease: [0.22, 1, 0.36, 1],
      repeat: 1,
      repeatType: "reverse",
      onUpdate: (v) => {
        if (!interactedRef.current) setPct(v);
      },
    });
    hintRef.current = controls;
    return () => controls.stop();
  }, [inView, reduce]);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPct(Math.min(88, Math.max(12, ((clientX - r.left) / r.width) * 100)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    // On touch, only the handle drags so the page can still scroll
    if (e.pointerType === "touch") {
      const t = e.target as Element;
      if (!t.closest("[data-handle]")) return;
    }
    interactedRef.current = true;
    setInteracted(true);
    hintRef.current?.stop();
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1 || !interactedRef.current) return;
    setFromClientX(e.clientX);
  };

  return (
    <div
      ref={ref}
      data-cursor
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className="relative h-full cursor-ew-resize overflow-hidden bg-well [touch-action:pan-y]"
    >
      {/* After — full layer underneath */}
      <div className="absolute inset-0 p-4">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-10 rounded-sm bg-ivory/30" />
          <div className="h-3 w-8 rounded-sm bg-gold/70" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-2 w-[80%] rounded-sm bg-ivory/30" />
          <div className="h-2 w-[52%] rounded-sm bg-ivory/30" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-sm border border-line bg-surface p-1.5">
              <div className="h-0.5 w-4 rounded-sm bg-gold/50" />
              <div className="mt-1 h-0.5 w-full rounded-sm bg-ivory/10" />
            </div>
          ))}
        </div>
        <p className="absolute bottom-3 right-4 text-[6px] uppercase tracking-[0.2em] text-fog">
          After
        </p>
      </div>

      {/* Before — clipped to the left of the divider */}
      <div
        className="absolute inset-0 bg-[#181715] p-4"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <div className="opacity-55">
          <div className="h-1.5 w-10 rounded-sm bg-[#5a554c]" />
          <div className="mt-3 space-y-1.5">
            <div className="h-2 w-[85%] rounded-sm bg-[#4a463f]" />
            <div className="h-2 w-[60%] rounded-sm bg-[#4a463f]" />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-8 rounded-sm bg-[#23211d]" />
            ))}
          </div>
        </div>
        <p className="absolute bottom-3 left-4 text-[6px] uppercase tracking-[0.2em] text-[#5a554c]">
          Before
        </p>
      </div>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-gold/70 shadow-[0_0_12px_rgba(214,168,90,0.45)]"
        style={{ left: `${pct}%` }}
      >
        <div
          data-handle
          className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/60 bg-pit shadow-[0_2px_10px_rgba(0,0,0,0.5)] [touch-action:none]"
        >
          <svg viewBox="0 0 10 8" className="h-2 w-2.5">
            <path
              d="M3 0L0 4l3 4M7 0l3 4-3 4"
              stroke="#D6A85A"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Drag hint — fades out after first interaction */}
      <div
        className={`pointer-events-none absolute left-1/2 top-2.5 z-10 -translate-x-1/2 rounded border border-line bg-pit/85 px-2 py-1 transition-opacity duration-500 ${
          interacted ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="text-[6.5px] font-semibold uppercase tracking-[0.2em] text-gold">
          Drag to compare
        </span>
      </div>
    </div>
  );
}
