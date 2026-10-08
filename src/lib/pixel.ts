/* The Meta Pixel, behind consent.

   The pixel sets advertising cookies, and the privacy policy commits to UK
   GDPR, so it never loads until the visitor says yes on the consent banner
   (<MetaPixel />). Until then nothing is requested from Meta and no cookie is
   set. The choice is kept in localStorage, and "Cookie settings" in the
   footer reopens the banner so it can be changed.

   The base code is Meta's own snippet, unrolled: it defines the fbq queue,
   then pulls fbevents.js in asynchronously. Meta's <noscript> image is left
   out on purpose: a visitor without JavaScript cannot consent. */

export const PIXEL_ID = "1633415938315493";

const CONSENT_KEY = "sc-consent-ads";
export const OPEN_CONSENT_EVENT = "sc:cookie-settings";

export type Consent = "granted" | "denied";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(c: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, c);
  } catch {
    /* private mode: the choice holds for this page view only */
  }
}

/* Meta's base code, run once */
export function loadPixel() {
  if (window.fbq) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  window.fbq = n;
  if (!window._fbq) window._fbq = n;

  const t = document.createElement("script");
  t.async = true;
  t.src = "https://connect.facebook.net/en_US/fbevents.js";
  const s = document.getElementsByTagName("script")[0];
  s.parentNode?.insertBefore(t, s);

  n("init", PIXEL_ID);
}

/* a standard event, sent only if the pixel is loaded, which means only with
   consent */
export function track(event: string, params?: Record<string, unknown>) {
  window.fbq?.("track", event, params);
}

/* withdrawing consent: stop sending, and drop the cookies Meta set */
export function revokePixel() {
  window.fbq?.("consent", "revoke");
  const host = location.hostname.replace(/^www\./, "");
  for (const name of ["_fbp", "_fbc"]) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${host}`;
  }
}
