import { cn } from "@/lib/utils";

export function BlogPostCover({
  title,
  gradient = "from-primary/45 to-slate-900/90",
  featuredImage,
  className,
}: {
  title: string;
  gradient?: string;
  featuredImage?: string;
  className?: string;
}) {
  if (featuredImage) {
    return (
      <div
        className={cn("relative overflow-hidden bg-[#050505]", className)}
        aria-hidden={title ? undefined : true}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={featuredImage}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        gradient,
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  );
}
