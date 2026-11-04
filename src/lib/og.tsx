import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Landing } from "./landing";
import { SITE_NAME } from "./site";

/* ---------------------------------------------------------------------------
   The share card for a service or industry page, and for /motion: its headline set in Thunder
   on ink, the way the page opens, with the studio name and address on a
   quiet line above.

   next/og cannot read woff2, so src/lib/og/ holds TTF copies of the two
   faces converted from the subset woff2 files in /public/fonts (same glyphs,
   nothing the site does not already serve). If those files change, convert
   them again with fontTools: TTFont(woff2), flavor = None, save as .ttf.
--------------------------------------------------------------------------- */

export const OG_SIZE = { width: 1200, height: 630 };

const INK = "#0b0b0b";
const PAPER = "#f1efea";
const ACCENT = "#ff4a17";
const PAD = 64;

const font = (name: string) => readFile(join(process.cwd(), "src/lib/og", `${name}.ttf`));

export async function landingCard(page: Pick<Landing, "h1" | "h1Em">) {
  const [thunder, neue] = await Promise.all([font("Thunder-Bold"), font("NeueMontreal-Medium")]);

  /* the headline fills the width, unless its lines would run out of height
     first; h1Em is the longest line's set width */
  const width = OG_SIZE.width - PAD * 2;
  const height = OG_SIZE.height - PAD * 2 - 90;
  const size = Math.floor(Math.min(width / page.h1Em, height / (page.h1.length * 0.9)));
  const last = page.h1.length - 1;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: PAD,
          background: INK,
          color: PAPER,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Neue Montreal",
            fontSize: 26,
            color: "rgba(241, 239, 234, 0.7)",
          }}
        >
          <span>{SITE_NAME}</span>
          <span>slateandcode.studio</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Thunder",
            fontSize: size,
            lineHeight: 0.9,
            textTransform: "uppercase",
          }}
        >
          {page.h1.map((line, i) => (
            <div key={line} style={{ display: "flex" }}>
              {line}
              {i === last && <span style={{ color: ACCENT }}>.</span>}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Thunder", data: thunder, weight: 700, style: "normal" },
        { name: "Neue Montreal", data: neue, weight: 500, style: "normal" },
      ],
    }
  );
}
