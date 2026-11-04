import Navbar from "./Navbar";
import Footer from "./Footer";
import Faq from "./Faq";
import Invert from "./Invert";
import EditingForm from "./EditingForm";
import MotionHero from "./MotionHero";
import Passes from "./Passes";
import { CtaBlock } from "./PillCTA";
import { MaskReveal, WordsReveal } from "./reveal";
import { FAQ, FORM, PLANS, PROOF } from "@/lib/motion";
import { fitToGutters } from "@/lib/type";

/* ---------------------------------------------------------------------------
   /motion, built the way the home page is: the work first and big, words
   kept to a line where a line will do, and the page turning from ink to
   paper on the 10M+, before the prices. The copy is all in src/lib/motion.ts.
--------------------------------------------------------------------------- */

/* 10M+ sets 1.557em in Thunder Bold; it fills the gutters until the screen
   is short, then stops at half its height */
const PROOF_SIZE = `min(${fitToGutters(1.557)}, 52svh)`;

function Proof() {
  return (
    <section id="proof" className="gut py-[clamp(70px,9vw,190px)] text-center">
      <MaskReveal inView amount={0.3}>
        <p className="display text-[var(--fg)]" style={{ fontSize: PROOF_SIZE }}>
          {PROOF.figure.replace("+", "")}
          <span className="text-accent">+</span>
        </p>
      </MaskReveal>
      <WordsReveal
        inView
        text={PROOF.text}
        className="mx-auto mt-[0.6em] max-w-[22ch] text-[length:clamp(22px,2.6vw,56px)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--fg)]"
      />
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="gut py-[clamp(70px,9vw,190px)]">
      <MaskReveal inView amount={0.4} className="text-center">
        <h2 className="display whitespace-nowrap text-[var(--fg)]" style={{ fontSize: "clamp(34px, 8vw, 200px)" }}>
          What it <span className="text-accent">costs</span>
        </h2>
      </MaskReveal>

      <div className="mt-[clamp(40px,5vw,110px)] grid gap-[clamp(12px,1.2vw,24px)] lg:grid-cols-3">
        {PLANS.map((plan, i) => {
          /* the plan sits in the signal red, the way the home page sets
             the one word it wants you to read */
          const lead = i === 1;
          return (
            <article
              key={plan.name}
              className={`flex flex-col rounded-[clamp(14px,1.2vw,24px)] p-[clamp(22px,2.4vw,48px)] ${
                lead ? "bg-accent text-white" : "border border-[var(--rule)] text-[var(--fg)]"
              }`}
            >
              <div className="flex items-baseline justify-between gap-[1em]">
                <h3 className="micro">{plan.name}</h3>
                <span className={`micro ${lead ? "text-white/75" : "text-[var(--fg-70)]"}`}>{plan.scope}</span>
              </div>
              <p className="display mt-[clamp(28px,3vw,64px)] text-[length:clamp(64px,6.4vw,150px)]">{plan.price}</p>
              <p className={`mt-[0.6em] text-[length:var(--fs-small)] ${lead ? "text-white/80" : "text-[var(--fg-70)]"}`}>
                {plan.priceTail}
              </p>
              <p
                className={`mb-[1.6em] mt-[1.4em] text-[length:var(--fs-body)] leading-[1.45] ${
                  lead ? "text-white/90" : "text-[var(--fg-70)]"
                }`}
              >
                {plan.summary}
              </p>
              {/* pushed to the foot so the three lists line up, with room
                  above the rule however long the summary runs */}
              <ul className={`mt-auto border-t pt-[1.2em] ${lead ? "border-white/30" : "border-[var(--rule)]"}`}>
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-center gap-[0.7em] py-[0.3em] text-[length:var(--fs-small)] font-medium">
                    <span aria-hidden className={`size-[0.42em] shrink-0 ${lead ? "bg-white" : "bg-accent"}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {/* the ask, straight under the prices */}
      <CtaBlock
        prompt="Not sure which fits? Send one clip and get a price the same day."
        label="Start a reel"
        href="#inquiry"
        className="mt-[clamp(40px,5vw,110px)]"
      />
    </section>
  );
}

export default function MotionPage() {
  return (
    <main>
      {/* turns to paper as the 10M+ arrives, so the figure lands on it */}
      <Invert targetId="proof" />
      <Navbar />
      <MotionHero />
      <Passes />
      <Proof />
      <Pricing />
      {/* the ask is already under the prices and the form is next */}
      <Faq items={FAQ} ask={null} />

      <section
        id="inquiry"
        className="gut scroll-mt-[clamp(70px,6vw,120px)] pb-[clamp(70px,9vw,190px)] pt-[clamp(40px,5vw,100px)]"
      >
        <div className="grid gap-x-[clamp(40px,5vw,120px)] gap-y-[clamp(28px,3vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <MaskReveal inView amount={0.4}>
              <h2 className="display text-[var(--fg)]" style={{ fontSize: "clamp(56px, 7.4vw, 180px)" }}>
                Send the <span className="text-accent">clip</span>
              </h2>
            </MaskReveal>
            <p className="mt-[1em] max-w-[30ch] text-[length:var(--fs-lead)] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--fg)]">
              Tell me what you post and how often. Same-day reply from the person who would edit it.
            </p>
          </div>
          <div className="border border-[var(--rule)] bg-[var(--surface)]">
            <div className="flex items-center justify-between border-b border-[var(--rule)] px-[clamp(20px,2.4vw,48px)] py-[1em]">
              <span className="micro text-[var(--fg-70)]">Reel inquiry</span>
              <span className="micro text-[var(--fg-70)]">No handoffs</span>
            </div>
            <div className="px-[clamp(20px,2.4vw,48px)] py-[clamp(24px,2.6vw,52px)]">
              <EditingForm copy={FORM} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
