/* ---------------------------------------------------------------------------
   The service and industry pages: three core services, and the builder
   trades the studio is moving into. One entry per page; the template in
   Landing.tsx, the schema, the sitemap and the share card all read from here.

   Each page is a list of blocks rather than a fixed run of sections, so the
   pages do not all read in the same order and a trade can lead with whatever
   its buyers ask first. The block kinds:

     statement  one large paragraph, set like the About statement
     rows       question or problem on the left, the answer on the right
     list       numbered items in a grid
     prose      a heading held beside running paragraphs
     proof      the pointer into /portfolio
     pricing    the matching packages, read live from services.ts

   Paragraphs may carry inline links as [label](/path). They render as links
   on the page and are stripped to plain text for schema and share cards.

   The builder pages are written in UK English and refer to UK rules (DVLA,
   licence categories, permitted development) because the trades they are
   aimed at are UK businesses. Those rules change: re-read the horsebox and
   garden room answers against GOV.UK before relying on them for a year.

   The builder projects named in the proof blocks are preview sites made for
   real firms, not paid client work, and the copy says so. If a builder
   signs, the wording can change; if one is dropped from work.ts, drop its
   name here too.

   `h1Em` is the set width of the longest headline line in Thunder Bold, in
   em, measured from the shipped font like SET_WIDTH in type.ts. If you
   change a headline, remeasure it.
--------------------------------------------------------------------------- */

import type { LandingSection } from "./landing-index";

export type Heading = [plain: string, accent: string];
export type Row = { h: string; p: string };

export type Block =
  | { kind: "statement"; text: string }
  | { kind: "rows"; title: Heading; intro?: string; rows: Row[] }
  | { kind: "list"; title: Heading; intro?: string; items: Row[] }
  | { kind: "prose"; title: Heading; paragraphs: string[] }
  | { kind: "proof"; title: Heading; text: string }
  | { kind: "pricing"; title: Heading; intro: string; packages: string[] };

export type Landing = {
  slug: string;
  section: LandingSection;
  /* <title> and description, written for search */
  title: string;
  description: string;
  /* the headline, one string per line; the last line takes the accent stop */
  h1: string[];
  h1Em: number;
  lead: string;
  intro: string;
  blocks: Block[];
  faq: { q: string; a: string }[];
  /* slugs from landing-index.ts, in the order they are listed */
  related: string[];
  /* what the Service schema says this page sells */
  service: { type: string; audience?: string; packages: string[] };
};

export const LANDINGS: Landing[] = [
  /* -------------------------------------------------------------------- */
  {
    slug: "web-design",
    section: "services",
    title: "Custom Web Design and Development",
    description:
      "Websites designed from a blank page and built in code, for businesses that have outgrown a template. From $1,500 or $150 a month, live in 1 to 4 weeks.",
    h1: ["Web design", "and development"],
    h1Em: 5.461,
    lead: "A website designed for your business specifically, then built by the same person who designed it.",
    intro:
      "No theme, no page builder, no handoff between a designer and a developer who have never met. One person learns how your customers buy, designs the pages around that, writes the code, and stays on after launch if you want them to.",
    blocks: [
      {
        kind: "statement",
        text: "Most small business websites fail quietly. They look fine, load slowly, say very little, and give a visitor no reason to get in touch. The fix is rarely more pages. It is knowing what the visitor came to find out and putting it where they look first.",
      },
      {
        kind: "rows",
        title: ["Where the", "time goes"],
        intro:
          "A website takes 1 to 4 weeks, and most of that time is not spent writing code. This is what happens, in order.",
        rows: [
          {
            h: "Working out what the site is for",
            p: "Before anything is drawn, we agree what the site has to do: bring in bookings, quote requests or sales, or make a buyer trust you enough to call. Every later decision gets checked against that answer.",
          },
          {
            h: "Structure and words",
            p: "I map out the pages and what each one has to say, then work through the copy with you. If there is no copy yet, I write a first draft from a call and whatever material you have. Most sites are let down by their words long before their design.",
          },
          {
            h: "Design, page by page",
            p: "Each page type is designed on its own, at phone and desktop width, in your brand and with your real content in it. You see actual pages, not a moodboard, and rounds of revisions are part of the price.",
          },
          {
            h: "Build",
            p: "The approved designs are built in code, which is what keeps the pages fast and the design exactly as signed off. Forms, booking, galleries, a CMS for the parts you edit, and any integrations go in at this stage.",
          },
          {
            h: "Testing and launch",
            p: "Every page is checked on real phones and browsers, forms are tested end to end, and the technical SEO is in place before the site goes live. I set up the domain and hosting, or deploy onto yours.",
          },
        ],
      },
      {
        kind: "list",
        title: ["What comes", "with it"],
        items: [
          {
            h: "Design from a blank page",
            p: "No theme bought and recoloured. Layout, type and detail are drawn for your business, so the site does not look like ten thousand others.",
          },
          {
            h: "Phone first",
            p: "Most visitors arrive on a phone, often straight from a search or an ad. Every page is designed and tested at phone width before it is opened out for desktop.",
          },
          {
            h: "Speed",
            p: "Lean pages, images compressed and sized for each screen, and fonts that load without the page jumping. Fast pages keep visitors and help rankings.",
          },
          {
            h: "SEO foundations",
            p: "Page titles and descriptions, one clear heading per page, structured data, a sitemap and alt text on every image. The groundwork search engines need, done from day one.",
          },
          {
            h: "Content you can edit",
            p: "Where you need to change text, add projects or post updates, there is a simple CMS. Where you do not, there is no admin panel to look after.",
          },
          {
            h: "Forms that reach you",
            p: "Contact, quote and booking forms tested end to end, asking for what you need to reply, and landing where you will actually see them.",
          },
          {
            h: "Ownership",
            p: "Your domain, your hosting account, your content. If we ever part ways, you take all of it with you.",
          },
          {
            h: "Support after launch",
            p: "Launch support is included. On monthly pricing, hosting, security updates and a set number of hours of edits each month are covered as well.",
          },
        ],
      },
      {
        kind: "pricing",
        title: ["What it", "costs"],
        intro:
          "Two packages cover almost every website. Both can be paid once, or monthly on a 12 month minimum, where the fee also covers hosting and upkeep.",
        packages: ["Web Presence", "Business Website"],
      },
      {
        kind: "prose",
        title: ["Who it", "suits"],
        paragraphs: [
          "The businesses I build for tend to share one thing: they are good at what they do, and their website does not show it. Trades and builders, clinics, local service firms, product brands, and companies that have grown past the site a friend made for them years ago.",
          "If what you sell is made to order, there is a page written for you: [web design for custom builders](/industries/custom-builders), with pages of their own for [campervan converters](/industries/campervan-converters), [horsebox builders](/industries/horsebox-builders) and [garden room builders](/industries/garden-room-builders).",
          "If you already have a site and it is the problem, see [website redesign](/services/website-redesign). If the problem is the spreadsheets behind the business rather than the website in front of it, see [custom business software](/services/custom-business-software).",
          "Finished work is on the [portfolio](/portfolio), with a link to the live site wherever there is one.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you use WordPress, Wix or Squarespace?",
        a: "Not by default. Sites are built in code, which keeps them faster and lets the design be exactly what was approved. Where you need to edit content yourself, a lightweight CMS is set up for the parts that change.",
      },
      {
        q: "How long does a website take?",
        a: "A landing page usually takes 1 to 2 weeks. A full business website takes 2 to 4 weeks, depending on the number of pages, the features, and how ready your content is.",
      },
      {
        q: "Will I be able to update the site myself?",
        a: "Yes, for anything that changes regularly: projects, news, team, prices, stock. That content sits in a CMS with a simple editor. Layout and design are fixed in code on purpose, so nothing can be broken by accident.",
      },
      {
        q: "Do you write the copy?",
        a: "I can. Most clients send what they have and I shape it into pages, or I write a first draft from a call. Copy written from scratch for a larger site is quoted as part of the scope.",
      },
      {
        q: "Is SEO included?",
        a: "The foundations are: titles and descriptions, heading structure, structured data, a sitemap, fast pages and image alt text. Ongoing SEO, such as new articles every month or link building, is separate work, and I will tell you honestly whether it is worth it for your business.",
      },
      {
        q: "Where are you based, and do you work with clients abroad?",
        a: "The studio is registered in Dubai and works with businesses anywhere, including the UK, Europe and the US. Everything runs over video calls, email and shared documents, and messages are answered the same day.",
      },
      {
        q: "What happens after launch?",
        a: "Launch support covers anything that comes up in the first weeks. After that you can run the site yourself, or stay on monthly pricing, which covers hosting, security updates and a set number of hours of edits each month.",
      },
    ],
    related: ["website-redesign", "custom-business-software", "custom-builders"],
    service: {
      type: "Web design and development",
      packages: ["Web Presence", "Business Website"],
    },
  },

  /* -------------------------------------------------------------------- */
  {
    slug: "website-redesign",
    section: "services",
    title: "Website Redesign Service",
    description:
      "A redesign that keeps what works, fixes what does not, and carries your search rankings safely through the move. Redesigns from $1,500 or $150 a month.",
    h1: ["Website", "redesign"],
    h1Em: 2.896,
    lead: "A new website built on what the old one got right, without losing the rankings and enquiries it already brings in.",
    intro:
      "Redesigns go wrong in a predictable way. A business launches a better looking site and watches enquiries fall, because the pages Google knew moved or vanished overnight. A careful redesign starts with what you have before it touches what you want.",
    blocks: [
      {
        kind: "rows",
        title: ["Signs it is", "time"],
        intro:
          "Looking dated is a reason to redesign, but rarely the main one. These usually are.",
        rows: [
          {
            h: "It is slow on a phone",
            p: "If a page takes more than a few seconds to show anything on mobile data, a share of visitors leave before they see it. Old themes stacked with plugins are the usual cause, and they seldom get faster with tweaks.",
          },
          {
            h: "It no longer says what you do",
            p: "The business moved on and the site did not. New services sit on a page nobody finds, the best work is missing, and the prices or process are out of date.",
          },
          {
            h: "Visitors do not get in touch",
            p: "Traffic arrives and enquiries do not. The cause is usually a missing next step: no clear call to action, a form that asks too much, or nothing that answers what a buyer wants to know before they contact you.",
          },
          {
            h: "You cannot edit it",
            p: "Every small change means emailing someone, or logging into a builder that breaks the layout the moment you touch it.",
          },
          {
            h: "It runs on something you cannot trust",
            p: "An abandoned theme, plugins nobody updates, a developer who disappeared with the logins. Sites like that are a security problem waiting for a date.",
          },
        ],
      },
      {
        kind: "list",
        title: ["Keeping your", "rankings"],
        intro:
          "Most of the risk in a redesign sits in the move, not the design. This is how the move is handled.",
        items: [
          {
            h: "An audit first",
            p: "Before anything is designed, every page on the old site is listed with its traffic, whether it is indexed, and whether it brings in enquiries. The pages that earn their keep are protected.",
          },
          {
            h: "Addresses that stay or redirect",
            p: "Pages that keep their address keep it. Pages that move get a permanent 301 redirect to their new home, one by one, so links and rankings carry across instead of ending at an error page.",
          },
          {
            h: "Content kept, then improved",
            p: "Copy that ranks is not thrown away for something shorter and prettier. It is kept, tightened, and given better structure.",
          },
          {
            h: "Technical SEO rebuilt",
            p: "Titles, descriptions, headings, structured data and a fresh sitemap on launch day, submitted to Google Search Console so the new pages are picked up quickly.",
          },
          {
            h: "Watched after launch",
            p: "For the weeks after launch I check for broken links, missed redirects and crawl errors, and fix them as they show up.",
          },
        ],
      },
      {
        kind: "statement",
        text: "A redesign does not have to happen all at once. Sometimes the right answer is a new home page and two rebuilt service pages, with the rest to follow. If that is the case, you will be told.",
      },
      {
        kind: "pricing",
        title: ["What it", "costs"],
        intro:
          "Redesigns are priced on the same packages as new sites, by the number of pages and what they need to do. Smaller redesigns sit in Web Presence, larger ones in Business Website.",
        packages: ["Web Presence", "Business Website"],
      },
      {
        kind: "prose",
        title: ["Page by", "page"],
        paragraphs: [
          "Not every site needs to start over. An existing site can be rebuilt page by page, or extended with new sections and tools, so the business keeps running on the old site while the new one comes together.",
          "If you build to order and your site does not show the work properly, the page on [web design for custom builders](/industries/custom-builders) covers what that kind of site needs. For a site built from nothing, see [web design and development](/services/web-design).",
          "Redesigns sit alongside new builds on the [portfolio](/portfolio).",
        ],
      },
    ],
    faq: [
      {
        q: "Will I lose my Google rankings?",
        a: "Not if the move is handled properly. Rankings drop in redesigns when pages disappear without redirects, or when the content that ranked gets cut. Every old address is mapped to a new one before launch, and the site is watched closely afterwards.",
      },
      {
        q: "Can I keep my domain and email?",
        a: "Yes. The domain stays yours and email carries on as it is. Only the website moves; email runs on separate records, which are left as they are.",
      },
      {
        q: "Can you redesign without changing my branding?",
        a: "Yes. Plenty of redesigns keep the logo and colours and change everything around them: layout, type, structure and copy. If the brand needs a refresh too, it can be folded into the same project.",
      },
      {
        q: "Do I need new photos?",
        a: "Often, though not always. Good photography makes more difference to a redesign than almost anything else. I will tell you which of your current photos hold up and where new ones would pay off.",
      },
      {
        q: "How long does a redesign take?",
        a: "Usually 2 to 4 weeks, depending on the number of pages and how ready the content is. Large sites with a lot to migrate are scheduled in phases.",
      },
      {
        q: "What happens to my old site?",
        a: "It stays live until the new one launches, so there is no gap. After launch it is retired, with a redirect in place for every page that moved.",
      },
    ],
    related: ["web-design", "custom-business-software", "custom-builders"],
    service: {
      type: "Website redesign",
      packages: ["Web Presence", "Business Website"],
    },
  },

  /* -------------------------------------------------------------------- */
  {
    slug: "custom-business-software",
    section: "services",
    title: "Custom Business Software and Internal Tools",
    description:
      "Dashboards, CRMs, quoting tools and job trackers built around how your business works, so the spreadsheets can retire. From $4,000, or $400 a month.",
    h1: ["Custom", "business", "software"],
    h1Em: 3.177,
    lead: "Internal tools built around how your business actually works, so the spreadsheets can finally retire.",
    intro:
      "Growing businesses end up running on a patchwork: a spreadsheet for quotes, another for stock, a whiteboard for who is doing what, and a lot of copying between them. Off-the-shelf software asks you to change how you work. A custom tool works the other way round.",
    blocks: [
      {
        kind: "statement",
        text: "If two people on your team have ever had different versions of the same spreadsheet open at once, you already know what this is for.",
      },
      {
        kind: "list",
        title: ["What gets", "built"],
        intro:
          "Each tool is put together from modules. Most businesses need three to eight of them.",
        items: [
          {
            h: "Dashboards",
            p: "The numbers you check every morning, on one screen: sales, jobs in progress, overdue invoices, stock running low.",
          },
          {
            h: "CRMs",
            p: "Every customer, enquiry and conversation in one place, with a pipeline that shows what is waiting on whom.",
          },
          {
            h: "Quoting tools",
            p: "Pick the options and get a priced quote and a PDF, using your own prices and rules. No more rebuilding a quote from last month's file.",
          },
          {
            h: "Job and build trackers",
            p: "Each job from deposit to handover, with stages, dates, parts and who is on it. Made for businesses working through a queue of builds.",
          },
          {
            h: "Stock and parts",
            p: "What you have, where it is, what is set aside for which job, and what needs ordering.",
          },
          {
            h: "Reports and PDFs",
            p: "Monthly reports, job sheets, invoices or certificates generated from the data instead of typed out by hand.",
          },
          {
            h: "Roles and permissions",
            p: "Staff see what they need and nothing else. Owners see everything.",
          },
          {
            h: "Customer portals",
            p: "Where it helps, customers log in to see their order, build progress, documents or photos, which saves a great many phone calls.",
          },
        ],
      },
      {
        kind: "rows",
        title: ["How it comes", "together"],
        intro:
          "Custom software gets its bad name from projects that run for a year and miss the point. These are kept short, phased, and grounded in how your team works today.",
        rows: [
          {
            h: "Learning the current process",
            p: "Work starts with how things run now: the spreadsheets, the forms, the shortcuts people take. The tool is designed around the real process, not an idealised one.",
          },
          {
            h: "A fixed scope, in writing",
            p: "One proposal lists every module, what it does, the price and the schedule. Once it is signed, the number does not move.",
          },
          {
            h: "Built in phases",
            p: "The most painful part gets built first, so the team is using something real early on rather than waiting for everything at once.",
          },
          {
            h: "Your data moved across",
            p: "Existing spreadsheets and records are migrated into the new system, checked, and cleaned up on the way in.",
          },
          {
            h: "Handover and training",
            p: "A walkthrough for your team, written notes for the parts people forget, and support while it beds in.",
          },
        ],
      },
      {
        kind: "pricing",
        title: ["What it", "costs"],
        intro:
          "Tools are priced by the number of modules and how involved they are. If the website needs rebuilding too, the two can be built together as one system.",
        packages: ["Custom Business Tool", "Complete Digital System"],
      },
      {
        kind: "prose",
        title: ["For people who", "build things"],
        paragraphs: [
          "A lot of the studio's work is with made-to-order businesses, and they run into the same walls: a waiting list nobody else can see, a quote rebuilt by hand for every enquiry, and build progress chased by phone. A build tracker with a customer portal, and a quoting tool that knows your options and prices, take care of most of it.",
          "If that sounds familiar, the page on [web design for custom builders](/industries/custom-builders) covers how the website and the tool behind it work as one system. For the website on its own, see [web design and development](/services/web-design).",
        ],
      },
    ],
    faq: [
      {
        q: "Why not use off-the-shelf software?",
        a: "Often you should. If a well-known product fits how you work, use it, and I will say so. A custom tool makes sense when you are bending your process to fit the software, paying for five subscriptions that do not talk to each other, or running the business on spreadsheets only one person understands.",
      },
      {
        q: "How long does it take to build?",
        a: "It depends on the number of modules. The proposal sets out a fixed schedule before work starts, and the build is phased so the first module is in use early rather than everything landing at the end.",
      },
      {
        q: "Can it connect to the tools we already use?",
        a: "Usually, yes. Accounting software, payment providers, email, calendars and most tools with an API can be connected, so data is entered once and goes where it needs to.",
      },
      {
        q: "Is our data secure?",
        a: "Access sits behind logins with roles and permissions, data is backed up, and the system runs on hosting built for it. On monthly pricing, hosting, backups and monitoring are included.",
      },
      {
        q: "Who owns the data?",
        a: "You do, and it can be exported at any time. How the code itself is handed over is set out in the proposal before anything is signed.",
      },
      {
        q: "What if we need changes later?",
        a: "Businesses change and the tool should change with them. On monthly pricing, a set number of hours of fixes and changes each month is included. Otherwise, changes are quoted as they come up.",
      },
    ],
    related: ["web-design", "custom-builders", "website-redesign"],
    service: {
      type: "Custom business software development",
      packages: ["Custom Business Tool", "Complete Digital System"],
    },
  },

  /* -------------------------------------------------------------------- */
  {
    slug: "custom-builders",
    section: "industries",
    title: "Web Design for Custom Builders",
    description:
      "Websites for businesses that build to order: campervan converters, horsebox builders, garden room builders and other bespoke makers.",
    h1: ["Websites for", "custom builders"],
    h1Em: 5.459,
    lead: "Websites for businesses that build to order, where every sale starts as a conversation and ends months later with a handover.",
    intro:
      "Campervan converters, horsebox builders, garden room and cabin makers, shepherd hut workshops. Different trades with the same problem online: a product made to order, costing as much as a car or more, researched for weeks before anyone picks up the phone.",
    blocks: [
      {
        kind: "statement",
        text: "Someone spending twenty or eighty thousand pounds on a thing that does not exist yet is not buying from a photo. They are buying from the build they saw last spring, the spec sheet they read twice, and the sense that the people behind it know exactly what they are doing.",
      },
      {
        kind: "rows",
        title: ["How builders", "lose buyers"],
        intro:
          "Builder websites tend to fail in the same places. Each one costs enquiries, and each has a plain fix.",
        rows: [
          {
            h: "The builds are buried",
            p: "The work is the best sales tool a builder has, and it usually sits in a Facebook album or one gallery of unlabelled photos. Every build deserves a page of its own: the layout, the spec, the photos in order, and what the customer asked for.",
          },
          {
            h: "Nobody can tell what anything costs",
            p: "Buyers do not need a fixed price, but they do need a range. Without one, the serious ones assume you are out of reach and the time-wasters call anyway. A 'builds from' figure with real examples filters better than any form.",
          },
          {
            h: "The enquiry form asks for nothing",
            p: "A name and a message tells you almost nothing about a forty thousand pound project. A good form asks what you would ask on the phone, such as size, base vehicle, budget and timing, without feeling like a tax return.",
          },
          {
            h: "The waiting list is invisible",
            p: "If you are booked six months out, say so. Buyers plan around lead times, and an honest 'now taking builds for spring' sells slots better than silence.",
          },
          {
            h: "It looks nothing like the work",
            p: "Builders who obsess over joinery and finish often have websites that look like a template from 2014. The site is the first sample of your standards a buyer ever sees.",
          },
        ],
      },
      {
        kind: "prose",
        title: ["A longer", "sale"],
        paragraphs: [
          "A builder's website is not judged in one visit. Someone serious about a horsebox or a conversion comes back five, ten, twenty times over a season, from different devices, often with someone else looking over their shoulder. Every return visit either moves them closer or loses them to a builder whose site answers a question yours does not.",
          "That changes what the site needs: less slogan and more detail. Pages worth rereading, such as a spec that holds up to scrutiny, builds written up properly, and prices that set expectations. And a clear way to get in touch at the moment they are ready, which is rarely the first visit.",
          "It also changes how the site is judged. One that is doing its job brings in fewer enquiries from people who were never going to buy, and more from people who already know what they want and roughly what it costs.",
        ],
      },
      {
        kind: "list",
        title: ["What the site", "is built around"],
        items: [
          {
            h: "A build archive",
            p: "Every finished build on its own page, filterable by type or layout, with a proper write-up. It is the strongest proof you have, and it is what people search for.",
          },
          {
            h: "Models and spec sheets",
            p: "Standard layouts or models each get a page with dimensions, options, and a spec sheet a buyer can download and read properly.",
          },
          {
            h: "An enquiry that qualifies",
            p: "A short stepped form that gathers the brief: what, how big, when, and roughly what budget. Every conversation starts with you already knowing what they want.",
          },
          {
            h: "Build slots and lead times",
            p: "A line or calendar showing when the next build can start, which you can update yourself in seconds.",
          },
          {
            h: "Stock and used units",
            p: "Ready-to-go builds, ex-demo units and part-exchanges with prices, because a buyer who cannot wait is still a buyer.",
          },
          {
            h: "The workshop and the people",
            p: "Who builds it, where, and how. Made-to-order buyers want to meet the maker, and a good workshop page does much of that before the first visit.",
          },
        ],
      },
      {
        kind: "prose",
        title: ["The trades", "covered"],
        paragraphs: [
          "[Campervan converters](/industries/campervan-converters): full conversions, pop-tops and day vans, where buyers want to see layouts, understand re-registration, and get on a build list.",
          "[Horsebox builders](/industries/horsebox-builders): 3.5 and 7.5 tonne coachbuilds, where payload, licence categories and living spec decide the sale.",
          "[Garden room builders](/industries/garden-room-builders): garden offices, studios and annexes, where planning, sizes and finished examples answer most questions before the survey visit.",
          "Shepherd huts, tiny homes, boat fit-outs, bespoke kitchens and other made-to-order trades follow the same pattern. If yours is not listed, [get in touch](/contact); the same thinking applies.",
        ],
      },
      {
        kind: "proof",
        title: ["Builder", "sites"],
        text: "The [portfolio](/portfolio) includes preview sites made for real UK builders, among them All About Campers, Paramount Campers, Col's Campers, Moorland Horseboxes and Garden Getaways. Each is a working site, not a mockup, built around that builder's own work.",
      },
      {
        kind: "pricing",
        title: ["What it", "costs"],
        intro:
          "Most builder sites fall into the Business Website package: several page types, a build archive, models and an enquiry flow. Builders who want a quoting tool or build tracker behind the site take the complete system.",
        packages: ["Web Presence", "Business Website", "Complete Digital System"],
      },
    ],
    faq: [
      {
        q: "Do you only work with builders?",
        a: "No, the studio builds for all kinds of businesses. But made-to-order builders are a focus, so the questions, page structures and features that work for them are already worked out.",
      },
      {
        q: "Can I update my builds and stock myself?",
        a: "Yes. Builds, models, stock and the lead time line are all edited in a simple CMS. Adding a finished build means uploading the photos and filling in a few fields.",
      },
      {
        q: "Should I put prices on my website?",
        a: "In almost every case some indication of price helps. 'From' figures and worked examples filter out the wrong enquiries and reassure the right ones. Exactly how much to show is something we decide together.",
      },
      {
        q: "Can you add a configurator?",
        a: "Yes. It can be anything from a step-by-step builder that produces an estimate and an enquiry, up to a visual configurator. The simple version is often the better investment, and it can be extended later.",
      },
      {
        q: "I do not have good photos of my builds. Is that a problem?",
        a: "It is the most common gap. I will help plan what to shoot and how, so every new build is photographed in a way the site can use. Existing photos can often carry the launch.",
      },
      {
        q: "Can you help me get found on Google?",
        a: "Every site is built with proper technical SEO and a page structure that matches what buyers search for: a page per model, per build type and per service. Builder trades are niche, and well-structured pages compete well in them.",
      },
    ],
    related: [
      "campervan-converters",
      "horsebox-builders",
      "garden-room-builders",
      "custom-business-software",
    ],
    service: {
      type: "Web design for custom builders",
      audience: "Custom and made-to-order builders",
      packages: ["Web Presence", "Business Website", "Complete Digital System"],
    },
  },

  /* -------------------------------------------------------------------- */
  {
    slug: "campervan-converters",
    section: "industries",
    title: "Web Design for Campervan Converters",
    description:
      "Websites for campervan conversion companies: builds by layout and base van, spec sheets, enquiry forms that capture the brief, and build slots buyers can plan around.",
    h1: ["Web design for", "campervan", "converters"],
    h1Em: 4.64,
    lead: "Websites for campervan conversion companies, built to show every layout properly and keep the build list full.",
    intro:
      "Whether you convert one van a month or run a workshop with a queue into next year, buyers find you the same way: on a phone, late in the evening, comparing your builds against a dozen others before deciding who to message.",
    blocks: [
      {
        kind: "statement",
        text: "Nobody books a conversion from one photo of a bed. They want the layout from the back doors, the kitchen with the worktop extended, the seats in travel mode, and the van parked up in Snowdonia looking like the weekend they are planning.",
      },
      {
        kind: "rows",
        title: ["What buyers", "need to see"],
        intro:
          "Campervan buyers do a lot of homework. A site that answers these questions upfront brings in fewer, better enquiries.",
        rows: [
          {
            h: "Layouts, not just photos",
            p: "Rock and roll bed or fixed bed, side kitchen or rear, two berth or four. Each layout gets its own page with a floor plan, photos taken in a consistent order, and the options that go with it.",
          },
          {
            h: "The base vehicle",
            p: "Transporter, Trafic, Vivaro, Transit Custom, Sprinter, Crafter, Ducato. Buyers often start from the van they own or the one they want, so builds filterable by base vehicle match how they search.",
          },
          {
            h: "Their van or yours",
            p: "Can they bring their own van, or do you source one? Is anything ready to go now? This decides whether a buyer can work with you at all, so it belongs near the top, not buried in the FAQ.",
          },
          {
            h: "What is behind the panels",
            p: "Insulation, ply lining, electrics, leisure battery and solar, heating, water. Serious buyers care about the parts they will never see, and a clear build spec shows them.",
          },
          {
            h: "Seats, belts and registration",
            p: "Questions about crash-tested seating, and whether the van can be re-registered with the DVLA as a motor caravan, come up constantly. A page that explains your approach honestly, without overpromising, saves hours on the phone.",
          },
          {
            h: "Price and lead time",
            p: "A realistic 'conversions from' figure for each layout, and an honest line on when the next build slot opens. Both filter enquiries better than any form field.",
          },
        ],
      },
      {
        kind: "rows",
        title: ["From first look", "to handover"],
        intro:
          "A conversion sale runs for months. The site can carry a buyer through every stage of it, not only the first visit.",
        rows: [
          {
            h: "The first evening",
            p: "They land from a search or an Instagram post and look at two or three builds. The job here is plain: show the best work fast, on a phone, and make the layouts easy to tell apart.",
          },
          {
            h: "Coming back",
            p: "Most buyers return several times before they get in touch, often with a partner looking over their shoulder. Layout pages, a clear spec and a price guide give them something to compare and talk over.",
          },
          {
            h: "The enquiry",
            p: "When they are ready, the form gathers the brief, so your first reply can be useful rather than a list of questions.",
          },
          {
            h: "The wait",
            p: "Between deposit and build there can be months. A private build page, or a short update when work starts, keeps a buyer excited rather than anxious.",
          },
          {
            h: "Handover and after",
            p: "Manuals, wiring diagrams, warranty details and a how-to for the heater, in one place online instead of a folder in the glovebox. Happy owners then become the reviews and photos the next buyer looks at.",
          },
        ],
      },
      {
        kind: "list",
        title: ["What the site", "does"],
        items: [
          {
            h: "Builds by layout and van",
            p: "Every finished conversion on its own page, filterable by layout and base vehicle, with a write-up of what the customer asked for.",
          },
          {
            h: "Layout pages with floor plans",
            p: "One page per standard layout: plan, photos, dimensions, options and a price guide.",
          },
          {
            h: "A stepped enquiry form",
            p: "Van, layout, berths, must-haves, timing and budget, asked one at a time on a phone. You get a usable brief instead of 'how much for a camper?'.",
          },
          {
            h: "Build slots",
            p: "A line or calendar showing when the next conversion can start, which you update yourself.",
          },
          {
            h: "Vans for sale",
            p: "Ready-to-go campers and ex-hire vans with prices, spec and photos, for buyers who cannot wait for a slot.",
          },
          {
            h: "Build diaries",
            p: "Optional progress posts for each van. Good for the customer, good for search, and a steady supply of material for social.",
          },
        ],
      },
      {
        kind: "prose",
        title: ["How buyers", "search"],
        paragraphs: [
          "People search for exactly what they want: 'T6 campervan conversion', 'Sprinter conversion with fixed bed', 'pop top fitting'. A site with a page per layout, per base vehicle and per service answers those searches directly, which one gallery page never can.",
          "Pop-top fitting, part conversions, day vans, hire and servicing can each have a page of their own if you offer them. Every genuinely useful page is another way in from search.",
          "The technical groundwork comes with every site: fast pages, clean titles and descriptions, structured data, image alt text that names the van and layout, and a sitemap ready for Google Search Console.",
        ],
      },
      {
        kind: "proof",
        title: ["Campervan", "sites"],
        text: "Preview sites for All About Campers, Paramount Campers and Col's Campers are on the [portfolio](/portfolio). Each one is a working site built around that converter's own vans.",
      },
      {
        kind: "pricing",
        title: ["What it", "costs"],
        intro:
          "A one or two person workshop with a few layouts often fits Web Presence. Converters with a build archive, vans for sale and several layouts usually need a Business Website. Both can be paid once or monthly.",
        packages: ["Web Presence", "Business Website"],
      },
    ],
    faq: [
      {
        q: "Do you only build for big conversion companies?",
        a: "No. Some of the best converters are one or two people in a unit, and a smaller site with three strong pages often does more for them than a big one.",
      },
      {
        q: "Can I add new builds myself?",
        a: "Yes. Finished builds, vans for sale and the next build slot are all edited in a simple CMS. Add the photos, fill in the van and the layout, and publish.",
      },
      {
        q: "Can the site take deposits?",
        a: "It can, through a payment provider such as Stripe. Most converters prefer to take a deposit after a conversation rather than online, and the site can support either.",
      },
      {
        q: "Should I explain DVLA re-registration on my site?",
        a: "If buyers ask you about it, yes. A plain explanation of how you approach it, what you can and cannot promise, and what is down to the owner builds trust and filters out anyone expecting a guarantee.",
      },
      {
        q: "What about hire campervans?",
        a: "If you hire vans as well as building them, hire can live on the same site with its own pages and booking, or link out to the booking system you already use.",
      },
      {
        q: "I mostly sell through Instagram. Do I need a website?",
        a: "Instagram is good at getting attention and bad at holding detail. A website gives your builds, layouts and prices a permanent home, shows up in Google, and gives buyers somewhere to send a proper enquiry. The two work best together.",
      },
    ],
    related: ["horsebox-builders", "garden-room-builders", "custom-builders", "web-design"],
    service: {
      type: "Web design for campervan converters",
      audience: "Campervan conversion companies",
      packages: ["Web Presence", "Business Website"],
    },
  },

  /* -------------------------------------------------------------------- */
  {
    slug: "horsebox-builders",
    section: "industries",
    title: "Website Design for Horsebox Builders",
    description:
      "Websites for horsebox builders and coachbuilders: models by weight class, payload shown clearly, used stock, part-exchange, and enquiry forms that capture the build.",
    h1: ["Website design", "for horsebox", "builders"],
    h1Em: 4.614,
    lead: "Websites for horsebox builders, from 3.5 tonne boxes to 7.5 tonne coachbuilds with full living.",
    intro:
      "A horsebox is bought by people who know exactly what they need: how many horses, which way they travel, what they weigh, and who will be driving. A good builder website answers all of that before the first call, and shows the build quality that justifies the price.",
    blocks: [
      {
        kind: "statement",
        text: "Horse owners do not buy on looks. They buy on payload, on how the ramp sits on a slope, on whether the partitions will hold a horse that travels badly, and on a builder they trust to stand behind the box for years.",
      },
      {
        kind: "rows",
        title: ["What buyers", "check first"],
        intro:
          "These are the questions buyers ask on the phone. A site that answers them is having the first conversation for you.",
        rows: [
          {
            h: "Weight class and licence",
            p: "A 3.5 tonne box can be driven on a standard car licence. A 7.5 tonne box needs C1, which many younger drivers do not have. Models arranged by weight class, each with the licence it needs, put buyers on the right page straight away.",
          },
          {
            h: "Payload, stated honestly",
            p: "Overloaded horseboxes are a known problem, and experienced buyers ask for weighbridge figures. A realistic payload for each model, and what it means in horses and kit, builds more trust than any amount of polished copy.",
          },
          {
            h: "Stalls and travel direction",
            p: "One horse or four, forward or rear facing, herringbone, stallion partitions. Each model needs a clear plan of the stalls with dimensions.",
          },
          {
            h: "Living and groom areas",
            p: "Living spec is where 7.5 tonne builds vary most: seating, beds, kitchen, shower, luton. Photographed properly and in order, it is what sells the higher-end boxes.",
          },
          {
            h: "Chassis and build",
            p: "The base chassis, what the body is made of, the floor, the ramp, the safety features. Experienced buyers read every word of this section.",
          },
          {
            h: "Used and part-exchange",
            p: "Many buyers are trading up from a smaller box. Clear used stock and a simple part-exchange enquiry keep them on your site instead of a classifieds page.",
          },
        ],
      },
      {
        kind: "list",
        title: ["Built into", "the site"],
        items: [
          {
            h: "Models by weight class",
            p: "Sections for 3.5 tonne, 7.5 tonne and larger, each with model pages showing plans, payload, spec and a price guide.",
          },
          {
            h: "Custom build enquiries",
            p: "A stepped form for bespoke builds: weight, horses, stall layout, living, chassis preference, timing and budget.",
          },
          {
            h: "Stock and used boxes",
            p: "Ready-to-go and used horseboxes with prices, photos, weights and spec, kept up to date by you.",
          },
          {
            h: "Part-exchange",
            p: "A short form for the box they own now, with photos, so you can come back with a figure.",
          },
          {
            h: "A build gallery",
            p: "Finished builds with full write-ups. Useful to buyers, and each one a page that can rank in search.",
          },
          {
            h: "Shows and viewings",
            p: "Where you are exhibiting next and how to book a viewing at the yard. Plenty of horsebox sales start at a show.",
          },
        ],
      },
      {
        kind: "list",
        title: ["Shots that", "sell boxes"],
        intro:
          "Photos do most of the selling on a horsebox site, and most builders under-shoot the parts buyers check. A shot list for every finished build:",
        items: [
          {
            h: "Ramp down, from the side",
            p: "Shows the ramp angle and the entrance height, which owners of big or nervous horses look for first.",
          },
          {
            h: "Partitions in every position",
            p: "Open, closed, swung over for a mare and foal. Buyers want to see how the space changes.",
          },
          {
            h: "The living, from the door",
            p: "Shot the way someone sees it stepping in, then the details: the kitchen, the seating made up as a bed, the shower.",
          },
          {
            h: "Lockers and storage, open",
            p: "Tack lockers, saddle racks, the water tank. Storage is a quiet deciding factor.",
          },
          {
            h: "Chassis and underside",
            p: "The chassis plate and the build underneath. Experienced buyers look anyway, and showing it first signals confidence.",
          },
          {
            h: "Out doing its job",
            p: "One or two shots of the box at a show or an event, so a buyer can picture their own season in it.",
          },
        ],
      },
      {
        kind: "prose",
        title: ["Found by the", "right buyers"],
        paragraphs: [
          "Buyers search by weight and type: '3.5 tonne horsebox with living', '7.5 tonne horsebox builders', 'used horseboxes for sale'. A site with a page per weight class, per model and per service matches those searches directly.",
          "If you also service, repair or refurbish horseboxes, those get pages of their own. They bring in a different kind of search, and many future buyers start out as service customers.",
          "The technical groundwork comes with every site: pages that load quickly on patchy signal at a yard or showground, clean titles and descriptions, structured data, and image descriptions that name the model and layout.",
        ],
      },
      {
        kind: "proof",
        title: ["Horsebox", "sites"],
        text: "A preview site for Moorland Horseboxes is on the [portfolio](/portfolio), built around their own boxes.",
      },
      {
        kind: "pricing",
        title: ["What it", "costs"],
        intro:
          "Most horsebox builders need a Business Website: models, stock and a proper enquiry flow. Builders who also want a quoting tool or build tracker behind it take the complete system.",
        packages: ["Business Website", "Complete Digital System"],
      },
    ],
    faq: [
      {
        q: "Can each model show its own spec?",
        a: "Yes. Each model has its own page with its spec, plan, payload and options, all edited in a CMS. Change a spec once and it updates everywhere it appears.",
      },
      {
        q: "Can I list used horseboxes myself?",
        a: "Yes. A used box takes photos, weight, year, spec and price. Mark it sold when it goes.",
      },
      {
        q: "Should I publish payload figures?",
        a: "If you can stand behind them, yes. Buyers increasingly ask, and a builder who shows plated weights and realistic payloads looks more trustworthy than one who does not. How to present them is something we work out together.",
      },
      {
        q: "Can buyers configure a horsebox online?",
        a: "They can. A step-by-step builder that produces a priced estimate and an enquiry is usually the right place to start. A visual configurator can follow later.",
      },
      {
        q: "Do you build sites for horse trailer manufacturers too?",
        a: "Yes. Trailer manufacturers and dealers need much the same: models, specs, weights and stock. The same structure works.",
      },
      {
        q: "Can the site cover refurbishments as well as new builds?",
        a: "Yes. New builds, refurbishments, repairs and servicing can each have their own section, with the enquiry form changing to match what the visitor needs.",
      },
    ],
    related: [
      "campervan-converters",
      "garden-room-builders",
      "custom-builders",
      "custom-business-software",
    ],
    service: {
      type: "Web design for horsebox builders",
      audience: "Horsebox builders and coachbuilders",
      packages: ["Business Website", "Complete Digital System"],
    },
  },

  /* -------------------------------------------------------------------- */
  {
    slug: "garden-room-builders",
    section: "industries",
    title: "Website Design for Garden Room Builders",
    description:
      "Websites for garden room, garden office and log cabin builders: finished rooms by use, size and price guides, planning explained, and enquiries ready for a survey.",
    h1: ["Website design", "for garden", "room builders"],
    h1Em: 4.711,
    lead: "Websites for garden room builders, made to turn a vague idea about a garden office into a booked site survey.",
    intro:
      "Most garden room buyers start with a feeling rather than a spec: somewhere quiet to work, a gym that is not the spare room, a studio at the end of the garden. The site's job is to turn that feeling into a size, a budget and an enquiry, and to answer the planning question before it puts them off.",
    blocks: [
      {
        kind: "statement",
        text: "Every garden room buyer asks the same three things. Do I need planning, what will it cost, and how long will my garden be a building site. A website that answers all three clearly is already ahead of most of its competitors.",
      },
      {
        kind: "rows",
        title: ["What buyers", "want answered"],
        intro:
          "These questions come up on every survey visit. A site that answers them upfront brings in buyers who are ready to talk.",
        rows: [
          {
            h: "Do I need planning permission?",
            p: "Most garden rooms in England fall under permitted development, within limits on height, position and how much of the garden they cover. Rooms for sleeping in are a different matter. A clear, careful explainer, with a prompt to check their own situation, removes the biggest reason people hesitate.",
          },
          {
            h: "Building regulations",
            p: "Size and use decide whether building regulations apply. A room under 15 square metres with no sleeping accommodation is generally exempt; between 15 and 30 it depends on the distance to the boundary and what it is built from. Buyers want to know you know this.",
          },
          {
            h: "What does a room this size cost?",
            p: "Price guides by size and spec do more filtering than anything else on a garden room site. 'A 4 by 3 metre insulated office, fully fitted, from' with a real example is worth a page of adjectives.",
          },
          {
            h: "What can it be used for?",
            p: "Office, gym, studio, garden bar, treatment room, somewhere for the teenagers. People search by use, so finished rooms grouped by use help them picture their own.",
          },
          {
            h: "How it is built",
            p: "Base or ground screws, frame, insulation, cladding, roof, glazing, electrics. Buyers comparing quotes compare build specs, so show yours properly.",
          },
          {
            h: "How long it takes",
            p: "From survey to finished room, and how many days the install takes on site. Lead times move through the year, so a line you can update yourself is ideal.",
          },
        ],
      },
      {
        kind: "list",
        title: ["On the", "site"],
        items: [
          {
            h: "Rooms by use",
            p: "Finished projects grouped by office, gym, studio and more, each with photos, size, spec and the customer's brief.",
          },
          {
            h: "Ranges and sizes",
            p: "Standard designs each get a page with sizes, options, plans and a price guide.",
          },
          {
            h: "A planning explainer",
            p: "A plain-English page on permitted development and building regulations, written carefully and kept current. It answers the biggest objection and is searched for constantly.",
          },
          {
            h: "A stepped enquiry form",
            p: "Use, rough size, garden access, power, timing and budget, asked a step at a time. The answers arrive ready for a survey.",
          },
          {
            h: "Show sites and visits",
            p: "Where buyers can stand in a finished room, with opening times and a booking form.",
          },
          {
            h: "A size and price estimator",
            p: "Optional: pick a size and spec, get an estimate, send an enquiry. Simple to begin with, and it can grow.",
          },
        ],
      },
      {
        kind: "list",
        title: ["Shots that", "sell rooms"],
        intro:
          "Garden rooms photograph badly when they are shot like sheds. A shot list for every finished project:",
        items: [
          {
            h: "From the house",
            p: "The view down the garden to the room, the way the owner will see it from the kitchen window every day.",
          },
          {
            h: "From inside, looking out",
            p: "The desk or the bench with the garden beyond it. This is the photo that sells the feeling.",
          },
          {
            h: "At dusk, lights on",
            p: "A lit room at the end of a dark garden is the most shared image in the trade, and for good reason.",
          },
          {
            h: "The build in progress",
            p: "Base, frame, insulation going in. Buyers comparing specs want proof of what sits behind the cladding.",
          },
          {
            h: "In use",
            p: "A real office with the laptop open, a gym with the rack loaded. Empty rooms look smaller than they are.",
          },
          {
            h: "Before",
            p: "That corner of the garden as it was. A before and after pair does more than either photo alone.",
          },
        ],
      },
      {
        kind: "proof",
        title: ["Garden room", "sites"],
        text: "A preview site for Garden Getaways is on the [portfolio](/portfolio), built around their own finished rooms.",
      },
      {
        kind: "prose",
        title: ["Getting", "found"],
        paragraphs: [
          "Garden room buyers search by use and by size: 'garden office with toilet', 'insulated garden room 4x3', 'garden gym builders'. A page per use and per range answers those searches far better than one gallery.",
          "The planning and building regulations questions are searched all year round. A well-written explainer brings people in at the very start of their research, months before they are ready to buy, and makes you the builder they already trust when they are.",
          "Log cabins, garden studios, annexes and summer houses can each have a section of their own if you build them. The technical groundwork comes with every site: fast pages, clean titles and descriptions, structured data, and image descriptions that say what each room is.",
        ],
      },
      {
        kind: "pricing",
        title: ["What it", "costs"],
        intro:
          "A smaller installer with one range might fit Web Presence. Builders with several ranges, a project archive and a planning explainer usually need a Business Website.",
        packages: ["Web Presence", "Business Website"],
      },
    ],
    faq: [
      {
        q: "Can you write the planning permission page?",
        a: "I can write a first draft in plain English from the government's own guidance, for you to check against your experience. It should always tell buyers to confirm their own situation, especially on designated land or with a listed building.",
      },
      {
        q: "Can I add finished projects myself?",
        a: "Yes. Photos, size, use, spec and a short write-up, entered in a simple CMS. Each project becomes a page of its own.",
      },
      {
        q: "Should I show prices?",
        a: "Some indication of price almost always helps. 'From' figures by size, with worked examples, filter out enquiries that will never go ahead and reassure the ones that will.",
      },
      {
        q: "Can buyers book a site survey online?",
        a: "Yes. The enquiry form can end in a survey booking, linked to a calendar you already use or a simple one built in.",
      },
      {
        q: "Do you build for log cabin and shepherd hut makers too?",
        a: "Yes. The structure is much the same: ranges, sizes, finished examples, planning and an enquiry flow. The page on [web design for custom builders](/industries/custom-builders) covers the wider picture.",
      },
      {
        q: "Can the site cover the areas we install in?",
        a: "Yes. If you install across several counties, the site can say so clearly and include pages for the areas you work in most, written with real local detail rather than copies with the town name swapped.",
      },
    ],
    related: ["campervan-converters", "horsebox-builders", "custom-builders", "web-design"],
    service: {
      type: "Web design for garden room builders",
      audience: "Garden room, garden office and log cabin builders",
      packages: ["Web Presence", "Business Website"],
    },
  },
];

export function getLanding(section: LandingSection, slug: string) {
  return LANDINGS.find((l) => l.section === section && l.slug === slug);
}

/* "[label](/path)" -> "label", for schema, metadata and share cards */
export const plainText = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
