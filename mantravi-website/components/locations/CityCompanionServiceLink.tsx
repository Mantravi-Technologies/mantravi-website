"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  getCompanionLocationPage,
  getLocationPagePath,
} from "@/lib/content/city-pages-data";
import type { CityPage } from "@/lib/content/location-types";

const companionCopy: Record<
  CityPage["pageType"],
  { label: string; cta: string }
> = {
  "mobile-app-development-company": {
    label: "Website development",
    cta: "Need a website in",
  },
  "website-development-company": {
    label: "Mobile app development",
    cta: "Need a mobile app in",
  },
};

export function CityCompanionServiceLink({ page }: { page: CityPage }) {
  const companion = getCompanionLocationPage(page);
  if (!companion) return null;

  const copy = companionCopy[page.pageType];

  return (
    <SectionShell variant="light" className="!py-10 md:!py-12">
      <ScrollReveal>
        <div className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-4 rounded-2xl border border-[#050505]/10 bg-white px-6 py-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Also in {page.cityName}
            </p>
            <p className="mt-1 text-base font-medium text-[#050505] md:text-lg">
              {copy.cta} {page.cityName}? Explore our {copy.label.toLowerCase()}{" "}
              services.
            </p>
          </div>
          <Link
            href={getLocationPagePath(companion.pageType, companion.slug)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            {companion.title}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
