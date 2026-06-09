import {
  blogPosts,
  blogCategories,
  type BlogPost,
} from "@/lib/content/blog-data";
import { getBlogPostsFromSanity, getBlogPostBySlugFromSanity } from "@/lib/sanity/queries";

function published(posts: BlogPost[]) {
  return posts.filter((p) => p.status === "published");
}

function byDateDesc(posts: BlogPost[]) {
  return [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

async function loadBlogPosts(): Promise<BlogPost[]> {
  const fromSanity = await getBlogPostsFromSanity();
  return fromSanity.length > 0 ? fromSanity : blogPosts;
}

export async function getBlogFeatured(): Promise<BlogPost | null> {
  const all = published(await loadBlogPosts());
  const featured = all
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));
  if (featured.length > 0) return featured[0];
  return byDateDesc(all)[0] ?? null;
}

export async function getBlogLatest(
  limit = 8,
  excludeSlug?: string,
): Promise<BlogPost[]> {
  const featured = await getBlogFeatured();
  const exclude = excludeSlug ?? featured?.slug;
  const all = byDateDesc(published(await loadBlogPosts()));
  return all.filter((p) => p.slug !== exclude).slice(0, limit);
}

export async function getBlogByCategory(
  categorySlug: string,
  limit = 3,
): Promise<BlogPost[]> {
  const all = published(await loadBlogPosts());
  return byDateDesc(all.filter((p) => p.categorySlug === categorySlug)).slice(
    0,
    limit,
  );
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const fromSanity = await getBlogPostBySlugFromSanity(slug);
  if (fromSanity) return fromSanity;
  const all = await loadBlogPosts();
  return all.find((p) => p.slug === slug && p.status === "published") ?? null;
}

export async function getBlogRelated(
  post: BlogPost,
  limit = 3,
): Promise<BlogPost[]> {
  const all = published(await loadBlogPosts());
  return byDateDesc(
    all.filter(
      (p) =>
        p.slug !== post.slug && p.categorySlug === post.categorySlug,
    ),
  ).slice(0, limit);
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return byDateDesc(published(await loadBlogPosts()));
}

export { blogCategories };

/** Sync helpers for static fallback in generateStaticParams */
export function getAllBlogPostsSync(): BlogPost[] {
  return byDateDesc(published(blogPosts));
}

export function getBlogPostBySlugSync(slug: string): BlogPost | null {
  return blogPosts.find((p) => p.slug === slug && p.status === "published") ?? null;
}

export function getBlogFeaturedSync(): BlogPost | null {
  const all = published(blogPosts);
  const featured = all
    .filter((p) => p.featured)
    .sort((a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99));
  return featured[0] ?? byDateDesc(all)[0] ?? null;
}
