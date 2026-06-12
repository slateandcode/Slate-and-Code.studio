"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const FAQS = [
  {
    q: "How long does a website take?",
    a: "A landing page usually takes 1 to 2 weeks. Full business websites take 2 to 4 weeks depending on pages, features, and how ready your content is.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Your business goals, any brand assets you have (logo, colors, photos), and examples of sites you like. If something is missing, we help you figure it out during the project.",
  },
  {
    q: "How do payments work?",
    a: "A deposit books your slot and the remainder is due on delivery. Larger builds are split into milestones so you always know what you are paying for.",
  },
  {
    q: "Do you handle domains and hosting?",
    a: "Yes. Setup, connection, and launch support are included with every website. Ongoing hosting and maintenance can be arranged as a monthly add-on.",
  },
  {
    q: "Can you work with an existing website?",
    a: "Yes. Redesigns and upgrades are a core service, whether that means a visual refresh or a full rebuild on a cleaner foundation.",
  },
  {
    q: "What if I'm not sure which package I need?",
    a: "Send a message on Instagram with a short description of your business and goals. We'll point you to the right package, no pressure attached.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={i > 0 ? "border-t border-line" : ""}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-raised sm:px-7"
            >
              <span className="font-display text-[15px] font-semibold text-ivory sm:text-base">
                {f.q}
              </span>
              <span
                aria-hidden
                className={`relative h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gold" />
                <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-xl px-6 pb-6 text-sm leading-relaxed text-fog sm:px-7">
                    {f.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
