# DFX Solution 2.0 — Homepage

Next.js 15 (App Router) + TypeScript + Tailwind CSS + GSAP/Lenis-ready homepage implementation.

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

- `app/layout.tsx` — root layout, fonts, metadata, JSON-LD (LocalBusiness, Organization, FAQPage, Breadcrumb)
- `app/page.tsx` — homepage section composition
- `app/robots.ts`, `app/sitemap.ts` — Next.js metadata routes
- `components/` — one component per section (Hero, TrustStrip, Transformation, Industries, Capabilities, Products, Founder, Testimonials, FAQ, FinalCTA, Footer, Nav)
- `components/MagneticButton.tsx` — reusable magnetic CTA
- `components/HeroVisual.tsx` — canvas AI-core visual (client component, respects `prefers-reduced-motion`)
- `components/SmoothScrollProvider.tsx` — wires Lenis smooth scroll + scroll-reveal
- `lib/useLenis.ts`, `lib/useReveal.ts` — reusable animation hooks
- `lib/schema.ts` — structured data objects

## Notes

- All repeated content (brands, industries, capabilities, products, testimonials, FAQ) lives in typed arrays at the top of each component — edit there, not JSX.
- Design tokens (colors, spacing, container width) are in `tailwind.config.ts`; do not hardcode hex values in components.
- `HeroVisual` uses Canvas 2D instead of a 3D library to keep hero LCP low; swap in `three`/`@react-three/fiber` later if a heavier visual is wanted.
- GSAP is installed but not yet wired into `ScrollTrigger` pinned sections — `useReveal` currently does fade/slide via IntersectionObserver, which is lighter weight. Add GSAP ScrollTrigger inside a client component if pinned/scrubbed sequences are needed.
- Replace `svc-visual` inline SVGs and industry gradients with real photography/video once assets are ready — swap for `next/image`/`next/video` with `priority` only on the hero.
- Privacy Policy and Terms pages are linked from the footer but not yet built — required before launch.
