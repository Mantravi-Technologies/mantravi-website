import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type CardVariant = "light" | "glass" | "dark";

export function Card({
  className,
  children,
  variant = "light",
  ...props
}: HTMLAttributes<HTMLDivElement> & { variant?: CardVariant }) {
  const styles: Record<CardVariant, string> = {
    light:
      "rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20 text-foreground",
    glass:
      "rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white",
    dark: "rounded-2xl border border-slate-100 bg-white p-6 shadow-sm text-foreground",
  };
  return (
    <div className={cn(styles[variant], className)} {...props}>
      {children}
    </div>
  );
}

export function Badge({
  className,
  children,
  dark = false,
}: {
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        dark
          ? "bg-primary/20 text-primary-light"
          : "bg-primary-light text-primary-dark",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Input({
  className,
  dark = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { dark?: boolean }) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
        dark
          ? "border-white/15 bg-white/5 text-white placeholder:text-slate-400"
          : "border-slate-200 bg-white text-foreground placeholder:text-muted focus:border-primary",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  dark = false,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { dark?: boolean }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-sm min-h-[120px] resize-y focus:outline-none focus:ring-2 focus:ring-primary/20",
        dark
          ? "border-white/15 bg-white/5 text-white"
          : "border-slate-200 bg-white text-foreground focus:border-primary",
        className,
      )}
      {...props}
    />
  );
}
