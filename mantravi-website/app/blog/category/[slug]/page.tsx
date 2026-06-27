import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogCategoryRow";
import { CTASection } from "@/components/sections/HomeCTASections";
import { blogCategories } from "@/lib/content/blog-data";
import { getBlogByCategory } from "@/lib/content/blog";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = blogCategories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return buildPageMetadata({
    title: cat.name,
    description: `Articles about ${cat.name} from Mantravi.`,
    path: `/blog/category/${cat.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = await getBlogByCategory(slug, 50);

  return (
    <>
      <section className="bg-[#050505] px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          <h1 className="title-display mt-6 text-3xl md:text-4xl lg:text-5xl">
            {category.name}
          </h1>
          <p className="mt-3 text-slate-400">{posts.length} articles</p>
        </div>
      </section>

      <section className="bg-[#f8f7f4] py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
