import type { ServiceSeoContent } from "./service-seo-extensions";
import { serviceSeoExtensions } from "./service-seo-extensions";
export type ServiceCapability = {
  id: string;
  title: string;
  description: string;
};
export type ServiceDifferentiator = {
  num: string;
  title: string;
  description: string;
};
export type ServiceFAQ = { question: string; answer: string };
export type ServiceProcessStep = {
  num: string;
  title: string;
  description: string;
};
export type TechStackCategory = {
  category: string;
  description: string;
  items: string[];
};
export type ServiceImageSlot = {
  /** Set when image is ready, path under /public, e.g. /images/services/product-engineering/hero.webp */ src?: string;
  alt: string;
  hint: string;
  path: string;
  aspect?: "hero" | "landscape" | "square" | "portrait" | "wide";
};
export type ServiceImages = {
  hero: ServiceImageSlot;
  overview: ServiceImageSlot;
  showcase: ServiceImageSlot;
  process: ServiceImageSlot;
  whyUs: ServiceImageSlot;
};
export type ServicePage = {
  slug: string;
  title: string;
  heroSubtitle: string;
  metaDescription: string;
  intro: string;
  introExtended: string;
  outcomes: string[];
  capabilities: ServiceCapability[];
  capabilitiesHeading?: string;
  capabilitiesDescription?: string;
  processSteps: ServiceProcessStep[];
  processHeading?: string;
  processDescription?: string;
  differentiators: ServiceDifferentiator[];
  serviceTags: string[];
  techStack: TechStackCategory[];
  techSection: {
    title: string;
    description: string;
    variant: "light" | "dark" | "cream" | "cinematic";
  };
  faqs: ServiceFAQ[];
  faqHeading?: string;
  faqDescription?: string;
  heroTheme?: "engineering" | "marketing" | "qa" | "ai";
  images: ServiceImages;
  seoContent?: ServiceSeoContent;
  relatedSlugs?: string[];
};
const defaultProcess: ServiceProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    description:
      "Align on goals, users, constraints, and success metrics before we write a line of code.",
  },
  {
    num: "02",
    title: "Design",
    description:
      "Shape flows, architecture, and delivery plans your team can execute with confidence.",
  },
  {
    num: "03",
    title: "Build",
    description:
      "Ship in focused sprints with demos, transparent backlogs, and quality built in.",
  },
  {
    num: "04",
    title: "Validate",
    description:
      "Test, measure, and refine against real usage, not assumptions.",
  },
  {
    num: "05",
    title: "Launch & Grow",
    description:
      "Deploy, monitor, and iterate so the product keeps improving after go-live.",
  },
];
function serviceImages(
  slug: string,
  copy: {
    hero: { alt: string; hint: string };
    overview: { alt: string; hint: string };
    showcase: { alt: string; hint: string };
    process: { alt: string; hint: string };
    whyUs: { alt: string; hint: string };
  },
): ServiceImages {
  const base = `/images/services/${slug}`;
  return {
    hero: { ...copy.hero, path: `${base}/hero.webp`, aspect: "hero" },
    overview: {
      ...copy.overview,
      path: `${base}/overview.webp`,
      aspect: "landscape",
    },
    showcase: {
      ...copy.showcase,
      path: `${base}/showcase.webp`,
      aspect: "wide",
    },
    process: {
      ...copy.process,
      path: `${base}/process.webp`,
      aspect: "landscape",
    },
    whyUs: { ...copy.whyUs, path: `${base}/why-us.webp`, aspect: "portrait" },
  };
}
export const servicePages: ServicePage[] = [
  {
    slug: "product-engineering",
    title: "Digital Products & Development",
    heroSubtitle:
      "From concept to launch, web, mobile, and custom software built to grow with your business",
    metaDescription:
      "Mantravi builds custom web apps, mobile products, and scalable software with React, Next.js, Flutter, and cloud-native engineering. MVP to enterprise delivery.",
    intro:
      "We design and ship digital products that are fast, intuitive, and built to scale.",
    introExtended:
      "Whether you're launching an MVP or upgrading a mature platform, Mantravi handles discovery, UI/UX, engineering, and deployment, one accountable partner instead of juggling vendors.",
    outcomes: [
      "Faster time-to-market with a single delivery squad",
      "Modern stacks tuned for performance and maintainability",
      "Design systems and APIs that scale with your roadmap",
      "Clear milestones from prototype through production launch",
    ],
    capabilitiesHeading: "Product engineering capabilities",
    capabilitiesDescription:
      "Full-stack development services for startups and growing teams, from UX design through deployment.",
    capabilities: [
      {
        id: "ui-ux",
        title: "UI/UX Design",
        description:
          "Research-driven interfaces that balance clarity, brand, and conversion.",
      },
      {
        id: "mobile",
        title: "Mobile App Development",
        description: "Native and cross-platform apps for iOS and Android.",
      },
      {
        id: "web",
        title: "Web Development",
        description:
          "High-performance web apps with Next.js, React, and modern stacks.",
      },
      {
        id: "backend",
        title: "Software Engineering",
        description:
          "Scalable backend systems, APIs, and services architecture.",
      },
      {
        id: "devops",
        title: "DevOps",
        description:
          "CI/CD pipelines, infrastructure as code, and observability.",
      },
      {
        id: "mvp",
        title: "MVP Development",
        description:
          "Rapid validation builds for startups and new product lines.",
      },
      {
        id: "design-systems",
        title: "Product Design Systems",
        description:
          "Reusable component libraries for consistent multi-platform UX.",
      },
    ],
    processSteps: defaultProcess,
    processHeading: "Our product development process",
    processDescription:
      "Structured delivery from discovery to launch, so MVPs and enterprise modules ship on predictable timelines.",
    differentiators: [
      {
        num: "01",
        title: "End-to-End Ownership",
        description:
          "Design, engineering, and deployment in one squad, fewer handoffs, faster shipping.",
      },
      {
        num: "02",
        title: "Startup to Enterprise",
        description:
          "MVPs for founders and scalable platforms for growing organizations.",
      },
      {
        num: "03",
        title: "Performance by Default",
        description:
          "Core Web Vitals, accessibility, and security considered from sprint one.",
      },
      {
        num: "04",
        title: "Agile Delivery",
        description:
          "Two-week sprints with demos, transparent backlogs, and measurable velocity.",
      },
    ],
    serviceTags: ["mobile", "web", "ui"],
    techStack: [
      {
        category: "Frontend",
        description:
          "React and Next.js frontends optimized for Core Web Vitals, accessibility, and SEO.",
        items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        category: "Mobile",
        description:
          "Cross-platform and native mobile apps for iOS and Android with shared APIs.",
        items: ["React Native", "Flutter", "Swift", "Kotlin"],
      },
      {
        category: "Backend",
        description:
          "REST and GraphQL services, databases, and integrations built for production traffic.",
        items: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
      },
      {
        category: "Cloud",
        description:
          "Containerized deployments on AWS, GCP, or Azure with observability from day one.",
        items: ["AWS", "GCP", "Azure", "Docker"],
      },
    ],
    techSection: {
      title: "Product engineering stack",
      description:
        "Frameworks and platforms we use to build fast, maintainable web and mobile products, chosen per project, not forced from a template.",
      variant: "light",
    },
    faqHeading: "Product development FAQs",
    faqDescription:
      "Common questions about MVPs, timelines, and working with Mantravi on custom software.",
    heroTheme: "engineering",
    images: serviceImages("product-engineering", {
      hero: {
        alt: "Mantravi product engineering team building a web and mobile application",
        hint: "Hero, team at work, product UI mockup, or sprint demo",
      },
      overview: {
        alt: "Digital product dashboard and mobile app interfaces",
        hint: "Overview, shipped product screens or design system preview",
      },
      showcase: {
        alt: "Full-width showcase of Mantravi product development work",
        hint: "Showcase banner, case study collage or flagship product shot",
      },
      process: {
        alt: "Product development workflow from discovery to launch",
        hint: "Process, workshop, wireframes, or sprint board photo",
      },
      whyUs: {
        alt: "Mantravi engineers collaborating on a digital product",
        hint: "Why us, team culture, pairing session, or client workshop",
      },
    }),
    faqs: [
      {
        question: "Do you build both web and mobile from one codebase?",
        answer:
          "We recommend the right approach per product, shared APIs with native or cross-platform frontends depending on UX and performance needs.",
      },
      {
        question: "How do you handle project timelines?",
        answer:
          "We scope MVPs in 8–12 weeks and enterprise modules in phased releases with agreed milestones.",
      },
      {
        question: "Can you take over an existing codebase?",
        answer:
          "Yes. We perform a technical audit first, then propose a stabilization and feature roadmap.",
      },
    ],
  },
  {
    slug: "consulting",
    title: "Brand, SEO & Marketing",
    heroSubtitle:
      "Grow your visibility, strengthen your brand, and convert traffic into customers",
    metaDescription:
      "Mantravi delivers brand identity, SEO, content strategy, and digital marketing, technical SEO, analytics, and conversion-focused campaigns that drive leads.",
    intro:
      "We help businesses stand out online with cohesive branding, search visibility, and marketing that connects with the right audience.",
    introExtended:
      "From brand identity and content strategy to SEO and social campaigns, Mantravi aligns creative and technical work so your marketing drives measurable growth.",
    outcomes: [
      "Stronger brand recall across web and social touchpoints",
      "Higher organic visibility through structured SEO and content",
      "Campaigns tied to conversion metrics, not vanity numbers",
      "Advisory support when you need clarity before a build",
    ],
    capabilitiesHeading: "Brand & growth marketing services",
    capabilitiesDescription:
      "SEO, content, campaigns, and brand design, aligned to rankings, traffic, and conversion goals.",
    capabilities: [
      {
        id: "brand-identity",
        title: "Brand Identity & Design",
        description:
          "Visual systems, voice, and assets that make your business instantly recognizable.",
      },
      {
        id: "seo-content",
        title: "SEO & Content Strategy",
        description:
          "Keyword research, on-page optimization, and content plans that rank and convert.",
      },
      {
        id: "social-campaigns",
        title: "Social & Campaign Strategy",
        description:
          "Channel plans and creative direction for sustained audience growth.",
      },
      {
        id: "marketing-analytics",
        title: "Marketing Analytics",
        description:
          "Dashboards and tracking so you know what's working and where to invest.",
      },
      {
        id: "conversion",
        title: "Conversion Optimization",
        description:
          "Landing pages, funnels, and UX tweaks that turn visitors into customers.",
      },
      {
        id: "it-consulting",
        title: "IT & Software Consulting",
        description:
          "Light advisory on tooling, integrations, and digital ops, without heavy transformation jargon.",
      },
    ],
    processSteps: [
      {
        num: "01",
        title: "Audit & Goals",
        description:
          "Review your brand, channels, and competitors to define clear growth targets.",
      },
      {
        num: "02",
        title: "Strategy",
        description:
          "Build a roadmap for SEO, content, and campaigns aligned to your budget.",
      },
      {
        num: "03",
        title: "Create & Optimize",
        description:
          "Ship creative assets, pages, and content with performance in mind.",
      },
      {
        num: "04",
        title: "Measure",
        description:
          "Track rankings, traffic, and conversions, refine what moves the needle.",
      },
      {
        num: "05",
        title: "Scale",
        description:
          "Double down on winning channels and hand off playbooks your team can run.",
      },
    ],
    processHeading: "Our marketing & SEO process",
    processDescription:
      "From audit to measurable growth, structured steps for brand, search, and campaign performance.",
    differentiators: [
      {
        num: "01",
        title: "Growth-Focused",
        description:
          "Every recommendation ties back to visibility, leads, or revenue, not buzzwords.",
      },
      {
        num: "02",
        title: "Creative + Technical",
        description:
          "Design and engineering under one roof so brand and product stay aligned.",
      },
      {
        num: "03",
        title: "Transparent Reporting",
        description:
          "Clear metrics and regular check-ins, you always know what's happening.",
      },
      {
        num: "04",
        title: "Build When Ready",
        description:
          "Strategy flows into Mantravi product work when you need a site or app built.",
      },
    ],
    serviceTags: ["web", "ui"],
    techStack: [
      {
        category: "SEO & Analytics",
        description:
          "Technical SEO audits, keyword tracking, and search performance reporting.",
        items: ["Google Analytics", "Search Console", "Ahrefs", "Semrush"],
      },
      {
        category: "Content & CMS",
        description:
          "Headless and traditional CMS setups optimized for content velocity and on-page SEO.",
        items: ["WordPress", "Sanity", "Contentful", "Webflow"],
      },
      {
        category: "Marketing",
        description:
          "Paid and organic campaign tooling tied to lead and conversion tracking.",
        items: ["HubSpot", "Mailchimp", "Meta Ads", "Google Ads"],
      },
      {
        category: "Design",
        description:
          "Brand systems and creative assets for web, social, and campaign landing pages.",
        items: ["Figma", "Adobe Creative Suite", "Canva"],
      },
    ],
    techSection: {
      title: "Marketing & SEO tools",
      description:
        "Platforms we use for search optimization, content management, and campaign analytics, not generic engineering stacks.",
      variant: "cream",
    },
    faqHeading: "Brand & SEO FAQs",
    faqDescription:
      "Answers about SEO timelines, social strategy, and combining redesign with search optimization.",
    heroTheme: "marketing",
    images: serviceImages("consulting", {
      hero: {
        alt: "Brand identity and SEO marketing strategy session",
        hint: "Hero, brand moodboard, analytics dashboard, or campaign creative",
      },
      overview: {
        alt: "SEO performance charts and brand design assets",
        hint: "Overview, Search Console growth, brand kit, or content calendar",
      },
      showcase: {
        alt: "Marketing and SEO results showcase",
        hint: "Showcase banner, before/after rankings or campaign visuals",
      },
      process: {
        alt: "SEO audit and marketing strategy planning",
        hint: "Process, keyword research, content planning, or ad creative review",
      },
      whyUs: {
        alt: "Marketing team reviewing campaign performance",
        hint: "Why us, strategy presentation or client growth review",
      },
    }),
    faqs: [
      {
        question: "How long before SEO results show?",
        answer:
          "Most clients see meaningful movement in 3–6 months depending on competition and site history. We set realistic milestones upfront.",
      },
      {
        question: "Do you handle social media posting?",
        answer:
          "We create strategy, calendars, and creative direction. Ongoing posting can be managed by your team or us on retainer.",
      },
      {
        question: "Can you redesign our site and improve SEO together?",
        answer:
          "Yes. That's our sweet spot. Brand, UX, and technical SEO are most effective when done together.",
      },
    ],
  },
  {
    slug: "qa-it",
    title: "QA & IT Solutions",
    heroSubtitle:
      "Ship with confidence, rigorous testing, stable infrastructure, and releases you can trust",
    metaDescription:
      "Mantravi QA & IT services: Playwright and Cypress automation, performance testing with k6, CI/CD quality gates, and production monitoring with Datadog and Sentry.",
    intro:
      "Our QA and IT services keep your products stable, secure, and ready to scale as your business grows.",
    introExtended:
      "From automated regression suites to performance testing and production monitoring, Mantravi helps teams catch issues early and release faster without cutting corners.",
    outcomes: [
      "Fewer production bugs and faster regression cycles",
      "Performance baselines before users feel the pain",
      "CI/CD pipelines with quality gates built in",
      "IT guidance that keeps infrastructure predictable",
    ],
    capabilitiesHeading: "QA & IT service capabilities",
    capabilitiesDescription:
      "Test automation, performance engineering, security reviews, and DevOps support for reliable releases.",
    capabilities: [
      {
        id: "automated-testing",
        title: "Automated Testing",
        description:
          "Regression suites with Cypress, Playwright, and Selenium integrated into your pipeline.",
      },
      {
        id: "manual-qa",
        title: "Manual & Exploratory QA",
        description: "Human-led testing for edge cases automation misses.",
      },
      {
        id: "performance",
        title: "Performance & Load Testing",
        description:
          "Stress tests and benchmarks so apps stay fast under real traffic.",
      },
      {
        id: "security",
        title: "Security Testing",
        description:
          "Vulnerability scans and hardening reviews for web and mobile surfaces.",
      },
      {
        id: "infrastructure",
        title: "IT Infrastructure Consulting",
        description:
          "Cloud setup, monitoring, and ops guidance for growing teams.",
      },
      {
        id: "devops",
        title: "DevOps & CI/CD",
        description:
          "Pipelines, containers, and observability so releases stay fast and stable.",
      },
      {
        id: "uat",
        title: "UAT Support",
        description:
          "Structured user acceptance testing before major launches.",
      },
      {
        id: "monitoring",
        title: "Production Monitoring",
        description:
          "Alerts, dashboards, and incident playbooks for live systems.",
      },
    ],
    processSteps: [
      {
        num: "01",
        title: "Assess",
        description:
          "Review your stack, release cadence, and existing test coverage.",
      },
      {
        num: "02",
        title: "Plan",
        description:
          "Define test strategy, tooling, and quality gates for each environment.",
      },
      {
        num: "03",
        title: "Automate",
        description:
          "Build suites, pipelines, and monitoring that run on every release.",
      },
      {
        num: "04",
        title: "Validate",
        description:
          "Execute manual, performance, and security testing before go-live.",
      },
      {
        num: "05",
        title: "Support",
        description:
          "Stay on call for releases and evolve coverage as the product grows.",
      },
    ],
    processHeading: "Our QA & release process",
    processDescription:
      "Structured quality engineering from test strategy through CI/CD gates and production monitoring.",
    differentiators: [
      {
        num: "01",
        title: "Ship With Confidence",
        description:
          "Quality is embedded in delivery, not bolted on at the end.",
      },
      {
        num: "02",
        title: "Release Velocity",
        description:
          "Automation and clear gates let you deploy more often with less risk.",
      },
      {
        num: "03",
        title: "Full-Stack QA",
        description:
          "Web, mobile, API, and infrastructure testing from one partner.",
      },
      {
        num: "04",
        title: "Production Mindset",
        description:
          "We test like users and operators, not just against ticket checklists.",
      },
    ],
    serviceTags: ["web", "mobile", "cloud"],
    techStack: [
      {
        category: "Test Automation",
        description:
          "End-to-end and regression suites integrated into your release pipeline.",
        items: ["Playwright", "Cypress", "Selenium", "Appium"],
      },
      {
        category: "Performance",
        description:
          "Load testing and Core Web Vitals benchmarks before traffic spikes hit production.",
        items: ["k6", "JMeter", "Lighthouse", "WebPageTest"],
      },
      {
        category: "CI/CD",
        description:
          "Quality gates, container builds, and orchestration for predictable deployments.",
        items: ["GitHub Actions", "GitLab CI", "Docker", "Kubernetes"],
      },
      {
        category: "Monitoring",
        description:
          "Alerting, error tracking, and dashboards for live systems and release health.",
        items: ["Datadog", "Sentry", "Grafana", "PagerDuty"],
      },
    ],
    techSection: {
      title: "QA & DevOps tooling",
      description:
        "Testing, performance, and observability platforms for this practice, Playwright, k6, Datadog, and CI/CD tools, not generic cloud cards.",
      variant: "dark",
    },
    faqHeading: "QA & IT FAQs",
    faqDescription:
      "Questions about test automation, CI/CD integration, and ongoing QA retainers.",
    heroTheme: "qa",
    images: serviceImages("qa-it", {
      hero: {
        alt: "QA engineers running automated tests and CI/CD pipelines",
        hint: "Hero, test automation dashboard, Playwright run, or release pipeline",
      },
      overview: {
        alt: "Quality assurance testing and performance monitoring setup",
        hint: "Overview, test coverage report, k6 graph, or monitoring alerts",
      },
      showcase: {
        alt: "QA and DevOps tooling showcase",
        hint: "Showcase banner, CI/CD flow diagram or testing toolchain",
      },
      process: {
        alt: "QA release process with automated and manual testing",
        hint: "Process, regression suite, staging sign-off, or load test",
      },
      whyUs: {
        alt: "QA team validating a production release",
        hint: "Why us, release war room or quality gate review",
      },
    }),
    faqs: [
      {
        question: "Can you QA an product built by another team?",
        answer:
          "Yes. We audit existing coverage, set up automation, and run release testing independently.",
      },
      {
        question: "Do you offer ongoing QA retainer?",
        answer:
          "We support per-release testing, embedded QA engineers, or fully managed test automation, whatever fits your cadence.",
      },
      {
        question: "How do you fit into our CI/CD pipeline?",
        answer:
          "We integrate tests into GitHub Actions, GitLab, or your existing pipeline with clear pass/fail gates.",
      },
    ],
  },
  {
    slug: "ai-data",
    title: "AI & Data Engineering",
    heroSubtitle:
      "Deploy AI that works beyond demos, agents, automation, and data systems built for production",
    metaDescription:
      "Production AI and data engineering: RAG systems, LLM agents, MLOps, Snowflake pipelines, and enterprise GenAI with guardrails, built by Mantravi.",
    intro:
      "We build practical AI, assistants, automation, and data systems, designed for real business use.",
    introExtended:
      "Mantravi helps you move from experiments to production: grounded GenAI, workflow automation, and reliable data pipelines with the guardrails growing teams need.",
    outcomes: [
      "AI features grounded in your data, not generic prompts",
      "Automation that saves hours on repetitive workflows",
      "Data pipelines ready for analytics and model training",
      "Governance and monitoring for production AI systems",
    ],
    capabilitiesHeading: "AI & data engineering capabilities",
    capabilitiesDescription:
      "Generative AI, RAG, agents, data pipelines, and MLOps, designed for production reliability and measurable ROI.",
    capabilities: [
      {
        id: "generative-ai",
        title: "Generative AI",
        description:
          "LLM-powered assistants, content tools, and knowledge systems grounded in your data.",
      },
      {
        id: "automation",
        title: "Intelligent Automation",
        description:
          "Document intelligence, vision workflows, and process automation with human oversight.",
      },
      {
        id: "data-platforms",
        title: "Data & ML Platforms",
        description:
          "Analytics pipelines, predictive models, and MLOps built to run at scale.",
      },
      {
        id: "ai-consulting",
        title: "AI Consulting",
        description:
          "Use-case discovery, feasibility analysis, and ROI modeling for AI initiatives.",
      },
      {
        id: "agents",
        title: "AI Agent Development",
        description:
          "Autonomous agents for workflows with supervision and guardrails.",
      },
      {
        id: "rag",
        title: "RAG Development",
        description:
          "Retrieval-augmented generation for accurate, grounded responses.",
      },
      {
        id: "ml",
        title: "Machine Learning",
        description:
          "Predictive models for forecasting, classification, and recommendations.",
      },
      {
        id: "mlops",
        title: "MLOps",
        description:
          "Model deployment, monitoring, and retraining infrastructure.",
      },
    ],
    processSteps: [
      {
        num: "01",
        title: "Discover",
        description:
          "Identify high-impact use cases and assess data readiness.",
      },
      {
        num: "02",
        title: "Prototype",
        description:
          "Validate accuracy, latency, and cost with focused pilots.",
      },
      {
        num: "03",
        title: "Integrate",
        description:
          "Connect models to your apps, APIs, and existing workflows.",
      },
      {
        num: "04",
        title: "Govern",
        description:
          "Add access controls, evaluation suites, and audit trails.",
      },
      {
        num: "05",
        title: "Operate",
        description:
          "Monitor, retrain, and expand AI capabilities as usage grows.",
      },
    ],
    processHeading: "Our AI delivery process",
    processDescription:
      "From use-case discovery through governance and MLOps, a production-first path for enterprise AI.",
    differentiators: [
      {
        num: "01",
        title: "Production-First AI",
        description:
          "We design for latency, cost, and reliability, not just demo accuracy.",
      },
      {
        num: "02",
        title: "Grounded GenAI",
        description:
          "RAG and guardrails to reduce hallucinations in enterprise contexts.",
      },
      {
        num: "03",
        title: "Data Foundations",
        description:
          "Pipelines and warehouses that make AI sustainable long-term.",
      },
      {
        num: "04",
        title: "Measurable Outcomes",
        description:
          "KPIs defined upfront, time saved, accuracy gains, revenue impact.",
      },
    ],
    serviceTags: ["ai", "web"],
    techStack: [
      {
        category: "AI & ML",
        description:
          "LLM integrations, agent frameworks, and model training for business workflows.",
        items: ["OpenAI", "Anthropic", "LangChain", "PyTorch"],
      },
      {
        category: "Data",
        description:
          "Warehouse-native pipelines and orchestration for analytics and model features.",
        items: ["dbt", "Airflow", "Snowflake", "Databricks"],
      },
      {
        category: "Vector & Search",
        description:
          "Embeddings, retrieval, and search infrastructure for grounded GenAI responses.",
        items: ["Pinecone", "Weaviate", "Elasticsearch"],
      },
      {
        category: "MLOps",
        description:
          "Model deployment, experiment tracking, and retraining pipelines at scale.",
        items: ["MLflow", "Kubeflow", "Weights & Biases"],
      },
    ],
    techSection: {
      title: "AI & data platforms",
      description:
        "LLM providers, vector stores, data warehouses, and MLOps tooling, specific to AI and data work, not recycled engineering categories.",
      variant: "cinematic",
    },
    faqHeading: "AI & data FAQs",
    faqDescription:
      "Common questions about RAG, data readiness, hallucination control, and integrating AI into existing software.",
    heroTheme: "ai",
    images: serviceImages("ai-data", {
      hero: {
        alt: "AI and data engineering, LLM agents and analytics pipelines",
        hint: "Hero, AI assistant UI, data pipeline diagram, or MLOps dashboard",
      },
      overview: {
        alt: "Production AI system with RAG and data warehouse integration",
        hint: "Overview, grounded chatbot, vector search, or Snowflake pipeline",
      },
      showcase: {
        alt: "Enterprise AI and data platform showcase",
        hint: "Showcase banner, agent workflow or analytics insight screen",
      },
      process: {
        alt: "AI delivery process from discovery to MLOps",
        hint: "Process, model evaluation, integration, or governance review",
      },
      whyUs: {
        alt: "Data and AI engineers building production ML systems",
        hint: "Why us, AI pilot demo or data team whiteboarding session",
      },
    }),
    faqs: [
      {
        question: "How do you prevent AI hallucinations in production?",
        answer:
          "We use RAG, structured outputs, evaluation suites, and human-in-the-loop review for high-stakes workflows.",
      },
      {
        question: "Do we need clean data before starting?",
        answer:
          "Not perfectly clean, but we assess data readiness in discovery and build pipelines alongside model work.",
      },
      {
        question: "Can AI integrate with our existing software?",
        answer:
          "Yes. We integrate via APIs, webhooks, and embedded widgets into CRMs, portals, and internal tools.",
      },
    ],
  },
];
export function getServiceBySlug(slug: string): ServicePage | undefined {
  const page = servicePages.find((s) => s.slug === slug);
  if (!page) return undefined;
  const ext = serviceSeoExtensions[slug];
  if (!ext) return page;
  return {
    ...page,
    seoContent: ext.seoContent,
    relatedSlugs: ext.relatedSlugs,
    faqs: [...page.faqs, ...ext.extraFaqs],
  };
}
export function getAllServiceSlugs() {
  return servicePages.map((s) => s.slug);
}
