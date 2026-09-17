import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Footer from "@/components/Footer";
import { OG_IMAGE } from "@/lib/site";

const TITLE = "Portfolio";
const DESCRIPTION =
  "Websites, 3D product sites, and landing pages designed and built by Slate & Code Studio, with a link to every live project.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    url: "/portfolio",
    title: `${TITLE} · Slate & Code Studio`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · Slate & Code Studio`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

/* No invert on this page: the screenshots carry the colour, so the ground
   stays on ink the whole way down. */
export default function Portfolio() {
  return (
    <main>
      <Navbar />
      <PortfolioHero />
      <PortfolioGrid />
      <Footer />
    </main>
  );
}
