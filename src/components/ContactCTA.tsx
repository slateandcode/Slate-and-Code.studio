"use client";

import Link from "next/link";
import { cubic, EASE_OUT } from "@/lib/anim";

/*
  Small orange CTA. On hover a white layer wipes down from the top edge and
  inverts the label underneath it. It leads to the contact page.
*/
export default function ContactCTA() {
  return (
    <section id="contact" className="gut pb-[clamp(20px,2vw,44px)]">
      <Link
        href="/contact"
        className="group relative inline-flex overflow-hidden rounded-[3px] bg-accent"
      >
        <span className="flex items-center gap-[0.9em] px-[clamp(18px,1.5vw,32px)] py-[clamp(11px,0.85vw,18px)] text-[length:var(--fs-small)] font-medium tracking-[-0.01em] text-white">
          Contact for work
          <span aria-hidden>&#8599;</span>
        </span>
        <span
          className="absolute inset-0 flex items-center gap-[0.9em] px-[clamp(18px,1.5vw,32px)] py-[clamp(11px,0.85vw,18px)] bg-white text-[length:var(--fs-small)] font-medium tracking-[-0.01em] text-ink [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0%_0)]"
          style={{ transition: `clip-path 0.5s ${cubic(EASE_OUT)}` }}
          aria-hidden
        >
          Contact for work
          <span>&#8599;</span>
        </span>
      </Link>
    </section>
  );
}
