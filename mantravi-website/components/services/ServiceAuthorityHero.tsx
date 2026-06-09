"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContact } from "@/components/providers/ContactProvider";
import { trustBadges } from "@/lib/content/site-data";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ServiceAuthorityHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { openContact } = useContact();

  return (
    <section className="service-layout-authority__hero relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,229,255,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-10 text-center sm:px-6 md:pb-20 md:pt-12 lg:px-8">
        <ScrollReveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center justify-center gap-1 text-sm text-muted"
          >
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 opacity-50" aria-hidden />
            <span className="text-foreground">{title}</span>
          </nav>
        </ScrollReveal>
        <ScrollReveal>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {subtitle}
          </p>
          <Button className="mt-8" size="lg" onClick={openContact}>
            Consult Our Experts
          </Button>
        </ScrollReveal>
        <ScrollReveal>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-slate-200 pt-8">
            {trustBadges.slice(0, 4).map((b) => (
              <span
                key={b}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                {b}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
