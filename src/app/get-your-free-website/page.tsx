import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FreeSiteQuiz from "@/components/FreeSiteQuiz";
import { MaskReveal } from "@/components/reveal";
import { pageMetadata } from "@/lib/site";

const TITLE = "Get Your Free Website";
const DESCRIPTION =
  "Answer three quick questions and get a new website designed for your business, free. If you love it, we launch it.";

/* A paid-campaign landing page: out of the navbar, the footer and the
   sitemap, and kept out of search results. The ads link here directly, and
   the share card is set so the link previews properly where it is posted. */
export const metadata: Metadata = {
  ...pageMetadata({
    title: TITLE,
    description: DESCRIPTION,
    path: "/get-your-free-website",
  }),
  robots: { index: false, follow: false },
};

const HOW = [
  {
    title: "Three questions",
    desc: "Tap an answer and the next one comes up. It takes under a minute.",
  },
  {
    title: "We design it",
    desc: "A website made for your business, by the person who would build and launch it.",
  },
  {
    title: "You decide",
    desc: "Love it and we launch it. If not, you walk away and owe nothing.",
  },
];

/*
  The quiz is the page. On a phone it sits straight under the headline, so it
  is on screen from the ad click; the how-it-works runs after it. On desktop
  it is held beside the intro while the steps scroll past underneath.
*/
export default function FreeWebsitePage() {
  return (
    <main>
      <Navbar />

      <section className="gut pb-[clamp(70px,9vw,190px)] pt-[clamp(104px,11vw,230px)]">
        <div className="grid grid-cols-1 gap-x-[clamp(40px,5vw,120px)] gap-y-[clamp(32px,4vw,96px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* intro */}
          <div className="lg:col-start-1 lg:row-start-1">
            <span className="flex items-center gap-[0.7em] text-[length:var(--fs-micro)]">
              <span className="animate-blink block size-[0.42em] rounded-full bg-accent" />
              <span className="micro text-accent">
                Free website · Three quick questions
              </span>
            </span>

            <MaskReveal className="mt-[0.9em]">
              <h1 className="display text-[length:clamp(60px,19vw,190px)] text-[var(--fg)] lg:text-[length:clamp(96px,9.4vw,250px)]">
                Get your
                <br />
                free website<span className="text-accent">.</span>
              </h1>
            </MaskReveal>

            <p className="mt-[0.9em] max-w-[32ch] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
              Answer three quick questions and we design a new website for
              your business, free. If you love it, we launch it.
            </p>
          </div>

          {/* the quiz, held beside the reader on desktop */}
          <div
            id="free-website"
            className="lg:sticky lg:top-[clamp(80px,6.5vw,120px)] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start"
          >
            <FreeSiteQuiz />
          </div>

          {/* how it works */}
          <div className="lg:col-start-1 lg:row-start-2">
            <h2 className="micro text-[var(--fg-70)]">How it works</h2>
            <ol className="mt-[1.4em] border-b border-[var(--rule)]">
              {HOW.map((step, i) => (
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
