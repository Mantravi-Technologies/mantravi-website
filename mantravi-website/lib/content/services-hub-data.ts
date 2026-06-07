import type { ServiceImageSlot } from "./services-data";
export const servicesHubMeta = {
  title: "Software Development, SEO, QA & AI Services",
  description:
    "Mantravi offers custom web and mobile development, brand & SEO marketing, QA automation, and production AI engineering, one accountable partner from MVP to scale.",
};
const hubImageBase = "/images/services/hub";
export const servicesHubImages: {
  hero: ServiceImageSlot;
  intro: ServiceImageSlot;
  showcase: ServiceImageSlot;
  trust: ServiceImageSlot;
} = {
  hero: {
    alt: "Mantravi team delivering software development, SEO, QA, and AI services",
    hint: "Hero, team collaboration, office, or multi-service collage",
    path: `${hubImageBase}/hero.webp`,
    aspect: "hero",
  },
  intro: {
    alt: "Digital engineering and growth partner across product, marketing, QA, and AI",
    hint: "Intro, client workshop, sprint demo, or delivery snapshot",
    path: `${hubImageBase}/intro.webp`,
    aspect: "landscape",
  },
  showcase: {
    alt: "Showcase of Mantravi services across web development, SEO, QA automation, and AI",
    hint: "Showcase banner, portfolio strip or four-practice visual",
    path: `${hubImageBase}/showcase.webp`,
    aspect: "wide",
  },
  trust: {
    alt: "Mantravi delivery team and client partnership",
    hint: "Trust, team photo, stand-up, or client success moment",
    path: `${hubImageBase}/trust.webp`,
    aspect: "portrait",
  },
};
function practiceImage(
  slug: string,
  alt: string,
  hint: string,
): ServiceImageSlot {
  return {
    alt,
    hint,
    path: `${hubImageBase}/practice-${slug}.webp`,
    aspect: "landscape",
  };
}
export const servicesHubHero = {
  eyebrow: "Mantravi digital services",
  title: "Custom software development, SEO, QA automation, and AI engineering",
  subtitle:
    "Mantravi helps startups and growing businesses design, build, test, and scale digital products, with dedicated squads for product engineering, search marketing, quality assurance, and production AI.",
  keywords: [
    "custom software development company",
    "SEO and digital marketing services",
    "QA automation services",
    "AI development company",
    "web and mobile app development",
  ],
};
export const servicesHubIntro = {
  heading: "One partner across product, growth, quality, and AI",
  paragraphs: [
    "Mantravi is a digital engineering and growth partner, not a generic agency listing dozens of unrelated offerings. Our services are organized into four practices so you engage the right specialists: custom web and mobile development, brand and SEO marketing, QA and IT solutions, and AI and data engineering.",
    "Whether you need an MVP built with React and Next.js, a technical SEO program that improves organic traffic, Playwright test automation in your CI/CD pipeline, or a production RAG system grounded in your documents, each practice has defined capabilities, tooling, delivery process, and case studies.",
    "Clients choose Mantravi when they want accountable delivery, transparent milestones, and teams that understand both business outcomes and production constraints, security, performance, observability, and maintainability included from the start.",
  ],
};
export type ServicesHubPractice = {
  slug: string;
  href: string;
  title: string;
  summary: string;
  body: string;
  highlights: string[];
  cta: string;
  image: ServiceImageSlot;
};
export const servicesHubPractices: ServicesHubPractice[] = [
  {
    slug: "product-engineering",
    href: "/services/product-engineering",
    title: "Digital Products & Development",
    summary:
      "Custom web apps, mobile products, MVPs, and scalable software engineering.",
    body: "Our product engineering team delivers end-to-end development, UI/UX design, React and Next.js web apps, iOS and Android mobile apps, backend APIs, DevOps, and cloud deployment. We scope MVPs in 8–12 weeks and enterprise modules in phased releases with demos every sprint.",
    highlights: [
      "Web & mobile app development",
      "MVP and product design systems",
      "API, cloud, and DevOps delivery",
    ],
    cta: "Explore product development",
    image: practiceImage(
      "product-engineering",
      "Custom web and mobile product development by Mantravi",
      "Product, app screens, sprint demo, or engineering team",
    ),
  },
  {
    slug: "consulting",
    href: "/services/consulting",
    title: "Brand, SEO & Marketing",
    summary:
      "Brand identity, technical SEO, content strategy, and conversion-focused campaigns.",
    body: "Mantravi combines brand design with technical SEO and analytics, so your site architecture, Core Web Vitals, content, and landing pages work together. We run keyword research, on-page optimization, campaign creative, and reporting tied to leads and revenue, not vanity metrics.",
    highlights: [
      "SEO audits & content strategy",
      "Brand identity & landing pages",
      "Marketing analytics & CRO",
    ],
    cta: "Explore SEO & marketing",
    image: practiceImage(
      "consulting",
      "Brand identity and SEO marketing services",
      "Marketing, analytics dashboard, brand kit, or campaign creative",
    ),
  },
  {
    slug: "qa-it",
    href: "/services/qa-it",
    title: "QA & IT Solutions",
    summary:
      "Test automation, performance engineering, DevOps, and production monitoring.",
    body: "Ship with confidence. We build Playwright and Cypress regression suites, integrate quality gates into GitHub Actions and GitLab CI, run k6 load tests, and set up Datadog or Sentry monitoring, for products we build or systems delivered by other teams.",
    highlights: [
      "Playwright & Cypress automation",
      "Performance & security testing",
      "CI/CD pipelines & observability",
    ],
    cta: "Explore QA & IT services",
    image: practiceImage(
      "qa-it",
      "QA automation and IT solutions",
      "QA, test dashboard, CI pipeline, or monitoring view",
    ),
  },
  {
    slug: "ai-data",
    href: "/services/ai-data",
    title: "AI & Data Engineering",
    summary: "Production GenAI, RAG, AI agents, data pipelines, and MLOps.",
    body: "Move beyond demos. Mantravi designs grounded GenAI assistants, retrieval-augmented generation (RAG), intelligent automation, Snowflake and dbt data pipelines, and MLOps, with evaluation, governance, and cost controls suited to enterprise production.",
    highlights: [
      "LLM integrations & RAG systems",
      "AI agents with guardrails",
      "Data platforms & MLOps",
    ],
    cta: "Explore AI & data services",
    image: practiceImage(
      "ai-data",
      "AI and data engineering services",
      "AI, RAG assistant, data pipeline diagram, or MLOps screen",
    ),
  },
];
export const servicesHubTrust = [
  {
    title: "Accountable delivery",
    description:
      "Named squads, sprint demos, and written milestones, you always know what shipped, what is next, and who owns it.",
  },
  {
    title: "Production standards",
    description:
      "Security reviews, accessibility, Core Web Vitals, test automation, and monitoring are part of delivery, not optional add-ons.",
  },
  {
    title: "Transparent communication",
    description:
      "Direct access to engineers and leads, shared backlogs, and honest scoping when timelines or trade-offs change.",
  },
];
export const servicesHubIndustries = {
  heading: "Industries we serve",
  description:
    "We deliver software, SEO, QA, and AI projects across regulated and high-growth sectors, adapting compliance, integrations, and release cadence to your market.",
  items: [
    "SaaS & B2B software",
    "E-commerce & D2C",
    "EdTech & learning platforms",
    "Healthcare & wellness",
    "FinTech & professional services",
    "Enterprise operations",
  ],
};
export const servicesHubProcess = [
  {
    num: "01",
    title: "Discover",
    description:
      "Goals, users, constraints, and success metrics, aligned before build.",
  },
  {
    num: "02",
    title: "Plan",
    description:
      "Architecture, roadmap, and tooling chosen for your stack and timeline.",
  },
  {
    num: "03",
    title: "Deliver",
    description: "Sprints with demos, quality gates, and transparent progress.",
  },
  {
    num: "04",
    title: "Launch",
    description: "Deploy, monitor, and optimize for real users and traffic.",
  },
  {
    num: "05",
    title: "Grow",
    description: "Iterate on features, SEO, automation, or AI as usage scales.",
  },
];
export const servicesHubFaqs = [
  {
    question: "What services does Mantravi offer?",
    answer:
      "Mantravi offers four practice areas: digital product development (custom web apps, mobile apps, MVP development), brand and SEO marketing, QA and IT solutions (test automation, performance testing, DevOps), and AI and data engineering (RAG, AI agents, MLOps). Each service has a dedicated page with capabilities, process, technology stack, and FAQs.",
  },
  {
    question: "Can Mantravi handle both software development and QA?",
    answer:
      "Yes. Many clients engage us for full-stack product builds with embedded QA and CI/CD quality gates. We also provide standalone QA automation, performance testing, and release support for applications built by other vendors.",
  },
  {
    question: "Do you work with startups and enterprises?",
    answer:
      "We scope MVPs for founders in 8–12 weeks and deliver phased enterprise modules with clear milestones. Squads adapt to your release cadence, compliance requirements, and internal tooling.",
  },
  {
    question: "How do SEO and product development work together at Mantravi?",
    answer:
      "Brand, technical SEO, and engineering sit under one roof, site architecture, page speed, structured content, and conversion paths are designed together. That avoids costly rework when marketing needs are discovered after launch.",
  },
  {
    question: "Where is Mantravi located and how do you collaborate remotely?",
    answer:
      "We work with clients globally through structured async updates, sprint demos, and shared project tools. Time-zone overlap is planned during discovery so decision-makers stay in the loop.",
  },
  {
    question: "How do I get a quote for a software or AI project?",
    answer:
      "Share your goals, timeline, and any existing systems via our contact form. We respond with scope options, recommended practice area, and a realistic milestone plan, typically within two business days.",
  },
];
