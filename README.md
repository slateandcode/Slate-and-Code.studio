# Slate & Code Studio

The studio site — [slateandcode.studio](https://www.slateandcode.studio).
Next.js App Router, React 19, Tailwind v4, Motion, Lenis.

## Run it

```bash
npm install
npm run dev      # http://localhost:7030
npm run build
```

## Routes

- `src/app/page.tsx` — hero, manifesto, work strip, CTA, process, about, footer
- `src/app/services/page.tsx` — services, packages (one-time / monthly), FAQ
- `src/app/contact/page.tsx` — the contact page every Contact button leads to
- `src/app/api/contact/route.ts` — sends the contact form through Resend
- `src/app/not-found.tsx`, `robots.ts`, `sitemap.ts`

## Where things live

- `src/lib/site.ts` — public origin and the share card. Everything's metadata
  builds off it, so the og:image resolves absolutely.
- `src/lib/links.ts` — every external link, including the inbox address.
- `src/lib/services.ts` — the service tiers with their one-time and monthly
  prices.
- `src/lib/inquiry.ts` — the contact form's budget and timeline options, which
  the API validates against, and the email body both send paths share.
- `src/lib/anim.ts` — the easing curves and durations the whole site shares.
- `src/lib/type.ts`, `src/lib/ui.ts` — the type scale and the repeated class strings.
- `src/app/globals.css` — colour tokens, the fluid type scale, `@font-face`.

## How a few things work

- **Contact** is its own page, `/contact`. The navbar pill, the orange CTA,
  the FAQ and the footer all link to it. Submitting the form
  (`ContactForm.tsx`) posts to `/api/contact`, which emails the inbox through
  Resend. If that cannot send
  (no key, an outage, no connection), the form composes a prefilled `mailto:`
  instead, so an inquiry is never lost.
- **Pricing** switches between one-time and monthly on `/services`.
  `/services?billing=monthly` opens on the monthly figures.

## Environment

- `RESEND_API_KEY` — needed for the form to send from the page. Without it
  the form falls back to `mailto:`.
- `CONTACT_TO`, `CONTACT_FROM` — optional; default to
  `hello@slateandcode.studio` and `inquiries@slateandcode.studio`.
- **The page inverts** from ink to paper as `#about` takes the viewport;
  `src/components/Invert.tsx` drives it off the scroll position.
- **The work strip** runs on its own; press and hold to skim it faster, with
  the blur tracking the speed. A clean click opens the project's live site,
  a drag doesn't.
- **Reduced motion** is honoured throughout: reveals start resolved, Lenis
  never initialises, and scrolling is native.

## Fonts

Thunder and Neue Montreal, subset to Latin and trimmed to the five weights
actually used. `/public/fonts` holds those subsets; the originals stay out of
the repo. The four faces on screen at first paint are preloaded in the layout.
