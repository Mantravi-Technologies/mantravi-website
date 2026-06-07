import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Card } from "@/components/ui/Card";
import { blogPosts, blogCategories } from "@/lib/content/blog-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = blogCategories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return {
    title: cat.name,
    description: `Articles about ${cat.name} from Mantravi.`,
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = blogCategories.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = blogPosts.filter((p) => p.categorySlug === slug);

  return (
    <>
      <SectionShell variant="none" className="bg-[#050a30] !py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-white md:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 text-slate-400">{posts.length} articles</p>
      </SectionShell>

      <SectionShell variant="light" className="!pt-0">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card variant="light" className="h-full">
                <h2 className="font-bold hover:text-accent-sky transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-light line-clamp-3">
                  {post.excerpt}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
