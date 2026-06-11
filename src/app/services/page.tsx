import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import {
  ButtonGold,
  ButtonSecondary,
  InstagramIcon,
} from "@/components/Buttons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, custom business tools, short-form content, and complete digital systems — built with design taste, technical execution, and business clarity.",
};

type Service = {
  tag: string;
  name: string;
  price: string;
  description: string;
  includes: string[];
  bestFor?: string;
  note?: string;
  technical?: boolean; // blue accents for internal-tool work
  flagship?: boolean; // gold-bordered highlight
};

const SERVICES: Service[] = [
  {
    tag: "Web",
    name: "Web Presence",
    price: "from 2,000 AED",
    description:
      "Landing pages, business websites, and redesigns for brands that need a sharper online presence.",
    includes: [
      "Responsive design",
      "Frontend build",
      "Contact / WhatsApp CTA",
      "Basic SEO structure",
      "Launch support",
    ],
    bestFor:
      "Small businesses, service brands, and companies that need a clean digital first impression.",
  },
  {
    tag: "Web",
    name: "Business Website",
    price: "from 4,000 AED",
    description:
      "Multi-page websites and full-stack web experiences with stronger structure, forms, integrations, and dynamic functionality where needed.",
    includes: [
      "Multi-page site structure",
      "Frontend development",
      "Forms / integrations",
      "Backend or CMS where needed",
      "Responsive testing",
      "Launch support",
    ],
    bestFor: "Businesses that need more than a basic landing page.",
  },
  {
    tag: "Tools",
    name: "Custom Business Tool",
    price: "5,000–8,000+ AED",
    description:
      "Custom internal tools built around the way your business actually works.",
    includes: [
      "Dashboards",
      "Report systems",
      "CRMs",
      "Stock trackers",
      "Admin panels",
      "Workflow tools",
      "PDF / report generation where needed",
    ],
    bestFor:
      "Businesses that are tired of messy spreadsheets, manual reports, and scattered workflows.",
    technical: true,
  },
  {
    tag: "Content",
    name: "Short-Form Edit",
    price: "125–200 AED per reel",
    description:
      "Polished reels and shorts built from raw footage into structured, engaging edits.",
    includes: [
      "Footage organization",
      "Storytelling structure",
      "Pacing",
      "Captions",
      "Music",
      "Sound effects",
      "Color and final polish",
    ],
    bestFor:
      "Businesses, creators, and brands that need individual polished edits.",
  },
  {
    tag: "Retainer",
    name: "Monthly Content System",
    price: "3,000–5,000 AED/month",
    description:
      "A recurring short-form content package for businesses that need consistent reels without managing every edit from scratch.",
    includes: [
      "Monthly reel delivery",
      "Editing system",
      "Captions",
      "Music and SFX",
      "Visual polish",
      "Basic content structure support",
    ],
    note: "Final reel count depends on complexity, footage quality, and editing style.",
  },
  {
    tag: "Bundle",
    name: "Complete Digital System",
    price: "Custom quote",
    description:
      "A combined package for businesses that need a website, internal tool, and content system built together.",
    includes: [
      "Website or redesign",
      "Custom dashboard / tool if needed",
      "Reels or content package",
      "Brand-consistent digital direction",
    ],
    bestFor:
      "Businesses that want one consistent digital system instead of scattered freelancers.",
    flagship: true,
  },
];

function ServiceCard({ service }: { service: Service }) {
  return (
    <article
      className={`flex h-full flex-col rounded-lg border p-7 transition-all duration-500 hover:-translate-y-1 sm:p-8 ${
        service.flagship
          ? "border-gold/45 bg-surface shadow-[0_0_30px_rgba(214,168,90,0.08)] hover:shadow-[0_0_40px_rgba(214,168,90,0.14)]"
          : "border-line bg-surface hover:border-edge hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`micro rounded border px-2.5 py-1.5 ${
            service.technical
              ? "border-blue/30 bg-blue/[0.07] text-blue shadow-[0_0_14px_rgba(77,163,255,0.12)]"
              : service.flagship
                ? "border-gold/40 bg-gold/[0.07] text-gold"
                : "border-line bg-raised text-fog"
          }`}
        >
          {service.tag}
        </span>
        {service.flagship && <span className="micro text-gold">Flagship</span>}
      </div>

      <h2 className="mt-5 font-display text-xl font-semibold text-ivory">
        {service.name}
      </h2>
      <p className="mt-2 font-display text-2xl font-semibold text-gold">
        {service.price}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-fog">{service.description}</p>

      <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
        {service.includes.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-ivory/80">
            <span
              className={`mt-[7px] h-1 w-3 shrink-0 rounded-full ${
                service.technical ? "bg-blue/70" : "bg-gold/70"
              }`}
            />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        {service.bestFor && (
          <div className="border-t border-line pt-5">
            <p className="micro text-fog">Best for</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ivory/75">
              {service.bestFor}
            </p>
          </div>
        )}
        {service.note && (
          <div className="border-t border-line pt-5">
            <p className="text-[13px] leading-relaxed text-fog">{service.note}</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-faint mask-fade pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-36 sm:px-8 lg:pb-20 lg:pt-44">
          <Reveal>
            <p className="micro text-gold">Services</p>
            <h1 className="mt-5 max-w-3xl font-display text-3xl font-semibold leading-[1.12] text-ivory sm:text-4xl lg:text-[2.75rem]">
              Services built for businesses that need better digital presence,
              cleaner systems, and stronger content.
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-fog sm:text-base">
              From websites and internal tools to short-form edits and monthly
              content systems, every project is built with design taste,
              technical execution, and business clarity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.1} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>

        {/* Notes */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-lg border border-line bg-pit p-7">
              <p className="micro text-gold">Pricing note</p>
              <p className="mt-3 text-sm leading-relaxed text-fog">
                Prices are starting points. Final quotes depend on scope, pages,
                features, content volume, integrations, timeline, and revision
                needs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-lg border border-line bg-pit p-7">
              <p className="micro text-gold">Revisions</p>
              <p className="mt-3 text-sm leading-relaxed text-fog">
                Projects include a clear revision structure. Major scope changes
                or new feature requests are quoted separately.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-line bg-pit">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <Reveal className="flex flex-col items-center text-center">
            <h2 className="max-w-xl font-display text-2xl font-semibold leading-snug text-ivory sm:text-3xl">
              Not sure which package fits? Send a message — we&apos;ll point you
              to the right one.
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <ButtonGold href={SITE.instagramUrl} external>
                <InstagramIcon /> Message on Instagram
              </ButtonGold>
              <ButtonSecondary href="/contact">Use the contact form</ButtonSecondary>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
