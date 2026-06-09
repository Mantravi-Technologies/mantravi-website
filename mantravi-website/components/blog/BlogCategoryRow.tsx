import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/content/blog-data";
import { BlogPostCover } from "./BlogPostCover";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-post-card group block overflow-hidden rounded-xl border border-[#050505]/8 bg-white transition-shadow hover:shadow-md"
    >
      <BlogPostCover
        title={post.title}
        gradient={post.imageGradient}
        featuredImage={post.featuredImage}
        className="aspect-[16/10] w-full"
      />
      <div className="p-5">
        <p className="text-xs text-[#050505]/50">
          {formatDate(post.publishedAt)} · {post.author}
        </p>
        <h3 className="mt-2 text-base font-bold leading-snug text-[#050505] transition-colors group-hover:text-primary line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-[#050505]/65">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

export function BlogCategoryRow({
  name,
  slug,
  posts,
}: {
  name: string;
  slug: string;
  posts: BlogPost[];
}) {
  if (posts.length === 0) return null;

  return (
    <section className="blog-category-row border-t border-[#050505]/10 pt-12">
      <div className="flex items-end justify-between gap-4">
        <h2 className="title-display text-2xl text-[#050505] md:text-3xl">
          {name}
        </h2>
        <Link
          href={`/blog/category/${slug}`}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary"
        >
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
