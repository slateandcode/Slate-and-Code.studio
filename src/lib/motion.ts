/* ---------------------------------------------------------------------------
   The /motion page: talking-head reels, cut and finished with motion design.

   Short-form editing was dropped from the services in Aug 2026 and comes
   back here in Nov 2026 as its own offer, sold on its own page rather than
   as a fifth package on /services, because the buyer is different: someone
   who talks to camera, not a business that needs a website.

   The page leads with the work and keeps the words short, the way the home
   page does: a fan of reels under a wordmark, four passes in a line each, one
   figure, three prices, a handful of questions and the form.

     REELS   the fan. A reel is either a file under /public/reels (`src`, with
             a webp `poster`) or a YouTube Short (`youtube`, its id), which
             only loads YouTube's player once it is the reel in front. Files
             lead, so a first visit never loads YouTube at all.

             Files are the 1080x1920 60fps exports, re-encoded for the web
             without scaling (about 7MB for 15 seconds) with:
               ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 21
                 -pix_fmt yuv420p -movflags +faststart
                 -c:a aac -b:a 160k out.mp4
             and the poster pulled from a strong frame with -ss <sec>.

     PLANS   reel pricing, in the same shape as PACKAGES in services.ts.
             `unit` is what the schema bills the figure per; a figure written
             as a range ("$75–150") goes into the schema as a min and max.

     FORM    what the inquiry form asks and what /api/contact accepts.

   Prices, turnaround and revision rounds are commercial commitments: check
   them against what a reel actually takes once a few client reels are done.
--------------------------------------------------------------------------- */

import type { FormCopy } from "./editing";
import type { Landing } from "./landing";
import type { Package } from "./services";

export type Reel = {
  title: string;
  /* one line under the fan while this reel is in front */
  note: string;
  poster: string;
  src?: string;
  youtube?: string;
};

export type Plan = Package & { unit: "reel" | "month" | null };

export const MOTION: Pick<Landing, "title" | "description" | "lead"> & {
  path: string;
  /* the share card's headline, measured like h1Em in landing.ts:
     FOR TALKING HEADS, with its stop, sets 5.797 em */
  h1: string[];
  h1Em: number;
} = {
  path: "/motion",
  title: "Motion Design for Talking-Head Reels",
  description:
    "Talking-head reels cut, captioned and finished with motion design, for founders, coaches and brands posting on Instagram, TikTok and YouTube Shorts. From $75 a reel.",
  h1: ["Motion design", "for talking heads"],
  h1Em: 5.797,
  lead: "You talk to camera. I turn it into a reel people watch to the end.",
};

export const REELS: Reel[] = [
  {
    title: "Don't do things just because",
    note: "A podcast clip rebuilt with painted transitions, layered type and kinetic captions.",
    src: "/reels/dont-do-things-just-because.mp4",
    poster: "/reels/dont-do-things-just-because.webp",
  },
  {
    title: "Is modern life simulated?",
    note: "Algorithms and attention, drawn out in code, glitch and diagram graphics.",
    src: "/reels/modern-life-simulated.mp4",
    poster: "/reels/modern-life-simulated.webp",
  },
  {
    title: "Make every second count",
    note: "A speech cut for Midwinter Archives. Past 1M views on YouTube Shorts.",
    youtube: "-JDkfM25nsI",
    poster: "https://i.ytimg.com/vi/-JDkfM25nsI/oar2.jpg",
  },
];

/* what every reel goes through, in order, a line each */
export const PASSES = [
  {
    word: "Cut",
    line: "Pauses, restarts and filler out. The strongest line moves to the front.",
  },
  {
    word: "Caption",
    line: "Timed word by word, in your type, for the people watching on mute.",
  },
  {
    word: "Animate",
    line: "Numbers, lists and ideas drawn on screen as you say them.",
  },
  {
    word: "Score",
    line: "Voice cleaned up, a licensed bed under it, sound on every cut.",
  },
];

export const PROOF = {
  figure: "10M+",
  text: "views on the videos and shorts I have edited.",
};

export const PLANS: Plan[] = [
  {
    name: "Single reel",
    price: "$75–150",
    priceTail: "per reel, depending on complexity",
    unit: "reel",
    scope: "Up to 60 seconds",
    summary:
      "Clean cut and kinetic captions at the low end; heavy motion graphics and custom animation at the top. Priced before work starts.",
    includes: ["First draft in 48 hours", "2 rounds of changes", "Exports for every app"],
  },
  {
    name: "Reels plan",
    price: "$480–960",
    priceTail: "per month, depending on complexity",
    unit: "month",
    scope: "8 reels a month",
    summary:
      "Two a week at $60–120 each, 20% under the single rate, on a caption and graphics kit built for your brand.",
    includes: ["A fixed weekly slot", "Your own caption and graphics kit", "Cancel with a month's notice"],
  },
  {
    name: "Launches and series",
    price: "Custom",
    priceTail: "quoted on the footage",
    unit: null,
    scope: "12 reels and up",
    summary:
      "Batches for a launch or a course, a recurring series, or reels cut down from podcasts and long YouTube videos.",
    includes: ["Batch delivery", "Reels from long-form", "Series intros and templates"],
  },
];

export const FAQ = [
  {
    q: "Do I need a camera or a microphone?",
    a: "No. A recent phone at eye level, facing a window, is enough. A $20 clip-on microphone is the one upgrade worth buying.",
  },
  {
    q: "How long does a reel take?",
    a: "The first draft comes back within 48 hours of the footage arriving, and changes within a day.",
  },
  {
    q: "Can I send podcast or YouTube footage?",
    a: "Yes. Send the episode and the moments you want, or let me pick them. Each clip comes back as its own reel.",
  },
  {
    q: "Which platforms do you deliver for?",
    a: "Instagram Reels, TikTok and YouTube Shorts at 9:16, with captions kept clear of each app's buttons.",
  },
  {
    q: "Is the music licensed, and do I own the reels?",
    a: "Yes to both. Music comes from a licensed library, and once paid for the files are yours to post, boost and run as ads.",
  },
];

/* the inquiry form: the editing form's fields, asked for reels */
export const FORMATS = [
  "One reel",
  "Reels every month",
  "A launch or a series",
  "Not sure yet",
];

export const FORM: FormCopy = {
  kind: "motion",
  subject: "Motion inquiry",
  linkLabel: "Account",
  linkPlaceholder: "instagram.com/yourhandle",
  formatLabel: "What you need",
  formatPlaceholder: "How many reels?",
  formats: FORMATS,
  emailPlaceholder: "you@brand.com",
  messagePlaceholder: "What you talk about, how often you post, and any reels you like the look of.",
};
