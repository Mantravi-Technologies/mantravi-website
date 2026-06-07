import Link from "next/link";
import { cn } from "@/lib/utils";

export function MantraviLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-0.5 text-xl font-bold tracking-tight transition-colors",
        variant === "light"
          ? "text-white hover:text-primary-light"
          : "text-foreground hover:text-primary",
        className,
      )}
    >
      Mantravi
      <span className="mandala-dot" aria-hidden />
    </Link>
  );
}
