import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { InstagramIcon } from "@/components/Buttons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project: websites, custom tools, short-form content, and complete digital systems across the GCC.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-faint mask-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-36 sm:px-8 lg:pb-18 lg:pt-44">
          <Reveal>
            <p className="micro text-gold">Contact</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-ivory sm:text-5xl">
              Start a project.
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fog sm:text-base">
              For websites, custom tools, short-form content, and complete
              digital systems across the GCC.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
          {/* Direct channels */}
          <div className="flex flex-col gap-5">
            <Reveal>
              {/* Instagram — the primary channel, visually emphasized */}
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-lg border border-gold/45 bg-surface p-8 shadow-[0_0_30px_rgba(214,168,90,0.08)] transition-all duration-500 hover:shadow-[0_0_44px_rgba(214,168,90,0.16)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/[0.07] blur-[60px]" />
                <div className="flex items-center justify-between">
                  <span className="micro text-gold">Fastest response</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 text-gold transition-transform duration-500 group-hover:scale-105">
                    <InstagramIcon className="h-4.5 w-4.5" />
                  </span>
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold text-ivory">
                  Message on Instagram
                </h2>
                <p className="mt-2 text-sm text-fog">
                  DMs are checked daily, the quickest way to talk through a
                  project.
                </p>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  {SITE.instagramHandle}
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden>
                    <path d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </p>
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href={`mailto:${SITE.email}`}
                className="group block rounded-lg border border-line bg-surface p-8 transition-all duration-500 hover:border-edge"
              >
                <span className="micro text-fog">Email</span>
                <h2 className="mt-4 font-display text-lg font-semibold text-ivory">
                  {SITE.email}
                </h2>
                <p className="mt-2 text-sm text-fog">
                  Best for detailed briefs and documents.
                </p>
              </a>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="rounded-lg border border-line bg-pit p-8">
                <span className="micro text-fog">Good to include</span>
                <ul className="mt-4 space-y-2.5 text-sm text-ivory/75">
                  <li className="flex items-start gap-3">
                    <span className="mt-[7px] h-1 w-3 shrink-0 rounded-full bg-gold/70" />
                    What you&apos;re building, and for which business
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-[7px] h-1 w-3 shrink-0 rounded-full bg-gold/70" />
                    Rough timeline and budget range
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-[7px] h-1 w-3 shrink-0 rounded-full bg-gold/70" />
                    Links or references you like
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.12}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
