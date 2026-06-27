"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  getLocationPagePath,
  type CityPage,
} from "@/lib/content/city-pages-data";

const sectionCopy: Record<
  CityPage["pageType"],
  { title: string; description: (city: string) => string }
> = {
  "mobile-app-development-company": {
    title: "Mobile App Development in Other Cities",
    description: (city) =>
      `Explore Mantravi mobile app development services beyond ${city}.`,
  },
  "website-development-company": {
    title: "Website Development in Other Cities",
    description: (city) =>
      `Explore Mantravi website development services beyond ${city}.`,
  },
  "digital-marketing-company": {
    title: "Digital Marketing in Other Cities",
    description: (city) =>
      `Explore Mantravi digital marketing and SEO services beyond ${city}.`,
  },
  "ai-development-company": {
    title: "AI Development in Other Cities",
    description: (city) =>
      `Explore Mantravi AI and machine learning services beyond ${city}.`,
  },
};

export function CityRelatedLocations({
  pages,
  currentCity,
  pageType,
}: {
  pages: CityPage[];
  currentCity: string;
  pageType: CityPage["pageType"];
}) {
  if (!pages.length) return null;

  const copy = sectionCopy[pageType];

  return (
    <SectionShell variant="surface" className="!py-16 md:!py-20">
      <ScrollReveal>
        <SectionHeading
          title={copy.title}
          description={copy.description(currentCity)}
          light
        />
      </ScrollReveal>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <li key={page.slug}>
            <Link
              href={getLocationPagePath(page.pageType, page.slug)}
              className="group flex items-center justify-between rounded-2xl border border-[#050505]/10 bg-white p-5 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
            >
              <div>
                <p className="font-semibold text-[#050505]">{page.cityName}</p>
                <p className="mt-1 text-sm text-[#050505]/60">
                  {page.stateName}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
