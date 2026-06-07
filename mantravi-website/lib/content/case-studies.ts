export type Metric = { value: string; label: string };
export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string[];
  services: string[];
  region: string;
  summary: string;
  featured: boolean;
  metrics: Metric[];
  heroMetrics?: Metric[];
  highlights?: string[];
  image?: string;
  technologies: string[];
  challenge?: string;
  solution?: string;
  gradient?: string;
};
export const caseStudies: CaseStudy[] = [
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
    slug: "edtech-learning-app",
    title: "EdTech Learning App for Regional Students",
    client: "LearnBridge",
    industry: ["edtech", "education"],
    services: ["mobile", "ai"],
    region: "asia",
    summary:
      "Interactive learning app with progress tracking and AI-assisted assessments for underserved student communities.",
    featured: true,
    metrics: [
      { value: "50K+", label: "Students onboarded" },
      { value: "4.7", label: "App store rating" },
    ],
    heroMetrics: [
      { value: "50K+", label: "Students onboarded" },
      { value: "4.7", label: "App store rating" },
    ],
    highlights: [
      "Offline-first architecture for low-bandwidth regions",
      "AI-assisted assessments with teacher dashboards",
      "Bite-sized modules designed for mobile learning",
    ],
    technologies: ["Flutter", "Firebase", "OpenAI"],
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
    slug: "saas-analytics-dashboard",
    title: "SaaS Analytics Dashboard for Startups",
    client: "MetricFlow",
    industry: ["saas"],
    services: ["web", "cloud"],
    region: "us",
    summary:
      "Real-time analytics dashboard helping SaaS founders track MRR, churn, and product usage in one place.",
    featured: true,
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
export function getFeaturedCaseStudies() {
  return caseStudies.filter((c) => c.featured);
} /** Featured studies first, then remaining, capped at 6 for the 360° carousel. */
export function getCarouselCaseStudies(limit = 6) {
  const featured = caseStudies.filter((c) => c.featured);
  const rest = caseStudies.filter((c) => !c.featured);
  return [...featured, ...rest].slice(0, limit);
}
export function getCaseStudiesForServices(serviceTags: string[]) {
  return caseStudies.filter((cs) =>
    cs.services.some((s) => serviceTags.includes(s)),
  );
}
