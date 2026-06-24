import type {
  ServiceCapability,
  ServiceDifferentiator,
  ServiceProcessStep,
  TechStackCategory,
} from "./services-data";

export const mobileAppProcess: ServiceProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    description:
      "Map business goals, users, compliance needs, and success metrics before design or development begins.",
  },
  {
    num: "02",
    title: "UX & Architecture",
    description:
      "Wireframes, technical architecture, and sprint plans aligned to your budget and go-live timeline.",
  },
  {
    num: "03",
    title: "Agile Build",
    description:
      "Two-week sprints with demos, QA checkpoints, and transparent backlog visibility.",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "App Store and Play Store submission, performance tuning, and analytics setup.",
  },
  {
    num: "05",
    title: "Grow",
    description:
      "Post-launch support, feature rollouts, and optimization based on real user data.",
  },
];

export const mobileCapabilities: ServiceCapability[] = [
  {
    id: "ios",
    title: "iOS App Development",
    description:
      "Swift and SwiftUI apps optimized for iPhone and iPad with App Store-ready releases.",
  },
  {
    id: "android",
    title: "Android App Development",
    description:
      "Kotlin and Jetpack Compose builds for India's diverse Android device landscape.",
  },
  {
    id: "flutter",
    title: "Flutter Development",
    description:
      "Single codebase for iOS and Android — ideal for MVPs and fast market validation.",
  },
  {
    id: "react-native",
    title: "React Native Development",
    description:
      "Cross-platform apps with shared logic, rapid iteration, and enterprise API integration.",
  },
  {
    id: "pwa",
    title: "PWA & Web Apps",
    description:
      "Installable progressive web apps that work on low-bandwidth connections common in tier-2 cities.",
  },
  {
    id: "ai",
    title: "AI-Powered Features",
    description:
      "Chatbots, personalization, OCR, and intelligent automation built into your mobile product.",
  },
  {
    id: "backend",
    title: "Backend & APIs",
    description:
      "Scalable Node.js and cloud backends with UPI, SMS, and third-party integrations.",
  },
  {
    id: "mvp",
    title: "MVP Development",
    description:
      "Focused 8–12 week builds for founders validating ideas in local and regional markets.",
  },
];

export const mobileTechStack: TechStackCategory[] = [
  {
    category: "Mobile",
    description:
      "Native and cross-platform frameworks chosen for performance, hiring, and long-term maintainability.",
    items: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    category: "Frontend & Web",
    description:
      "High-performance web apps and PWAs that complement your mobile product.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Backend",
    description:
      "REST and GraphQL APIs, databases, and payment or notification integrations.",
    items: ["Node.js", "Python", "PostgreSQL", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    description:
      "Deployments on AWS, GCP, or Azure with CI/CD and monitoring from day one.",
    items: ["AWS", "GCP", "Docker", "GitHub Actions"],
  },
];

export const mobileDifferentiators: ServiceDifferentiator[] = [
  {
    num: "01",
    title: "Local Market Understanding",
    description:
      "We design for Hindi–English bilingual UX, UPI-first payments, and the connectivity patterns common across India's tier-2 markets.",
  },
  {
    num: "02",
    title: "Startup to Enterprise",
    description:
      "From founder MVPs to government and healthcare platforms — one accountable squad from discovery through launch.",
  },
  {
    num: "03",
    title: "Transparent Delivery",
    description:
      "Sprint demos, shared backlogs, and milestone-based billing so you always know where the project stands.",
  },
  {
    num: "04",
    title: "Post-Launch Partnership",
    description:
      "Bug fixes, store updates, analytics reviews, and feature roadmaps after go-live — not a handoff and goodbye.",
  },
];

export const webProcess: ServiceProcessStep[] = [
  {
    num: "01",
    title: "Discovery",
    description:
      "Align on business goals, audience, SEO targets, and conversion metrics before design begins.",
  },
  {
    num: "02",
    title: "UX & Architecture",
    description:
      "Wireframes, sitemap, technical stack, and content structure planned for search and speed.",
  },
  {
    num: "03",
    title: "Agile Build",
    description:
      "Component-driven development in sprints with staging reviews and performance checks.",
  },
  {
    num: "04",
    title: "Launch",
    description:
      "Production deployment, Core Web Vitals tuning, analytics, and search console setup.",
  },
  {
    num: "05",
    title: "Grow",
    description:
      "Ongoing SEO improvements, content updates, and conversion optimization from real traffic data.",
  },
];

export const webCapabilities: ServiceCapability[] = [
  {
    id: "corporate",
    title: "Business & Corporate Websites",
    description:
      "Professional sites for brands, agencies, and enterprises that need credibility and lead generation.",
  },
  {
    id: "ecommerce",
    title: "E-commerce Development",
    description:
      "Online stores with catalog, cart, UPI payments, and order management built for Indian buyers.",
  },
  {
    id: "nextjs",
    title: "Next.js & React Web Apps",
    description:
      "Fast, SEO-friendly web applications with server rendering and modern UX patterns.",
  },
  {
    id: "landing",
    title: "Landing Pages & Funnels",
    description:
      "High-converting campaign pages for product launches, ads, and regional promotions.",
  },
  {
    id: "cms",
    title: "CMS & Headless Setup",
    description:
      "Editable content systems so your team can update pages without developer dependency.",
  },
  {
    id: "seo-build",
    title: "Technical SEO Build",
    description:
      "Semantic HTML, schema markup, sitemaps, and Core Web Vitals optimization baked in from day one.",
  },
  {
    id: "saas",
    title: "Web App & SaaS Dashboards",
    description:
      "Authenticated portals, admin panels, and multi-role web platforms for growing businesses.",
  },
  {
    id: "redesign",
    title: "Website Redesign & Migration",
    description:
      "Modernize outdated sites without losing SEO equity — structured redirects and content migration.",
  },
];

export const webTechStack: TechStackCategory[] = [
  {
    category: "Frontend",
    description:
      "React and Next.js frontends optimized for speed, accessibility, and search visibility.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "CMS",
    description:
      "Headless and traditional CMS options for marketing teams that need flexible content control.",
    items: ["Sanity", "Strapi", "WordPress", "Contentful"],
  },
  {
    category: "Backend",
    description:
      "APIs, databases, and integrations powering dynamic web experiences.",
    items: ["Node.js", "PostgreSQL", "GraphQL", "Redis"],
  },
  {
    category: "Cloud & DevOps",
    description:
      "Production hosting on Vercel, AWS, or GCP with CI/CD and monitoring.",
    items: ["Vercel", "AWS", "Docker", "GitHub Actions"],
  },
];

export const webDifferentiators: ServiceDifferentiator[] = [
  {
    num: "01",
    title: "SEO-First Engineering",
    description:
      "Technical SEO, schema markup, and fast page loads are built into the architecture — not added after launch.",
  },
  {
    num: "02",
    title: "Tier-2 Market Ready",
    description:
      "Lightweight pages, Hindi–English content support, and performance tuned for regional connectivity.",
  },
  {
    num: "03",
    title: "Transparent Delivery",
    description:
      "Staging links, sprint demos, and milestone billing so you see progress before each payment.",
  },
  {
    num: "04",
    title: "Post-Launch Growth",
    description:
      "Analytics reviews, SEO iterations, and conversion improvements after go-live.",
  },
];

export const marketingProcess: ServiceProcessStep[] = [
  {
    num: "01",
    title: "Audit & Goals",
    description:
      "Review your brand, competitors, local search presence, and channels to define clear growth targets.",
  },
  {
    num: "02",
    title: "Strategy",
    description:
      "Build a keyword, content, and campaign roadmap aligned to your budget and sales cycle.",
  },
  {
    num: "03",
    title: "Create & Optimize",
    description:
      "Ship SEO pages, ad campaigns, social content, and landing pages with conversion in mind.",
  },
  {
    num: "04",
    title: "Measure",
    description:
      "Track rankings, leads, calls, and ROAS — refine what moves the needle each month.",
  },
  {
    num: "05",
    title: "Scale",
    description:
      "Double down on winning channels and hand off playbooks your team can run.",
  },
];

export const marketingCapabilities: ServiceCapability[] = [
  {
    id: "local-seo",
    title: "Local SEO & Google Business Profile",
    description:
      "Rank in map pack and local search for city and neighbourhood keywords that drive calls and walk-ins.",
  },
  {
    id: "seo-content",
    title: "SEO & Content Marketing",
    description:
      "Keyword research, on-page SEO, blog strategy, and content that ranks and converts.",
  },
  {
    id: "google-ads",
    title: "Google Ads & PPC",
    description:
      "Search, display, and Performance Max campaigns tuned for lead generation and ROAS.",
  },
  {
    id: "meta-ads",
    title: "Meta & Social Media Ads",
    description:
      "Facebook and Instagram campaigns for awareness, leads, and retargeting in your city.",
  },
  {
    id: "social",
    title: "Social Media Management",
    description:
      "Content calendars, reels, and community management that build trust and inbound enquiries.",
  },
  {
    id: "cro",
    title: "Landing Pages & CRO",
    description:
      "High-converting campaign pages, A/B tests, and funnel optimization for paid and organic traffic.",
  },
  {
    id: "reputation",
    title: "Reputation & Review Management",
    description:
      "Review generation workflows and response strategy for Google, Justdial, and industry platforms.",
  },
  {
    id: "analytics",
    title: "Marketing Analytics & Reporting",
    description:
      "GA4, Search Console, call tracking, and monthly dashboards tied to leads and revenue.",
  },
];

export const marketingTechStack: TechStackCategory[] = [
  {
    category: "SEO & Analytics",
    description:
      "Technical SEO audits, rank tracking, and performance reporting.",
    items: ["Google Analytics", "Search Console", "Ahrefs", "Semrush"],
  },
  {
    category: "Paid Media",
    description:
      "Campaign management across search and social with conversion tracking.",
    items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "GTM"],
  },
  {
    category: "Content & CMS",
    description:
      "SEO-ready content systems for blogs, landing pages, and local pages.",
    items: ["WordPress", "Sanity", "Webflow", "Notion"],
  },
  {
    category: "CRM & Automation",
    description:
      "Lead capture, email nurture, and pipeline tools connected to campaigns.",
    items: ["HubSpot", "Zoho CRM", "Mailchimp", "WhatsApp API"],
  },
];

export const marketingDifferentiators: ServiceDifferentiator[] = [
  {
    num: "01",
    title: "Lead-Focused SEO",
    description:
      "We optimize for calls, form fills, and store visits — not vanity traffic or irrelevant keywords.",
  },
  {
    num: "02",
    title: "Creative + Technical",
    description:
      "Design, development, and marketing under one roof so your site and campaigns stay aligned.",
  },
  {
    num: "03",
    title: "Transparent Reporting",
    description:
      "Monthly dashboards with rankings, spend, leads, and clear next steps — no black-box agency reports.",
  },
  {
    num: "04",
    title: "Industry Playbooks",
    description:
      "Proven frameworks for real estate, healthcare, retail, and professional services in Indian markets.",
  },
];
