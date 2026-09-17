import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { MaskReveal } from "@/components/reveal";
import { LINKS, MAILTO } from "@/lib/links";
import { PACKAGES, priceText } from "@/lib/services";
import { OG_IMAGE } from "@/lib/site";
import { TEXT_LINK, TEXT_LINK_RULE } from "@/lib/ui";

const TITLE = "Contact";
const DESCRIPTION =
  "Tell the studio what you are building. Websites from $1,500 or $150 a month, custom business tools from $4,000. Answered the same day.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: `${TITLE} · Slate & Code Studio`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} · Slate & Code Studio`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

/* what the visitor can expect once they hit send, in the process section's
   own words so the two pages never promise different things */
const NEXT = [
  {
    title: "Same-day reply",
    desc: "A real answer from the person who would build it, with any questions and a time for a short call.",
  },
  {
    title: "Discovery call",
    desc: "What you need, when you need it and what it should cost. No deck, no pitch, no pressure to decide on the spot.",
  },
  {
    title: "One proposal",
    desc: "Price, timeline and exactly what gets delivered, in writing. Once it is signed, the number does not move.",
  },
];

/* the entry tier, both ways, so an ad that quoted either figure is
   confirmed on the page it lands on */
const ENTRY = PACKAGES[0];

/*
  The contact page: where every Contact button on the site leads, and where
  ads point. The form on one side, and on the other,
  the answers to "who is this and what happens next" that a visitor arriving
  cold needs before they will fill it in.

  On a phone it reads intro, form, then the rest, so the form is one scroll
  away. On desktop the form sits beside the intro and the steps run under it.
  No invert here, so the page stays on ink the whole way down.
*/
export default function ContactPage() {
  return (
    <main>
      <Navbar />

      <section className="gut pb-[clamp(70px,9vw,190px)] pt-[clamp(104px,11vw,230px)]">
        <div className="grid grid-cols-1 gap-x-[clamp(40px,5vw,120px)] gap-y-[clamp(40px,5vw,96px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* intro */}
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="flex items-center gap-[0.7em] text-[length:var(--fs-micro)]">
              <span className="animate-blink block size-[0.42em] rounded-full bg-accent" />
              <span className="micro text-accent">
                Contact · Taking new projects
              </span>
            </span>

            <MaskReveal className="mt-[0.9em]">
              <h1 className="display text-[length:clamp(64px,26vw,190px)] text-[var(--fg)] lg:text-[length:clamp(96px,11vw,280px)]">
                Start a<br />
                project<span className="text-accent">.</span>
              </h1>
            </MaskReveal>

            <p className="mt-[0.9em] max-w-[30ch] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
              You talk to the person doing the work. Say what you are making
              and it gets answered the same day.
            </p>
          </div>

          {/* the form, held beside the reader on desktop while the steps
              scroll past under the intro */}
          <div
            id="contact-form"
            className="border border-[var(--rule)] bg-[var(--surface)] lg:sticky lg:top-[clamp(80px,6.5vw,120px)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
          >
            <div className="flex items-center justify-between gap-[1em] border-b border-[var(--rule)] px-[clamp(20px,2.4vw,48px)] py-[1em]">
              <span className="micro text-[var(--fg-70)]">Project inquiry</span>
              <span className="micro text-[var(--fg-70)]">No handoffs</span>
            </div>
            <div className="px-[clamp(20px,2.4vw,48px)] py-[clamp(24px,2.6vw,52px)]">
              <ContactForm />
            </div>
          </div>

          {/* what happens next, pricing, and the direct lines */}
          <div className="lg:col-start-1 lg:row-start-2">
            <h2 className="micro text-[var(--fg-70)]">What happens next</h2>
            <ol className="mt-[1.4em] border-b border-[var(--rule)]">
              {NEXT.map((step, i) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[clamp(28px,2.6vw,52px)_minmax(0,1fr)] border-t border-[var(--rule)] py-[clamp(18px,1.8vw,36px)]"
                >
                  <span className="micro pt-[0.45em] text-[var(--fg-70)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[length:var(--fs-step)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg)]">
                      {step.title}
                    </h3>
                    <p className="mt-[0.5em] max-w-[46ch] text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)]">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-[clamp(30px,3vw,64px)] grid gap-[clamp(28px,3vw,64px)] sm:grid-cols-2">
              <div>
                <h2 className="micro text-[var(--fg-70)]">Pricing</h2>
                <p className="mt-[0.8em] text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg)]">
                  {ENTRY.name} {priceText(ENTRY).toLowerCase()}
                  {ENTRY.monthly &&
                    `, or ${priceText(ENTRY.monthly).toLowerCase()}`}
                  .
                </p>
                <Link
                  href="/services"
                  className={`${TEXT_LINK} mt-[1em] inline-flex min-h-[24px] items-center`}
                >
                  Every package
                  <span className={TEXT_LINK_RULE} />
                </Link>
              </div>

              <div>
                <h2 className="micro text-[var(--fg-70)]">Or directly</h2>
                <a
                  href={MAILTO}
                  className="group mt-[0.8em] inline-block text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg)]"
                >
                  {LINKS.email}
                  <span className="block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </a>
                <a
                  href={LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${TEXT_LINK} mt-[1em] flex min-h-[24px] w-fit items-center`}
                >
                  Instagram
                  <span className={TEXT_LINK_RULE} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
