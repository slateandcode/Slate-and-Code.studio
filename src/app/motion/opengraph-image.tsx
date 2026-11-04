import { MOTION } from "@/lib/motion";
import { landingCard, OG_SIZE } from "@/lib/og";
import { SITE_NAME } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = SITE_NAME;

export default async function Image() {
  return landingCard(MOTION);
}
