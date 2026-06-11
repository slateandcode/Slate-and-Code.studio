/**
 * Custom-styled project preview placeholders. Each one is a miniature,
 * abstracted version of the real project's layout — built from CSS and SVG
 * so nothing reads as a generic gray box or stock screenshot.
 * All previews are decorative (aria-hidden at the call site).
 */

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line bg-raised px-3 py-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2e2e2e]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#2e2e2e]" />
      <span className="h-1.5 w-1.5 rounded-full bg-[#2e2e2e]" />
      <div className="ml-2 flex h-4 flex-1 items-center rounded bg-well px-2">
        <span className="text-[7px] tracking-wider text-fog/60">{url}</span>
      </div>
    </div>
  );
}

/** Premium automotive website — trust-first layout with a gold booking CTA. */
export function CarInspectionPreview() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-well">
      <BrowserChrome url="inspection — book online" />
      <div className="relative flex-1 p-4">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-10 rounded-sm bg-ivory/25" />
          <div className="flex h-4.5 items-center rounded bg-gold px-2 py-1">
            <span className="text-[6px] font-bold uppercase tracking-[0.16em] text-pit">
              Book inspection
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-1.5">
          <div className="h-2.5 w-[70%] rounded-sm bg-ivory/30" />
          <div className="h-2.5 w-[46%] rounded-sm bg-ivory/30" />
          <div className="mt-2 h-1 w-[55%] rounded-sm bg-ivory/10" />
        </div>
        {/* Car silhouette */}
        <svg viewBox="0 0 240 60" className="absolute bottom-12 right-3 w-[55%] opacity-90">
          <path
            d="M14 46c4-10 12-16 26-18l14-12c4-3 9-5 16-5h52c8 0 14 2 19 6l16 11c20 2 34 7 38 14l2 4H14z"
            fill="#1a1a1a"
            stroke="#2A2A2A"
            strokeWidth="1"
          />
          <circle cx="62" cy="46" r="9" fill="#0e0e0e" stroke="#2A2A2A" />
          <circle cx="172" cy="46" r="9" fill="#0e0e0e" stroke="#2A2A2A" />
          <circle cx="62" cy="46" r="3.5" fill="none" stroke="#D6A85A" strokeOpacity="0.6" />
          <circle cx="172" cy="46" r="3.5" fill="none" stroke="#D6A85A" strokeOpacity="0.6" />
          <path d="M14 56h182" stroke="#D6A85A" strokeOpacity="0.5" strokeWidth="1.5" />
        </svg>
        {/* Service tiles */}
        <div className="absolute inset-x-4 bottom-3 grid grid-cols-3 gap-2">
          {["Engine", "Body", "Report"].map((s) => (
            <div key={s} className="rounded border border-line bg-surface px-2 py-1.5">
              <span className="text-[6px] uppercase tracking-[0.16em] text-fog">{s}</span>
              <div className="mt-1 h-0.5 w-5 rounded-sm bg-gold/50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** B2B spare parts — structured, dense, credibility-led layout. */
export function MubarakAutoPreview() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-well">
      <BrowserChrome url="b2b — spare parts catalogue" />
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-sm border border-edge bg-surface" />
            <div className="h-1.5 w-12 rounded-sm bg-ivory/25" />
          </div>
          <div className="flex h-4 items-center rounded border border-edge px-2">
            <span className="text-[6px] uppercase tracking-[0.16em] text-fog">Get quote</span>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="rounded-sm bg-raised px-1.5 py-0.5 text-[6px] uppercase tracking-[0.16em] text-gold">
            OEM parts
          </span>
          <span className="rounded-sm bg-raised px-1.5 py-0.5 text-[6px] uppercase tracking-[0.16em] text-fog">
            Wholesale
          </span>
          <span className="rounded-sm bg-raised px-1.5 py-0.5 text-[6px] uppercase tracking-[0.16em] text-fog">
            Export
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded border border-line bg-surface p-2">
              <div className="flex h-7 items-center justify-center rounded-sm bg-well">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 opacity-50">
                  <circle cx="10" cy="10" r="6.5" fill="none" stroke="#8A8A8A" strokeWidth="1.4" />
                  <circle cx="10" cy="10" r="2.2" fill="#8A8A8A" />
                  {[0, 60, 120, 180, 240, 300].map((a) => (
                    <line
                      key={a}
                      x1="10"
                      y1="10"
                      x2={10 + 8.6 * Math.cos((a * Math.PI) / 180)}
                      y2={10 + 8.6 * Math.sin((a * Math.PI) / 180)}
                      stroke="#8A8A8A"
                      strokeWidth="1.2"
                    />
                  ))}
                </svg>
              </div>
              <div className="mt-1.5 h-1 w-full rounded-sm bg-ivory/12" />
              <div className="mt-1 h-1 w-1/2 rounded-sm bg-ivory/12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Cinematic editorial layout — letterboxed, atmospheric, story-led. */
export function UntoldArchivesPreview() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-pit">
      {/* Letterbox bars */}
      <div className="h-4 w-full bg-black/80" />
      <div className="relative flex-1">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(214,168,90,0.10),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,0,0,0.9),transparent_70%)]" />
        {/* Editorial title block */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center">
          <p className="text-[6.5px] uppercase tracking-[0.4em] text-gold/90">
            EP. 04 — From the archive
          </p>
          <div className="mx-auto mt-3 h-3.5 w-[72%] rounded-sm bg-ivory/35" />
          <div className="mx-auto mt-2 h-3.5 w-[48%] rounded-sm bg-ivory/35" />
          <div className="mx-auto mt-4 h-px w-12 bg-gold/60" />
          <div className="mx-auto mt-3 h-1 w-[40%] rounded-sm bg-ivory/12" />
        </div>
        {/* Timecode */}
        <div className="absolute bottom-2.5 left-4 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold/80" />
          <span className="text-[6.5px] tracking-[0.25em] text-fog">00:42:17</span>
        </div>
        <div className="absolute bottom-2.5 right-4 text-[6.5px] tracking-[0.25em] text-fog">
          4K — 24FPS
        </div>
      </div>
      <div className="h-4 w-full bg-black/80" />
    </div>
  );
}

/** Reporting dashboard — sidebar, stat tiles, chart, export action. */
export function CrescentPreview() {
  return (
    <div className="flex h-full overflow-hidden bg-well">
      {/* Sidebar */}
      <div className="flex w-9 flex-col items-center gap-2.5 border-r border-line bg-surface py-3">
        <div className="h-3 w-3 rotate-45 rounded-[2px] bg-blue/70" />
        <div className="mt-2 h-1.5 w-4 rounded-sm bg-ivory/25" />
        <div className="h-1.5 w-4 rounded-sm bg-ivory/10" />
        <div className="h-1.5 w-4 rounded-sm bg-ivory/10" />
        <div className="h-1.5 w-4 rounded-sm bg-ivory/10" />
      </div>
      <div className="flex-1 p-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-1.5 w-16 rounded-sm bg-ivory/30" />
            <div className="mt-1 h-1 w-10 rounded-sm bg-ivory/10" />
          </div>
          <div className="flex h-4.5 items-center rounded bg-gold px-2 py-1">
            <span className="text-[6px] font-bold uppercase tracking-[0.14em] text-pit">
              Export PDF
            </span>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["Inspections", "214"],
            ["Pending", "09"],
            ["Delivered", "188"],
          ].map(([l, v]) => (
            <div
              key={l}
              className="rounded border border-line bg-surface px-2 py-1.5 shadow-[0_0_14px_rgba(77,163,255,0.05)]"
            >
              <p className="text-[6px] uppercase tracking-[0.14em] text-fog">{l}</p>
              <p className="mt-0.5 font-display text-[11px] font-semibold text-ivory">{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-2.5 flex h-12 items-end gap-1 rounded border border-line bg-surface p-2">
          {[40, 65, 50, 78, 58, 88, 70, 95, 62, 80].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-sm ${
                i === 7 ? "bg-blue/80 shadow-[0_0_8px_rgba(77,163,255,0.5)]" : "bg-blue/25"
              }`}
            />
          ))}
        </div>
        <div className="mt-2.5 space-y-1.5">
          {[0, 1].map((r) => (
            <div key={r} className="flex items-center gap-2 rounded border border-line bg-surface px-2 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue/60" />
              <div className="h-1 flex-1 rounded-sm bg-ivory/10" />
              <span className="rounded-sm border border-blue/25 bg-blue/10 px-1 text-[5.5px] uppercase tracking-[0.12em] text-blue">
                Ready
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Redesign — split frame: washed-out "before" vs sharp "after". */
export function MahjongPreview() {
  return (
    <div className="relative flex h-full overflow-hidden bg-well">
      {/* Before */}
      <div className="flex-1 border-r border-edge bg-[#181715] p-4 opacity-55">
        <div className="h-1.5 w-10 rounded-sm bg-[#5a554c]" />
        <div className="mt-3 space-y-1.5">
          <div className="h-2 w-[85%] rounded-sm bg-[#4a463f]" />
          <div className="h-2 w-[60%] rounded-sm bg-[#4a463f]" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 rounded-sm bg-[#23211d]" />
          ))}
        </div>
        <p className="mt-3 text-[6px] uppercase tracking-[0.2em] text-[#5a554c]">Before</p>
      </div>
      {/* After */}
      <div className="flex-1 bg-well p-4">
        <div className="flex items-center justify-between">
          <div className="h-1.5 w-10 rounded-sm bg-ivory/30" />
          <div className="h-3 w-8 rounded-sm bg-gold/70" />
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-2 w-[80%] rounded-sm bg-ivory/30" />
          <div className="h-2 w-[52%] rounded-sm bg-ivory/30" />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-sm border border-line bg-surface p-1.5">
              <div className="h-0.5 w-4 rounded-sm bg-gold/50" />
              <div className="mt-1 h-0.5 w-full rounded-sm bg-ivory/10" />
            </div>
          ))}
        </div>
        <p className="mt-3 text-[6px] uppercase tracking-[0.2em] text-fog">After</p>
      </div>
      {/* Divider handle */}
      <div className="absolute left-1/2 top-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-pit">
        <svg viewBox="0 0 10 8" className="h-2 w-2.5">
          <path d="M3 0L0 4l3 4M7 0l3 4-3 4" stroke="#D6A85A" strokeWidth="1.2" fill="none" />
        </svg>
      </div>
    </div>
  );
}
