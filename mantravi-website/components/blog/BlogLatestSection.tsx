import Link from "next/link";
import type { BlogPost } from "@/lib/content/blog-data";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogLatestSection({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="blog-latest">
      <h2 className="text-xs font-semibold uppercase tracking-[0.28em] text-[#050505]/45">
        Latest
      </h2>
      <ul className="mt-6 divide-y divide-[#050505]/10">
        {posts.map((post) => (
          <li key={post.slug}>
            <article className="group py-6 first:pt-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#050505]/50">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span aria-hidden>·</span>
                <span>{post.author}</span>
                {post.readTime && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{post.readTime}</span>
                  </>
                )}
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="mt-2 text-lg font-bold leading-snug text-[#050505] transition-colors group-hover:text-primary md:text-xl">
                  {post.title}
                </h3>
              </Link>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#050505]/65">
                {post.excerpt}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
