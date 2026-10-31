import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPage from "@/components/Landing";
import JsonLd from "@/components/JsonLd";
import { getLanding, LANDINGS } from "@/lib/landing";
import { landingPath } from "@/lib/landing-index";
import { landingSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/site";

/* the builder trades: /industries/campervan-converters and the rest, with
   custom-builders as the hub they sit under. The copy lives in
   src/lib/landing.ts; anything not listed there is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANDINGS.filter((l) => l.section === "industries").map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getLanding("industries", (await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: landingPath(page),
    ownImage: true,
  });
}

export default async function IndustryPage({ params }: Props) {
  const page = getLanding("industries", (await params).slug);
  if (!page) notFound();
  return (
    <>
      {landingSchema(page).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
      <LandingPage page={page} />
    </>
  );
}
