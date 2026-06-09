import { cn } from "@/lib/utils";

type SectionVariant =
  | "dark"
  | "light"
  | "accent"
  | "surface"
  | "cream"
  | "cinematic"
  | "none";

const variantClasses: Record<SectionVariant, string> = {
  dark: "section-dark",
  light: "section-light",
  accent: "section-accent",
  surface: "section-surface",
  cream: "section-cream",
  cinematic: "section-cinematic",
  none: "",
};

export function SectionShell({
  id,
  variant = "dark",
  className = "",
  children,
  container = true,
  grain,
}: {
  id?: string;
  variant?: SectionVariant;
  className?: string;
  children: React.ReactNode;
  container?: boolean;
  /** Full-bleed film grain at section level (opacity 0–1). */
  grain?: number;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative isolate py-16 md:py-24 lg:py-28",
        variantClasses[variant],
        className,
      )}
    >
      {grain != null && grain > 0 && (
        <div
          className="grain-overlay pointer-events-none"
          style={{ opacity: grain }}
          aria-hidden="true"
        />
      )}
      {container ? (
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      ) : (
        <div className="relative z-10">{children}</div>
      )}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  display = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  display?: boolean;
}) {
  return (
    <div
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"
      }
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          display
            ? "title-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
            : "text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          light ? "text-foreground-dark" : "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            light ? "text-muted-light" : "text-slate-300",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
