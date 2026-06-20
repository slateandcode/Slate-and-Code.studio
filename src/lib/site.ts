/** Central place for contact targets so every CTA stays in sync. */
export const SITE = {
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
