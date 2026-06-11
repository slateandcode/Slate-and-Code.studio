# Slate & Code Studio — Portfolio Website

A premium three-page studio portfolio for a GCC-focused digital studio.
Built with Next.js (App Router), React 19, Tailwind CSS v4, and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `src/app/page.tsx` — Home (hero, selected work, 3D service deck, studio edge, process, CTA)
- `src/app/services/page.tsx` — Services and pricing
- `src/app/contact/page.tsx` — Contact (Instagram-first + form)
- `src/lib/site.ts` — **Instagram handle and email live here** — update once, applies everywhere
- `src/components/home/ServiceCards3D.tsx` — stacked service cards that focus/blur as you scroll (static under `prefers-reduced-motion`)
- `src/components/home/Convergence.tsx` — one-shot scene that plays on scroll-into-view: three service cards merge into the studio mark
- `src/components/home/previews.tsx` — hand-built project preview mockups (replace with real screenshots when ready)
- `scripts/shots.mjs` — dev-only visual QA: screenshots every section at desktop + mobile widths via headless Edge

## Notes

- The contact form is front-end only: submitting composes a prefilled email
  in the visitor's mail app (`mailto:`). Wire it to a backend or form service
  later by replacing `handleSubmit` in `src/components/contact/ContactForm.tsx`.
- Design tokens (colors, fonts) are defined in `src/app/globals.css` under `@theme`.
