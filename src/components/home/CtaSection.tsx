import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { ButtonGold, ButtonSecondary, InstagramIcon } from "@/components/Buttons";
import { SITE } from "@/lib/site";

/** Blueprint-style crosshair tick pinned to a card corner */
function CornerTick({ className }: { className: string }) {
  return (
    <span aria-hidden className={`pointer-events-none absolute h-3.5 w-3.5 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gold/40" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold/40" />
    </span>
  );
}

export default function CtaSection() {
  return (
    <section className="border-t border-line bg-pit">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-lg border border-line bg-surface px-6 py-20 text-center sm:px-12 sm:py-28">
            {/* Faint blueprint grid + gold wash behind the headline */}
            <div className="grid-faint mask-fade absolute inset-0" aria-hidden />
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gold/[0.07] blur-[100px]" />

            <CornerTick className="left-3 top-3" />
            <CornerTick className="right-3 top-3" />
            <CornerTick className="bottom-3 left-3" />
            <CornerTick className="bottom-3 right-3" />

            <p className="micro relative text-gold">Start a Project</p>
            <h2 className="relative mx-auto mt-6 max-w-3xl font-display text-[2.2rem] font-semibold leading-[1.1] text-ivory sm:text-5xl lg:text-[3.4rem]">
              Need a website, tool, or content system that feels{" "}
              <em className="serif-accent text-gold">premium</em>?
            </h2>
            <p className="relative mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-fog">
              Available for selected projects across the GCC.
            </p>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <ButtonGold href={SITE.instagramUrl} external>
                  <InstagramIcon /> Message on Instagram
                </ButtonGold>
              </Magnetic>
              <Magnetic strength={0.12}>
                <ButtonSecondary href="/services">View Services</ButtonSecondary>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
