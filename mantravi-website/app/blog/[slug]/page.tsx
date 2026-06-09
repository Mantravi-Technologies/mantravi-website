import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogCategoryRow";
import { BlogPostCover } from "@/components/blog/BlogPostCover";
import {
  BlogFaqSection,
  BlogKeyTakeaways,
} from "@/components/blog/BlogGeoSection";
import { BlogArticleMeta } from "@/components/blog/BlogArticleMeta";
import { BlogPostLayout } from "@/components/content/BlogPostLayout";
import { JsonLdMulti } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/HomeCTASections";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getBlogRelated,
  getAllBlogPostsSync,
  getBlogPostBySlugSync,
} from "@/lib/content/blog";
import { resolveBlogBody } from "@/lib/content/portable-text";
import { buildPageMetadata } from "@/lib/seo/metadata";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const slugs = posts.length > 0 ? posts : getAllBlogPostsSync();
  return slugs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post =
    (await getBlogPostBySlug(slug)) ?? getBlogPostBySlugSync(slug);
  if (!post) return { title: "Post Not Found" };
  return buildPageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = (await getBlogPostBySlug(slug)) ?? getBlogPostBySlugSync(slug);
  if (!post) notFound();

  const related = await getBlogRelated(post, 3);
  const bodyBlocks = resolveBlogBody(post);
  const takeaways = post.keyTakeaways ?? [];
  const faqs = post.faq ?? [];

  const jsonLd = [
    blogPostingSchema(post),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      ...(post.categorySlug
        ? [
            {
              name: post.category,
              path: `/blog/category/${post.categorySlug}`,
            },
          ]
        : []),
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    faqPageSchema(faqs),
  ];

  return (
    <>
      <JsonLdMulti schemas={jsonLd} />
      <article>
        <header className="border-b border-[#050505]/10 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-8 md:py-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-primary">
                {post.category}
              </p>
              <h1 className="title-display mt-3 max-w-4xl text-[#050505] text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                {post.title}
              </h1>
            </div>
            {post.featuredImage && (
              <div className="pb-8 md:pb-10">
                <BlogPostCover
                  title={post.title}
                  gradient={post.imageGradient}
                  featuredImage={post.featuredImage}
                  className="blog-post-hero-cover h-[200px] w-full overflow-hidden rounded-xl border border-[#050505]/10 sm:h-[240px] md:h-[280px] lg:h-[300px]"
                />
              </div>
            )}
          </div>
        </header>

        <div className="bg-white py-8 md:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <BlogArticleMeta
              author={post.author}
              publishedAt={post.publishedAt}
              updatedAt={post.updatedAt}
              readTime={post.readTime}
              excerpt={post.excerpt}
            />
            <div className="mt-8 lg:mt-10">
              <BlogKeyTakeaways items={takeaways} />
            </div>
            {bodyBlocks.length > 0 ? (
              <div className="mt-8 lg:mt-10">
                <BlogPostLayout blocks={bodyBlocks} />
              </div>
            ) : (
              <p className="mt-8 text-base leading-relaxed text-[#050505]/75">
                {post.excerpt}
              </p>
            )}
            <BlogFaqSection faqs={faqs} />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-[#050505]/10 bg-white py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="title-display text-2xl text-[#050505] md:text-3xl">
              Related Articles
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <BlogPostCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
