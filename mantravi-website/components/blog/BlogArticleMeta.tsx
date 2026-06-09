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
    <header className="border-b border-[#050505]/10 pb-8">
      <p className="text-sm text-[#050505]/55">
        By <span className="font-medium text-[#050505]">{author}</span>
        {" · "}
        {formatDate(publishedAt)}
        {updatedAt && updatedAt !== publishedAt && (
          <> · Updated {formatDate(updatedAt)}</>
        )}
        {readTime && <> · {readTime} read</>}
      </p>
      {excerpt && (
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#050505]/80 md:text-xl">
          {excerpt}
        </p>
      )}
    </header>
  );
}
