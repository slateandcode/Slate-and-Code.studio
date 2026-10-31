"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "motion/react";
import { EASE_HOUSE } from "@/lib/anim";
import { TEXT_LINK, TEXT_LINK_RULE } from "@/lib/ui";
import { WORKS, type Work } from "@/lib/work";

/* ---------------------------------------------------------------------------
   Every project as a staged scene, one after another down the page, full
   bleed with a thin seam of ink between them. Each scene is a set in the
   project's own colour with the build sitting on it in a device, the name
   set huge behind it, and a small caption box in the corner. The device
   tips back as the scene comes up the screen and settles flat as it takes
   the middle, so the work is shown rather than linked to; the live site,
   where there is one, is a small link in the caption.

   A stacked card rides down the right edge the whole way, flipping to the
   number and kind of whichever scene holds the screen.
--------------------------------------------------------------------------- */

/* The previews made for real businesses open the page, in the order the
   list gives them: they are the custom-builder work the studio is moving
   toward. Then the latest builds, in this order. */
const PREVIEWS = WORKS.filter((w) => w.preview);
const FEATURED = [
  "Whitecombe Roofing",
  "Hartwell Gardens",
  "Plainwater",
  "Ashby Properties",
  "Lima's No Limits",
];
const featured = FEATURED.flatMap((name) => WORKS.filter((w) => w.name === name));
const rest = WORKS.filter((w) => !w.preview && !FEATURED.includes(w.name));

/* then the other live projects, since they can be opened; the ones still
   being built close the page, each group in the order the list gives it */
const ORDERED = [
  ...PREVIEWS,
  ...featured,
  ...rest.filter((w) => w.href),
  ...rest.filter((w) => !w.href),
];

const pad = (n: number) => String(n).padStart(2, "0");

/* A set reads as light or dark off its relative luminance, which decides
   whether the name behind the device is pressed into it or lifted off it. */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [n >> 16, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.18;
}

function Status({ work }: { work: Work }) {
  /* a preview is shown, not linked: the scene is the whole case */
  if (!work.href && work.preview) return null;

  if (!work.href) {
    return (
      <span className="flex min-h-[24px] shrink-0 items-center gap-[0.7em] whitespace-nowrap text-[length:var(--fs-micro)]">
        <span className="animate-blink block size-[0.42em] rounded-full bg-accent" />
        <span className="micro text-[var(--fg-70)]">In progress</span>
      </span>
    );
  }

  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${TEXT_LINK} inline-flex min-h-[24px] shrink-0 items-center whitespace-nowrap`}
    >
      <span className="relative inline-flex items-center gap-[0.6em]">
        Visit site
        <span aria-hidden>&#8599;</span>
        <span className={TEXT_LINK_RULE} />
      </span>
      <span className="sr-only">: {work.name}, opens in a new tab</span>
    </a>
  );
}

/* the screenshot under glass: a soft glare wiped across the top left */
function Screen({
  work,
  eager,
  ratio,
}: {
  work: Work;
  eager: boolean;
  ratio: string;
}) {
  return (
    <div className={`relative ${ratio} overflow-hidden bg-black`}>
      <Image
        src={work.src}
        alt={work.alt}
        fill
        sizes="(max-width: 768px) 90vw, 70vw"
        loading={eager ? "eager" : "lazy"}
        className="object-cover object-top"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.13),transparent_38%)]"
      />
    </div>
  );
}

/* Both devices are drawn in --d, the device's own width, so the bezel,
   corners and shadow keep their proportions at every size. The width is
   capped by the set's height as well as its width (container units), so a
   short, wide screen never pushes the device off the set. */

function Laptop({ work, eager }: { work: Work; eager: boolean }) {
  return (
    <div className="relative w-[var(--d)] [--d:min(84cqw,110cqh)] md:[--d:min(60cqw,94cqh)]">
      {/* contact shadow, where the deck meets the set */}
      <span
        aria-hidden
        className="absolute -bottom-[calc(var(--d)*0.035)] left-[-6%] right-[-6%] h-[calc(var(--d)*0.07)] rounded-[50%] bg-black/45 blur-[calc(var(--d)*0.02)]"
      />
      {/* the lid: a dark bezel, a pinhole camera, the screen */}
      <div className="relative rounded-t-[calc(var(--d)*0.026)] bg-[#141415] p-[calc(var(--d)*0.013)] pb-[calc(var(--d)*0.02)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)]">
        <span
          aria-hidden
          className="absolute left-1/2 top-[calc(var(--d)*0.0045)] size-[calc(var(--d)*0.0045)] -translate-x-1/2 rounded-full bg-[#2e2e30]"
        />
        {/* a shade wider than a real laptop's 16:10, so the 2:1 shots
            only lose a sliver at each side, never a logo or a button */}
        <Screen work={work} eager={eager} ratio="aspect-[9/5]" />
      </div>
      {/* the deck, a little wider than the lid, with the thumb notch cut
          into its front lip */}
      <div className="relative -mx-[7%] h-[calc(var(--d)*0.03)] rounded-b-[calc(var(--d)*0.022)] bg-[linear-gradient(to_bottom,#5a5a5e,#2a2a2c_45%,#121213)] shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
        <span
          aria-hidden
          className="absolute left-1/2 top-0 h-[42%] w-[15%] -translate-x-1/2 rounded-b-[calc(var(--d)*0.008)] bg-[#1d1d1f]"
        />
      </div>
    </div>
  );
}

function Browser({ work, eager }: { work: Work; eager: boolean }) {
  return (
    <div className="relative w-[var(--d)] [--d:min(90cqw,170cqh)] md:[--d:min(68cqw,122cqh)]">
      <span
        aria-hidden
        className="absolute -bottom-[calc(var(--d)*0.05)] left-[4%] right-[4%] h-[calc(var(--d)*0.08)] rounded-[50%] bg-black/40 blur-[calc(var(--d)*0.03)]"
      />
      <div className="relative overflow-hidden rounded-[calc(var(--d)*0.012)] bg-[#141415] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)]">
        {/* the window bar: three quiet dots and the project in the address
            pill, in place of a URL nobody needs to read */}
        <div className="relative flex h-[calc(var(--d)*0.034)] items-center px-[calc(var(--d)*0.014)]">
          <span aria-hidden className="flex gap-[calc(var(--d)*0.006)]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block size-[calc(var(--d)*0.008)] rounded-full bg-white/20"
              />
            ))}
          </span>
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 flex h-[56%] w-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/[0.07] text-[length:calc(var(--d)*0.0115)] tracking-[0.02em] text-white/55"
          >
            {work.name}
          </span>
        </div>
        <Screen work={work} eager={eager} ratio="aspect-[2/1]" />
      </div>
    </div>
  );
}

function Caption({
  work,
  index,
  total,
}: {
  work: Work;
  index: number;
  total: number;
}) {
  return (
    <div className="gut pb-[clamp(36px,9vw,64px)] pt-[clamp(16px,4vw,24px)] md:absolute md:bottom-[var(--gutter)] md:right-[var(--gutter)] md:z-10 md:p-0">
      <div className="md:w-[clamp(290px,22vw,430px)] md:bg-ink md:p-[clamp(14px,1.05vw,22px)] md:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="micro flex items-center justify-between gap-[1em]">
          <span className="text-[var(--fg-45)]">
            No. {pad(index + 1)}
            <span className="mx-[0.6em] text-[var(--fg-28)]">/</span>
            {pad(total)}
          </span>
          <span className="text-accent">{work.kind}</span>
        </div>

        <h2 className="mt-[0.75em] text-[length:var(--fs-lead)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--fg)]">
          {work.name}
        </h2>
        <p className="mt-[0.5em] text-[length:var(--fs-small)] leading-[1.45] text-[var(--fg-70)]">
          {work.summary}
        </p>

        <div className="mt-[1.1em] flex items-center justify-between gap-[1em] border-t border-[var(--rule)] pt-[0.85em]">
          {/* a hairline pill, quieter than the name: it qualifies the
              project rather than competing with it. A preview's pill is
              ringed in the accent, so real-business work reads apart from
              the studio's own concepts at a glance. */}
          {work.preview ? (
            <span className="micro whitespace-nowrap rounded-full border border-accent/60 px-[0.75em] pb-[0.3em] pt-[0.35em] leading-none text-accent">
              Preview
            </span>
          ) : work.concept ? (
            <span className="micro whitespace-nowrap rounded-full border border-[var(--rule)] px-[0.75em] pb-[0.3em] pt-[0.35em] leading-none text-[var(--fg-70)]">
              Concept
            </span>
          ) : (
            <span className="micro text-[var(--fg-45)]">Client work</span>
          )}
          <Status work={work} />
        </div>
      </div>
    </div>
  );
}

function Scene({
  work,
  index,
  total,
  onActive,
}: {
  work: Work;
  index: number;
  total: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  /* the scene that crosses the middle line of the screen holds it. Only one
     can at a time, so the last to arrive there is always the right one. */
  const holding = useInView(ref, { margin: "-50% 0px -50% 0px" });
  useEffect(() => {
    if (holding) onActive(index);
  }, [holding, index, onActive]);

  /* 0 as the scene's top edge enters at the bottom of the screen, 0.5 as it
     sits centred, 1 as its bottom edge leaves at the top */
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* alternate scenes lean from alternate sides, so the page swings */
  const side = index % 2 ? -1 : 1;
  const rotateX = useTransform(p, [0, 0.5, 1], [26, 0, -10]);
  const rotateY = useTransform(p, [0, 0.5, 1], [side * -12, 0, side * 5]);
  const scale = useTransform(p, [0, 0.5, 1], [0.84, 1, 0.94]);
  const y = useTransform(p, [0, 0.5, 1], ["16%", "0%", "-8%"]);
  /* the name behind slides the other way, slower, for depth */
  const nameX = useTransform(
    p,
    [0, 1],
    side > 0 ? ["4%", "-30%"] : ["-30%", "4%"]
  );

  const light = isLight(work.stage);
  const set = {
    "--stage": work.stage,
    /* lit from above: a touch brighter in the middle, falling off to the
       corners, like a sweep under studio lights */
    background: `radial-gradient(120% 95% at 50% 32%, color-mix(in oklab, var(--stage), white ${light ? 14 : 8}%) 0%, var(--stage) 52%, color-mix(in oklab, var(--stage), black ${light ? 16 : 30}%) 100%)`,
    containerType: "size",
  } as CSSProperties;

  const eager = index < 2;
  const Device = index % 2 ? Browser : Laptop;

  return (
    <article ref={ref} className="relative">
      <div
        className="relative aspect-square overflow-hidden [perspective:1800px] md:aspect-auto md:h-[min(100svh,60vw)]"
        style={set}
      >
        <motion.p
          aria-hidden
          className="rm-pin display absolute left-0 top-[46%] -translate-y-1/2 whitespace-nowrap"
          style={{
            x: nameX,
            fontSize: "44cqh",
            color: light
              ? "color-mix(in oklab, var(--stage), black 11%)"
              : "color-mix(in oklab, var(--stage), white 9%)",
          }}
        >
          {work.name}
        </motion.p>

        <div className="absolute inset-0 flex items-center justify-center pb-[6cqh]">
          <motion.div
            className="rm-pin will-change-transform"
            style={{ rotateX, rotateY, scale, y }}
          >
            <Device work={work} eager={eager} />
          </motion.div>
        </div>
      </div>

      <Caption work={work} index={index} total={total} />
    </article>
  );
}

/* the number and kind of the scene on screen, rolling up as it changes */
function Roll({
  id,
  children,
  className,
}: {
  id: number;
  children: ReactNode;
  className: string;
}) {
  return (
    <span className={`relative block overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={id}
          className="block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-105%" }}
          transition={{ duration: 0.7, ease: [...EASE_HOUSE] }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Deck({ active, total }: { active: number; total: number }) {
  const work = ORDERED[active];
  return (
    /* The track ends well short of the last scene's bottom, so the card is
       released while that scene is still on screen and never drifts down
       over the closing line. Decorative: every scene carries its own
       number and kind in its caption. */
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-[45svh] top-0 z-20 hidden md:block"
    >
      {/* on the left edge, across the set from the caption, so a scene
          leaving the screen never carries its caption under the card */}
      <div className="sticky top-[clamp(88px,7.5vw,150px)] ml-[var(--gutter)] w-[clamp(180px,12.5vw,250px)]">
        {/* two blank cards fanned behind the live one, so it reads as the
            top of a stack */}
        <span className="absolute inset-0 translate-x-[-9%] translate-y-[-12%] rotate-[-8deg] bg-ink/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />
        <span className="absolute inset-0 translate-x-[-4%] translate-y-[-6%] rotate-[-4deg] bg-ink/80 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />

        <div className="relative bg-ink p-[clamp(12px,0.95vw,20px)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
          <div className="micro flex justify-between text-[var(--fg-45)]">
            <span>Now showing</span>
            <span>/{pad(total)}</span>
          </div>
          <Roll
            id={active}
            className="display mt-[0.25em] h-[0.9em] text-[clamp(46px,3.8vw,84px)] text-[var(--fg)]"
          >
            {pad(active + 1)}
          </Roll>
          <Roll id={active} className="micro mt-[0.6em] h-[1.25em] text-accent">
            {work.kind}
          </Roll>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioGrid() {
  const [active, setActive] = useState(0);
  const onActive = useCallback((i: number) => setActive(i), []);

  return (
    <section className="pb-[clamp(70px,9vw,190px)] pt-[clamp(24px,2.6vw,56px)]">
      <div className="relative flex flex-col gap-[clamp(6px,0.55vw,12px)]">
        <Deck active={active} total={ORDERED.length} />
        {ORDERED.map((work, i) => (
          <Scene
            key={work.name}
            work={work}
            index={i}
            total={ORDERED.length}
            onActive={onActive}
          />
        ))}
      </div>

      {/* the ask, once the work has made the case */}
      <div className="gut">
        <div className="mt-[clamp(60px,7vw,160px)] flex flex-wrap items-baseline gap-x-[clamp(18px,2vw,44px)] gap-y-[0.8em] border-t border-[var(--rule)] pt-[clamp(28px,3vw,60px)]">
          <p className="text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
            Have something like this in mind?
          </p>
          <Link
            href="/contact"
            className="group relative text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-accent"
          >
            Start a project
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
