import type { PortableTextBlock } from "@/lib/content/portable-text";

/** Rich body blocks for the Vedlik AI case study (Sanity + static fallback) */
export const sampleVedlikBodyBlocks = [
  {
    _type: "block",
    _key: "vedlik-intro",
    style: "normal",
    markDefs: [
      {
        _key: "vedlik-link",
        _type: "link",
        href: "https://vedlik.com",
        blank: true,
      },
    ],
    children: [
      {
        _type: "span",
        _key: "vedlik-intro-1",
        text: "Vedlik is a free AI and tech intelligence app built for people who need signal, not noise. It serves developers tracking API changes, founders watching funding rounds, and students preparing for technical interviews. Mantravi partnered with the Vedlik team to take the product from concept to a polished ",
        marks: [],
      },
      {
        _type: "span",
        _key: "vedlik-intro-link",
        text: "iOS and Android experience",
        marks: ["vedlik-link"],
      },
      {
        _type: "span",
        _key: "vedlik-intro-2",
        text: " with a marketing site that explains the value in plain language.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-challenge-h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-challenge-h2-span",
        text: "The Challenge",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-challenge-p1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-challenge-p1-span",
        text: "AI and startup news moves fast, but most feeds still read like rewritten press releases. Model licensing, funding terms, and API pricing shifts get buried under opinion and clickbait. Vedlik's founder wanted something different: a mobile product that respects the reader's time and still leaves them with enough context to make a decision.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-challenge-p2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-challenge-p2-span",
        text: "The engineering challenge was not just summarising articles. The app had to structure every story into repeatable insight layers, surface technical signals on demand, explain jargon inline, and let users build a personal research library, while still feeling fast and trustworthy on a phone.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-vision-h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-vision-h2-span",
        text: "Who Vedlik Is Built For",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-vision-li1",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-vision-li1-span",
        text: "Developers and engineers who need breaking changes, API updates, and source links without marketing filler.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-vision-li2",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-vision-li2-span",
        text: "Founders and investors tracking funding, M&A, and category shifts that affect strategy.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-vision-li3",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-vision-li3-span",
        text: "Students and early-career builders who want clear AI concepts they can actually use in projects and interviews.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-approach-h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-approach-h2-span",
        text: "Our Approach",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-approach-p",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-approach-p-span",
        text: "We started with product discovery, mapping reader personas, defining what “enough context” means for each story type, and prototyping the card interaction before writing production code. Design and engineering worked in parallel: UX explored the flip-card metaphor for deeper signals while a Python backend with integrated LLM workflows shaped the insight pipeline that could scale beyond a demo feed.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-approach-p2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-approach-p2-span",
        text: "Learner and Builder onboarding modes let the same product speak to different mental models. Newcomers get more explanation; operators get tighter signal density. That split influenced navigation, copy, and default views across the app.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-features-h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-features-h2-span",
        text: "What We Built",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-feat-h3-1",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-feat-h3-1-span",
        text: "4-Point Insight format",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-feat-p1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-feat-p1-span",
        text: "Every story opens with a consistent structure: key facts, market impact, a builder-focused angle, and the bigger picture. Readers know where to look instead of scanning walls of text.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-feat-h3-2",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-feat-h3-2-span",
        text: "3D Intelligence Flip",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-feat-p2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-feat-p2-span",
        text: "Flip any card to reveal structured signals: funding figures, model metadata, disruption scores, licensing notes, and hardware footprint where relevant. Same story, two depths: quick scan on the front, technical detail on the back.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-feat-h3-3",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-feat-h3-3-span",
        text: "Contextual Knowledge Engine",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-feat-p3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-feat-p3-span",
        text: "Tap AI and technology terms inline for plain-language definitions without leaving the feed. The goal is comprehension on the first read, not a tab-hopping rabbit hole.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-feat-h3-4",
    style: "h3",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-feat-h3-4-span",
        text: "Anti-Fluff Feed & Intel Library",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-feat-p4",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-feat-p4-span",
        text: "Briefs strip repetitive narrative while keeping attribution to reputable sources. Saved stories flow into a personal Intel Library so research threads survive beyond a single session.",
        marks: [],
      },
    ],
  },
  {
    _type: "richCallout",
    _key: "vedlik-trust-callout",
    variant: "tip",
    title: "Trust by design",
    body: "Vedlik prioritises facts before opinions, surfaces original publishers, and keeps the core experience free, with no subscription wall on the intelligence readers come for every day.",
  },
  {
    _type: "block",
    _key: "vedlik-eng-h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-eng-h2-span",
        text: "Engineering Highlights",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-eng-li1",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-eng-li1-span",
        text: "Flutter mobile app for iOS and Android with native-feeling gestures for the card flip and feed scrolling.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-eng-li2",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-eng-li2-span",
        text: "Python services for ingestion, LLM-powered insight structuring, and glossary lookups, backed by Firestore for user data, saved intel, and real-time sync.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-eng-li3",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-eng-li3-span",
        text: "Marketing site aligned with the product narrative, with clear positioning for waitlist, FAQ, and platform availability.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-eng-li4",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-eng-li4-span",
        text: "Integrated LLM workflows for summarisation and entity extraction, with guardrails around source attribution and consistent 4-Point output formatting.",
        marks: [],
      },
    ],
  },
  {
    _type: "block",
    _key: "vedlik-results-h2",
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "vedlik-results-h2-span",
        text: "Results & Deliverables",
        marks: [],
      },
    ],
  },
  {
    _type: "richTable",
    _key: "vedlik-results-table",
    caption: "Project outcomes at a glance",
    headers: ["Area", "Outcome"],
    rows: [
      {
        cells: [
          "Product experience",
          "Unified AI & tech feed with structured 4-Point Insights",
        ],
      },
      {
        cells: [
          "Audience fit",
          "Separate Learner and Builder paths from onboarding",
        ],
      },
      {
        cells: [
          "Depth on demand",
          "Intelligence Flip surfaces funding and technical signals",
        ],
      },
      {
        cells: [
          "Retention",
          "Intel Library for saved research and revisit workflows",
        ],
      },
      {
        cells: [
          "Go-to-market",
          "Public site, waitlist flow, and App Store readiness",
        ],
      },
    ],
  },
  {
    _type: "richQuote",
    _key: "vedlik-quote",
    quote:
      "We did not set out to build another news app. Vedlik had to feel like a daily intelligence brief. Fast enough for a commute, deep enough when you flip the card.",
    attribution: "Product vision, Vedlik",
  },
  {
    _type: "richCta",
    _key: "vedlik-cta",
    eyebrow: "Building an AI product?",
    headline: "Ship a mobile intelligence experience users trust",
    body: "Whether you are launching a consumer AI app or an internal insights tool, Mantravi brings product design, mobile engineering, and LLM integration under one team.",
    bullets: [
      "Flutter apps for iOS and Android from a single codebase",
      "Python + LLM pipelines with evaluation and source attribution",
      "From MVP to App Store launch and beyond",
    ],
    buttonLabel: "Start a conversation",
    actionType: "contact",
    variant: "primary",
  },
] as PortableTextBlock[];
