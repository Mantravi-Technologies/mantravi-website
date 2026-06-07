export const blogCategories = [
  { slug: "web-development", name: "Web & App Development" },
  { slug: "digital-marketing", name: "Digital Marketing & SEO" },
  { slug: "qa-it", name: "QA & IT Solutions" },
  { slug: "ai-insights", name: "AI Insights" },
];
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  category: string;
  categorySlug: string;
  featured?: boolean;
  readTime?: string;
  body?: string;
};
export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-right-tech-stack-2026",
    title: "How to Choose the Right Tech Stack for Your Product in 2026",
    excerpt:
      "A practical guide to picking frameworks and infrastructure that match your timeline, team, and growth plans.",
    author: "Mantravi Team",
    publishedAt: "2026-05-28",
    category: "Web & App Development",
    categorySlug: "web-development",
    featured: true,
    readTime: "8 min",
    body: "Choosing a tech stack isn't about chasing trends, it's about matching your product stage, team skills, and growth timeline.\n\n## Start With Constraints\n\nBudget, time-to-market, and expected user load should drive your first decision, not framework popularity.\n\n## Web vs Mobile vs Both\n\nIf you need both platforms quickly, cross-platform tools may make sense. If performance is critical, native or a hybrid approach might win.\n\n## Plan for Maintenance\n\nThe stack you choose today is the one your team maintains for years. Favour ecosystems with strong documentation and hiring pools.",
  },
  {
    slug: "seo-basics-for-startups",
    title: "SEO Basics Every Startup Should Get Right Before Launch",
    excerpt:
      "Technical SEO, content structure, and page speed, the fundamentals that compound over time.",
    author: "Mantravi Team",
    publishedAt: "2026-05-22",
    category: "Digital Marketing & SEO",
    categorySlug: "digital-marketing",
    readTime: "6 min",
  },
  {
    slug: "automated-testing-worth-it",
    title: "When Automated Testing Pays Off (And When It Doesn't)",
    excerpt:
      "How to decide where to invest in test automation based on product maturity and release frequency.",
    author: "Mantravi Team",
    publishedAt: "2026-05-15",
    category: "QA & IT Solutions",
    categorySlug: "qa-it",
    readTime: "7 min",
  },
  {
    slug: "ai-in-small-business",
    title: "Practical AI Uses for Small and Mid-Size Businesses",
    excerpt:
      "Smart analytics, support automation, and content assistance, without over-engineering.",
    author: "Mantravi Team",
    publishedAt: "2026-05-08",
    category: "AI Insights",
    categorySlug: "ai-insights",
    readTime: "9 min",
  },
  {
    slug: "mvp-development-guide",
    title: "Building an MVP: Scope, Timeline, and Common Mistakes",
    excerpt:
      "What to include in v1, what to defer, and how to ship something users actually want.",
    author: "Mantravi Team",
    publishedAt: "2026-04-30",
    category: "Web & App Development",
    categorySlug: "web-development",
    readTime: "10 min",
  },
  {
    slug: "brand-identity-digital-products",
    title: "Why Brand Identity Matters for Digital Products",
    excerpt:
      "Consistency across product UI, marketing, and support builds recognition and trust.",
    author: "Mantravi Team",
    publishedAt: "2026-04-18",
    category: "Digital Marketing & SEO",
    categorySlug: "digital-marketing",
    readTime: "5 min",
  },
];
