"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { cubic, EASE_OUT } from "@/lib/anim";
import {
  OPEN_CONSENT_EVENT,
  loadPixel,
  readConsent,
  revokePixel,
  saveConsent,
  type Consent,
} from "@/lib/pixel";

/* The consent banner and the pixel it gates (see src/lib/pixel.ts).

   Asks once, small and in the corner, without blocking the page. Yes loads
   the pixel and counts a PageView for the page and every route after it; no
   loads nothing. The App Router swaps pages without a reload, so the
   PageView is sent here on each path change rather than by Meta's snippet. */

const BUTTON =
  "micro rounded-[3px] px-[1.4em] py-[1.1em] transition-colors duration-300";

export default function MetaPixel() {
  const pathname = usePathname();
  /* undefined until storage has been read, so the banner never flashes for
     someone who already chose */
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setAsking(c === null);
    const reopen = () => setAsking(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  useEffect(() => {
    if (consent !== "granted") return;
    loadPixel();
    window.fbq?.("consent", "grant");
    window.fbq?.("track", "PageView");
  }, [consent, pathname]);

  const choose = (c: Consent) => {
    saveConsent(c);
    if (c === "denied" && consent === "granted") revokePixel();
    setConsent(c);
    setAsking(false);
  };

  return (
    <AnimatePresence>
      {asking && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [...EASE_OUT] }}
          className="fixed inset-x-[var(--gutter)] bottom-[var(--gutter)] z-[70] max-w-[400px] border border-[var(--rule)] bg-[var(--bg)] text-[var(--fg)] shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:right-auto"
        >
          <div className="bg-[var(--surface)] p-[clamp(18px,1.4vw,26px)]">
            <p className="text-[length:var(--fs-small)] leading-[1.45] text-[var(--fg-70)]">
              <span className="text-[var(--fg)]">Can we use ad cookies?</span>{" "}
              They let Meta tell us which of our ads bring people here. Nothing
              is set unless you say yes.{" "}
              <Link
                href="/privacy#cookies"
                className="underline decoration-[var(--rule)] underline-offset-4 transition-colors duration-300 hover:text-accent"
              >
                Privacy policy
              </Link>
            </p>
            <div className="mt-[1.1em] flex gap-[0.6em]">
              <button
                type="button"
                onClick={() => choose("granted")}
                className={`${BUTTON} bg-accent text-white hover:bg-white hover:text-ink`}
                style={{ transitionTimingFunction: cubic(EASE_OUT) }}
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => choose("denied")}
                className={`${BUTTON} border border-[var(--rule)] text-[var(--fg-70)] hover:text-[var(--fg)]`}
              >
                Decline
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
