import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type Props = {
  eyebrow: string;
  /** Accepts nodes so callers can embed serif-accent spans */
  title: ReactNode;
  lead?: string;
  /** Gold eyebrow by default; pass false for muted gray */
  goldEyebrow?: boolean;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  goldEyebrow = true,
  align = "left",
}: Props) {
  const center = align === "center";
  return (
    <Reveal className={center ? "text-center" : ""}>
      <p className={`micro ${goldEyebrow ? "text-gold" : "text-fog"}`}>{eyebrow}</p>
      <h2
        className={`mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.12] text-ivory sm:text-4xl ${
          center ? "mx-auto" : ""
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed text-fog ${
            center ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
