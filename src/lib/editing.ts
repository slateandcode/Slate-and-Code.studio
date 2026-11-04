/* The /editing page's data: the channels, the videos that carry the numbers,
   and what the editing inquiry form offers and the API accepts.

   The page is unlisted on purpose: no navbar, footer or sitemap entry, and
   noindex. It is shared by link. */

export type Video = {
  id: string;
  views: string;
  title: string;
  channel: string;
  /* shorts are vertical; long-form is 16:9 */
  short: boolean;
};

export const VIDEOS: Video[] = [
  { id: "CE-nfkJil9I", views: "8M", title: "Midwinter Archives", channel: "Midwinter Archives", short: true },
  { id: "-JDkfM25nsI", views: "1M", title: "Midwinter Archives", channel: "Midwinter Archives", short: true },
  { id: "w7xTY47TgcY", views: "1M", title: "Untold Archives", channel: "Untold Archives", short: false },
  { id: "ivYwgrLYmCQ", views: "500K", title: "Untold Archives", channel: "Untold Archives", short: false },
];

export const watchUrl = (v: Video) =>
  v.short
    ? `https://www.youtube.com/shorts/${v.id}`
    : `https://www.youtube.com/watch?v=${v.id}`;

export const thumbUrl = (v: Video) =>
  `https://i.ytimg.com/vi/${v.id}/${v.short ? "oar2" : "hq720"}.jpg`;

export const CHANNELS = [
  {
    name: "Untold Archives",
    note: "Documentary-style long form. Edited by me.",
    href: "https://www.youtube.com/@UntoldArchives.official",
  },
  {
    name: "Midwinter Archives",
    note: "Shorts, one of them past 8M views. Edited by me.",
    href: "https://www.youtube.com/@Midwinter.Archives/shorts",
  },
  {
    name: "Golf Cart Media",
    note: "A channel I also work with.",
    href: "https://www.youtube.com/@golfcartmedia",
  },
];

export const FORMATS = [
  "Shorts and reels",
  "Long-form YouTube",
  "Documentary / storytelling",
  "Ongoing, weekly edits",
  "Not sure yet",
];

/* what the inquiry form asks. /motion uses the same form with its own
   copy (FORM in motion.ts); `kind` is how /api/contact tells them apart */
export type FormCopy = {
  kind: "editing" | "motion";
  subject: string;
  linkLabel: string;
  linkPlaceholder: string;
  formatLabel: string;
  formatPlaceholder: string;
  formats: readonly string[];
  emailPlaceholder: string;
  messagePlaceholder: string;
};

export const EDITING_FORM: FormCopy = {
  kind: "editing",
  subject: "Editing inquiry",
  linkLabel: "Channel",
  linkPlaceholder: "youtube.com/@yourchannel",
  formatLabel: "Format",
  formatPlaceholder: "What needs editing?",
  formats: FORMATS,
  emailPlaceholder: "you@channel.com",
  messagePlaceholder: "How many videos, how long, and what style are you after?",
};

export type EditingInquiry = {
  name: string;
  email: string;
  message: string;
  channel: string;
  format: string;
};

export const editingSubject = (name: string, subject = EDITING_FORM.subject) =>
  `${subject}${name ? ` from ${name}` : ""}`;

export function editingBody(
  { name, email, message, channel, format }: EditingInquiry,
  linkLabel = EDITING_FORM.linkLabel
) {
  return [
    message,
    "",
    channel ? `${linkLabel}: ${channel}` : "",
    format ? `Format: ${format}` : "",
    "",
    name,
    email,
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");
}
