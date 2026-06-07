import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Badge, Card } from "@/components/ui/Card";
import { CTASection } from "@/components/sections/HomeCTASections";
import { BlogFeaturedHero } from "@/components/blog/BlogFeaturedHero";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { blogPosts, blogCategories } from "@/lib/content/blog-data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on web development, digital marketing, and AI from the Mantravi team.",
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured) || blogPosts[0];
  const latest = blogPosts.filter((p) => p.slug !== featured.slug).slice(0, 6);

  return (
    <>
      <SectionShell variant="dark" className="!py-16 md:!py-24">
        <BlogFeaturedHero
          category={featured.category}
          title={featured.title}
          excerpt={featured.excerpt}
          author={featured.author}
          date={formatDate(featured.publishedAt)}
          slug={featured.slug}
        />
      </SectionShell>

      <SectionShell variant="light">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground-dark">Latest</h2>
            <div className="mt-6 space-y-6">
              {latest.map((post) => (
                <article
                  key={post.slug}
                  className="border-b border-slate-200 pb-6"
                >
                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-light">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>·</span>
                    <span>{post.author}</span>
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="mt-2 text-xl font-bold hover:text-accent-sky transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-muted-light">{post.excerpt}</p>
                </article>
              ))}
            </div>

            {blogCategories.map((cat) => {
              const posts = blogPosts
                .filter((p) => p.categorySlug === cat.slug)
                .slice(0, 3);
              if (posts.length === 0) return null;
              return (
                <div key={cat.slug} className="mt-16">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{cat.name}</h2>
                    <Link
                      href={`/blog/category/${cat.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent-sky"
                    >
                      View All <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {posts.map((post) => (
                      <Card key={post.slug} variant="light">
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="font-bold hover:text-accent-sky transition-colors">
                            {post.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-light line-clamp-2">
                            {post.excerpt}
                          </p>
                        </Link>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="space-y-8">
            <Card variant="light">
              <h3 className="font-bold">Categories</h3>
              <ul className="mt-4 space-y-2">
                {blogCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/blog/category/${cat.slug}`}
                      className="text-sm text-muted-light hover:text-accent-sky"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
            <Card variant="light">
              <h3 className="font-bold">Newsletter</h3>
              <p className="mt-2 text-sm text-muted-light">
                Get insights twice a month.
              </p>
              <NewsletterForm />
            </Card>
          </aside>
        </div>
      </SectionShell>

      <CTASection />
    </>
  );
}
