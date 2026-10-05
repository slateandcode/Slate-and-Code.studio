import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EditingForm from "@/components/EditingForm";
import { MaskReveal } from "@/components/reveal";
import { CHANNELS, VIDEOS, thumbUrl, watchUrl } from "@/lib/editing";
import { TEXT_LINK, TEXT_LINK_RULE } from "@/lib/ui";

/* Unlisted: reachable by link only. Out of the navbar, the footer and the
   sitemap, and kept out of search results. */
export const metadata: Metadata = {
  title: "Video Editing",
  description:
    "Video editing for YouTube channels and shorts. 10M+ views across the channels I edit.",
  robots: { index: false, follow: false },
};

export default function EditingPage() {
  return (
    <main>
      <Navbar />

      <section className="gut pt-[clamp(104px,11vw,230px)]">
        <span className="flex items-center gap-[0.7em] text-[length:var(--fs-micro)]">
          <span className="animate-blink block size-[0.42em] rounded-full bg-accent" />
          <span className="micro text-accent">
            Editing · Taking new channels
          </span>
        </span>
        <MaskReveal className="mt-[0.9em]">
          <h1 className="display text-[length:clamp(64px,22vw,190px)] text-[var(--fg)] lg:text-[length:clamp(96px,11vw,280px)]">
            10M+ views<span className="text-accent">.</span>
          </h1>
        </MaskReveal>
        <div className="mt-[clamp(28px,3.4vw,72px)] grid gap-[1em] border-t border-[var(--rule)] pt-[clamp(18px,1.8vw,36px)] md:grid-cols-2">
          <p className="max-w-[30ch] text-[length:var(--fs-lead)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--fg)]">
            Video editing for YouTube channels, from shorts that travel to
            long-form that holds.
          </p>
          <p className="max-w-[44ch] text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)] md:justify-self-end">
            I edit Untold Archives and Midwinter Archives, and I also work with
            Golf Cart Media. The four videos below alone gathered over 10M
            views.
          </p>
        </div>
      </section>

      {/* the work */}
      <section className="gut pt-[clamp(48px,6vw,120px)]">
        <h2 className="micro text-[var(--fg-70)]">Selected edits</h2>
        <ul className="mt-[1.4em] grid grid-cols-2 gap-x-[clamp(14px,1.6vw,32px)] gap-y-[clamp(28px,3vw,60px)] lg:grid-cols-[1fr_1fr_2.2fr_2.2fr] lg:items-start">
          {VIDEOS.map((v) => (
            <li key={v.id} className={v.short ? "" : "col-span-2 lg:col-span-1"}>
              <a
                href={watchUrl(v)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className={`relative overflow-hidden ${v.short ? "aspect-[9/16]" : "aspect-video"} bg-[var(--surface)]`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbUrl(v)}
                    alt={`${v.channel} video, ${v.views} views`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-[0.9em] flex items-baseline justify-between gap-[1em]">
                  <span className="text-[length:var(--fs-step)] font-medium leading-[1] tracking-[-0.02em] text-[var(--fg)]">
                    {v.views}+ views
                  </span>
                  <span className="micro text-[var(--fg-70)]">
                    {v.short ? "Short" : "Video"} ↗
                  </span>
                </div>
                <p className="micro mt-[0.5em] text-[var(--fg-70)]">
                  {v.channel}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* channels */}
      <section className="gut pt-[clamp(56px,7vw,140px)]">
        <h2 className="micro text-[var(--fg-70)]">Channels</h2>
        <ul className="mt-[1.4em] border-b border-[var(--rule)]">
          {CHANNELS.map((c) => (
            <li
              key={c.name}
              className="grid items-baseline gap-[0.4em] border-t border-[var(--rule)] py-[clamp(18px,1.8vw,36px)] md:grid-cols-[1fr_1fr_auto]"
            >
              <h3 className="text-[length:var(--fs-step)] font-medium leading-[1.05] tracking-[-0.02em] text-[var(--fg)]">
                {c.name}
              </h3>
              <p className="text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)]">
                {c.note}
              </p>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${TEXT_LINK} inline-flex min-h-[24px] w-fit items-center`}
              >
                Open channel ↗<span className={TEXT_LINK_RULE} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* contact */}
      <section
        id="contact"
        className="gut pb-[clamp(70px,9vw,190px)] pt-[clamp(56px,7vw,140px)]"
      >
        <div className="grid gap-x-[clamp(40px,5vw,120px)] gap-y-[clamp(28px,3vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div>
            <h2 className="micro text-[var(--fg-70)]">Work together</h2>
            <p className="mt-[0.9em] max-w-[16ch] text-[length:clamp(32px,4vw,84px)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--fg)]">
              Need an editor who ships views
              <span className="text-accent">?</span>
            </p>
            <p className="mt-[1em] max-w-[34ch] text-[length:var(--fs-body)] leading-[1.45] text-[var(--fg-70)]">
              Tell me about the channel and what you are making. You get a
              same-day reply from the person who would edit it.
            </p>
          </div>
          <div className="border border-[var(--rule)] bg-[var(--surface)]">
            <div className="flex items-center justify-between border-b border-[var(--rule)] px-[clamp(20px,2.4vw,48px)] py-[1em]">
              <span className="micro text-[var(--fg-70)]">Editing inquiry</span>
              <span className="micro text-[var(--fg-70)]">No handoffs</span>
            </div>
            <div className="px-[clamp(20px,2.4vw,48px)] py-[clamp(24px,2.6vw,52px)]">
              <EditingForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
