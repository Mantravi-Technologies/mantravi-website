import type { MetadataRoute } from "next";
import { blogCategories } from "@/lib/content/blog-data";
import { siteConfig } from "@/lib/content/site-data";
import { getPortfolioListing } from "@/lib/content/portfolio";
import { getAllBlogPosts } from "@/lib/content/blog";
import { getAllServiceSlugs } from "@/lib/content/services-data";

const BUILD_DATE = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/portfolio`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/privacy-policy`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const caseStudies = await getPortfolioListing();
  const portfolioPages = caseStudies.map((cs) => ({
    url: `${base}/portfolio/${cs.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPosts = await getAllBlogPosts();
  const blogPages = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const categoryPages = blogCategories.map((cat) => ({
    url: `${base}/blog/category/${cat.slug}`,
    lastModified: BUILD_DATE,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [
    ...staticPages,
    ...servicePages,
    ...portfolioPages,
    ...blogPages,
    ...categoryPages,
  ];
}
