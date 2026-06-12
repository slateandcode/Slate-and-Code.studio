import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Slate & Code Studio | Design, Development, Film",
    template: "%s | Slate & Code Studio",
  },
  description:
    "A GCC-focused digital studio creating premium websites, business tools, and short-form content for brands that care about how their work looks, feels, and performs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${instrument.variable}`}
    >
      <body className="bg-ink font-sans text-ivory">
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
