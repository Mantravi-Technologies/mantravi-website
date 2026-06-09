import type { PortableTextBlock } from "@/lib/content/portable-text";

/** Sample rich blocks for static fallback / demos */
export const sampleBlogBodyBlocks = [
  {
    _type: "block",
    _key: "intro",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "intro-span",
        text: "Choosing a tech stack isn't about chasing trends — it's about matching your product stage, team skills, and growth timeline.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "h2-constraints",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "h2-constraints-span",
        text: "Start With Constraints",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "p-constraints",
    style: "normal",
    markDefs: [
      {
        _key: "link-mark",
        _type: "link",
        href: "https://nextjs.org/docs",
        blank: true,
      },
    ],
    children: [
      {
        _type: "span",
        _key: "p-constraints-span",
        text: "Budget, time-to-market, and expected user load should drive your first decision. See the ",
        marks: [],
      },
      {
        _type: "span",
        _key: "p-constraints-link",
        text: "Next.js documentation",
        marks: ["link-mark"],
      },
      {
        _type: "span",
        _key: "p-constraints-end",
        text: " for SSR and routing patterns that scale.",
        marks: [],
      },
    ],
  },
  {
    _type: "richTable",
    _key: "stack-table",
    caption: "Common stack choices by stage",
    headers: ["Stage", "Web", "Mobile"],
    rows: [
      { cells: ["MVP", "Next.js", "React Native"] },
      { cells: ["Scale", "Node + Postgres", "Native modules"] },
    ],
  },
  {
    _type: "block",
    _key: "h2-maintenance",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "h2-maintenance-span",
        text: "Plan for Maintenance",
        marks: [],
      },
    ],
  },
  {
    _type: "richCallout",
    _key: "maintenance-callout",
    variant: "tip",
    title: "Hiring pool matters",
    body: "The stack you choose today is the one your team maintains for years. Favour ecosystems with strong documentation and active communities.",
  },
  {
    _type: "richCta",
    _key: "blog-cta",
    eyebrow: "Need help deciding?",
    headline: "Talk to our product engineering team",
    body: "Share your product stage, timeline, and constraints — we will suggest a practical first release and ballpark effort.",
    bullets: [
      "Senior engineers on every engagement",
      "Fixed milestones after a short discovery sprint",
      "Web, mobile, AI, and QA under one roof",
    ],
    buttonLabel: "Open contact form",
    actionType: "contact",
    variant: "primary",
  },
] as PortableTextBlock[];

export const sampleAmeyruBodyBlocks = [
  {
    _type: "block",
    _key: "ameyru-challenge-h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "ameyru-challenge-h2-span",
        text: "The Challenge",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "ameyru-challenge-p",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "ameyru-challenge-p-span",
        text: "A new kidswear brand needed a digital experience that felt credible to parents and easy to navigate on mobile.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "ameyru-solution-h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "ameyru-solution-h2-span",
        text: "Our Approach",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "ameyru-solution-p",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "ameyru-solution-p-span",
        text: "Storefront and brand UX with performance-first implementation and detail-oriented product presentation.",
        marks: [],
      },
    ],
  },
  {
    _type: "richTable",
    _key: "ameyru-results",
    caption: "Focus areas",
    headers: ["Area", "Outcome"],
    rows: [
      { cells: ["Brand UX", "Parent-trustworthy shopping flow"] },
      { cells: ["Performance", "Core Web Vitals tuned"] },
    ],
  },
  {
    _type: "richCta",
    _key: "ameyru-cta",
    eyebrow: "Similar project?",
    headline: "Let's build your storefront",
    buttonLabel: "Talk to us",
    buttonUrl: "/services/consulting",
    variant: "dark",
  },
] as PortableTextBlock[];

export { sampleVedlikBodyBlocks } from "@/lib/content/vedlik-case-study-body";
