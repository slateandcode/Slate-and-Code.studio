"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { InstagramIcon } from "@/components/Buttons";
import { SITE } from "@/lib/site";

/**
 * Floating "message us" pill for the services page. Appears after the
 * visitor scrolls past the first viewport, hides once the closing CTA
 * (#services-cta) is on screen so the two never compete.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const cta = document.getElementById("services-cta");
      const past = window.scrollY > window.innerHeight * 0.85;
      const ctaVisible = cta
        ? cta.getBoundingClientRect().top < window.innerHeight
        : false;
      setShow(past && !ctaVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 right-5 z-[70] flex items-center gap-2.5 rounded-full border border-gold/45 bg-pit/90 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.5),0_0_22px_rgba(214,168,90,0.12)] backdrop-blur transition-colors duration-300 hover:border-gold/70"
        >
          <span className="text-gold">
            <InstagramIcon className="h-4 w-4" />
          </span>
          <span className="text-[13px] font-semibold text-ivory">
            Not sure? Message me
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
