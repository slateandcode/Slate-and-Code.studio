import Link from "next/link";

/* A line of copy with inline links written as [label](/path), the way the
   page text in landing.ts carries them. Internal links go through next/link;
   the underline sits on the rule colour and comes up to accent on hover, the
   same treatment as links in the legal prose. */

const LINK = /(\[[^\]]+\]\([^)]+\))/g;
const PARTS = /^\[([^\]]+)\]\(([^)]+)\)$/;

export default function Rich({ text }: { text: string }) {
  return text.split(LINK).map((part, i) => {
    const m = part.match(PARTS);
    if (!m) return part;
    return (
      <Link
        key={i}
        href={m[2]}
        className="text-[var(--fg)] underline decoration-[var(--rule)] underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-current"
      >
        {m[1]}
      </Link>
    );
  });
}
