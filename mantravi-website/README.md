# Mantravi Website

Appinventiv-inspired corporate website for **Mantravi** — built with Next.js 15, Tailwind CSS, Framer Motion, Lenis smooth scroll, and Sanity CMS.

## Pages

- `/` — Homepage (17 sections)
- `/about` — About Us (timeline, team, testimonials)
- `/portfolio` — Case study listing with filters
- `/portfolio/[slug]` — Case study detail
- `/blog` — Blog listing with categories
- `/blog/[slug]` — Article detail
- `/blog/category/[slug]` — Category listing

## Sanity CMS (separate studio)

Run the CMS studio locally:

```bash
npm run sanity:dev
```

Or deploy hosted studio:

```bash
npm run sanity:deploy
```

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity CMS

1. Create a project at [sanity.io](https://sanity.io)
2. Copy `.env.local.example` to `.env.local` and fill in credentials
3. Run `npm run sanity:dev` to manage content

Without Sanity configured, the site uses built-in placeholder content.

## Design

- Primary color: Sky Blue (`#0EA5E9`)
- Font: Inter
- Smooth scroll: Lenis

## Build

```bash
npm run build
npm start
```
