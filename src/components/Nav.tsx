"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The bar is near-invisible over the hero and fades in progressively as you
  // scroll — background, blur, border, and content opacity all ramp together.
  const { scrollY } = useScroll();
  const bgAlpha = useTransform(scrollY, [0, 300], [0, 0.85]);
  const blurPx = useTransform(scrollY, [0, 300], [0, 12]);
  const borderAlpha = useTransform(scrollY, [0, 300], [0, 1]);
  const contentOpacity = useTransform(scrollY, [0, 180], [0.62, 1]);
  const bg = useMotionTemplate`rgba(11, 11, 11, ${bgAlpha})`;
  const blur = useMotionTemplate`blur(${blurPx}px)`;
  const borderColor = useMotionTemplate`rgba(37, 37, 37, ${borderAlpha})`;

  // Gold accents stay neutral white over the hero and "unlock" to gold on scroll
  const accent = useTransform(scrollY, [0, 340], ["#f4f1ea", "#d6a85a"]);
  const accentSoft = useTransform(
    scrollY,
    [0, 340],
    ["rgba(244, 241, 234, 0.28)", "rgba(214, 168, 90, 0.5)"],
  );

  // Close the mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // When the mobile menu is open the bar must be solid regardless of scroll.
  // The accent vars are always scroll-driven so the gold unlocks the same way.
  const headerStyle = {
    ...(open
      ? {
          backgroundColor: "rgba(11, 11, 11, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottomColor: "rgba(37, 37, 37, 1)",
        }
      : {
          backgroundColor: bg,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          borderBottomColor: borderColor,
        }),
    "--nav-accent": accent,
    "--nav-accent-soft": accentSoft,
  };

  return (
    <motion.header
      style={headerStyle}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <motion.nav
        style={open ? { opacity: 1 } : { opacity: contentOpacity }}
        className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        {/* Wordmark — deliberately quiet; the work carries the name */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="block h-2 w-2 rotate-45 bg-[var(--nav-accent,#f4f1ea)] transition-transform duration-500 group-hover:rotate-[225deg]" />
          <span className="font-display text-[15px] font-semibold tracking-[0.18em] text-ivory">
            SLATE <span className="text-[var(--nav-accent,#f4f1ea)]">&</span> CODE
            <span className="ml-2 text-[10px] font-medium tracking-[0.3em] text-fog">
              STUDIO
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                  active ? "text-ivory" : "text-fog hover:text-ivory"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-[var(--nav-accent,#f4f1ea)]" />
                )}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="inline-flex h-9 items-center rounded-lg border border-[var(--nav-accent-soft,rgba(244,241,234,0.28))] px-4 text-[13px] font-semibold text-[var(--nav-accent,#f4f1ea)] transition-all duration-300 hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(214,168,90,0.18)]"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-px w-5 bg-ivory transition-transform duration-300 ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-ivory transition-transform duration-300 ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-ink/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-5">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3 py-3 text-[15px] font-medium transition-colors ${
                    pathname === l.href
                      ? "bg-raised text-ivory"
                      : "text-fog hover:text-ivory"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-3 inline-flex h-11 items-center justify-center rounded-lg border border-[var(--nav-accent-soft,rgba(244,241,234,0.28))] text-sm font-semibold text-[var(--nav-accent,#f4f1ea)]"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
