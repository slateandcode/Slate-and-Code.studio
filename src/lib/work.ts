/* ---------------------------------------------------------------------------
   The studio's work, in one list: the home page strip and the /portfolio page
   both read from here, so a project added once shows up in both.

   `href` is the live site. Leave it off when there is nothing public to
   point at yet: the strip shows the name without a link, and the portfolio
   marks the project as in progress.

   The home strip is a curated selection, so newer projects can stay off it
   with `strip: false` and still appear in the portfolio.
--------------------------------------------------------------------------- */

export type Work = {
  src: string;
  name: string;
  /* what kind of build it is, one or two words */
  kind: string;
  /* one or two sentences for the portfolio page */
  summary: string;
  href?: string;
  alt: string;
  /* false keeps the project off the home page strip */
  strip?: boolean;
  /* a studio project built without a client; tagged on the portfolio */
  concept?: boolean;
};

export const WORKS: Work[] = [
  {
    src: "/work/crescent-car-check.webp",
    name: "Crescent Car Check",
    kind: "Website",
    summary:
      "Booking site for a pre-purchase car inspection service. Two inspection packages, everything checked on each car, and videos from recent inspections.",
    href: "https://crescentcarcheck.com/",
    alt: "Crescent Car Check website. The hero reads 'Book the UAE's best pre-purchase car inspection' beside a branded inspection van.",
  },
  {
    src: "/work/voidform.webp",
    name: "VoidForm",
    kind: "Website",
    summary:
      "Site for a creative agency that works as a retained department, bringing design, web, internal tools, and development under one roof.",
    href: "https://voidform-seven.vercel.app/",
    alt: "VoidForm website. A blue hero with an outlined 'Developing' marquee running over the silhouette of a film camera.",
    concept: true,
  },
  {
    src: "/work/norhus-real-estate.webp",
    name: "Nørhus Real Estate",
    kind: "3D website",
    summary:
      "A real estate site told as a 3D scroll story, from fourteen lit windows down to the one apartment still awake.",
    href: "https://norhus-real-estate.vercel.app/",
    alt: "Nørhus Real Estate website. A black and cream hero with 'Real estate in Copenhagen' set along a curve.",
    concept: true,
  },
  {
    src: "/work/untold-archives.webp",
    name: "Untold Archives",
    kind: "Website",
    summary:
      "Home for a documentary channel making cinematic portraits of internet creators.",
    href: "https://untoldarchives.com/",
    alt: "Untold Archives website. A dark hero with an old television showing 'Welcome to the archives'.",
  },
  {
    src: "/work/perch.webp",
    name: "Perch Website Tracker",
    kind: "Landing page",
    summary:
      "Landing page for a privacy-first analytics tool. One line of script, no cookies, and every number that matters on one screen.",
    href: "https://perch-website-tracker.vercel.app/",
    alt: "Perch Website Tracker landing page. The headline reads 'Check your analytics without the maze' above a dashboard preview.",
    concept: true,
  },
  {
    src: "/work/kairos-k01.webp",
    name: "Kairos Watch",
    kind: "3D website",
    summary:
      "Product site for the K-01, a hand-wound watch whose case, gears, and ticking movement are all built in code.",
    href: "https://kairos-watch.vercel.app/",
    alt: "Kairos Watch website. The K-01 watch face in close-up on a dark hero.",
    concept: true,
  },
  {
    src: "/work/superior-ink.webp",
    name: "Superior Ink",
    kind: "Website redesign",
    summary:
      "Redesign for a custom merchandise printer and fulfillment company, with a guided quote form that helps buyers pick a print method.",
    alt: "Superior Ink website. A third party logistics hero with stacked shipping cartons on a pallet.",
    concept: true,
  },
  {
    src: "/work/mubarak-auto.webp",
    name: "Mubarak Auto",
    kind: "Website",
    summary:
      "Website for an auto parts supplier that has stocked workshops with filters, bulbs, clips, and detailing supplies since 2006.",
    href: "https://mubarakauto.ae/",
    alt: "Mubarak Auto website. The hero reads 'Premium auto parts at the best prices in UAE' next to the Mubarak Auto badge.",
  },
  {
    src: "/work/discontinued.webp",
    name: "Discontinued",
    kind: "Website",
    summary:
      "An illustrated catalogue of beautiful products that were retired, from the Walkman to the Nokia 3310.",
    href: "https://discontinued-kappa.vercel.app/",
    alt: "Discontinued website. An illustrated hero with a classic iPod and the line 'The most elegant that got lost'.",
    concept: true,
  },
  {
    src: "/work/virdis-supplement.webp",
    name: "Virdis Supplement",
    kind: "3D website",
    summary:
      "Scroll-driven 3D site for a daily supplement. The jar spins, opens, and breaks out into a labelled diagram of its ingredients.",
    href: "https://virdis-supplement-demo.vercel.app/",
    alt: "Virdis Supplement website. The Virdis wordmark in an italic serif with capsules floating around it.",
    concept: true,
  },
  {
    src: "/work/limas-no-limits.webp",
    name: "Lima's No Limits",
    kind: "Website",
    summary:
      "Site for an owner-operated bathroom and flooring remodeler, built around getting a quote or calling straight from the page.",
    href: "https://limasnolimits-demo.vercel.app/",
    alt: "Lima's No Limits website. 'Lima's Bathrooms and Floors' set in heavy type over a finished marble bathroom.",
    concept: true,
    strip: false,
  },
  {
    src: "/work/one-wood-floors.webp",
    name: "1 Wood Floors",
    kind: "Website redesign",
    summary:
      "Rebuild for a hardwood flooring company covering dustless refinishing, custom wide plank, and installation, with a showroom visit one click away.",
    alt: "1 Wood Floors website. 'Hardwood Flooring' in large italic serif around a plank shown half raw, half stained.",
    concept: true,
    strip: false,
  },
  {
    src: "/work/meridian-solutions.webp",
    name: "Meridian Solutions",
    kind: "Website",
    summary:
      "Site for an operations firm that fixes warehouses and supply chains from the inside, from the first review to training the team that runs it.",
    alt: "Meridian Solutions website. 'Operators, not consultants. We fix what broke' above a warehouse with its loading docks.",
    concept: true,
    strip: false,
  },
  {
    src: "/work/veryra.webp",
    name: "Veryra",
    kind: "Motion website",
    summary:
      "Scroll-driven launch site for a face mist. The bottle drifts through clouds and type as you move down the page.",
    alt: "Veryra website. A lilac face mist bottle rising through clouds in front of the words Radiant, Pure, and Soft.",
    concept: true,
    strip: false,
  },
  {
    src: "/work/arcus-real-estate.webp",
    name: "Arcus Real Estate",
    kind: "Website",
    summary:
      "Site for a real estate developer building residential towers and villa complexes, with private inquiries handled one to one.",
    alt: "Arcus Real Estate website. The Arcus script wordmark over 'Real Estate' against glass towers and a blue sky.",
    concept: true,
    strip: false,
  },
  {
    src: "/work/marlows-coffee.webp",
    name: "Marlows Coffee",
    kind: "Website",
    summary:
      "Site for a small coffee shop with three coffees on the menu, changed every Monday, and a membership for regulars.",
    alt: "Marlows Coffee website. The name spelled out in coffee beans beside an iced latte on a warm orange background.",
    concept: true,
    strip: false,
  },
  {
    src: "/work/basin-pools.webp",
    name: "Basin Pools",
    kind: "Website",
    summary:
      "Site for a pool builder, from new pools to renovations, with finished projects and a quote request up front.",
    alt: "Basin Pools website. 'Basin Pools, your dream pool starts here' over a garden pool, with project counts down the side.",
    concept: true,
    strip: false,
  },
];
