"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  getCompanionLocationPages,
  getLocationPagePath,
} from "@/lib/content/city-pages-data";
import type { CityPage, LocationPageType } from "@/lib/content/location-types";

const serviceLabels: Record<LocationPageType, string> = {
  "mobile-app-development-company": "Mobile app development",
  "website-development-company": "Website development",
  "digital-marketing-company": "Digital marketing",
  "ai-development-company": "AI development",
};

export function CityCompanionServiceLink({ page }: { page: CityPage }) {
  const companions = getCompanionLocationPages(page);
  if (!companions.length) return null;

  return (
    <SectionShell variant="light" className="!py-10 md:!py-12">
      <ScrollReveal>
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Also in {page.cityName}
          </p>
          <p className="mt-1 text-base font-medium text-[#050505] md:text-lg">
            Explore more Mantravi services for {page.cityName}.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {companions.map((companion) => (
              <li key={companion.pageType}>
                <Link
                  href={getLocationPagePath(companion.pageType, companion.slug)}
                  className="group flex items-center justify-between rounded-2xl border border-[#050505]/10 bg-white px-5 py-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#050505]">
                      {serviceLabels[companion.pageType]}
                    </p>
                    <p className="mt-0.5 text-xs text-[#050505]/60 line-clamp-1">
                      {companion.title}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary opacity-70 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
