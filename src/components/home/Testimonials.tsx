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
  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          title={
            <>
              Don&apos;t take our word for it,{" "}
              <em className="serif-accent">take theirs</em>.
            </>
          }
          lead="A few words from the businesses behind the work above."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.1}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
