import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content/site-data";
import { caseStudies } from "@/lib/content/case-studies";
import { blogPosts } from "@/lib/content/blog-data";

import { getAllServiceSlugs } from "@/lib/content/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  const staticPages = ["", "/about", "/portfolio", "/blog", "/services"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const portfolioPages = caseStudies.map((cs) => ({
    url: `${base}/portfolio/${cs.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const servicePages = getAllServiceSlugs().map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...portfolioPages, ...blogPages];
}
