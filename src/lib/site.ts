import type { Metadata } from "next";

/* The one place the public origin and the share card live. Metadata on every
   route builds off these so the og:image URL resolves absolutely.

   www, not the apex: the apex 308s to www, so canonical links and the og:image
   URL are written at the origin that actually answers. */

export const SITE_URL = "https://www.slateandcode.studio";
export const SITE_NAME = "Slate & Code Studio";

/* the home page's title and description, which are also the fallbacks every
   other route inherits. Written for search: they say what the studio makes
   and what it costs, in the words people type. */
export const SITE_TITLE = `${SITE_NAME} · Web Design and Development`;
export const SITE_DESCRIPTION =
  "Custom websites, web apps and business tools, designed and built by one independent studio. Websites from $1,500 or $150 a month. Same-day replies.";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Slate & Code Studio. Websites, software, systems. A studio of one, by design.",
};

/* Title, description, canonical, Open Graph and Twitter for one route, all
   from the same three values. Every field is set per page on purpose: Next
   replaces openGraph and twitter wholesale rather than merging them, so a
   route that set only one would still share the home page's card on the
   other. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const full = `${title} · ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      title: full,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: full,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
