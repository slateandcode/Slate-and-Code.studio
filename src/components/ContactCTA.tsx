import { PillButton } from "./PillCTA";

/* the ask on the home page, under the strip of work */
export default function ContactCTA() {
  return (
    <section id="contact" className="gut pb-[clamp(20px,2vw,44px)]">
      <PillButton label="Contact for work" href="/contact" />
    </section>
  );
}
