"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { EASE_HOUSE } from "@/lib/anim";
import { WORKS, type Work } from "@/lib/work";
import { WordsReveal } from "./reveal";

/* ---------------------------------------------------------------------------
   The hero, off the Figma frame "Desktop - 9" (2564 x 1683).

   A wheel of project cards turning slowly across the top, and the wordmark
   centred under it. Every x/y below is a raw frame coordinate in --u (see
   .hero-stage in globals.css), so the composition holds at any width.

   The cards ride the rim of one very large wheel whose hub sits far above
   the frame, so the stretch you see is the shallow smile the frame draws:
   high at both edges, dipping toward the middle. The wheel
   never stops on its own; pointing at a card (or tabbing to one) eases it
   to a halt, and a click opens that project's live site.
--------------------------------------------------------------------------- */

const GLYPHS = ["S", "L", "A", "T", "E", " ", "&", " ", "C", "O", "D", "E", "’"];

/*
  Order the glyphs arrive in. Scattered on purpose, so the wordmark assembles
  itself instead of typing out left to right. Hard-coded rather than shuffled
  at runtime: a random order would differ between the server and client render
  and blow up hydration, and it would land differently on every reload.
*/
const ARRIVAL = [6, 0, 9, 3, 11, 1, 8, 4, 12, 2, 10];
const SLOT = new Map(ARRIVAL.map((glyphIndex, slot) => [glyphIndex, slot]));
const STAGGER = 0.072;

const glyph: Variants = {
  hidden: { y: "115%" },
  visible: (slot: number) => ({
    y: "0%",
    transition: { duration: 1.25, delay: 0.35 + slot * STAGGER, ease: [...EASE_HOUSE] },
  }),
};

/* the wheel. Hub and radius are fitted through the frame's cards (left
   edge card at 66,433, lowest point near 1282,690). */
const HUB = { x: 1282, y: -2309 };
const RADIUS = 3000;
const CARD = { w: 420, h: 288 };
/* degrees between neighbouring cards, about 520 frame px along the rim.
   With nine cards a full turn is 90deg, so a card wraps from one end to the
   other at 45deg off the bottom, which sits clear above the frame even on
   an ultrawide screen: nothing ever pops in or out where you can see it. */
const STEP = 10;
/* how far a card leans for each degree it sits off the bottom of the wheel.
   Less than a true tangent, which would tip the outer cards too far. */
const LEAN = 0.5;
/* resting speed, degrees per second: a card crosses the frame in ~45s */
const SPEED = 1.3;

/* the headline projects, in the order they ride the wheel */
const HEADLINERS = [
  "Crescent Car Check",
  "Untold Archives",
  "Hartwell Gardens",
  "1 Wood Floors",
  "Lima's No Limits",
  "Arcus Real Estate",
  "Whitecombe Roofing",
  "Meridian Solutions",
  "Plainwater",
];
const SPOKES = HEADLINERS.flatMap((name) => {
  const work = WORKS.find((w) => w.name === name && w.href);
  return work ? [work] : [];
});
const TURN = SPOKES.length * STEP;

/* frame units to CSS */
const u = (n: number) => `calc(${n} * var(--u))`;

/* a card's place on the rim, from its angle in --a (degrees, 0 = bottom) */
const RIM_TRANSFORM = [
  `translate(`,
  `calc((${HUB.x} + ${RADIUS} * sin(calc(var(--a) * 1deg)) - ${CARD.w / 2}) * var(--u) + var(--ox)),`,
  `calc((${HUB.y} + ${RADIUS} * cos(calc(var(--a) * 1deg)) - ${CARD.h / 2}) * var(--u))`,
  `) rotate(calc(var(--a) * ${-LEAN}deg))`,
].join(" ");

export default function Hero() {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const onScreen = useInView(stage);

  /* the wheel: a resting drift, plus a one-off spin-in on load */
  const drift = useMotionValue(0);
  const spinIn = useMotionValue(reduce ? 0 : -14);
  const angle = useTransform(() => drift.get() + spinIn.get());

  const speedTarget = useMotionValue(SPEED);
  const speed = useSpring(speedTarget, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const c = animate(spinIn, 0, { duration: 2.6, delay: 0.6, ease: [...EASE_HOUSE] });
    return () => c.stop();
  }, [reduce, spinIn]);

  useAnimationFrame((_, delta) => {
    if (reduce || !onScreen) return;
    /* clamp the step so a tab coming back from the background doesn't jump */
    drift.set(drift.get() + (speed.get() * Math.min(delta, 64)) / 1000);
  });

  const hold = (held: boolean) => speedTarget.set(held ? 0 : SPEED);

  /* pointer parallax: -0.5..0.5 across the viewport, eased */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 50, damping: 18, mass: 0.6 });
  const my = useSpring(py, { stiffness: 50, damping: 18, mass: 0.6 });
  const wheelX = useTransform(mx, (v) => v * -26);
  const wheelY = useTransform(my, (v) => v * -16);

  /* scroll: the wheel lifts away as the page moves on */
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start start", "end start"] });
  const wheelLift = useTransform(scrollYProgress, [0, 1], [0, -110]);

  return (
    <section id="home" className="relative">
      <div
        ref={stage}
        className="hero-stage relative overflow-hidden"
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== "mouse") return;
          px.set(e.clientX / window.innerWidth - 0.5);
          py.set(e.clientY / window.innerHeight - 0.5);
        }}
      >
        {/* back plane: the wheel of cards */}
        <motion.div
          className="absolute inset-0 z-0"
          style={reduce ? undefined : { x: wheelX, y: wheelY, translateY: wheelLift }}
        >
          <motion.div
            className="rm-pin absolute inset-0"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.7, ease: [...EASE_HOUSE] }}
          >
            {SPOKES.map((work, i) => (
              <Spoke key={work.src} work={work} index={i} angle={angle} hold={hold} />
            ))}
          </motion.div>
        </motion.div>

        {/* the wordmark, centred under the wheel, with the ghost line over it */}
        <div
          className="pointer-events-none absolute left-1/2 z-20 w-max -translate-x-1/2"
          style={{ bottom: u(120) }}
        >
          <p className="sr-only">Websites, software, systems.</p>
          <motion.p
            aria-hidden
            className="rm-ghost display mb-[0.2em] hidden whitespace-nowrap text-center text-[var(--fg)] opacity-[0.19] lg:block"
            style={{ fontSize: "calc(var(--wm) * 0.1589)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.19 }}
            transition={{ duration: 1.1, delay: 1.35, ease: [...EASE_HOUSE] }}
          >
            Websites Softwares Systems
          </motion.p>

          <h1
            className="display -mb-[0.143em] block whitespace-nowrap text-[var(--fg)]"
            style={{ fontSize: "var(--wm)" }}
            aria-label="Slate & Code"
          >
            {GLYPHS.map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden whitespace-pre align-bottom" aria-hidden>
                <motion.span
                  className="rm-pin inline-block will-change-transform"
                  variants={glyph}
                  custom={SLOT.get(i) ?? 0}
                  initial="hidden"
                  animate="visible"
                >
                  {i === 12 ? <span className="text-accent">{ch}</span> : ch}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="gut flex justify-center pb-[clamp(56px,7vw,140px)] pt-[clamp(32px,4vw,80px)]">
        <WordsReveal
          text="Slate & Code Studio is a studio of one, by design. The same person who designs the screen writes the code behind it and directs the content that fills it."
          className="w-[min(48.44vw,100%)] text-center text-[length:clamp(15px,1.872vw,40px)] font-bold leading-[1.2] text-[var(--fg)] max-lg:w-[min(72vw,100%)]"
          inView
          stagger={0.026}
        />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   One card on the rim. Its angle wraps around the full turn, so a card that
   leaves past one edge comes back in, far out of sight, past the other.
   Orange duotone at rest; full colour while pointed at.
--------------------------------------------------------------------------- */
function Spoke({
  work,
  index,
  angle,
  hold,
}: {
  work: Work;
  index: number;
  angle: MotionValue<number>;
  hold: (held: boolean) => void;
}) {
  const a = useTransform(angle, (v) => {
    const t = (index * STEP - v + TURN / 2) % TURN;
    return (t < 0 ? t + TURN : t) - TURN / 2;
  });

  return (
    <motion.a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${work.name}, open the live site`}
      onPointerEnter={() => hold(true)}
      onPointerLeave={() => hold(false)}
      onFocus={() => hold(true)}
      onBlur={() => hold(false)}
      className="group absolute left-0 top-0 block hover:z-10 focus-visible:z-10"
      style={{ width: u(CARD.w), height: u(CARD.h), transform: RIM_TRANSFORM, ["--a" as string]: a }}
    >
      <span
        className="relative isolate block size-full overflow-hidden bg-accent shadow-[0_20px_50px_-24px_rgba(0,0,0,0.85)] transition-[scale,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)] group-focus-visible:scale-[1.06]"
        style={{ borderRadius: u(18) }}
      >
        <Image
          src={work.src}
          alt=""
          width={1600}
          height={800}
          sizes="(min-width: 1024px) 18vw, 32vw"
          draggable={false}
          className="size-full object-cover object-left-top grayscale contrast-[1.15] brightness-[1.1] transition-[filter] duration-500 group-hover:filter-none group-focus-visible:filter-none"
        />
        {/* the orange duotone: multiply turns white to accent and keeps black */}
        <span
          aria-hidden
          className="absolute inset-0 bg-accent mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 group-focus-visible:opacity-0"
        />
      </span>
    </motion.a>
  );
}
