import Link from "next/link";
import { PiArrowRight } from "react-icons/pi";

/* ---------------------------------------------------------------------------
   The site's call to action: a pill in the page's own ink, with an arrow in
   a signal-red circle at its end. On hover the pill goes red and the arrow
   tips up and to the right, towards where it is taking you.

   It is drawn from the page colours rather than fixed ones, so on an ink
   page it is a paper pill and on a paper page an ink one, and it turns over
   with the page wherever <Invert /> is flipping it.

   No hooks and no client code, so server pages can use it as they are.
--------------------------------------------------------------------------- */

export function PillButton({ label, href }: { label: string; href: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-[clamp(10px,0.9vw,18px)] rounded-full bg-[var(--fg)] py-[clamp(5px,0.4vw,8px)] pl-[clamp(18px,1.4vw,28px)] pr-[clamp(5px,0.4vw,8px)] text-[length:clamp(14px,1.05vw,20px)] font-medium tracking-[-0.01em] text-[var(--bg)] transition-colors duration-500 hover:bg-accent hover:text-white"
    >
      {label}
      <span
        aria-hidden
        className="grid size-[clamp(30px,2.3vw,44px)] place-items-center rounded-full bg-accent text-white transition-[background-color,color,rotate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45 group-hover:bg-white group-hover:text-accent"
      >
        <PiArrowRight className="size-[45%]" />
      </span>
    </Link>
  );
}

/* a question, then the pill under it, centred: the ask at the end of a
   stretch of page that has made its case */
export function CtaBlock({
  prompt,
  label,
  href,
  className = "",
}: {
  prompt: string;
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-[clamp(14px,1.4vw,28px)] text-center ${className}`}>
      <p className="max-w-[28ch] text-balance text-[length:clamp(20px,2vw,40px)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--fg)]">
        {prompt}
      </p>
      <PillButton label={label} href={href} />
    </div>
  );
}
