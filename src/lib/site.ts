/** Central place for contact targets so every CTA stays in sync. */
export const SITE = {
  name: "Slate & Code Studio",
  url: "https://slateandcode.studio",
  instagramHandle: "@slateandcodestudio",
  instagramUrl: "https://www.instagram.com/slateandcodestudio/",
  email: "hello@slateandcode.studio",
} as const;

/**
 * Canonical service names — the single source of truth shared by the
 * Services page cards and the contact form dropdown so they never drift.
 * Keep these in lockstep with the cards in src/app/services/page.tsx.
 */
export const SERVICE_NAMES = [
  "Web Presence",
  "Business Website",
  "Custom Business Tool",
  "Short-Form Edit",
  "Monthly Content System",
  "Complete Digital System",
] as const;

/**
 * Budget tiers shown in the contact form dropdown. Shared so the API can
 * validate the submitted value against the same list the UI offers.
 */
export const BUDGETS = [
  "Under $1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000+",
  "Not sure yet",
] as const;
