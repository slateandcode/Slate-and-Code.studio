"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

type Pillar = {
  index: string;
  tag: string;
  title: string;
  copy: string;
  points: string[];
  technical?: boolean;
  visual: React.ReactNode;
};

/* ——— Miniature visuals per pillar (pure CSS/SVG) ——— */

function MiniSite() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-well">
      <div className="flex items-center gap-1.5 border-b border-line bg-raised px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2e2e2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#2e2e2e]" />
        <div className="ml-2 h-3 flex-1 rounded-sm bg-well" />
      </div>
      <div className="flex-1 p-3.5">
        <div className="h-2.5 w-3/4 rounded-sm bg-ivory/30" />
        <div className="mt-1.5 h-2.5 w-1/2 rounded-sm bg-ivory/30" />
        <div className="mt-2.5 h-1 w-2/3 rounded-sm bg-ivory/10" />
        <div className="mt-3 flex h-5 w-fit items-center rounded bg-gold px-2">
          <span className="text-[6.5px] font-bold uppercase tracking-[0.16em] text-pit">
            Enquire
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-8 rounded-sm border border-line bg-surface" />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniDashboard() {
  return (
    <div className="flex h-full overflow-hidden rounded-md border border-line bg-well shadow-[0_0_28px_rgba(77,163,255,0.07)]">
      <div className="flex w-7 flex-col items-center gap-2 border-r border-line bg-surface py-2.5">
        <div className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-blue/70" />
        <div className="mt-1.5 h-1 w-3.5 rounded-sm bg-ivory/25" />
        <div className="h-1 w-3.5 rounded-sm bg-ivory/10" />
        <div className="h-1 w-3.5 rounded-sm bg-ivory/10" />
      </div>
      <div className="flex-1 p-3">
        <div className="grid grid-cols-3 gap-1.5">
          {["214", "09", "188"].map((v, i) => (
            <div key={i} className="rounded-sm border border-line bg-surface px-1.5 py-1">
              <div className="h-0.5 w-4 rounded-sm bg-fog/40" />
              <p className="mt-0.5 font-display text-[10px] font-semibold text-ivory">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex h-12 items-end gap-1 rounded-sm border border-line bg-surface p-1.5">
          {[40, 70, 52, 86, 60, 94, 72].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-sm ${i === 5 ? "bg-blue/80" : "bg-blue/25"}`}
            />
          ))}
        </div>
        <div className="mt-2 space-y-1">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-sm border border-line bg-surface px-1.5 py-1">
              <span className="h-1 w-1 rounded-full bg-blue/60" />
              <div className="h-0.5 flex-1 rounded-sm bg-ivory/10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniReel() {
  return (
    <div className="flex h-full items-stretch gap-2.5">
      <div className="relative w-[44%] overflow-hidden rounded-md border border-line bg-pit">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_45%_35%,rgba(214,168,90,0.14),transparent_60%)]" />
        <div className="absolute left-1/2 top-[40%] flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-pit/60">
          <svg viewBox="0 0 10 12" className="ml-0.5 h-2.5 w-2">
            <path d="M0 0l10 6-10 6z" fill="#F4F1EA" fillOpacity="0.85" />
          </svg>
        </div>
        <div className="absolute inset-x-2 bottom-5 space-y-1">
          <div className="h-1 w-3/4 rounded-sm bg-ivory/30" />
          <div className="h-1 w-1/2 rounded-sm bg-gold/50" />
        </div>
        <div className="absolute inset-x-2 bottom-2 h-0.5 rounded-full bg-ivory/10">
          <div className="h-full w-3/5 rounded-full bg-gold" />
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1.5">
        {[
          { w: "100%", seg: [3, 6, 4], label: "V1" },
          { w: "92%", seg: [5, 3, 7], label: "V2" },
          { w: "96%", seg: [4, 8, 3], label: "SFX" },
        ].map((t) => (
          <div key={t.label} className="flex items-center gap-1.5" style={{ width: t.w }}>
            <span className="w-5 text-[6px] uppercase tracking-[0.14em] text-fog">{t.label}</span>
            <div className="flex h-3.5 flex-1 gap-0.5 rounded-sm border border-line bg-well p-0.5">
              {t.seg.map((s, i) => (
                <div
                  key={i}
                  style={{ flexGrow: s }}
                  className={`rounded-[2px] ${
                    t.label === "SFX" ? "bg-gold/40" : "bg-ivory/15"
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
        <div className="mt-1 flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span className="text-[6.5px] uppercase tracking-[0.2em] text-fog">
            Cut — 00:27
          </span>
        </div>
      </div>
    </div>
  );
}

const PILLARS: Pillar[] = [
  {
    index: "01",
    tag: "Websites",
    title: "Websites that look premium and convert.",
    copy: "Premium landing pages, business websites, redesigns, and full-stack web experiences built for clarity, trust, and conversion.",
    points: ["Landing pages", "Business sites", "Redesigns", "Full-stack builds"],
    visual: <MiniSite />,
  },
  {
    index: "02",
    tag: "Business Tools",
    title: "Internal tools that clean up operations.",
    copy: "Custom dashboards, report systems, CRMs, stock trackers, and internal tools that make operations cleaner and faster.",
    points: ["Dashboards", "Report systems", "CRMs", "Stock trackers"],
    technical: true,
    visual: <MiniDashboard />,
  },
  {
    index: "03",
    tag: "Short-Form Content",
    title: "Reels edited with structure and rhythm.",
    copy: "Reels and shorts edited with structure, pacing, captions, music, SFX, and a polished finish.",
    points: ["Pacing", "Captions", "Music + SFX", "Final polish"],
    visual: <MiniReel />,
  },
];

/* ——— Stacked card: pops into focus near viewport center, fades + blurs away from it ——— */

function StackCard({ pillar }: { pillar: Pillar }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // 0 → card top enters at viewport bottom, 1 → card bottom leaves at top;
  // ~0.5 means the card sits around the middle of the screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.94, 1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.38, 1, 1, 0.38]);
  const blur = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [4, 0, 0, 4]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      ref={ref}
      style={reduce ? undefined : { scale, opacity, filter }}
      className="overflow-hidden rounded-lg border border-edge bg-surface shadow-[0_16px_32px_rgba(0,0,0,0.4),0_45px_90px_rgba(0,0,0,0.35)]"
    >
      <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
        {/* Copy side */}
        <div className="flex flex-col p-7 sm:p-10">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-semibold text-gold">
              {pillar.index}
            </span>
            <span className="h-px w-8 bg-line" />
            <span className={`micro ${pillar.technical ? "text-blue" : "text-fog"}`}>
              {pillar.tag}
            </span>
          </div>
          <h3 className="mt-5 font-display text-2xl font-semibold leading-snug text-ivory sm:text-[1.7rem]">
            {pillar.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-fog sm:text-[15px]">
            {pillar.copy}
          </p>
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {pillar.points.map((pt) => (
              <span
                key={pt}
                className={`rounded border px-2.5 py-1.5 text-[11px] tracking-wide ${
                  pillar.technical
                    ? "border-blue/25 bg-blue/[0.06] text-blue/90"
                    : "border-line bg-raised text-fog"
                }`}
              >
                {pt}
              </span>
            ))}
          </div>
        </div>
        {/* Visual side */}
        <div
          aria-hidden
          className="hidden border-l border-line bg-pit/60 p-6 md:block"
        >
          <div className="h-full min-h-[260px]">{pillar.visual}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServiceCards3D() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="What We Build"
          title={
            <>
              Three disciplines. <em className="serif-accent">One standard.</em>
            </>
          }
        />

        <div className="mx-auto mt-14 max-w-4xl space-y-10">
          {PILLARS.map((p) => (
            <StackCard key={p.index} pillar={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
