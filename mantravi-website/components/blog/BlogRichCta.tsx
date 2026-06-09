"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";
import { cn } from "@/lib/utils";

type BlogRichCtaProps = {
  value: Record<string, unknown>;
};

export function BlogRichCta({ value }: BlogRichCtaProps) {
  const { openContact } = useContact();
  const eyebrow = value?.eyebrow ? String(value.eyebrow) : undefined;
  const headline = String(value?.headline ?? "");
  const body = value?.body ? String(value.body) : undefined;
  const bullets = (value?.bullets as string[] | undefined)?.filter(Boolean) ?? [];
  const label = String(value?.buttonLabel ?? "Get in touch");
  const actionType = (value?.actionType as string) ?? "contact";
  const url = value?.buttonUrl ? String(value.buttonUrl) : undefined;
  const variant = (value?.variant as string) ?? "primary";
  const defaultExpanded = Boolean(value?.defaultExpanded);
  const isDark = variant === "dark";
  const hasPanel = Boolean(body || bullets.length);

  const handlePrimaryAction = () => {
    if (actionType === "link" && url) return;
    openContact();
  };

  const primaryButtonClass = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold uppercase tracking-wide transition-all",
    "bg-primary text-[#050505] shadow-[0_0_24px_rgba(0,229,255,0.45)]",
    "hover:bg-primary/90 hover:shadow-[0_0_32px_rgba(0,229,255,0.55)] hover:-translate-y-0.5",
  );

  return (
    <div
      className={cn(
        "blog-rich-cta my-10 overflow-hidden rounded-2xl border",
        isDark
          ? "border-primary/25 bg-[#050505]"
          : "border-[#050a30]/20 bg-gradient-to-br from-[#050a30] via-[#050a30] to-[#0a1654]",
      )}
    >
      <div className="relative px-6 py-7 md:px-8 md:py-8">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          {eyebrow && (
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {eyebrow}
            </p>
          )}
          {headline && (
            <p className="mt-2 max-w-2xl text-xl font-bold leading-snug text-white md:text-2xl">
              {headline}
            </p>
          )}

          {(hasPanel || defaultExpanded) && (
            <details
              className="group mt-5"
              open={defaultExpanded || undefined}
            >
              <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
                <MessageCircle className="h-4 w-4" />
                {defaultExpanded ? "How we can help" : "View details"}
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>

              <div className="mt-4 space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
                {body && (
                  <p className="text-sm leading-relaxed text-white/85 md:text-base">
                    {body}
                  </p>
                )}
                {bullets.length > 0 && (
                  <ul className="space-y-2">
                    {bullets.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2 text-sm leading-relaxed text-white/80"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </details>
          )}

          <div className="mt-6">
            {actionType === "link" && url ? (
              <Link href={url} className={primaryButtonClass}>
                {label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={handlePrimaryAction}
                className={primaryButtonClass}
              >
                {label}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
