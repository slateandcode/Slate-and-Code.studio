import { ImageResponse } from "next/og";

// Branded share card used for Open Graph + Twitter (App Router auto-wires both).
export const alt =
  "Slate & Code Studio — premium websites, business tools, and short-form content";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0b",
          fontFamily: "sans-serif",
        }}
      >
        {/* Warm glow rising from centre, echoing the hero. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 32%, rgba(214,168,90,0.12), rgba(10,10,11,0) 70%)",
          }}
        />

        {/* Bordered logo card. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
            padding: "76px 104px",
            borderRadius: 26,
            border: "1px solid rgba(214,168,90,0.28)",
            background: "rgba(22,21,20,0.55)",
            boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 34,
                height: 34,
                background: "#D6A85A",
                transform: "rotate(45deg)",
                borderRadius: 5,
                marginRight: 34,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: 6,
                color: "#F4F1EA",
              }}
            >
              <span>SLATE</span>
              <span style={{ color: "#D6A85A", margin: "0 26px" }}>&amp;</span>
              <span>CODE</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: 22,
              color: "#8b8b8b",
              paddingLeft: 22,
            }}
          >
            STUDIO
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 56,
            display: "flex",
            fontSize: 26,
            letterSpacing: 2,
            color: "#9a9a9a",
          }}
        >
          Design · Develop · Direct
        </div>
      </div>
    ),
    { ...size },
  );
}
