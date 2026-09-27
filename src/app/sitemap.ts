import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* lastModified is the date the page's content last really changed, not the
   build date: a sitemap that claims everything changed on every deploy
   teaches Google to ignore the field. Bump a date when that page changes. */
const ROUTES: {
  path: string;
  modified: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", modified: "2026-09-27", changeFrequency: "monthly", priority: 1 },
  { path: "/portfolio", modified: "2026-09-27", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", modified: "2026-09-27", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", modified: "2026-09-27", changeFrequency: "yearly", priority: 0.7 },
  { path: "/privacy", modified: "2026-09-27", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", modified: "2026-09-27", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, modified, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "/" : path}`,
    lastModified: new Date(modified),
    changeFrequency,
    priority,
  }));
}
