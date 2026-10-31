/* ---------------------------------------------------------------------------
   Structured data (schema.org JSON-LD), built from the same lists the pages
   render, so what search engines read can never drift from what is on
   screen: the packages and FAQ from services.ts, the projects from work.ts.

   The organisation is declared once in the root layout under a fixed @id,
   and everything else points at it by reference rather than repeating it.

   No street address or phone here on purpose: the marketing site presents
   the studio as working with brands anywhere, so the business is described
   as an Organization serving worldwide, not a LocalBusiness tied to a city.
   The registered details stay on /privacy and /terms.
--------------------------------------------------------------------------- */

import type { Landing } from "./landing";
import { plainText } from "./landing";
import { BUILDERS_HUB, landingLink, landingPath } from "./landing-index";
import { LEGAL } from "./legal";
import { LINKS } from "./links";
import { FAQ, PACKAGES, type Package } from "./services";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";
import { WORKS } from "./work";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const ORG = { "@id": ORG_ID };

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        alternateName: "Slate & Code",
        legalName: LEGAL.name,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/icon.png`,
          width: 512,
          height: 512,
        },
        image: `${SITE_URL}${OG_IMAGE.url}`,
        description: SITE_DESCRIPTION,
        email: LINKS.email,
        sameAs: [LINKS.instagram],
        areaServed: "Worldwide",
        knowsAbout: [
          "Web design",
          "Web development",
          "Website redesign",
          "Landing pages",
          "Custom business software",
          "3D websites",
          "Web design for custom builders",
          "Web design for campervan converters",
          "Web design for horsebox builders",
          "Web design for garden room builders",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: LINKS.email,
          url: `${SITE_URL}/contact`,
          availableLanguage: "English",
        },
      },
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en",
        publisher: ORG,
      },
    ],
  };
}

/* Home > ... > page, for every route below the home page. The trail is
   every step after Home, ending on the page itself. */
export function breadcrumbTrail(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...trail.map(({ name, path }, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name,
        item: abs(path),
      })),
    ],
  };
}

/* Home > page, for a route one level down */
export function breadcrumbSchema(name: string, path: string) {
  return breadcrumbTrail([{ name, path }]);
}

/* "$1,500" -> 1500; "Custom quote" -> null */
const amount = (s: string) => {
  const n = Number(s.replace(/[^0-9.]/g, ""));
  return n > 0 ? n : null;
};

/* a package's starting prices as offers, one-time and (where it has one)
   monthly; the custom quote has neither and gets no offers */
function offersFor(p: Package) {
  const once = amount(p.price);
  if (!once) return {};
  const monthly = p.monthly ? amount(p.monthly.price) : null;
  return {
    offers: [
      {
        "@type": "Offer",
        name: `${p.name}, one-time`,
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: once,
          priceCurrency: "USD",
        },
      },
      ...(monthly
        ? [
            {
              "@type": "Offer",
              name: `${p.name}, monthly`,
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                minPrice: monthly,
                priceCurrency: "USD",
                unitCode: "MON",
              },
            },
          ]
        : []),
    ],
  };
}

/* the four packages as services with their starting prices, and the FAQ as
   it reads on the page */
export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...PACKAGES.map((p) => ({
        "@type": "Service",
        name: p.name,
        serviceType: "Web design and development",
        description: p.summary,
        provider: ORG,
        areaServed: "Worldwide",
        url: `${SITE_URL}/services`,
        ...offersFor(p),
      })),
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/services#faq`,
        mainEntity: FAQ.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}

/* the portfolio as a collection of the projects on it, in page order */
export function portfolioSchema(description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/portfolio`,
    url: `${SITE_URL}/portfolio`,
    name: "Portfolio",
    description,
    isPartOf: { "@id": SITE_ID },
    about: ORG,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: WORKS.length,
      itemListElement: WORKS.map((w, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: w.name,
          description: w.summary,
          genre: w.preview
            ? `${w.kind}, preview`
            : w.concept
              ? `${w.kind}, concept`
              : w.kind,
          image: `${SITE_URL}${w.src}`,
          creator: ORG,
          ...(w.href && { url: w.href }),
        },
      })),
    },
  };
}

/* A service or industry page: the page itself, the service it sells with
   the matching packages' prices, its questions, and where it sits in the
   site. Builder trades sit under the custom builders hub; services sit
   under /services. */
export function landingSchema(page: Landing) {
  const path = landingPath(page);
  const url = abs(path);
  const name = landingLink(page.slug).name;

  const trail =
    page.section === "services"
      ? [{ name: "Services", path: "/services" }]
      : page.slug === BUILDERS_HUB
        ? []
        : [{ name: landingLink(BUILDERS_HUB).name, path: landingPath(landingLink(BUILDERS_HUB)) }];

  const packs = page.service.packages
    .map((n) => PACKAGES.find((p) => p.name === n))
    .filter((p): p is Package => Boolean(p));

  return [
    breadcrumbTrail([...trail, { name, path }]),
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": url,
          url,
          name: page.title,
          description: page.description,
          inLanguage: "en",
          isPartOf: { "@id": SITE_ID },
          about: { "@id": `${url}#service` },
          publisher: ORG,
        },
        {
          "@type": "Service",
          "@id": `${url}#service`,
          name: page.title,
          serviceType: page.service.type,
          description: page.lead,
          provider: ORG,
          areaServed: "Worldwide",
          url,
          ...(page.service.audience && {
            audience: {
              "@type": "BusinessAudience",
              audienceType: page.service.audience,
            },
          }),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${page.title} packages`,
            itemListElement: packs.map((p) => ({
              "@type": "Service",
              name: p.name,
              description: p.summary,
              ...offersFor(p),
            })),
          },
        },
        {
          "@type": "FAQPage",
          "@id": `${url}#faq`,
          mainEntity: page.faq.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: plainText(a) },
          })),
        },
      ],
    },
  ];
}
