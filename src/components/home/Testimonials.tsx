"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

// Words from the businesses behind the work shown in Selected Work above.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The site finally makes us look professional, along with the software S&C made for us, customers trust us much more.",
    name: "Crescent Car Check",
    role: "Vehicle Inspection",
    initials: "CC",
  },
  {
    quote:
      "They understood that a parts business doesn't need some high end animation. It's fast and it's much easier for us to introduce ourselves to our clients.",
    name: "Mubarak Auto",
    role: "B2B Spare Parts",
    initials: "MA",
  },
  {
    quote:
      "They matched the atmosphere that I deliver on my documentaries, and perfectly integrated backend systems for my online store.",
    name: "Untold Archives",
    role: "Media Brand",
    initials: "UA",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <SpotlightCard color="gold" className="h-full rounded-lg">
      <figure className="flex h-full flex-col rounded-lg border border-line bg-surface p-7 transition-colors duration-500 hover:border-edge">
        <span
          aria-hidden
          className="font-serif text-5xl leading-none text-gold/70"
        >
          &ldquo;
        </span>
        <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ivory/85">
          {t.quote}
        </blockquote>
        <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-gold/[0.08] font-display text-[13px] font-semibold text-gold">
            {t.initials}
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-semibold text-ivory">{t.name}</span>
            <span className="micro mt-1 text-fog">{t.role}</span>
          </span>
        </figcaption>
      </figure>
    </SpotlightCard>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track the centred card on phone so the dots reflect swipe position.
  // Below lg the track is a horizontal snap carousel; at lg+ it is a 3-up
  // grid and the dots are hidden, so this observer is harmless there.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>("[data-card]"),
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { root: track, threshold: 0.6 },
    );
    cards.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  const scrollTo = (i: number) => {
    const card = trackRef.current?.querySelector<HTMLElement>(
      `[data-index="${i}"]`,
    );
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          title={
            <>
              Don&apos;t take my word for it,{" "}
              <em className="serif-accent">take theirs</em>.
            </>
          }
          lead="A few words from the businesses behind the work above."
        />

        {/* Phone: horizontal swipe carousel with a peek of the next card.
            lg+: even 3-up grid. */}
        <div
          ref={trackRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:snap-none lg:overflow-visible lg:pb-0"
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              data-card
              data-index={i}
              className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto lg:shrink"
            >
              <Reveal delay={(i % 3) * 0.1}>
                <TestimonialCard t={t} />
              </Reveal>
            </div>
          ))}
        </div>

        {/* Position dots, phone/tablet only. */}
        <div className="mt-7 flex justify-center gap-2 lg:hidden">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length}: ${t.name}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-5 bg-gold" : "w-1.5 bg-fog/40 hover:bg-fog/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
