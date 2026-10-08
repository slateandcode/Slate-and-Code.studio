/* The /get-your-free-website campaign: the three one-click questions, what
   the API accepts for them, and how a request reads once it lands in the
   inbox.

   The page is a paid-campaign landing page, so it is kept out of the navbar,
   the footer and the sitemap, and out of search results. It is reached from
   the ads. */

export type Question = {
  /* the key the answer is posted and stored under */
  key: "site" | "business" | "launch";
  /* how the answer is labelled in the email */
  label: string;
  question: string;
  options: string[];
};

export const QUESTIONS: Question[] = [
  {
    key: "site",
    label: "Current website",
    question: "Do you have a website right now?",
    options: [
      "Yes, but it's outdated",
      "Yes, but it doesn't bring in enquiries",
      "Yes, and I'm happy with it",
      "No, not yet",
    ],
  },
  {
    key: "business",
    label: "Business",
    question: "What kind of business is it?",
    options: [
      "Trades & home services",
      "Property & interiors",
      "Health, beauty & wellness",
      "Something else",
    ],
  },
  {
    key: "launch",
    label: "Launch",
    question: "If you love it, when would you want to launch?",
    options: ["Straight away", "Within a month", "Just seeing what's possible"],
  },
];

export type Answers = Record<Question["key"], string>;

export type FreeSiteRequest = Answers & {
  name: string;
  email: string;
  website: string;
};

export const WEBSITE_MAX = 300;

/* every answer has to be one of its question's own options */
export const validAnswers = (a: Partial<Answers>) =>
  QUESTIONS.every((q) => q.options.includes(a[q.key] ?? ""));

export const freeSiteSubject = (name: string) =>
  `Free website request${name ? ` from ${name}` : ""}`;

/* the request as the plain-text email body, shared by the API and the mailto
   fallback so both arrive looking the same */
export function freeSiteBody(r: FreeSiteRequest) {
  return [
    ...QUESTIONS.map((q) => `${q.label}: ${r[q.key]}`),
    r.website ? `Website: ${r.website}` : "",
    "",
    r.name,
    r.email,
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");
}
