import { getSanityClient, imageUrlFromSanity, isSanityConfigured } from "./client";
import {
  caseStudies as fallbackCaseStudies,
  type CaseStudy,
} from "@/lib/content/case-studies";
import {
  blogPosts as fallbackBlogPosts,
  type BlogPost,
} from "@/lib/content/blog-data";
import type { PortableTextBlock } from "@/lib/content/portable-text";

const caseStudyListFields = `{
  "slug": slug.current,
  title,
  client,
  industry,
  services,
  region,
  summary,
  featured,
  "status": coalesce(status, "published"),
  "showOnHomepage": coalesce(showOnHomepage, featured),
  homepageOrder,
  "pinnedOnServices": coalesce(pinnedOnServices, []),
  metrics,
  technologies,
  challenge,
  solution,
  gradient,
  highlights,
  heroMetrics,
  projectUrl,
  featuredImage,
  "featuredImageUrl": featuredImage.asset->url,
  homepageCardImage,
  "homepageCardImageUrl": homepageCardImage.asset->url,
  listingImage,
  "listingImageUrl": listingImage.asset->url,
  serviceCardImage,
  "serviceCardImageUrl": serviceCardImage.asset->url,
  relatedCardImage,
  "relatedCardImageUrl": relatedCardImage.asset->url
}`;

const caseStudyDetailFields = `${caseStudyListFields.slice(0, -1)},
  body
}`;

const blogPostListFields = `{
  "slug": slug.current,
  title,
  excerpt,
  "author": author->name,
  "category": categories[0]->title,
  "categorySlug": categories[0]->slug.current,
  publishedAt,
  featured,
  featuredRank,
  "status": coalesce(status, "published"),
  readTime,
  featuredImage,
  "featuredImageUrl": featuredImage.asset->url,
  seoTitle,
  seoDescription,
  focusKeyword,
  keyTakeaways,
  faq,
  updatedAt
}`;

const blogPostDetailFields = `${blogPostListFields.slice(0, -1)},
  body
}`;

function resolveSanityImage(
  raw: Record<string, unknown>,
  urlKey: string,
  imageKey: string,
): string | undefined {
  const direct = raw[urlKey] as string | undefined;
  if (direct) return direct;
  return imageUrlFromSanity(raw[imageKey]);
}

function resolveFeaturedImage(raw: Record<string, unknown>): string | undefined {
  const featured = resolveSanityImage(raw, "featuredImageUrl", "featuredImage");
  if (featured) return featured;
  return raw.image as string | undefined;
}

function normalizeCaseStudy(raw: Record<string, unknown>): CaseStudy {
  return {
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    client: String(raw.client ?? ""),
    industry: (raw.industry as string[]) ?? [],
    services: (raw.services as string[]) ?? [],
    region: String(raw.region ?? "asia"),
    summary: String(raw.summary ?? ""),
    featured: Boolean(raw.featured),
    status: (raw.status as CaseStudy["status"]) ?? "published",
    showOnHomepage: Boolean(raw.showOnHomepage),
    homepageOrder:
      typeof raw.homepageOrder === "number" ? raw.homepageOrder : undefined,
    pinnedOnServices: (raw.pinnedOnServices as string[]) ?? [],
    metrics: (raw.metrics as CaseStudy["metrics"]) ?? [],
    heroMetrics: raw.heroMetrics as CaseStudy["heroMetrics"],
    highlights: raw.highlights as CaseStudy["highlights"],
    technologies: (raw.technologies as string[]) ?? [],
    challenge: raw.challenge as string | undefined,
    solution: raw.solution as string | undefined,
    gradient: raw.gradient as string | undefined,
    projectUrl: raw.projectUrl as string | undefined,
    featuredImage: resolveFeaturedImage(raw),
    homepageCardImage: resolveSanityImage(
      raw,
      "homepageCardImageUrl",
      "homepageCardImage",
    ),
    listingImage: resolveSanityImage(raw, "listingImageUrl", "listingImage"),
    serviceCardImage: resolveSanityImage(
      raw,
      "serviceCardImageUrl",
      "serviceCardImage",
    ),
    relatedCardImage: resolveSanityImage(
      raw,
      "relatedCardImageUrl",
      "relatedCardImage",
    ),
    bodyBlocks: raw.body as PortableTextBlock[] | undefined,
  };
}

function normalizeBlogPost(raw: Record<string, unknown>): BlogPost {
  const faqRaw = raw.faq as { question?: string; answer?: string }[] | undefined;
  return {
    slug: String(raw.slug ?? ""),
    title: String(raw.title ?? ""),
    excerpt: String(raw.excerpt ?? ""),
    author: String(raw.author ?? "Mantravi Team"),
    publishedAt: String(raw.publishedAt ?? new Date().toISOString()),
    category: String(raw.category ?? ""),
    categorySlug: String(raw.categorySlug ?? ""),
    status: (raw.status as BlogPost["status"]) ?? "published",
    featured: Boolean(raw.featured),
    featuredRank:
      typeof raw.featuredRank === "number" ? raw.featuredRank : undefined,
    readTime: raw.readTime as string | undefined,
    featuredImage: resolveFeaturedImage(raw),
    bodyBlocks: raw.body as PortableTextBlock[] | undefined,
    seoTitle: raw.seoTitle as string | undefined,
    seoDescription: raw.seoDescription as string | undefined,
    focusKeyword: raw.focusKeyword as string | undefined,
    keyTakeaways: (raw.keyTakeaways as string[]) ?? undefined,
    faq: faqRaw
      ?.filter((f) => f.question && f.answer)
      .map((f) => ({ question: f.question!, answer: f.answer! })),
    updatedAt: raw.updatedAt as string | undefined,
  };
}

export async function getCaseStudiesFromSanity(): Promise<CaseStudy[]> {
  const client = getSanityClient();
  if (!client) return [];

  try {
    const results = await client.fetch<
      Record<string, unknown>[]
    >(`*[_type == "caseStudy" && coalesce(status, "published") == "published"] | order(homepageOrder asc, order asc) ${caseStudyListFields}`);
    if (!results?.length) return [];
    return results.map(normalizeCaseStudy);
  } catch {
    return [];
  }
}

export async function getCaseStudyBySlugFromSanity(
  slug: string,
): Promise<CaseStudy | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const result = await client.fetch<Record<string, unknown> | null>(
      `*[_type == "caseStudy" && slug.current == $slug && coalesce(status, "published") == "published"][0] ${caseStudyDetailFields}`,
      { slug },
    );
    return result ? normalizeCaseStudy(result) : null;
  } catch {
    return null;
  }
}

export async function getBlogPostsFromSanity(): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) return [];

  try {
    const results = await client.fetch<
      Record<string, unknown>[]
    >(`*[_type == "blogPost"] | order(publishedAt desc) ${blogPostListFields}`);
    if (!results?.length) return [];
    return results.map(normalizeBlogPost);
  } catch {
    return [];
  }
}

export async function getBlogPostBySlugFromSanity(
  slug: string,
): Promise<BlogPost | null> {
  const client = getSanityClient();
  if (!client) return null;

  try {
    const result = await client.fetch<Record<string, unknown> | null>(
      `*[_type == "blogPost" && slug.current == $slug][0] ${blogPostDetailFields}`,
      { slug },
    );
    return result ? normalizeBlogPost(result) : null;
  } catch {
    return null;
  }
}

/** @deprecated Use getCaseStudiesFromSanity */
export async function getCaseStudies() {
  const results = await getCaseStudiesFromSanity();
  return results.length > 0 ? results : fallbackCaseStudies;
}

/** @deprecated Use getCaseStudyBySlugFromSanity */
export async function getCaseStudyBySlug(slug: string) {
  const fromSanity = await getCaseStudyBySlugFromSanity(slug);
  if (fromSanity) return fromSanity;
  return fallbackCaseStudies.find((c) => c.slug === slug) ?? null;
}

/** @deprecated Use getBlogPostsFromSanity */
export async function getBlogPosts() {
  const results = await getBlogPostsFromSanity();
  return results.length > 0 ? results : fallbackBlogPosts;
}

export { isSanityConfigured };
