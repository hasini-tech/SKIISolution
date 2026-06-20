# SKII Solutions — Website Redesign (Next.js)

A full redesign of the SKII Solutions marketing site, built with Next.js 14
(App Router), TypeScript, and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Design system

- **Colors**
  - `navy` (#0B1F3A) — primary background for hero, footer, and contrast sections
  - `navy-light` (#14304F) / `navy-line` (#2A4566) — surfaces and borders on dark sections
  - `paper` (#F5F7FA) — light section background
  - `ink` (#0E1B30) — heading text on light backgrounds
  - `slate` (#5C6B80) — body copy on light backgrounds
  - `accent` (#2F6FED) / `accent-deep` (#1D4FBE) — the single accent color, used only for CTAs, icons, and labels
  - `status` (#22C55E) — used sparingly for the "operational" motif

- **Type**
  - Display: **Plus Jakarta Sans** (headings, stats)
  - Body: **Inter**
  - Mono: **JetBrains Mono** — used for labels, the status strip, and case-study eyebrows to give the site an "ops dashboard" texture without leaning on tech clichés

- **Signature element**: a recurring "system status" motif — the thin status
  strip in the header, the live operations panel in the hero, and the
  status dot — ties every section back to the core promise: things run
  quietly in the background. It's used sparingly (3 places total) so it
  reads as intentional rather than decorative.

## Structure

```
app/
  layout.tsx      — fonts + metadata
  page.tsx         — assembles all sections
  globals.css      — tokens, status-dot animation, focus styles
components/
  Nav.tsx          — sticky header + status strip
  Hero.tsx         — headline, CTAs, ops panel mockup
  Services.tsx     — 4-card service grid
  WhyUs.tsx        — stat tiles on navy
  CaseStudies.tsx  — problem / solution / result
  Process.tsx      — 4-step engagement timeline
  Testimonials.tsx — client quotes
  About.tsx        — company story + team monograms
  ContactFooter.tsx— form, contact details, social links, footer
```

## Notes for customization

- Replace placeholder address, UEN, email, and social links in
  `ContactFooter.tsx` with real details.
- The contact form is static markup — wire `onSubmit` to your email
  provider, CRM, or an API route (`app/api/contact/route.ts`).
- Team monograms in `About.tsx` are intentionally flat/illustrated rather
  than stock photography; swap in real photos by replacing the initials
  `div` with an `<Image />` component if preferred.
