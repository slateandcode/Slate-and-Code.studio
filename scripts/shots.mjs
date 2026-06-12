// Dev-only visual QA: drives the installed Edge over CDP, scrolls through
// each page, and saves section screenshots to %TEMP%\snc-shots.
import puppeteer from "puppeteer-core";
import { mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import os from "node:os";

const OUT = join(os.tmpdir(), "snc-shots");
mkdirSync(OUT, { recursive: true });

const BASE = process.env.BASE_URL || "http://localhost:4500";

const EDGE_PATHS = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
];
const edge = EDGE_PATHS.find((p) => existsSync(p));

const browser = await puppeteer.launch({
  executablePath: edge,
  headless: "new",
  args: ["--no-first-run", "--hide-scrollbars"],
});

async function shoot(page, name) {
  await page.screenshot({ path: join(OUT, `${name}.png`), type: "png" });
  console.log("saved", name);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function run(width, height, suffix) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });

  // HOME — top
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await sleep(2200);
  await shoot(page, `home-hero${suffix}`);

  // HOME — scroll through every section; merge-* park at the convergence
  // scene (#studio) and catch its one-shot timeline at increasing dwell times
  const metrics = await page.evaluate(() => {
    const rect = (el) => el.getBoundingClientRect().top + window.scrollY;
    const work = document.getElementById("work");
    const studio = document.getElementById("studio");
    const sections = [...document.querySelectorAll("main > section")];
    const deck = sections[2];
    return {
      work: work ? rect(work) : 800,
      deckTop: deck ? rect(deck) : 3000,
      deckH: deck ? deck.offsetHeight : 3000,
      studioTop: studio ? rect(studio) : 7000,
      studioH: studio ? studio.offsetHeight : 2000,
      bodyH: document.body.scrollHeight,
      vh: window.innerHeight,
    };
  });
  const deckStops = [0.18, 0.5, 0.85].map(
    (f) => metrics.deckTop + (metrics.deckH - metrics.vh) * f,
  );
  const mergePos = Math.max(0, metrics.studioTop - metrics.vh * 0.2);
  const positions = {
    work: metrics.work - 80,
    "deck-1": deckStops[0],
    "deck-2": deckStops[1],
    "deck-3": deckStops[2],
    edge: metrics.deckTop + metrics.deckH + 100,
    process: metrics.deckTop + metrics.deckH + metrics.vh * 0.95,
    "merge-1": mergePos,
    "merge-2": mergePos,
    "merge-3": mergePos,
    cta: metrics.bodyH - metrics.vh,
  };
  for (const name of Object.keys(positions)) {
    await page.evaluate((y) => window.scrollTo(0, y), positions[name]);
    await sleep(1400);
    await shoot(page, `home-${name}${suffix}`);
  }

  // SERVICES
  await page.goto(`${BASE}/services`, { waitUntil: "domcontentloaded" });
  await sleep(2500);
  await shoot(page, `services-top${suffix}`);
  // Client-brief typing block: catch it mid-type, then after it lands
  await page.evaluate(() => {
    const label = [...document.querySelectorAll("p")].find(
      (p) => p.textContent === "Client brief",
    );
    const y = label
      ? label.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35
      : document.body.scrollHeight * 0.14;
    window.scrollTo(0, Math.max(0, y));
  });
  await sleep(1500);
  await shoot(page, `services-brief-typing${suffix}`);
  await sleep(2200);
  await shoot(page, `services-brief-done${suffix}`);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.42));
  await sleep(1400);
  await shoot(page, `services-cards${suffix}`);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1400);
  await shoot(page, `services-bottom${suffix}`);

  // CONTACT
  await page.goto(`${BASE}/contact`, { waitUntil: "domcontentloaded" });
  await sleep(2000);
  await shoot(page, `contact-top${suffix}`);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await sleep(1400);
  await shoot(page, `contact-bottom${suffix}`);

  await page.close();
}

await run(1440, 900, "");
await run(390, 844, "-m");

await browser.close();
console.log("done ->", OUT);
