import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Faq from "./Faq";
import Invert from "./Invert";
import Rich from "./Rich";
import { ContactButton } from "./ContactCTA";
import { MaskReveal, WordsReveal } from "./reveal";
import type { Block, Heading, Landing } from "@/lib/landing";
import { LANDING_INDEX, landingPath } from "@/lib/landing-index";
import { PACKAGES, priceText } from "@/lib/services";
import { fitToGutters } from "@/lib/type";
import { TEXT_LINK, TEXT_LINK_RULE } from "@/lib/ui";

/* ---------------------------------------------------------------------------
   The template behind every service and industry page.

   A server component: the copy is in the HTML as sent, and only the reveals
   and the navbar hydrate. The headline is the one exception to the house
   reveals: it rises by a CSS animation (.rise in globals.css) rather than
   MaskReveal, so it plays from first paint instead of waiting for the script
   to hydrate, and the largest thing on screen is not held back for it.

   Blocks render in the order the page lists them, so two pages with the same
   ingredients can still lead with different things.
--------------------------------------------------------------------------- */

const SECTION = "gut py-[clamp(70px,9vw,190px)]";

/* the display heading every block opens with, plain then accent */
function Title({ title, className = "" }: { title: Heading; className?: string }) {
  return (
    <MaskReveal inView amount={0.4} className={className}>
      <h2
        className="display text-[var(--fg)]"
        style={{ fontSize: "clamp(34px, 6vw, 150px)" }}
      >
        {title[0]} <span className="text-accent">{title[1]}</span>
      </h2>
    </MaskReveal>
  );
}

function Hero({ page }: { page: Landing }) {
  /* fills the gutters on a phone; on a wide screen it stops at 11vw so a
     three line headline still leaves the lead above the fold */
  const size = `min(${fitToGutters(page.h1Em)}, max(11vw, 64px))`;
  const last = page.h1.length - 1;

  return (
    <section className="gut pt-[clamp(104px,11vw,230px)]">
      <h1 className="display text-[var(--fg)]" style={{ fontSize: size }}>
        {page.h1.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <span className="rise block" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
              {line}
              {i === last ? <span className="text-accent">.</span> : " "}
            </span>
          </span>
        ))}
      </h1>

      <div className="mt-[clamp(28px,3.4vw,72px)] grid gap-[clamp(18px,2vw,40px)] border-t border-[var(--rule)] pt-[clamp(18px,1.8vw,36px)] md:grid-cols-2">
        <p className="max-w-[30ch] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
          {page.lead}
        </p>
        <div className="max-w-[46ch] md:justify-self-end">
          <p className="text-[length:var(--fs-body)] leading-[1.5] text-[var(--fg-70)]">
            {page.intro}
          </p>
          <div className="mt-[1.6em] flex flex-wrap items-center gap-x-[clamp(20px,2vw,40px)] gap-y-[1em]">
            <ContactButton label="Start a project" />
            <Link
              href="/portfolio"
              className={`${TEXT_LINK} inline-flex min-h-[24px] items-center`}
            >
              See the work
              <span className={TEXT_LINK_RULE} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* one large paragraph, centred, set like the About statement but a size
   down, since it sits between sections rather than owning the screen */
function Statement({ text }: { text: string }) {
  return (
    <section className={`${SECTION} flex justify-center`}>
      <WordsReveal
        inView
        amount={0.3}
        stagger={0.018}
        text={text}
        className="w-[min(62vw,100%)] text-center text-[length:clamp(22px,2.9vw,66px)] font-medium leading-[1.04] tracking-[-0.03em] text-[var(--fg)] max-lg:w-full"
      />
    </section>
  );
}

/* the title, then an intro set against it on wide screens */
function Head({ title, intro }: { title: Heading; intro?: string }) {
  return (
    <div className="grid gap-[clamp(16px,2vw,40px)] lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end">
      <Title title={title} />
      {intro && (
        <p className="max-w-[46ch] text-[length:var(--fs-body)] leading-[1.5] text-[var(--fg-70)] lg:justify-self-end">
          <Rich text={intro} />
        </p>
      )}
    </div>
  );
}

function Rows({ block }: { block: Extract<Block, { kind: "rows" }> }) {
  return (
    <section className={SECTION}>
      <Head title={block.title} intro={block.intro} />
      <div className="mt-[clamp(40px,5vw,110px)] border-b border-[var(--rule)]">
        {block.rows.map((r) => (
          <div
            key={r.h}
            className="grid grid-cols-1 gap-[clamp(10px,1.4vw,34px)] border-t border-[var(--rule)] py-[clamp(22px,2.6vw,54px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
          >
            <h3 className="max-w-[24ch] text-[length:clamp(19px,1.75vw,36px)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--fg)]">
              {r.h}
            </h3>
            <p className="max-w-[56ch] text-[length:var(--fs-body)] leading-[1.5] text-[var(--fg-70)]">
              <Rich text={r.p} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function List({ block }: { block: Extract<Block, { kind: "list" }> }) {
  return (
    <section className={SECTION}>
      <Head title={block.title} intro={block.intro} />
      <ol className="mt-[clamp(40px,5vw,110px)] grid grid-cols-1 gap-x-[clamp(20px,2.4vw,56px)] md:grid-cols-2 lg:grid-cols-3">
        {block.items.map((item, i) => (
          <li
            key={item.h}
            className="grid grid-cols-[clamp(28px,2.6vw,52px)_minmax(0,1fr)] border-t border-[var(--rule)] py-[clamp(20px,2vw,42px)]"
          >
            <span className="micro pt-[0.5em] text-[var(--fg-70)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-[length:clamp(18px,1.45vw,30px)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--fg)]">
                {item.h}
              </h3>
              <p className="mt-[0.6em] max-w-[44ch] text-[length:var(--fs-body)] leading-[1.5] text-[var(--fg-70)]">
                <Rich text={item.p} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* the heading is held beside the paragraphs on desktop while they scroll */
function Prose({ block }: { block: Extract<Block, { kind: "prose" }> }) {
  return (
    <section
      className={`${SECTION} grid gap-[clamp(28px,3vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]`}
    >
      <div className="lg:sticky lg:top-[clamp(90px,7vw,140px)] lg:self-start">
        <Title title={block.title} />
      </div>
      <div className="flex flex-col gap-[1.1em] border-t border-[var(--rule)] pt-[clamp(18px,1.8vw,36px)]">
        {block.paragraphs.map((p, i) =>
          i === 0 ? (
            <p
              key={i}
              className="max-w-[34ch] text-[length:var(--fs-lead)] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--fg)]"
            >
              <Rich text={p} />
            </p>
          ) : (
            <p
              key={i}
              className="max-w-[58ch] text-[length:var(--fs-body)] leading-[1.55] text-[var(--fg-70)]"
            >
              <Rich text={p} />
            </p>
          )
        )}
      </div>
    </section>
  );
}

function Proof({ block }: { block: Extract<Block, { kind: "proof" }> }) {
  return (
    <section className={SECTION}>
      <div className="grid gap-[clamp(20px,2.4vw,56px)] border-y border-[var(--rule)] py-[clamp(30px,3.6vw,80px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <Title title={block.title} />
        <div>
          <p className="max-w-[40ch] text-[length:var(--fs-lead)] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--fg)]">
            <Rich text={block.text} />
          </p>
          <Link
            href="/portfolio"
            className="group relative mt-[1.2em] inline-block text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-accent"
          >
            See the portfolio
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* the matching packages, read live from services.ts so a price changed
   there changes here too */
function Pricing({ block }: { block: Extract<Block, { kind: "pricing" }> }) {
  const packs = block.packages.map((name) => {
    const pack = PACKAGES.find((p) => p.name === name);
    if (!pack) throw new Error(`No package "${name}" in services.ts`);
    return pack;
  });

  return (
    <section className={SECTION}>
      <Head title={block.title} intro={block.intro} />
      <div className="mt-[clamp(40px,5vw,110px)] border-b border-[var(--rule)]">
        {packs.map((pack) => (
          <div
            key={pack.name}
            className="grid grid-cols-1 gap-[clamp(12px,1.6vw,36px)] border-t border-[var(--rule)] py-[clamp(24px,2.8vw,58px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]"
          >
            <div>
              <h3 className="text-[length:clamp(19px,1.75vw,36px)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--fg)]">
                {pack.name}
              </h3>
              {pack.scope && (
                <p className="mt-[0.5em] text-[length:var(--fs-small)] text-[var(--fg-70)]">
                  {pack.scope}
                </p>
              )}
            </div>
            <div>
              <p className="flex flex-wrap items-baseline gap-x-[0.4em] text-[var(--fg)]">
                {pack.priceLead && (
                  <span className="text-[length:var(--fs-small)] text-[var(--fg-70)]">
                    {pack.priceLead}
                  </span>
                )}
                <span className="font-thunder text-[length:clamp(44px,4.6vw,110px)] font-bold leading-[0.9]">
                  {pack.price}
                </span>
                {pack.priceTail && (
                  <span className="text-[length:var(--fs-small)] text-[var(--fg-70)]">
                    {pack.priceTail}
                  </span>
                )}
              </p>
              {pack.monthly && (
                <p className="mt-[0.5em] text-[length:var(--fs-small)] text-[var(--fg-70)]">
                  or {priceText(pack.monthly).toLowerCase()}, 12 month minimum
                </p>
              )}
              <p className="mt-[1em] max-w-[52ch] text-[length:var(--fs-body)] leading-[1.5] text-[var(--fg-70)]">
                {pack.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/services#packages"
        className={`${TEXT_LINK} mt-[clamp(20px,2vw,40px)] inline-flex min-h-[24px] items-center`}
      >
        Every package in full
        <span className={TEXT_LINK_RULE} />
      </Link>
    </section>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "statement":
      return <Statement text={block.text} />;
    case "rows":
      return <Rows block={block} />;
    case "list":
      return <List block={block} />;
    case "prose":
      return <Prose block={block} />;
    case "proof":
      return <Proof block={block} />;
    case "pricing":
      return <Pricing block={block} />;
  }
}

/* service and industry pages as a ruled list of links: the siblings after
   a page's questions, and every one of them on /services */
export function LandingLinks({
  slugs = LANDING_INDEX.map((l) => l.slug),
  title,
  className = "gut pb-[clamp(70px,9vw,190px)]",
}: {
  slugs?: string[];
  title: Heading;
  className?: string;
}) {
  const links = slugs.map((s) => LANDING_INDEX.find((l) => l.slug === s)!);
  return (
    <section className={className}>
      <Title title={title} />
      <ul className="mt-[clamp(30px,4vw,90px)] border-b border-[var(--rule)]">
        {links.map((l) => (
          <li key={l.slug} className="border-t border-[var(--rule)]">
            <Link
              href={landingPath(l)}
              className="group grid grid-cols-1 items-baseline gap-[0.4em] py-[clamp(18px,2vw,42px)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_auto]"
            >
              <span className="text-[length:clamp(22px,2.3vw,48px)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--fg)] transition-colors duration-300 group-hover:text-accent">
                {l.name}
              </span>
              <span className="text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)]">
                {l.blurb}
              </span>
              <span
                aria-hidden
                className="hidden text-[length:clamp(18px,1.6vw,32px)] text-[var(--fg-70)] transition-[color,translate] duration-300 group-hover:translate-x-[0.2em] group-hover:text-accent md:block"
              >
                &rarr;
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function LandingPage({ page }: { page: Landing }) {
  return (
    <main>
      {/* turns over at the questions, the way /services does */}
      <Invert targetId="faq" />
      <Navbar />
      <Hero page={page} />
      {page.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
      <Faq items={page.faq} />
      <LandingLinks slugs={page.related} title={["See", "also"]} />
      <Footer />
    </main>
  );
}
