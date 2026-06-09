import Link from "next/link";
import type { BlogPost } from "@/lib/content/blog-data";
import { BlogPostCover } from "./BlogPostCover";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogFeaturedBand({ post }: { post: BlogPost }) {
  return (
    <section className="blog-featured-band relative overflow-hidden bg-[#050505] text-white">
      <div className="grain-overlay pointer-events-none opacity-[0.1]" aria-hidden />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-8 lg:py-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Featured
          </p>
          <Link href={`/blog/${post.slug}`}>
            <h1 className="title-display mt-4 text-3xl text-white transition-colors hover:text-primary md:text-4xl lg:text-5xl">
              {post.title}
            </h1>
          </Link>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
            {post.excerpt}
          </p>
          <p className="mt-5 text-sm text-slate-400">
            {post.author} · {formatDate(post.publishedAt)}
            {post.readTime ? ` · ${post.readTime} read` : ""}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
          >
            Read article →
          </Link>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="block overflow-hidden rounded-2xl border border-white/10"
        >
          <BlogPostCover
            title={post.title}
            gradient={post.imageGradient}
            featuredImage={post.featuredImage}
            className="aspect-[16/9] w-full max-h-[220px] sm:max-h-[240px] lg:max-h-[280px]"
          />
        </Link>
      </div>
    </section>
  );
}
