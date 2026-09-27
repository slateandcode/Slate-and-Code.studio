import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ServicesHero from "@/components/ServicesHero";
import Packages from "@/components/Packages";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import Invert from "@/components/Invert";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

const TITLE = "Web Design Services and Pricing";
const DESCRIPTION =
  "Websites from $1,500 or $150 a month, business websites from $2,500, custom business tools from $4,000. Designed, built, and shipped by one studio.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
});

export default function Services() {
  return (
    <main>
      <JsonLd data={servicesSchema()} />
      <JsonLd data={breadcrumbSchema("Services", "/services")} />
      {/* the page turns over at the questions, so it ends on paper like home */}
      <Invert targetId="faq" />
      <Navbar />
      <ServicesHero />
      <Packages />
      <Faq />
      <Footer />
    </main>
  );
}
