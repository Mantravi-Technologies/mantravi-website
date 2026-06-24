"use client";

import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContact } from "@/components/providers/ContactProvider";
import { trustBadges } from "@/lib/content/site-data";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { CityPage } from "@/lib/content/location-types";

export function CityHero({ page }: { page: CityPage }) {
  const { openContact } = useContact();

  return (
    <section className="service-hero service-decor-section service-hero--engineering relative overflow-hidden">
      <div className="service-hero__mesh" aria-hidden="true" />
      <div className="grain-overlay opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-12 lg:px-8">
        <ScrollReveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex flex-wrap items-center gap-1 text-sm text-slate-400 md:mb-12"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
            <span className="text-slate-300">{page.cityName}</span>
          </nav>
        </ScrollReveal>

        <div className="max-w-4xl">
          <ScrollReveal>
            {page.hasLocalOffice && (
              <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Local studio in {page.cityName}
              </p>
            )}
            <h1 className="title-display text-4xl text-white md:text-5xl lg:text-6xl xl:text-7xl">
              {page.title}
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
              {page.heroSubtitle}
            </p>
            <Button
              className="mt-8 shadow-lg shadow-primary/30"
              size="lg"
              onClick={openContact}
            >
              Consult Our {page.cityName} Experts
            </Button>
            <div className="mt-8 flex flex-wrap gap-2">
              {trustBadges.slice(0, 3).map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-400"
                >
                  {b}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
