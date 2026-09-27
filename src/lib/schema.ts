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

import { LEGAL } from "./legal";
import { LINKS } from "./links";
import { FAQ, PACKAGES } from "./services";
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

/* Home > page, for every route below the home page */
export function breadcrumbSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name, item: abs(path) },
    ],
  };
}

/* "$1,500" -> 1500; "Custom quote" -> null */
const amount = (s: string) => {
  const n = Number(s.replace(/[^0-9.]/g, ""));
  return n > 0 ? n : null;
};

/* the four packages as services with their starting prices, and the FAQ as
   it reads on the page */
export function servicesSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      ...PACKAGES.map((p) => {
        const once = amount(p.price);
        const monthly = p.monthly ? amount(p.monthly.price) : null;
        return {
          "@type": "Service",
          name: p.name,
          serviceType: "Web design and development",
          description: p.summary,
          provider: ORG,
          areaServed: "Worldwide",
          url: `${SITE_URL}/services`,
          ...(once && {
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
          }),
        };
      }),
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
          genre: w.concept ? `${w.kind}, concept` : w.kind,
          image: `${SITE_URL}${w.src}`,
          creator: ORG,
          ...(w.href && { url: w.href }),
        },
      })),
    },
  };
}
