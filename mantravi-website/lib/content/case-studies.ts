import type { PortableTextBlock } from "@/lib/content/portable-text";
import {
  sampleAmeyruBodyBlocks,
  sampleVedlikBodyBlocks,
} from "@/lib/content/rich-content-samples";

export type Metric = { value: string; label: string };

export type CaseStudyStatus = "published" | "draft";

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string[];
  services: string[];
  region: string;
  summary: string;
  featured: boolean;
  status: CaseStudyStatus;
  showOnHomepage: boolean;
  homepageOrder?: number;
  pinnedOnServices: string[];
  metrics: Metric[];
  heroMetrics?: Metric[];
  highlights?: string[];
  /** @deprecated use featuredImage */
  image?: string;
  /** Case study hero + default fallback for all placements */
  featuredImage?: string;
  /** Homepage 360° carousel card */
  homepageCardImage?: string;
  /** /portfolio listing grid */
  listingImage?: string;
  /** Service page pinned case study cards */
  serviceCardImage?: string;
  /** Related / recommended on case study pages */
  relatedCardImage?: string;
  technologies: string[];
  challenge?: string;
  solution?: string;
  gradient?: string;
  projectUrl?: string;
  bodyBlocks?: PortableTextBlock[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "mobile-case-hub",
    title: "E-commerce Store for Mobile Case Hub",
    client: "Mobile Case Hub",
    industry: ["d2c", "ecommerce"],
    services: ["web", "mobile"],
    region: "asia",
    summary:
      "Designed and built an e-commerce store from the ground up — smooth across devices, fast checkout, and a catalog built to scale.",
    featured: true,
    status: "published",
    showOnHomepage: true,
    homepageOrder: 1,
    pinnedOnServices: ["product-engineering"],
    metrics: [
      { value: "Multi-device", label: "Storefront experience" },
      { value: "Fast", label: "Checkout flow" },
    ],
    heroMetrics: [
      { value: "Multi-device", label: "Storefront experience" },
      { value: "Fast", label: "Checkout flow" },
    ],
    highlights: [
      "Responsive storefront across mobile and desktop",
      "Checkout tuned for conversion and catalog growth",
      "Ongoing support as the product catalog expanded",
    ],
    technologies: ["Next.js", "React", "Node.js"],
    challenge:
      "The brand needed a owned storefront that could scale with a growing product catalog without sacrificing speed on mobile.",
    solution:
      "Custom e-commerce build with responsive UI, optimized checkout, and infrastructure ready for catalog and traffic growth.",
    gradient: "from-cyan-600/40 to-primary/20",
  },
  {
    slug: "plantropan",
    title: "On-Demand Garden Care App for Plantropan",
    client: "Plantropan",
    industry: ["saas"],
    services: ["mobile", "web"],
    region: "asia",
    summary:
      "Garden care platform where users book trusted gardeners on demand — simple booking flow, polished UX, and reliable production performance.",
    featured: true,
    status: "published",
    showOnHomepage: true,
    homepageOrder: 2,
    pinnedOnServices: ["product-engineering"],
    metrics: [
      { value: "On-demand", label: "Booking flow" },
      { value: "Reliable", label: "Production uptime" },
    ],
    heroMetrics: [
      { value: "On-demand", label: "Booking flow" },
      { value: "Reliable", label: "Production uptime" },
    ],
    highlights: [
      "Streamlined gardener booking and scheduling",
      "Mobile-first experience for customers and providers",
      "Stable releases with responsive engineering support",
    ],
    technologies: ["React Native", "Node.js", "PostgreSQL"],
    challenge:
      "Users needed a trustworthy way to discover and book gardeners without friction on mobile.",
    solution:
      "Cross-platform app with clear booking states, provider matching, and backend built for reliable daily operations.",
    gradient: "from-emerald-600/40 to-teal-500/20",
  },
  {
    slug: "ameyru",
    title: "Kidswear Brand Storefront for Ameyru",
    client: "Ameyru",
    industry: ["d2c", "ecommerce"],
    services: ["web", "ui"],
    region: "asia",
    summary:
      "Brand and storefront experience for a kidswear label — trustworthy to parents, easy to shop, and tuned for performance.",
    featured: true,
    status: "published",
    showOnHomepage: true,
    homepageOrder: 3,
    pinnedOnServices: ["consulting"],
    metrics: [
      { value: "Brand-led", label: "Shopping experience" },
      { value: "Performance", label: "Core Web Vitals focus" },
    ],
    heroMetrics: [
      { value: "Brand-led", label: "Shopping experience" },
      { value: "Performance", label: "Core Web Vitals focus" },
    ],
    highlights: [
      "Parent-focused brand presentation and product discovery",
      "Storefront performance and mobile shopping UX",
      "Visual identity aligned across marketing and product",
    ],
    technologies: ["Next.js", "Tailwind CSS", "Shopify"],
    challenge:
      "A new kidswear brand needed a digital experience that felt credible to parents and easy to navigate on mobile.",
    solution:
      "Storefront and brand UX with performance-first implementation and detail-oriented product presentation.",
    gradient: "from-violet-600/40 to-fuchsia-500/20",
    featuredImage:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&q=80",
    bodyBlocks: sampleAmeyruBodyBlocks,
  },
  {
    slug: "vedlik",
    title: "AI Tech Intelligence App for Vedlik",
    client: "Vedlik",
    industry: ["saas", "edtech"],
    services: ["mobile", "ai", "web"],
    region: "asia",
    summary:
      "Mantravi built Vedlik, a free AI and tech intelligence app for iOS and Android that turns noisy headlines into structured 4-Point Insights, flip-card signals, and a personal Intel Library for developers, founders, and students.",
    featured: true,
    status: "published",
    showOnHomepage: true,
    homepageOrder: 4,
    pinnedOnServices: ["ai-data", "product-engineering"],
    metrics: [
      { value: "iOS & Android", label: "Cross-platform launch" },
      { value: "4-Point", label: "Structured insight format" },
      { value: "Free", label: "Core experience" },
    ],
    heroMetrics: [
      { value: "iOS & Android", label: "Cross-platform launch" },
      { value: "4-Point", label: "Structured insight format" },
      { value: "Free", label: "Core experience" },
    ],
    highlights: [
      "4-Point Insight format on every story",
      "3D Intelligence Flip for funding and technical signals",
      "Learner and Builder onboarding paths",
      "Intel Library for saved research",
      "Free core experience with source attribution",
    ],
    technologies: ["Flutter", "Firestore", "Python", "LLM Integration"],
    challenge:
      "AI and startup news is fast-moving and full of fluff. Vedlik needed a mobile product that delivers facts, market context, builder angles, and big-picture takeaways without feeling like another social feed.",
    solution:
      "End-to-end product engineering with Flutter, Firestore, Python, and integrated LLMs: structured insights, contextual glossary, anti-fluff feed, Intel Library, and a marketing site aligned with the product narrative.",
    gradient: "from-cyan-600/40 to-indigo-600/20",
    projectUrl: "https://vedlik.com",
    bodyBlocks: sampleVedlikBodyBlocks,
  },
  {
    slug: "edtech-learning-app",
    title: "EdTech Learning App for Regional Students",
    client: "LearnBridge",
    industry: ["edtech", "education"],
    services: ["mobile", "ai"],
    region: "asia",
    summary:
      "Interactive learning app with progress tracking and AI-assisted assessments for underserved student communities.",
    featured: true,
    status: "published",
    showOnHomepage: true,
    homepageOrder: 4,
    pinnedOnServices: ["ai-data"],
    metrics: [
      { value: "4.7", label: "App store rating" },
    ],
    heroMetrics: [
      { value: "4.7", label: "App store rating" },
    ],
    highlights: [
      "Offline-first architecture for low-bandwidth regions",
      "AI-assisted assessments with teacher dashboards",
      "Bite-sized modules designed for mobile learning",
    ],
    technologies: ["Flutter", "Firebase", "LLM Integration"],
    challenge:
      "Offline access and low-bandwidth performance were critical for rural learners.",
    solution:
      "Offline-first architecture with sync, bite-sized content modules, and teacher dashboards.",
    gradient: "from-primary/40 to-primary/10",
  },
  {
    slug: "healthcare-wellness-portal",
    title: "Healthcare Wellness Portal",
    client: "VitalCare",
    industry: ["healthcare"],
    services: ["web", "ai"],
    region: "asia",
    summary:
      "Patient wellness portal connecting users with care plans, appointment booking, and health record summaries.",
    featured: true,
    status: "published",
    showOnHomepage: true,
    homepageOrder: 5,
    pinnedOnServices: [],
    metrics: [
      { value: "65%", label: "Faster appointment booking" },
      { value: "30K", label: "Registered patients" },
    ],
    heroMetrics: [
      { value: "65%", label: "Faster appointment booking" },
      { value: "30K", label: "Registered patients" },
    ],
    highlights: [
      "Unified patient records across care touchpoints",
      "Role-based access with secure document sharing",
      "Automated reminders improving care plan adherence",
    ],
    technologies: ["React", "Python", "PostgreSQL"],
    challenge:
      "Fragmented patient data across multiple touchpoints created poor continuity of care.",
    solution:
      "Unified portal with role-based access, reminders, and secure document sharing.",
    gradient: "from-emerald-600/40 to-teal-500/20",
  },
  {
    slug: "d2c-fashion-platform",
    title: "D2C Fashion Platform with Personalised Shopping",
    client: "StyleLane",
    industry: ["d2c", "ecommerce"],
    services: ["mobile", "web"],
    region: "asia",
    summary:
      "Built a mobile-first commerce platform with personalised recommendations and seamless checkout for a growing D2C brand.",
    featured: true,
    status: "published",
    showOnHomepage: true,
    homepageOrder: 6,
    pinnedOnServices: [],
    metrics: [
      { value: "38%", label: "Conversion uplift" },
      { value: "120K", label: "Monthly active users" },
    ],
    heroMetrics: [
      { value: "38%", label: "Conversion uplift" },
      { value: "120K", label: "Monthly active users" },
    ],
    highlights: [
      "Mobile-first storefront with personalised recommendations",
      "Unified loyalty and checkout reducing cart abandonment",
      "Marketing automation hooks for retention campaigns",
    ],
    technologies: ["Next.js", "React Native", "Node.js"],
    challenge:
      "The brand needed to move off marketplace dependency and own the customer relationship directly.",
    solution:
      "Native app plus responsive web store with integrated loyalty, analytics, and marketing automation hooks.",
    gradient: "from-violet-600/40 to-fuchsia-500/20",
  },
  {
    slug: "saas-analytics-dashboard",
    title: "SaaS Analytics Dashboard for Startups",
    client: "MetricFlow",
    industry: ["saas"],
    services: ["web", "cloud"],
    region: "us",
    summary:
      "Real-time analytics dashboard helping SaaS founders track MRR, churn, and product usage in one place.",
    featured: true,
    status: "published",
    showOnHomepage: false,
    pinnedOnServices: [],
    metrics: [
      { value: "3X", label: "Faster reporting" },
      { value: "40+", label: "Startup clients" },
    ],
    heroMetrics: [
      { value: "3X", label: "Faster reporting" },
      { value: "40+", label: "Startup clients" },
    ],
    highlights: [
      "Real-time MRR and churn dashboards",
      "Product usage analytics in a single pane",
      "Cloud-native architecture on AWS",
    ],
    technologies: ["Next.js", "AWS", "PostgreSQL"],
    gradient: "from-primary/40 to-primary/10",
  },
  {
    slug: "restaurant-ordering-system",
    title: "Restaurant Ordering & Kitchen Management",
    client: "PlateHouse",
    industry: ["restaurants"],
    services: ["mobile", "web"],
    region: "asia",
    summary:
      "End-to-end ordering system with kitchen display, delivery tracking, and loyalty for a multi-outlet restaurant chain.",
    featured: false,
    status: "published",
    showOnHomepage: false,
    pinnedOnServices: [],
    metrics: [
      { value: "25%", label: "Order volume increase" },
      { value: "8", label: "Outlets connected" },
    ],
    highlights: [
      "Kitchen display system reducing order errors",
      "Delivery tracking integrated with loyalty",
    ],
    technologies: ["React Native", "Node.js", "MongoDB"],
    gradient: "from-orange-600/40 to-amber-500/20",
  },
  {
    slug: "realestate-listing-platform",
    title: "Real Estate Listing & CRM Platform",
    client: "HomeNest",
    industry: ["realestate"],
    services: ["web", "ui"],
    region: "asia",
    summary:
      "Property listing platform with agent CRM, lead scoring, and virtual tour integration for a regional brokerage.",
    featured: false,
    status: "published",
    showOnHomepage: false,
    pinnedOnServices: [],
    metrics: [
      { value: "2X", label: "Lead response speed" },
      { value: "500+", label: "Listings managed" },
    ],
    highlights: [
      "Agent CRM with lead scoring automation",
      "Virtual tour integration for listings",
    ],
    technologies: ["Next.js", "Sanity", "Mapbox"],
    gradient: "from-slate-600/40 to-primary/20",
  },
];

export const portfolioFilters = {
  industries: [
    { id: "all", label: "Show All" },
    { id: "d2c", label: "D2C & E-Commerce" },
    { id: "edtech", label: "EdTech" },
    { id: "healthcare", label: "Healthcare" },
    { id: "saas", label: "SaaS" },
    { id: "realestate", label: "Real Estate" },
    { id: "restaurants", label: "Restaurants" },
  ],
  services: [
    { id: "all", label: "Show All" },
    { id: "mobile", label: "Mobile App Development" },
    { id: "web", label: "Web Development" },
    { id: "ai", label: "AI Solutions" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "ui", label: "UI/UX" },
  ],
  regions: [
    { id: "all", label: "Show All" },
    { id: "us", label: "US" },
    { id: "asia", label: "Asia" },
    { id: "europe", label: "Europe" },
  ],
};

/** @deprecated Use getHomepageCarousel from lib/content/portfolio.ts */
export function getFeaturedCaseStudies() {
  return caseStudies.filter((c) => c.featured && c.status === "published");
}

/** @deprecated Use getHomepageCarousel from lib/content/portfolio.ts */
export function getCarouselCaseStudies(limit = 6) {
  const homepage = caseStudies
    .filter((c) => c.status === "published" && c.showOnHomepage)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));
  if (homepage.length > 0) return homepage.slice(0, limit);
  const featured = caseStudies.filter((c) => c.featured && c.status === "published");
  const rest = caseStudies.filter((c) => !c.featured && c.status === "published");
  return [...featured, ...rest].slice(0, limit);
}

/** @deprecated Use getServiceCaseStudies from lib/content/portfolio.ts */
export function getCaseStudiesForServices(serviceTags: string[]) {
  return caseStudies.filter(
    (cs) =>
      cs.status === "published" &&
      cs.services.some((s) => serviceTags.includes(s)),
  );
}
