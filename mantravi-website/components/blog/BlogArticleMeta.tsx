type BlogArticleMetaProps = {
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime?: string;
  excerpt: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogArticleMeta({
  author,
  publishedAt,
  updatedAt,
  readTime,
  excerpt,
}: BlogArticleMetaProps) {
  return (
    <header className="border-b border-[#050505]/10 pb-6 sm:pb-8">
      <p className="flex flex-wrap gap-x-1.5 gap-y-1 text-sm text-[#050505]/55">
        <span>
          By <span className="font-medium text-[#050505]">{author}</span>
        </span>
        <span aria-hidden="true">·</span>
        <span>{formatDate(publishedAt)}</span>
        {updatedAt && updatedAt !== publishedAt && (
          <>
            <span aria-hidden="true">·</span>
            <span>Updated {formatDate(updatedAt)}</span>
          </>
        )}
        {readTime && (
          <>
            <span aria-hidden="true">·</span>
            <span>{readTime} read</span>
          </>
        )}
      </p>
      {excerpt && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#050505]/80 sm:text-lg md:text-xl">
          {excerpt}
        </p>
      )}
    </header>
  );
}
