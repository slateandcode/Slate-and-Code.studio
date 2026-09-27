import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PortfolioHero from "@/components/PortfolioHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, portfolioSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const TITLE = "Web Design Portfolio";
const DESCRIPTION =
  "Websites, 3D product sites and landing pages designed and built by Slate & Code Studio, for real businesses and as concepts, with a link to every live project.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/portfolio",
});

/* No invert on this page: the screenshots carry the colour, so the ground
   stays on ink the whole way down. */
export default function Portfolio() {
  return (
    <main>
      <JsonLd data={portfolioSchema(DESCRIPTION)} />
      <JsonLd data={breadcrumbSchema("Portfolio", "/portfolio")} />
      <Navbar />
      <PortfolioHero />
      <PortfolioGrid />
      <Footer />
    </main>
  );
}
