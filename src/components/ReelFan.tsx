"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { PiArrowLeft, PiArrowRight, PiSpeakerSimpleHigh, PiSpeakerSimpleSlash } from "react-icons/pi";
import { EASE_HOUSE, EASE_OUT } from "@/lib/anim";
import { REELS, type Reel } from "@/lib/motion";

/* ---------------------------------------------------------------------------
   The reels, fanned like a hand of cards: one phone in front playing, its
   neighbours tilted back on either side. Click or tap a side phone, swipe,
   or use the arrows to bring another to the front; a file reel that reaches
   its end hands over to the next on its own.

   Only the reel in front ever plays. A file reel starts muted (browsers
   allow nothing else) and the speaker button brings the sound up; the choice
   carries over as the fan turns. A YouTube reel shows its thumbnail until it
   comes to the front, and only then loads YouTube's player, which brings its
   own sound control.

   The phone is sized off the viewport height on desktop and the width on a
   phone, so the front reel is always a comfortable size and the side ones
   peek in from the edges of a small screen.
--------------------------------------------------------------------------- */

const N = REELS.length;

/* where a phone sits from its offset to the front one: -1 left, 0 front, 1 right */
function pose(rel: number) {
  return {
    x: `${rel * 88}%`,
    y: rel ? "7%" : "0%",
    rotate: rel * 8,
    scale: rel ? 0.8 : 1,
    /* the side phones turn away a touch, like cards held in a hand */
    rotateY: Math.sign(rel) * -14,
    opacity: 1,
  };
}

/* The move from one place in the fan to the next. A step to the neighbouring
   place slides there. A wrap, the far-left phone going to the far right or
   back, would slide straight across the front reel; instead it fades out
   where it is, crosses while hidden, and fades in on the other side. */
function move(
  rel: number,
  from: number,
  reduce: boolean | null
): { animate: TargetAndTransition; transition: Transition } {
  const end = pose(rel);
  if (reduce) return { animate: end, transition: { duration: 0 } };
  if (Math.abs(rel - from) <= 1) {
    return { animate: end, transition: { duration: 0.8, ease: EASE_HOUSE } };
  }
  const start = pose(from);
  const via = <T,>(a: T, b: T) => [a, a, b, b];
  return {
    animate: {
      x: via(start.x, end.x),
      y: via(start.y, end.y),
      rotate: via(start.rotate, end.rotate),
      rotateY: via(start.rotateY, end.rotateY),
      scale: [start.scale, 0.7, 0.7, end.scale],
      opacity: [1, 0, 0, 1],
    },
    transition: { duration: 0.8, times: [0, 0.35, 0.55, 1], ease: "easeInOut" },
  };
}

/* -1, 0 or 1 for three reels; wraps so the fan always has a phone each side */
const offset = (i: number, active: number) => {
  let d = (i - active) % N;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
};

function Screen({
  reel,
  front,
  playing,
  muted,
  onEnded,
  onProgress,
}: {
  reel: Reel;
  front: boolean;
  playing: boolean;
  muted: boolean;
  onEnded: () => void;
  onProgress: (p: number) => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  /* the poster stays up until the player has a moving picture to show, so
     a reel coming to the front never flashes black while it loads */
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (front && playing) v.play().catch(() => {});
    else v.pause();
  }, [front, playing]);

  /* leaving the front: back to the poster, and rewound behind it, so the
     reel starts from the top next time */
  useEffect(() => {
    if (front) return;
    setShown(false);
    const v = video.current;
    if (v) v.currentTime = 0;
  }, [front]);

  const live = front && shown;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={reel.poster} alt="" className="absolute inset-0 size-full object-cover" />
      {reel.youtube ? (
        front &&
        playing && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${reel.youtube}?autoplay=1&mute=1&loop=1&playlist=${reel.youtube}&playsinline=1&rel=0`}
            title={reel.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            /* YouTube paints a black player before its picture; give it a
               beat after loading before it covers the thumbnail */
            onLoad={() => window.setTimeout(() => setShown(true), 700)}
            className={`absolute inset-0 size-full transition-opacity duration-500 ${live ? "opacity-100" : "opacity-0"}`}
          />
        )
      ) : (
        <video
          ref={video}
          src={reel.src}
          muted={!front || muted}
          playsInline
          preload={front ? "auto" : "metadata"}
          aria-label={`${reel.title}, reel`}
          onPlaying={() => front && setShown(true)}
          onEnded={onEnded}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (front && v.duration) onProgress(v.currentTime / v.duration);
          }}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${live ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </>
  );
}

export default function ReelFan() {
  const stage = useRef<HTMLDivElement>(null);
  const inView = useInView(stage, { amount: 0.3 });
  const reduce = useReducedMotion();

  /* the reel in front, and the one that was in front before the last turn,
     which is how a phone knows whether its move is a step or a wrap */
  const [{ active, from }, setFan] = useState({ active: 0, from: 0 });
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  /* a reduced-motion visitor starts on posters and plays a reel by asking */
  const [asked, setAsked] = useState(false);
  const playing = inView && (!reduce || asked);

  const go = (i: number) => {
    setFan({ active: ((i % N) + N) % N, from: active });
    setProgress(0);
  };

  /* a horizontal swipe on a touch screen turns the fan */
  const swipe = useRef<number | null>(null);
  const onDown = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") swipe.current = e.clientX;
  };
  const onUp = (e: PointerEvent) => {
    if (swipe.current === null) return;
    const dx = e.clientX - swipe.current;
    swipe.current = null;
    if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
  };

  const reel = REELS[active];

  return (
    <div>
      <div
        ref={stage}
        onPointerDown={onDown}
        onPointerUp={onUp}
        className="relative mx-auto h-[min(118vw,64svh)] touch-pan-y lg:h-[min(62svh,40vw)]"
      >
        {REELS.map((r, i) => {
          const rel = offset(i, active);
          const was = offset(i, from);
          const front = rel === 0;
          const { animate, transition } = move(rel, was, reduce);
          return (
            /* centred by the flex row, then moved off centre by the fan */
            <div
              key={r.title}
              className="pointer-events-none absolute inset-0 flex justify-center"
              /* a wrapping phone crosses underneath everything */
              style={{ zIndex: Math.abs(rel - was) > 1 ? 1 : 10 - Math.abs(rel) }}
            >
              <motion.div
                className="pointer-events-auto relative aspect-[9/16] h-full"
                style={{ transformPerspective: 1600 }}
                initial={false}
                animate={animate}
                transition={transition}
              >
                <div
                  className={`relative size-full overflow-hidden rounded-[clamp(16px,1.6vw,30px)] border border-white/10 bg-ink shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] transition-[filter] duration-700 ${
                    front ? "" : "brightness-[0.45] saturate-[0.6]"
                  }`}
                >
                  <Screen
                    reel={r}
                    front={front}
                    playing={playing}
                    muted={muted}
                    onEnded={() => go(active + 1)}
                    onProgress={setProgress}
                  />

                  {/* the front reel's progress, along the top like the apps */}
                  {front && r.src && (
                    <div aria-hidden className="pointer-events-none absolute inset-x-[5%] top-[2.6%] h-[3px] overflow-hidden rounded-full bg-white/25">
                      <div
                        className="h-full origin-left bg-white transition-transform duration-[250ms] ease-linear"
                        style={{ transform: `scaleX(${progress})` }}
                      />
                    </div>
                  )}

                  {front && r.src && (
                    <button
                      type="button"
                      onClick={() => {
                        setMuted((m) => !m);
                        setAsked(true);
                      }}
                      aria-pressed={!muted}
                      aria-label={muted ? "Turn the sound on" : "Turn the sound off"}
                      className="absolute bottom-[3.5%] right-[5%] grid size-[clamp(36px,2.6vw,48px)] place-items-center rounded-full bg-black/50 text-white backdrop-blur transition-colors duration-300 hover:bg-accent"
                    >
                      {muted ? (
                        <PiSpeakerSimpleSlash aria-hidden className="size-[48%]" />
                      ) : (
                        <PiSpeakerSimpleHigh aria-hidden className="size-[48%]" />
                      )}
                    </button>
                  )}

                  {/* a side phone is one big button that brings it to the front */}
                  {!front && (
                    <button
                      type="button"
                      onClick={() => go(i)}
                      aria-label={`Play ${r.title}`}
                      className="absolute inset-0 cursor-pointer"
                    />
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* the reel in front: its number, name and one line, and the arrows */}
      <div className="gut mt-[clamp(20px,2.4vw,44px)] flex items-start justify-center gap-[clamp(16px,2.4vw,48px)]">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous reel"
          className="grid size-[clamp(40px,3vw,56px)] shrink-0 place-items-center rounded-full border border-[var(--rule)] text-[var(--fg)] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
        >
          <PiArrowLeft aria-hidden className="size-[42%]" />
        </button>

        <div className="w-[min(34ch,100%)] text-center" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={reel.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [...EASE_OUT] }}
            >
              <p className="micro text-accent">
                {String(active + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
              </p>
              <p className="mt-[0.4em] text-[length:var(--fs-step)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg)]">
                {reel.title}
              </p>
              <p className="mt-[0.45em] text-[length:var(--fs-body)] leading-[1.4] text-[var(--fg-70)]">
                {reel.note}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next reel"
          className="grid size-[clamp(40px,3vw,56px)] shrink-0 place-items-center rounded-full border border-[var(--rule)] text-[var(--fg)] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white"
        >
          <PiArrowRight aria-hidden className="size-[42%]" />
        </button>
      </div>
    </div>
  );
}
