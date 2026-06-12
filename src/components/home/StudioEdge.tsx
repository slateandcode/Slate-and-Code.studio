import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";

const POINTS = [
  {
    n: "01",
    title: "Design taste",
    copy: "Every screen is built to feel intentional, not templated.",
  },
  {
    n: "02",
    title: "Development ability",
    copy: "Frontend, full-stack, dashboards, and tools that actually function.",
    technical: true,
  },
  {
    n: "03",
    title: "Content instinct",
    copy: "Video experience brings stronger pacing, storytelling, and visual rhythm.",
  },
  {
    n: "04",
    title: "Business understanding",
    copy: "Built for real businesses, not just portfolio aesthetics.",
  },
];

export default function StudioEdge() {
  return (
    <section className="border-t border-line bg-pit">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <SectionHeading
          eyebrow="Studio Edge"
          title={
            <>
              Why the work <em className="serif-accent">holds up</em>.
            </>
          }
          lead="One studio covering design, code, and content, so nothing gets lost between three different freelancers."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="h-full">
              <SpotlightCard
                color={p.technical ? "blue" : "gold"}
                className="h-full"
              >
                <div className="group flex h-full flex-col bg-surface p-7 transition-colors duration-500 hover:bg-raised sm:p-9">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-gold">{p.n}</span>
                    {p.technical && (
                      <span className="micro rounded border border-blue/25 bg-blue/[0.06] px-2 py-1 text-blue shadow-[0_0_12px_rgba(77,163,255,0.10)]">
                        Technical
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ivory">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fog">{p.copy}</p>
                  <span className="mt-auto block h-px w-8 bg-line pt-0 transition-all duration-500 group-hover:w-14 group-hover:bg-gold/60" />
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
