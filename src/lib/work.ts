/* ---------------------------------------------------------------------------
   The studio's work, in one list: the home page strip and the /portfolio page
   both read from here, so a project added once shows up in both.

   `href` is the live site. Leave it off when there is nothing public to
   point at yet: the strip shows the name without a link, and the portfolio
   marks the project as in progress.
--------------------------------------------------------------------------- */

export type Work = {
  src: string;
  name: string;
  /* what kind of build it is, one or two words */
  kind: string;
  /* the colour of the set the project is staged on in the portfolio */
  stage: string;
  /* one or two sentences for the portfolio page */
  summary: string;
  href?: string;
  alt: string;
  /* a studio project built without a client; tagged on the portfolio */
  concept?: boolean;
  /* a design made for a real business that is not live yet: shown in the
     portfolio as a staged scene and tagged Preview, not Concept */
  preview?: boolean;
};

export const WORKS: Work[] = [
  {
    src: "/work/crescent-car-check.webp",
    name: "Crescent Car Check",
    kind: "Website",
    stage: "#efc43c",
    summary:
      "Booking site for a pre-purchase car inspection service. Two inspection packages, everything checked on each car, and videos from recent inspections.",
    href: "https://crescentcarcheck.com/",
    alt: "Crescent Car Check website. The hero reads 'Book the UAE's best pre-purchase car inspection' beside a branded inspection van.",
  },
  {
    src: "/work/voidform.webp",
    name: "VoidForm",
    kind: "Website",
    stage: "#d5dbff",
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
    stage: "#b3263c",
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
    stage: "#c6b089",
    summary:
      "Home for a documentary channel making cinematic portraits of internet creators.",
    href: "https://untoldarchives.com/",
    alt: "Untold Archives website. A dark hero with an old television showing 'Welcome to the archives'.",
  },
  {
    src: "/work/perch.webp",
    name: "Perch Website Tracker",
    kind: "Landing page",
    stage: "#86d3b8",
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
    stage: "#d9cfbf",
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
    stage: "#e59f55",
    summary:
      "Redesign for a custom merchandise printer and fulfillment company, with a guided quote form that helps buyers pick a print method.",
    alt: "Superior Ink website. A third party logistics hero with stacked shipping cartons on a pallet.",
    concept: true,
  },
  {
    src: "/work/mubarak-auto.webp",
    name: "Mubarak Auto",
    kind: "Website",
    stage: "#a9bfdc",
    summary:
      "Website for an auto parts supplier that has stocked workshops with filters, bulbs, clips, and detailing supplies since 2006.",
    href: "https://mubarakauto.ae/",
    alt: "Mubarak Auto website. The hero reads 'Premium auto parts at the best prices in UAE' next to the Mubarak Auto badge.",
  },
  {
    src: "/work/discontinued.webp",
    name: "Discontinued",
    kind: "Website",
    stage: "#e7d8b2",
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
    stage: "#a2c89f",
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
    stage: "#c39a6e",
    summary:
      "Site for an owner-operated bathroom and flooring remodeler, built around getting a quote or calling straight from the page.",
    href: "https://limasnolimits-demo.vercel.app/",
    alt: "Lima's No Limits website. 'Lima's Bathrooms and Floors' set in heavy type over a finished marble bathroom.",
    concept: true,
  },
  {
    src: "/work/one-wood-floors.webp",
    name: "1 Wood Floors",
    kind: "Website redesign",
    stage: "#6e4126",
    summary:
      "Rebuild for a hardwood flooring company covering dustless refinishing, custom wide plank, and installation, with a showroom visit one click away.",
    href: "https://1-wood-floors.vercel.app/",
    alt: "1 Wood Floors website. 'Hardwood Flooring' in large italic serif around a plank shown half raw, half stained.",
    concept: true,
  },
  {
    src: "/work/meridian-solutions.webp",
    name: "Meridian Solutions",
    kind: "Website",
    stage: "#7b302b",
    summary:
      "Site for an operations firm that fixes warehouses and supply chains from the inside, from the first review to training the team that runs it.",
    href: "https://meridrian-solutions.vercel.app/",
    alt: "Meridian Solutions website. 'Operators, not consultants. We fix what broke' above a warehouse with its loading docks.",
    concept: true,
  },
  {
    src: "/work/veryra.webp",
    name: "Veryra",
    kind: "Motion website",
    stage: "#b892d2",
    summary:
      "Scroll-driven launch site for a face mist. The bottle drifts through clouds and type as you move down the page.",
    alt: "Veryra website. A lilac face mist bottle rising through clouds in front of the words Radiant, Pure, and Soft.",
    concept: true,
  },
  {
    src: "/work/arcus-real-estate.webp",
    name: "Arcus Real Estate",
    kind: "Website",
    stage: "#e7e0d2",
    summary:
      "Site for a real estate developer building residential towers and villa complexes, with private inquiries handled one to one.",
    href: "https://arcus-real-estate-two.vercel.app/",
    alt: "Arcus Real Estate website. The Arcus script wordmark over 'Real Estate' against glass towers and a blue sky.",
    concept: true,
  },
  {
    src: "/work/marlows-coffee.webp",
    name: "Marlows Coffee",
    kind: "Website",
    stage: "#4b2c1b",
    summary:
      "Site for a small coffee shop with three coffees on the menu, changed every Monday, and a membership for regulars.",
    href: "https://marlows-coffee-demo.vercel.app/",
    alt: "Marlows Coffee website. The name spelled out in coffee beans beside an iced latte on a warm orange background.",
    concept: true,
  },
  {
    src: "/work/basin-pools.webp",
    name: "Basin Pools",
    kind: "Website",
    stage: "#82c9d2",
    summary:
      "Site for a pool builder, from new pools to renovations, with finished projects and a quote request up front.",
    href: "https://basin-pools-demo.vercel.app/",
    alt: "Basin Pools website. 'Basin Pools, your dream pool starts here' over a garden pool, with project counts down the side.",
    concept: true,
  },
  {
    src: "/work/ashby-properties.webp",
    name: "Ashby Properties",
    kind: "Website",
    stage: "#8e9cab",
    summary:
      "Site for a property firm that buys, sells and advises, built around a short list of properties it walked and measured before putting them on the books.",
    href: "https://ashby-properties.vercel.app/",
    alt: "Ashby Properties website. The name set in tall condensed type beside an apartment block shot from below.",
    concept: true,
  },
  {
    src: "/work/whitcombe-roofing.webp",
    name: "Whitecombe Roofing",
    kind: "Website",
    stage: "#b5552f",
    summary:
      "Site for a pitched roofing firm, with a scroll that strips a roof back to the rafters and lays it again, layer by layer, to show what doing it properly means.",
    href: "https://whitcombe-roofing.vercel.app/",
    alt: "Whitecombe Roofing website. 'Every layer, done properly' beside two roofers handing tiles across a slate roof.",
    concept: true,
  },
  {
    src: "/work/hartwell-gardens.webp",
    name: "Hartwell Gardens",
    kind: "Website",
    stage: "#d3c9ae",
    summary:
      "Site for a garden design and build crew in Surrey and Hampshire, with finished gardens fanned across the hero, each tagged with its town, budget, and build time.",
    href: "https://hartwell-gardens.vercel.app/",
    alt: "Hartwell Gardens website. The name in a tall serif over deep green, with photos of finished gardens fanned along the bottom.",
    concept: true,
  },
  {
    src: "/work/plainwater.webp",
    name: "Plainwater",
    kind: "Website",
    stage: "#2445a6",
    summary:
      "Site for a pressure washing firm cleaning patios, driveways, render and roofs, with a hose that runs through the wordmark and before and after jobs side by side.",
    href: "https://plaintwater.vercel.app/",
    alt: "Plainwater website. 'Plainwater Washing' in a large serif, crossed by a blue hose from a pressure washer, between before and after photos of a patio.",
    concept: true,
  },
  {
    src: "/work/all-about-campers.webp",
    name: "All About Campers",
    kind: "Website",
    stage: "#7f9a83",
    summary:
      "Site for a Perth maker of universal-fit camper kits in lightweight RV ply, cut in Wanneroo and built to drop straight into the van, with a configurator to pick the kit.",
    alt: "All About Campers website. 'Pick your kit. Drop it in.' in a large serif beside a fanned stack of kit cards priced at $4,990.",
    preview: true,
  },
  {
    src: "/work/paramount-campers.webp",
    name: "Paramount Campers",
    kind: "Website",
    stage: "#2b8a9a",
    summary:
      "Site for a Surrey campervan converter run by an aerospace engineer, with layouts, prices and a free consultation with Marc up front.",
    alt: "Paramount Campers website. 'Your custom camper van' in heavy condensed type beside a camouflage-wrapped van and its starting price.",
    preview: true,
  },
  {
    src: "/work/autoline.webp",
    name: "AutoLine Detailing",
    kind: "Website",
    stage: "#c9c4bb",
    summary:
      "Site for a Los Angeles studio doing wraps, PPF, ceramic, tint and starlight roofs, with fixed quotes and a warranty on every job.",
    alt: "AutoLine Detailing website. 'Wraps, PPF and starlight roofs. Built in LA.' over a white G-Wagon under hexagon lights.",
    preview: true,
  },
  {
    src: "/work/hand-laid-eggs.webp",
    name: "Hand Laid Eggs",
    kind: "Website",
    stage: "#a8cde0",
    summary:
      "Site for a Newquay surfboard shaper who hand-lays every egg, with a step-by-step board designer and private surf lessons.",
    alt: "Hand Laid Eggs website. 'No kooks. Just eggs.' in a heavy serif over three surfboards standing in a pink arch above the waves.",
    preview: true,
  },
  {
    src: "/work/northview.webp",
    name: "NorthView",
    kind: "Website",
    stage: "#1e88e5",
    summary:
      "Site for a campervan and motorhome repair workshop in East Kilbride, built around booking a diagnostic or getting a quote.",
    alt: "NorthView website. 'Something not right? We'll find it and fix it.' beside photos of vans outside the workshop.",
    preview: true,
  },
  {
    src: "/work/moorland-horseboxes.webp",
    name: "Moorland Horseboxes",
    kind: "Website",
    stage: "#6b1f2a",
    summary:
      "Site for a bespoke horsebox builder in Leek, building coach-built boxes, conversions and repairs from its own workshop since 2001.",
    alt: "Moorland Horseboxes website. 'Built from the floor up.' above a cream coach-built horsebox and a list of builds, conversions and repairs.",
    preview: true,
  },
  {
    src: "/work/garden-getaways.webp",
    name: "Garden Getaways",
    kind: "Website",
    stage: "#9a5a34",
    summary:
      "Site for a Kent garden room builder, from offices and bars to cinemas and outdoor kitchens, every one built on site from the ground up.",
    alt: "Garden Getaways website. 'Garden rooms, built from the ground up.' over a cedar-clad garden room lit at dusk.",
    preview: true,
  },
  {
    src: "/work/cols-campers.webp",
    name: "Col's Campers",
    kind: "Website",
    stage: "#2f5b3c",
    summary:
      "Site for a Southampton workshop making camper furniture and conversions in-house, with every bed, kitchen unit and drawer cut on its own CNC.",
    alt: "Col's Campers website. 'Camper furniture, made to fit your van.' above a fanned row of photos of fitted camper interiors.",
    preview: true,
  },
];
