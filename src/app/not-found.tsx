import type { Metadata } from "next";
import { ButtonPrimary, ButtonSecondary, ArrowIcon } from "@/components/Buttons";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden py-28">
      {/* Ambient grid + glow, matching the site's hero language */}
      <div
        aria-hidden
        className="grid-faint mask-fade pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gold/[0.05] blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <p className="micro text-gold">Error · 404</p>

          <p className="mt-6 font-display text-[7rem] font-semibold leading-none text-outline sm:text-[11rem]">
            404
          </p>

          <h1 className="mt-6 max-w-lg font-display text-2xl font-semibold leading-snug text-ivory sm:text-3xl">
            This page never made it past{" "}
            <em className="serif-accent">the drafting table</em>.
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-fog">
            The link may be broken, or the page may have moved. Let&apos;s get
            you back to something that&apos;s actually built.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <ButtonPrimary href="/">
              Back home <ArrowIcon />
            </ButtonPrimary>
            <ButtonSecondary href="/services">View services</ButtonSecondary>
          </div>
        </div>
      </div>
    </section>
  );
}
