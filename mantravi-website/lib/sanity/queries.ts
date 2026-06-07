import { getSanityClient, isSanityConfigured } from "./client";
import { caseStudies as fallbackCaseStudies } from "@/lib/content/case-studies";
import { blogPosts as fallbackBlogPosts } from "@/lib/content/blog-data";

export async function getCaseStudies() {
  const client = getSanityClient();
  if (!client) return fallbackCaseStudies;

  try {
    const results = await client.fetch(`*[_type == "caseStudy"] | order(order asc) {
      "slug": slug.current,
      title, client, industry, services, region, summary, featured,
      metrics, technologies
    }`);
    return results.length > 0 ? results : fallbackCaseStudies;
  } catch {
    return fallbackCaseStudies;
  }
}

export async function getCaseStudyBySlug(slug: string) {
  const client = getSanityClient();
  if (!client) return fallbackCaseStudies.find((c) => c.slug === slug) ?? null;

  try {
    return await client.fetch(
      `*[_type == "caseStudy" && slug.current == $slug][0]`,
      { slug }
    );
  } catch {
    return fallbackCaseStudies.find((c) => c.slug === slug) ?? null;
  }
}

export async function getBlogPosts() {
  const client = getSanityClient();
  if (!client) return fallbackBlogPosts;

  try {
    const results = await client.fetch(`*[_type == "blogPost"] | order(publishedAt desc) {
      "slug": slug.current,
      title, excerpt, "author": author->name,
      "category": categories[0]->title,
      "categorySlug": categories[0]->slug.current,
      publishedAt, featured
    }`);
    return results.length > 0 ? results : fallbackBlogPosts;
  } catch {
    return fallbackBlogPosts;
  }
}

export { isSanityConfigured };
