import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import JsonLd from "@/components/JsonLd";
import MetaPixel from "@/components/MetaPixel";
import { organizationSchema } from "@/lib/schema";
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  publisher: SITE_NAME,
  category: "Web design",
  /* full-size image previews and uncapped snippets, so a result can show
     the share card and the whole description */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  alternates: { canonical: "/" },
};

/* the faces on screen at first paint: the two hero marks, the nav labels and
   the hero paragraph. Regular is body copy further down and loads on demand. */
const PRELOAD = [
  "Thunder-Bold",
  "Thunder-Medium",
  "NeueMontreal-Medium",
  "NeueMontreal-Bold",
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* PRIVACY: the only tracking on the site is the Meta Pixel, and it
            loads only after consent on the banner (<MetaPixel />, see
            src/lib/pixel.ts). /privacy says exactly that. Adding Google
            Analytics, Vercel Analytics or any other tracking script means
            gating it the same way, naming the provider in the "Automatically",
            "Cookies" and "Who we share it with" sections of
            src/app/privacy/page.tsx, and bumping LEGAL_UPDATED. */}
        {PRELOAD.map((f) => (
          <link
            key={f}
            rel="preload"
            as="font"
            type="font/woff2"
            href={`/fonts/${f}.woff2`}
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        {/* who the site belongs to, on every route */}
        <JsonLd data={organizationSchema()} />
        <SmoothScroll>{children}</SmoothScroll>
        <MetaPixel />
      </body>
    </html>
  );
}
