import type { Metadata } from "next";
import { CTASection } from "@/components/sections/HomeCTASections";
import { BlogFeaturedBand } from "@/components/blog/BlogFeaturedBand";
import { BlogLatestSection } from "@/components/blog/BlogLatestSection";
import { BlogCategoryRow } from "@/components/blog/BlogCategoryRow";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import {
  blogCategories,
  getAllBlogPosts,
  getBlogByCategory,
  getBlogFeatured,
  getBlogLatest,
} from "@/lib/content/blog";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Insights on web development, digital marketing, QA, and AI from the Mantravi team.",
  path: "/blog",
});

export default async function BlogPage() {
  const featured = await getBlogFeatured();
  const latest = await getBlogLatest(8, featured?.slug);
  const categoryRows = await Promise.all(
    blogCategories.map(async (cat) => ({
      ...cat,
      posts: await getBlogByCategory(cat.slug, 3),
    })),
  );

  if (!featured) {
    const all = await getAllBlogPosts();
    if (all.length === 0) return null;
  }

  return (
    <>
      {featured && <BlogFeaturedBand post={featured} />}

      <section className="bg-[#f8f7f4] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
            <div>
              <BlogLatestSection posts={latest} />
              {categoryRows.map((row) => (
                <BlogCategoryRow
                  key={row.slug}
                  name={row.name}
                  slug={row.slug}
                  posts={row.posts}
                />
              ))}
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
