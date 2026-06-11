import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
};

const base =
  "inline-flex h-12 items-center justify-center gap-2.5 rounded-lg px-6 text-sm font-semibold tracking-wide transition-all duration-300 whitespace-nowrap";

function Wrapper({
  href,
  external,
  className,
  children,
}: ButtonProps & { className: string }) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 12.5 12.5 3.5M5.5 3.5h7v7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Solid gold CTA — used once or twice per screen, never more. */
export function ButtonPrimary({ href, children, className = "", external }: ButtonProps) {
  return (
    <Wrapper
      href={href}
      external={external}
      className={`${base} bg-gold text-pit hover:bg-[#e0b468] hover:shadow-[0_0_28px_rgba(214,168,90,0.22)] ${className}`}
    >
      {children}
    </Wrapper>
  );
}

/** Quiet bordered CTA. */
export function ButtonSecondary({ href, children, className = "", external }: ButtonProps) {
  return (
    <Wrapper
      href={href}
      external={external}
      className={`${base} border border-edge text-ivory hover:border-fog hover:bg-raised ${className}`}
    >
      {children}
    </Wrapper>
  );
}

/** Gold-outlined CTA with a thin glow — reserved for the Instagram action. */
export function ButtonGold({ href, children, className = "", external }: ButtonProps) {
  return (
    <Wrapper
      href={href}
      external={external}
      className={`${base} border border-gold/55 text-gold shadow-[0_0_18px_rgba(214,168,90,0.10)] hover:bg-gold/10 hover:shadow-[0_0_26px_rgba(214,168,90,0.22)] ${className}`}
    >
      {children}
    </Wrapper>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
    </svg>
  );
}
