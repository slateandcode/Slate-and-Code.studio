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
  const [pct, setPct] = useState(50);
  const [interacted, setInteracted] = useState(false);
  const interactedRef = useRef(false);
  const hintRef = useRef<AnimationPlaybackControls | null>(null);

  // One-time hint: divider eases left and back so it reads as draggable
  useEffect(() => {
    if (!inView || reduce || interactedRef.current) return;
    const controls = animate(50, 33, {
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
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className="relative h-full cursor-ew-resize overflow-hidden bg-well [touch-action:pan-y]"
    >
      {/* After — refined layer underneath. Flex column so it fills the frame
          at any aspect ratio (tall card on mobile, wide split on desktop). */}
      <div className="absolute inset-0 flex flex-col p-4">
        {/* nav */}
        <div className="flex shrink-0 items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rotate-45 bg-gold/70" />
            <span className="h-1.5 w-9 rounded-sm bg-ivory/30" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-5 rounded-sm bg-ivory/15" />
            <span className="h-1 w-5 rounded-sm bg-ivory/15" />
            <span className="h-3 w-8 rounded-sm bg-gold/70" />
          </div>
        </div>

        {/* hero — centered in the leftover space so it fills tall and wide */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="h-2.5 w-[60%] rounded-sm bg-ivory/35" />
          <div className="mt-1.5 h-2.5 w-[38%] rounded-sm bg-ivory/35" />
          <div className="mt-2 h-1.5 w-[48%] rounded-sm bg-ivory/12" />
        </div>

        {/* feature row */}
        <div className="grid shrink-0 grid-cols-3 gap-1.5 pb-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-sm border border-line bg-surface p-1.5">
              <div className="h-0.5 w-4 rounded-sm bg-gold/50" />
              <div className="mt-1 h-0.5 w-full rounded-sm bg-ivory/12" />
              <div className="mt-1 h-0.5 w-2/3 rounded-sm bg-ivory/10" />
            </div>
          ))}
        </div>

        <p className="pointer-events-none absolute bottom-2.5 right-4 text-[6px] uppercase tracking-[0.2em] text-fog">
          After
        </p>
      </div>

      {/* Before — washed-out original, clipped to the left of the divider.
          Same skeleton as "after" but duller and cruder so the wipe reads
          as a genuine redesign. */}
      <div
        className="absolute inset-0 flex flex-col bg-[#181715] p-4"
        style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
      >
        <div className="flex shrink-0 items-center justify-between opacity-55">
          <div className="h-1.5 w-12 rounded-sm bg-[#5a554c]" />
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-5 rounded-sm bg-[#3f3b35]" />
            <span className="h-1 w-5 rounded-sm bg-[#3f3b35]" />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center opacity-55">
          <div className="h-2.5 w-[78%] rounded-sm bg-[#4a463f]" />
          <div className="mt-1.5 h-2.5 w-[66%] rounded-sm bg-[#4a463f]" />
          <div className="mt-2 h-1.5 w-[70%] rounded-sm bg-[#3a362f]" />
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-1.5 pb-3 opacity-55">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-7 rounded-sm bg-[#23211d]" />
          ))}
        </div>

        <p className="pointer-events-none absolute bottom-2.5 left-4 text-[6px] uppercase tracking-[0.2em] text-[#5a554c]">
          Before
        </p>
      </div>

      {/* Divider + handle — a 24px-wide rail centered on the split via a
          negative margin (universal), holding a full-height gold line and the
          circular node. Both the line and the node are centered with
          auto-margins, NOT the CSS `translate` property, so the line always
          runs dead-centre through the node in every browser. */}
      <div
        className="absolute inset-y-0 z-10 w-6"
        style={{ left: `${pct}%`, marginLeft: "-12px" }}
      >
        {/* Full-height gold line */}
        <span className="pointer-events-none absolute inset-x-0 inset-y-0 mx-auto w-0.5 bg-gold/80 shadow-[0_0_12px_rgba(214,168,90,0.45)]" />

        {/* Circular node, centered on the line by auto-margins */}
        <div
          data-handle
          className="absolute inset-0 m-auto flex h-6 w-6 items-center justify-center rounded-full border border-gold/70 bg-pit shadow-[0_2px_10px_rgba(0,0,0,0.55)] [touch-action:none]"
        >
          {/* Line redrawn through the node so the chevron sits within it */}
          <span className="pointer-events-none absolute inset-x-0 inset-y-0 mx-auto w-0.5 bg-gold/80" />
          <svg viewBox="0 0 10 8" className="relative h-2 w-2.5">
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
