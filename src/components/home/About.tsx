import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";

/** Identity rows for the studio card — kept anonymous, studio-voiced. */
const FACTS = [
  { label: "Disciplines", value: "Design · Develop · Direct" },
  { label: "Works with", value: "Brands worldwide" },
  { label: "The way I work", value: "One point of contact, start to finish" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line bg-pit">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Narrative */}
          <div>
            <SectionHeading
              eyebrow="About the Studio"
              title={
                <>
                  Design, develop, and direct, from{" "}
                  <em className="serif-accent">one pair of hands</em>.
                </>
              }
            />

            <Reveal delay={0.1}>
              <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-fog">
                <p>
                  Slate &amp; Code Studio is a studio of one, by design. The
                  same person who designs the screen writes the code behind it
                  and directs the content that fills it. There is no handoff where the
                  idea gets watered down, no three freelancers pointing at each
                  other, and no detail left to fall between the cracks.
                </p>
                <p>
                  I care, in equal measure, about how a thing looks, how it is
                  built, and how it makes someone feel. A website should load
                  fast and convert, and it should still have taste. A tool
                  should be genuinely useful, and it should be a pleasure to
                  open. That standard is the studio.
                </p>
              </div>
            </Reveal>

            {/* Signature */}
            <Reveal delay={0.18}>
              <div className="mt-9 flex items-center gap-4">
                <span className="h-px w-10 bg-gold/60" />
                <span className="font-serif text-2xl italic text-ivory/90">
                  Slate &amp; Code
                </span>
              </div>
            </Reveal>
          </div>

          {/* Studio card */}
          <Reveal delay={0.12}>
            <SpotlightCard color="gold" className="h-full rounded-lg">
              <div className="relative h-full overflow-hidden rounded-lg border border-line bg-surface p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold/[0.06] blur-[60px]"
                />

                <div className="flex items-center gap-3">
                  <span className="block h-2 w-2 rotate-45 bg-gold" />
                  <span className="font-display text-sm font-semibold tracking-[0.18em] text-ivory">
                    SLATE <span className="text-gold">&amp;</span> CODE
                    <span className="ml-2 text-[10px] font-medium tracking-[0.3em] text-fog">
                      STUDIO
                    </span>
                  </span>
                </div>

                <p className="mt-5 font-serif text-xl italic leading-snug text-ivory/85">
                  Designed, developed, and directed by hand.
                </p>

                <dl className="mt-7 space-y-4 border-t border-line pt-6">
                  {FACTS.map((f) => (
                    <div
                      key={f.label}
                      className="flex items-start justify-between gap-6"
                    >
                      <dt className="micro shrink-0 text-fog">{f.label}</dt>
                      <dd className="text-right text-[13px] leading-relaxed text-ivory/85">
                        {f.value}
                      </dd>
                    </div>
                  ))}

                  <div className="flex items-center justify-between gap-6 border-t border-line pt-5">
                    <dt className="micro shrink-0 text-fog">Availability</dt>
                    <dd>
                      <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/[0.07] px-3 py-1">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
                        <span className="text-[11px] font-semibold tracking-wide text-gold">
                          Open for projects
                        </span>
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
