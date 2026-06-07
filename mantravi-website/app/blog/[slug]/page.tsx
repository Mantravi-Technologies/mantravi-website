import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Badge, Card } from "@/components/ui/Card";
import { CTASection } from "@/components/sections/HomeCTASections";
import { blogPosts } from "@/lib/content/blog-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.categorySlug === post.categorySlug && p.slug !== slug)
    .slice(0, 3);

  const paragraphs = (post.body || post.excerpt).split("\n\n");

  return (
    <>
      <SectionShell
        variant="none"
        className="bg-[#050a30] hero-pattern !py-12 md:!py-16"
      >
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
        <Badge dark className="mt-6">
          {post.category}
        </Badge>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-slate-400">
          {post.author} · {formatDate(post.publishedAt)}
          {post.readTime && ` · ${post.readTime} read`}
        </p>
      </SectionShell>

      <SectionShell variant="light" className="!pt-0">
        <div className="grid gap-12 lg:grid-cols-3">
          <article className="lg:col-span-2 prose-mantravi">
            {paragraphs.map((para, i) => {
              if (para.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="text-2xl font-bold mt-8 mb-4 text-foreground-dark"
                  >
                    {para.replace("## ", "")}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-muted-light leading-relaxed my-4">
                  {para}
                </p>
              );
            })}
          </article>
          <aside>
            <Card variant="light">
              <h3 className="font-bold">About the Author</h3>
              <p className="mt-2 text-sm text-muted-light">{post.author}</p>
            </Card>
          </aside>
        </div>
      </SectionShell>

      {related.length > 0 && (
        <SectionShell variant="dark">
          <h2 className="text-2xl font-bold text-white">Related Articles</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`}>
                <div className="glass-card p-6">
                  <h3 className="font-bold text-white hover:text-accent">
                    {r.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                    {r.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </SectionShell>
      )}

      <CTASection />
    </>
  );
}
