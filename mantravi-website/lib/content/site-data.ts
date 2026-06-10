export const siteConfig = {
  name: "Mantravi",
  headlineAccent: "Built for Growth",
  tagline: "Web, Mobile & AI Product Engineering",
  description:
    "We help startups and enterprises design, build, and launch web, mobile, and AI products with clear timelines and reliable delivery.",
  url: "https://mantravi.com",
  email: "hello@mantravi.com",
  phone: "+91 98765 43210",
  mission:
    "To empower businesses with technology solutions that drive innovation and measurable growth.",
  vision:
    "To be a trusted digital engineering partner for organizations navigating AI-driven transformation.",
  social: {
    linkedin: "https://linkedin.com/company/mantravi",
    instagram: "https://instagram.com/mantravi_",
  },
};
export const navLinks = {
  main: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services", mega: "services" as const },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
  ],
};
export type ServiceMenuItem = { label: string; anchor?: string };
export type ServiceMenuColumn = {
  title: string;
  href: string;
  items: ServiceMenuItem[];
};
export const servicesMenu: ServiceMenuColumn[] = [
  {
    title: "Product Development",
    href: "/services/product-engineering",
    items: [
      { label: "UI/UX Design", anchor: "ui-ux" },
      { label: "Mobile App Development", anchor: "mobile" },
      { label: "Web Development", anchor: "web" },
      { label: "Software Engineering", anchor: "backend" },
      { label: "MVP Development", anchor: "mvp" },
      { label: "DevOps", anchor: "devops" },
    ],
  },
  {
    title: "Brand & Marketing",
    href: "/services/consulting",
    items: [
      { label: "Brand Identity", anchor: "brand-identity" },
      { label: "SEO & Content", anchor: "seo-content" },
      { label: "Social & Campaigns", anchor: "social-campaigns" },
      { label: "Marketing Analytics", anchor: "marketing-analytics" },
      { label: "Conversion Optimization", anchor: "conversion" },
    ],
  },
  {
    title: "QA & IT",
    href: "/services/qa-it",
    items: [
      { label: "Automated Testing", anchor: "automated-testing" },
      { label: "Performance Testing", anchor: "performance" },
      { label: "Security Testing", anchor: "security" },
      { label: "DevOps & CI/CD", anchor: "devops" },
      { label: "IT Infrastructure", anchor: "infrastructure" },
    ],
  },
  {
    title: "AI & Data",
    href: "/services/ai-data",
    items: [
      { label: "Generative AI", anchor: "generative-ai" },
      { label: "Intelligent Automation", anchor: "automation" },
      { label: "Data & ML Platforms", anchor: "data-platforms" },
      { label: "AI Agents", anchor: "agents" },
      { label: "RAG Development", anchor: "rag" },
    ],
  },
];
export const trustBadges = [
  "50+ Solutions Delivered",
  "20+ Technology Specialists",
  "10+ AI Models in Production",
  "10+ Industries Served",
  "Security-First, Cloud-Native Builds",
];
export const contactForm = {
  title: "Start Your Next Build",
  subtitle: "Share a few details and our team will respond with next steps.",
  namePlaceholder: "Full name *",
  emailPlaceholder: "Work email *",
  phonePlaceholder: "Contact number *",
  companyPlaceholder: "Company name",
  messagePlaceholder: "Tell us about your project goals…",
  submitLabel: "Start the Conversation",
}; /** @deprecated Use contactForm */
export const heroInitCard = contactForm;
export const stats = [
  {
    value: 50,
    suffix: "+",
    label: "Production Deployments",
    sub: "Systems shipped and running in real environments",
  },
  {
    value: 25,
    suffix: "+",
    label: "Engineers & Specialists",
    sub: "Senior talent across engineering, design, and delivery",
  },
  {
    value: 100,
    suffix: "+",
    label: "Client Engagements",
    sub: "Startups and growing teams since 2020",
  },
  {
    value: 4,
    suffix: "",
    label: "Core Service Areas",
    sub: "Web, mobile, digital marketing, and QA",
  },
  {
    value: 6,
    suffix: "+",
    label: "Years in Operation",
    sub: "Building digital products since 2020",
  },
  {
    value: 2,
    suffix: "",
    label: "Delivery Hubs",
    sub: "Noida and Lucknow, India",
  },
];
export type ServicePillar = {
  title: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  icon: "code" | "trending" | "shield" | "sparkles";
};
export const servicePillars: ServicePillar[] = [
  {
    title: "Digital Products & Development",
    description:
      "Turn your ideas into reliable digital products. We build modern web apps, mobile experiences, and custom software that help you grow faster and deliver better user experiences.",
    features: [
      "Custom Web Applications",
      "Mobile App Development",
      "E-commerce Solutions",
    ],
    cta: "Explore Development",
    href: "/services/product-engineering",
    icon: "code",
  },
  {
    title: "Brand, SEO & Marketing",
    description:
      "Build a brand people remember and find. From identity design to SEO and content-led campaigns, we help you attract the right audience and turn visibility into revenue.",
    features: [
      "Brand Identity & Design",
      "SEO & Content Strategy",
      "Social Media Marketing",
    ],
    cta: "Boost Your Brand",
    href: "/services/consulting",
    icon: "trending",
  },
  {
    title: "QA & IT Solutions",
    description:
      "Ship with confidence. Our QA, performance, and IT consulting services keep your products stable, secure, and ready to scale as your business grows.",
    features: [
      "Automated Testing",
      "Performance Optimization",
      "IT Infrastructure Consulting",
    ],
    cta: "Ensure Quality",
    href: "/services/qa-it",
    icon: "shield",
  },
  {
    title: "AI & Data Engineering",
    description:
      "Deploy AI that works beyond demos, agents, automation, and data systems grounded in your business context, built to run reliably in production.",
    features: [
      "Generative AI & Agents",
      "Machine Learning & MLOps",
      "Data Pipelines & Analytics",
    ],
    cta: "Explore AI",
    href: "/services/ai-data",
    icon: "sparkles",
  },
];
export const portfolioSection = {
  eyebrow: "Portfolio",
  title: "Products We've Built That Clients Rely On",
  description:
    "Real launches across D2C, EdTech, healthcare, and SaaS, each project focused on usability, performance, and outcomes you can measure.",
  introLabel: "Where ideas",
  introTitle: "Ship",
  introSuffix: "as products people love",
  ctaPill: "Tell Us What You're Building",
  ctaSummary:
    "Whether it's higher conversions or faster go-to-market, we build digital products designed to perform, not just look good.",
  viewAllLabel: "View All Projects",
};
export const aiSection = {
  title: "AI That Fits How You Work",
  description:
    "From assistants and automation to data pipelines — we design AI around your workflows, your data, and the standards your releases need to meet.",
};

export const homeCtaSection = {
  title: "Have a Product or AI Initiative in Mind?",
  description:
    "Share where you are today and what you need to ship next. We'll respond with a clear scope, timeline, and the right team.",
  button: "Talk to Our Team",
};
export const mantraviLabs = [
  {
    title: "Generative AI",
    anchor: "generative-ai",
    description:
      "Practical GenAI for support, sales, and internal teams, grounded in your data, not generic prompts.",
    items: [
      "AI Agents & Assistants",
      "Knowledge Chatbots",
      "Coding & Ops Copilots",
    ],
  },
  {
    title: "Intelligent Automation",
    anchor: "automation",
    description:
      "Automate repetitive workflows with vision, language, and decision models tuned for your domain.",
    items: [
      "Document Intelligence",
      "Quality Inspection",
      "Process Automation",
    ],
  },
  {
    title: "Data & ML Platforms",
    anchor: "data-platforms",
    description:
      "Pipelines and models built to run in production, observable, governable, and ready to scale.",
    items: ["Analytics Pipelines", "Predictive Models", "MLOps & Monitoring"],
  },
];
export const techExpertise: {
  title: string;
  description: string;
  tags?: string[];
  href: string;
  anchor?: string;
}[] = [
  {
    title: "AI & Intelligent Systems",
    description:
      "Enterprise AI, from predictive models to Gen AI, agentic workflows, and computer vision, integrated into products and operations.",
    tags: ["LLMs", "RAG", "Agents", "Computer Vision"],
    href: "/services/ai-data",
    anchor: "tech",
  },
  {
    title: "Cloud & Data",
    description:
      "Secure, scalable cloud infrastructure and data foundations that support analytics without unnecessary complexity.",
    tags: ["AWS", "GCP", "Azure", "PostgreSQL"],
    href: "/services/product-engineering",
    anchor: "tech",
  },
  {
    title: "Frontend Engineering",
    description:
      "Product UI built with modern frameworks, design systems, and performance in mind.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    href: "/services/product-engineering",
    anchor: "frontend",
  },
  {
    title: "Backend & APIs",
    description:
      "Services, data layers, and REST or GraphQL APIs engineered for reliability, scale, and production traffic.",
    tags: ["Node.js", "Python", "NestJS", "FastAPI"],
    href: "/services/product-engineering",
    anchor: "backend",
  },
  {
    title: "Mobile Engineering",
    description:
      "Native and cross-platform apps delivered with the same rigor as web products.",
    tags: ["Flutter", "React Native", "Swift", "Kotlin"],
    href: "/services/product-engineering",
    anchor: "mobile",
  },
  {
    title: "DevOps & CI/CD",
    description:
      "Pipelines, containers, and observability so releases stay fast and stable.",
    tags: ["Docker", "Kubernetes", "GitHub Actions", "AWS"],
    href: "/services/qa-it",
    anchor: "devops",
  },
];
export const complianceCategories = [
  {
    num: 1,
    title: "Data Privacy & Protection",
    badges: ["GDPR", "CCPA", "HIPAA"],
  },
  {
    num: 2,
    title: "Security & Risk Management",
    badges: ["ISO 27001", "PCI DSS", "NIST"],
  },
  {
    num: 3,
    title: "AI & Technology Regulations",
    badges: ["EU AI Act", "AI Ethics", "ISO 27001 AI"],
  },
  {
    num: 4,
    title: "Industry-Specific Standards",
    badges: ["SOX", "FTC", "ISO 9001"],
  },
  {
    num: 5,
    title: "Global Frameworks",
    badges: ["ISO 22301", "ISO 27001", "GDPR"],
  },
  {
    num: 6,
    title: "Cloud & SaaS Compliance",
    badges: ["SOC 2", "CSA CCM", "FedRAMP"],
  },
];
export type BrandLogo = { name: string; src: string; pod?: "light" | "dark" };
export const partners: BrandLogo[] = [
  { name: "AWS", src: "/logos/partners/aws.svg" },
  { name: "Google Cloud", src: "/logos/partners/google-cloud.svg" },
  { name: "Microsoft Azure", src: "/logos/partners/azure.svg" },
  { name: "Salesforce", src: "/logos/partners/salesforce.svg" },
  { name: "ServiceNow", src: "/logos/partners/servicenow.svg" },
  { name: "Adobe", src: "/logos/partners/adobe.svg" },
  { name: "Databricks", src: "/logos/partners/databricks.svg" },
  { name: "Snowflake", src: "/logos/partners/snowflake.svg" },
  { name: "HubSpot", src: "/logos/partners/hubspot.svg" },
  { name: "Docker", src: "/logos/partners/docker.svg" },
  { name: "Stripe", src: "/logos/partners/stripe.svg" },
  { name: "Oracle", src: "/logos/partners/oracle.svg" },
];
export const clientLogos: BrandLogo[] = [
  { name: "Plant Ropani", src: "/logos/clients/plant-ropani.png" },
  { name: "Mobile Case Hub", src: "/logos/clients/mobile-case-hub.png" },
  { name: "Vedlik", src: "/logos/clients/vedlik.png" },
  { name: "D.P. Jewellers", src: "/logos/clients/dp-jewellers.png" },
  { name: "Ameyru", src: "/logos/clients/ameyru.png" },
];
export const awards = [
  { year: "2026", title: "Leader in AI-First Product Engineering" },
  {
    year: "2025",
    title: "Leader in AI Product Engineering & Digital Transformation",
  },
  { year: "2025", title: "Top 100 Fastest-Growing Tech Companies" },
  { year: "2024", title: "Fastest-Growing AI Development Company" },
  { year: "2023", title: "Tech Company of the Year" },
  { year: "2020", title: "App Development Company of the Year" },
];
export const companyStats = [
  {
    value: 50,
    suffix: "+",
    label: "Production Deployments",
    sub: "Systems running in real environments",
  },
  {
    value: 25,
    suffix: "+",
    label: "Engineers & Specialists",
    sub: "Across product, QA, marketing, and AI",
  },
  {
    value: 4,
    suffix: "",
    label: "Core Service Areas",
    sub: "Engineering, brand & SEO, QA, and AI",
  },
];
export const offices = [{ city: "Noida" }, { city: "Lucknow" }];
export const footerLinks = {
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/about#careers" },
    { label: "FAQ", href: "/#faq" },
  ],
  services: [
    { label: "All Services", href: "/services" },
    { label: "Digital Products", href: "/services/product-engineering" },
    { label: "Brand & SEO", href: "/services/consulting" },
    { label: "QA & IT", href: "/services/qa-it" },
    { label: "AI Solutions", href: "/services/ai-data" },
  ],
  portfolio: [{ label: "Case Studies", href: "/portfolio" }],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Guides", href: "/blog" },
    { label: "Testimonials", href: "/about#testimonials" },
  ],
}; // Keep for backward compat, used by some sections
export const trustMetrics = stats
  .slice(0, 4)
  .map((s) => ({ value: `${s.value}${s.suffix}`, label: s.label }));
export const services = servicePillars.map((p, i) => ({
  id: String(i),
  title: p.title,
  description: p.description,
  features: p.features,
  icon: (["code", "trending", "shield", "sparkles"] as const)[i] ?? "code",
}));
export const advantages = [
  {
    title: "AI-First Engineering",
    description:
      "We embed AI into architecture decisions, not as an afterthought, so products scale with intelligence built in from day one.",
  },
  {
    title: "Enterprise-Grade Delivery",
    description:
      "Structured delivery, security-first design, and transparent communication for teams that need reliability at scale.",
  },
  {
    title: "Full-Stack Partnership",
    description:
      "Strategy, design, engineering, and cloud ops under one roof, reducing vendor friction and accelerating time to market.",
  },
  {
    title: "Industry Depth",
    description:
      "Experience across regulated and high-growth sectors including healthcare, fintech, logistics, and retail.",
  },
];
export const processSteps = [];
