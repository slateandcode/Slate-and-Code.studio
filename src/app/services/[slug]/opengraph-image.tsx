import { getLanding, LANDINGS } from "@/lib/landing";
import { landingCard, OG_SIZE } from "@/lib/og";
import { SITE_NAME } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = SITE_NAME;

export function generateStaticParams() {
  return LANDINGS.filter((l) => l.section === "services").map(({ slug }) => ({ slug }));
}

/* params is a plain object on Next 15 and a promise from 16; awaiting it
   reads both */
type Params = { slug: string };

export default async function Image({ params }: { params: Params | Promise<Params> }) {
  const { slug } = await params;
  return landingCard(getLanding("services", slug)!);
}
