/* What the contact form offers and what the API accepts, from one list, so
   the two cannot drift apart.

   The budget bands are the /services tiers, worded off the same data as the
   cards. Tiers with a monthly figure are offered both ways, grouped by how
   they would be paid, so the choice doubles as the billing preference. The
   custom quote is quoted either way and sits outside the groups. */

import { PACKAGES, priceText } from "./services";

export type Option = { value: string; label: string };

const lower = (s: string) => s.toLowerCase();

export const BUDGET_GROUPS: { label: string; options: Option[] }[] = [
  {
    label: "One-time",
    options: PACKAGES.filter((p) => p.monthly).map((p) => ({
      value: `${p.name}, one-time`,
      label: `${p.name}, ${lower(priceText(p))}`,
    })),
  },
  {
    label: "Monthly",
    options: PACKAGES.flatMap((p) =>
      p.monthly
        ? [
            {
              value: `${p.name}, monthly`,
              label: `${p.name}, ${lower(priceText(p.monthly))}`,
            },
          ]
        : []
    ),
  },
];

export const BUDGET_OTHER: Option[] = [
  ...PACKAGES.filter((p) => !p.monthly).map((p) => ({
    value: p.name,
    label: `${p.name}, ${lower(priceText(p))}`,
  })),
  { value: "Not sure yet", label: "Not sure yet" },
];

export const BUDGET_VALUES = [
  ...BUDGET_GROUPS.flatMap((g) => g.options),
  ...BUDGET_OTHER,
].map((o) => o.value);

export const TIMELINES = [
  "As soon as possible",
  "Within a month",
  "In the next few months",
  "No fixed date",
];

/* per-field caps: roomy for a real brief, tight enough to stop an inbox flood */
export const LIMITS = { name: 120, email: 200, message: 5000 } as const;

/* the name of the hidden field only a bot fills in */
export const HONEYPOT = "company_site";

export type Inquiry = {
  name: string;
  email: string;
  message: string;
  budget: string;
  timeline: string;
};

/* the inquiry as the plain-text email body, shared by the API and the
   mailto fallback so both arrive in the inbox looking the same */
export function inquiryBody({ name, email, message, budget, timeline }: Inquiry) {
  return [
    message,
    "",
    budget ? `Budget: ${budget}` : "",
    timeline ? `Timeline: ${timeline}` : "",
    "",
    name,
    email,
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");
}

export const inquirySubject = (name: string) =>
  `Project inquiry${name ? ` from ${name}` : ""}`;
