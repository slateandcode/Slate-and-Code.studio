/* ---------------------------------------------------------------------------
   The service and industry pages, as a list of names and addresses only.

   Kept apart from the page copy in landing.ts on purpose: the footer and the
   /services page link to every one of these, and the footer is a client
   component, so importing the full copy there would ship every page's text
   to every visitor. This file is a few hundred bytes.

   `section` is the first part of the address. Service pages hang off
   /services; the builder pages hang off /industries, with custom-builders
   as the hub the three trades sit under (/industries itself redirects to it,
   see next.config.ts).
--------------------------------------------------------------------------- */

export type LandingSection = "services" | "industries";

export type LandingLink = {
  slug: string;
  section: LandingSection;
  /* short name: footer, breadcrumbs, related links */
  name: string;
  /* one line under the name wherever the pages are listed */
  blurb: string;
  /* the date this page's content last really changed, for the sitemap */
  modified: string;
};

export const LANDING_INDEX: LandingLink[] = [
  {
    slug: "web-design",
    section: "services",
    name: "Web design",
    blurb: "New websites, designed from a blank page and built in code.",
    modified: "2026-10-31",
  },
  {
    slug: "website-redesign",
    section: "services",
    name: "Website redesign",
    blurb: "A better site without losing the rankings the old one earned.",
    modified: "2026-10-31",
  },
  {
    slug: "custom-business-software",
    section: "services",
    name: "Business software",
    blurb: "Dashboards, CRMs and job trackers in place of spreadsheets.",
    modified: "2026-10-31",
  },
  {
    slug: "custom-builders",
    section: "industries",
    name: "Custom builders",
    blurb: "Websites for businesses that build to order.",
    modified: "2026-10-31",
  },
  {
    slug: "campervan-converters",
    section: "industries",
    name: "Campervan converters",
    blurb: "Layouts, build slots and vans for sale, shown properly.",
    modified: "2026-10-31",
  },
  {
    slug: "horsebox-builders",
    section: "industries",
    name: "Horsebox builders",
    blurb: "Models by weight, honest payloads, used stock.",
    modified: "2026-10-31",
  },
  {
    slug: "garden-room-builders",
    section: "industries",
    name: "Garden room builders",
    blurb: "Rooms by use, price guides and planning explained.",
    modified: "2026-10-31",
  },
];

export const landingPath = ({ section, slug }: { section: LandingSection; slug: string }) =>
  `/${section}/${slug}`;

export const landingLink = (slug: string) => {
  const link = LANDING_INDEX.find((l) => l.slug === slug);
  if (!link) throw new Error(`No landing page "${slug}"`);
  return link;
};

/* the hub every builder trade sits under in the breadcrumb trail */
export const BUILDERS_HUB = "custom-builders";
