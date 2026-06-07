import type { ServiceFAQ } from "./services-data";
export type ServiceSeoContent = {
  whoItsFor: string[];
  whenToEngage: string[];
  deliverables: string[];
  industries: string[];
};
export type ServiceSeoExtension = {
  seoContent: ServiceSeoContent;
  relatedSlugs: string[];
  extraFaqs: ServiceFAQ[];
};
export const serviceSeoExtensions: Record<string, ServiceSeoExtension> = {
  "product-engineering": {
    seoContent: {
      whoItsFor: [
        "Founders validating an MVP who need a single team for UX, engineering, and launch, without coordinating multiple vendors.",
        "Product leaders modernizing legacy web or mobile apps with React, Next.js, or Flutter while keeping releases predictable.",
        "Growing companies that need scalable APIs, design systems, and DevOps pipelines as user traffic increases.",
      ],
      whenToEngage: [
        "You have a product roadmap but lack in-house capacity for full-stack delivery or mobile engineering.",
        "Your current app has performance, accessibility, or security gaps that block enterprise sales or App Store approval.",
        "You need a technical partner for discovery, architecture, and phased releases, not just ticket-based outsourcing.",
      ],
      deliverables: [
        "Production-ready web apps, mobile apps, and backend services with documented APIs",
        "UI/UX design, clickable prototypes, and optional design system components",
        "CI/CD setup, cloud deployment, and handover documentation for your internal team",
      ],
      industries: [
        "SaaS",
        "E-commerce",
        "EdTech",
        "Healthcare",
        "FinTech",
        "D2C",
      ],
    },
    relatedSlugs: ["qa-it", "consulting", "ai-data"],
    extraFaqs: [
      {
        question: "What tech stack do you use for custom software development?",
        answer:
          "We typically build with React, Next.js, TypeScript, Node.js, and PostgreSQL for web products; React Native or Flutter for mobile. Stack is chosen per project for performance, hiring, and long-term maintainability, not a one-size-fits-all template.",
      },
      {
        question: "How much does custom web or mobile app development cost?",
        answer:
          "MVP scopes usually start in a focused 8–12 week engagement with a fixed milestone plan. Enterprise modules are quoted in phases after discovery. We share a transparent estimate after understanding scope, integrations, and compliance needs.",
      },
      {
        question: "Do you sign NDAs and who owns the code?",
        answer:
          "Yes. We work under NDAs as standard. Clients retain ownership of custom code and assets delivered upon agreed payment terms, with clear IP terms in our contract.",
      },
    ],
  },
  consulting: {
    seoContent: {
      whoItsFor: [
        "Businesses that need organic search traffic and a cohesive brand, not disconnected freelancers for SEO, design, and ads.",
        "Companies replatforming or launching a new site who want technical SEO, content structure, and conversion design together.",
        "Teams that have traffic but weak conversion, and need funnel analysis, landing page optimization, and clear analytics.",
      ],
      whenToEngage: [
        "Rankings have plateaued and you need a structured SEO audit, keyword strategy, and content plan.",
        "Your brand looks inconsistent across web, social, and sales collateral.",
        "You are preparing a product launch and need messaging, landing pages, and search visibility aligned to go-live.",
      ],
      deliverables: [
        "SEO audits, keyword maps, on-page optimization, and content calendars",
        "Brand identity systems, campaign creative, and conversion-focused landing pages",
        "Analytics dashboards tying traffic, leads, and revenue to specific channels",
      ],
      industries: [
        "B2B Services",
        "E-commerce",
        "Local Business",
        "Startups",
        "Professional Services",
      ],
    },
    relatedSlugs: ["product-engineering", "qa-it"],
    extraFaqs: [
      {
        question:
          "Do you offer local SEO and Google Business Profile optimization?",
        answer:
          "Yes. We optimize local listings, location pages, and review strategies alongside broader organic SEO when your business depends on regional visibility.",
      },
      {
        question: "Can you improve SEO on a site Mantravi did not build?",
        answer:
          "Absolutely. We start with a technical and content audit, fix crawlability and Core Web Vitals issues, then execute on-page and content improvements on your existing CMS or stack.",
      },
      {
        question: "How do you measure marketing and SEO success?",
        answer:
          "We align on KPIs upfront, rankings for target keywords, organic traffic, lead volume, conversion rate, and cost per acquisition where paid channels are involved. Reporting is shared on a regular cadence you define.",
      },
    ],
  },
  "qa-it": {
    seoContent: {
      whoItsFor: [
        "Product teams shipping frequently who need Playwright or Cypress automation and CI/CD quality gates.",
        "Companies releasing mobile or web apps without dedicated QA capacity or consistent regression coverage.",
        "CTOs and engineering leads who want performance baselines, monitoring, and DevOps support before scale events.",
      ],
      whenToEngage: [
        "Production bugs are increasing after releases and manual testing cannot keep up with your cadence.",
        "You need load testing, security reviews, or staging sign-off before a major launch or funding milestone.",
        "Your pipeline lacks automated tests or observability, and releases feel risky.",
      ],
      deliverables: [
        "Automated regression suites integrated into GitHub Actions, GitLab CI, or your existing pipeline",
        "Performance and load test reports with k6, Lighthouse, or JMeter baselines",
        "Monitoring setup, alert playbooks, and release checklists for production systems",
      ],
      industries: [
        "SaaS",
        "Marketplaces",
        "Mobile Apps",
        "Enterprise Software",
        "Healthcare Tech",
      ],
    },
    relatedSlugs: ["product-engineering", "ai-data"],
    extraFaqs: [
      {
        question: "What QA automation tools does Mantravi use?",
        answer:
          "We commonly implement Playwright and Cypress for web, Appium for mobile, and integrate suites into GitHub Actions or GitLab CI. Tooling is selected based on your stack, test environments, and team skills.",
      },
      {
        question:
          "How quickly can you set up test automation for an existing product?",
        answer:
          "After a short audit of your app and release process, initial smoke and regression coverage often lands within 2–4 weeks, with expanded coverage phased alongside your roadmap.",
      },
      {
        question:
          "Do you provide performance testing before high-traffic events?",
        answer:
          "Yes. We run load and stress tests with k6 or JMeter, identify bottlenecks, and help you set SLOs and monitoring so you know capacity limits before campaigns or seasonality spikes.",
      },
    ],
  },
  "ai-data": {
    seoContent: {
      whoItsFor: [
        "Organizations moving from AI pilots to production, needing RAG, agents, and MLOps with governance.",
        "Teams with proprietary data who want grounded GenAI assistants instead of generic chatbot wrappers.",
        "Data leaders building warehouses, pipelines, and ML features on Snowflake, Databricks, or cloud-native stacks.",
      ],
      whenToEngage: [
        "Executive pressure to deploy AI, but internal experiments lack accuracy, latency, or cost controls for production.",
        "You need retrieval-augmented generation tied to internal docs, CRM, or support knowledge bases.",
        "Analytics and model training require reliable pipelines, not one-off notebooks.",
      ],
      deliverables: [
        "Production LLM integrations, RAG systems, and supervised AI agents with evaluation suites",
        "Data pipelines (dbt, Airflow) and warehouse models feeding analytics and ML features",
        "MLOps infrastructure for deployment, monitoring, retraining, and access control",
      ],
      industries: [
        "Enterprise SaaS",
        "Financial Services",
        "Healthcare",
        "Retail",
        "Operations & Logistics",
      ],
    },
    relatedSlugs: ["product-engineering", "qa-it"],
    extraFaqs: [
      {
        question: "Which LLM providers and vector databases do you support?",
        answer:
          "We integrate OpenAI, Anthropic, and open models via LangChain or custom APIs, with vector stores such as Pinecone, Weaviate, or Elasticsearch depending on latency, cost, and data residency requirements.",
      },
      {
        question: "How do you estimate ROI for enterprise AI projects?",
        answer:
          "Discovery includes use-case scoring, time saved, error reduction, revenue uplift, or support deflection, plus pilot metrics for accuracy, latency, and cost per request before full rollout.",
      },
      {
        question:
          "Can you build AI features into our existing web or mobile app?",
        answer:
          "Yes. We embed assistants, search, and automation via APIs and UI components in your current product, with auth, logging, and fallbacks designed for production traffic.",
      },
    ],
  },
};
