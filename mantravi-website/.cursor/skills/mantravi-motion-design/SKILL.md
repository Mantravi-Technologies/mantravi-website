---
name: mantravi-motion-design
description: >-
  Mantravi website motion design system and Appinventiv-inspired layout rules.
  Use when editing UI components, homepage sections, service pages, portfolio
  cards, or animations for the Mantravi Next.js site.
---

# Mantravi Motion & Design System

## Brand Tokens

- Primary: `#0EA5E9` (sky blue)
- Page dark: `#050505` (`--page-dark`)
- Page cream: `#f5f0e8` (`--page-cream`)
- Display font: Bebas Neue (`--font-display`, `.title-display`)
- Script accent: Instrument Serif italic (`--font-script`, `.title-script`)

## Section Variants

| Variant | Use |
|---------|-----|
| `cinematic` | Dark sections with radial glow + optional `.grain-overlay` |
| `cream` | Logo marquees, awards, FAQ — warm off-white |
| `light` | Compliance, light content bands |
| `dark` | Legacy dark sections |
| `accent` | Legacy CTA (prefer dark split CTA with `SwapTextButton`) |

Use `SectionShell` from `components/ui/SectionShell.tsx`. Pass `display` on `SectionHeading` for Appinventiv-style uppercase headlines.

## Homepage Patterns (Appinventiv-inspired)

1. **Hero**: dark cinematic, grain, display H1 + `TextReveal`, `SwapTextButton` CTAs, `HeroInitCard`
2. **Stats**: `StatCounter` with `staircase` + `dark` on `.stats-staircase`
3. **Portfolio**: GSAP ScrollTrigger pin + 360° ring (`PortfolioShowcaseSection`); reduced-motion → static carousel fallback
4. **Client marquee**: cream section, Enterprise/Public toggle, circular `.logo-pod` logos
5. **Industries**: dark tabs + split panel (gradient image + copy)
6. **CTA**: dark split band, display headline, `SwapTextButton`
7. **Header**: transparent on `/`, solid `bg-black/90` on scroll

## Animation Rules

1. **GPU-only**: animate `opacity`, `transform` — not layout properties except accordion
2. **Reduced motion**: `useReducedMotion()` or CSS `@media (prefers-reduced-motion: reduce)`; portfolio falls back to non-pinned carousel
3. **Reuse primitives**:
   - `ScrollReveal`, `TextReveal`, `HoverCard`
   - `SwapTextButton` for primary CTAs
   - Variants from `lib/animations/variants.ts`
4. **Lenis + GSAP**: `SmoothScrollProvider` syncs Lenis with ScrollTrigger; call `ScrollTrigger.refresh()` on resize/font load

## When to Animate

| Element | Pattern |
|---------|---------|
| Hero H1 | `TextReveal` inside `.title-display` |
| Section grids | `staggerContainer` + `fadeUp` |
| Tabs | `layoutId` sliding indicator |
| Tab panels | `AnimatePresence` crossfade |
| Stats | `StatCounter` spring count-up; staircase offset on desktop |
| Marquees | CSS `animate-marquee`, pause on hover; `LogoMarquee` with `pods` |
| Buttons | `SwapTextButton` swap-text hover |
| Header | dark transparent → solid on scroll |

## Portfolio 360° Showcase

`PortfolioShowcaseSection`:

- Pinned scroll scene with intro blur lockup (display + script fonts)
- 3D ring carousel via CSS `perspective` / `rotateY` / `translateZ`
- Grain overlay on scene
- Reduced motion: `Portfolio360Fallback` with prev/next controls

Case study data: `lib/content/case-studies.ts` — `getCarouselCaseStudies()`, include `gradient`.

## Copy Rules

- **Never copy Appinventiv text verbatim**
- Use Mantravi voice: engineering, AI-first, measurable outcomes
- Keep all 13 homepage sections in `app/page.tsx` order — do not merge or remove sections

## Key Files

- Tokens/CSS: `app/globals.css` (grain, staircase, swap-text, logo-pod)
- Motion: `components/motion/*`, `hooks/useScrollScene.ts`, `hooks/useReducedMotion.ts`
- Homepage: `app/page.tsx`, `components/sections/*`
- Portfolio: `PortfolioShowcaseSection.tsx`, GSAP ScrollTrigger

## Do Not

- Remove homepage sections or reorder them without explicit request
- Copy Appinventiv client names, copy, or assets
- Edit plan files in `.cursor/plans/`
