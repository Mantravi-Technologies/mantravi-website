"use client";

import { Building2, MapPinned } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { CityPage } from "@/lib/content/city-pages-data";

export function CityLocalContextSection({ city }: { city: CityPage }) {
  return (
    <SectionShell variant="cinematic" className="!py-16 md:!py-20">
      <ScrollReveal>
        <SectionHeading
          title={`Why ${city.cityName} Businesses Choose Mantravi`}
          description={city.localMarketInsight}
          display
        />
      </ScrollReveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <ScrollReveal>
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Building2 className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-white md:text-2xl">
                Industries We Serve in {city.cityName}
              </h2>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {city.industries.map((industry) => (
                <li
                  key={industry}
                  className="flex items-center gap-2 text-sm text-slate-300 md:text-base"
                >
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden
                  />
                  {industry}
                </li>
              ))}
            </ul>
          </article>
        </ScrollReveal>

        <ScrollReveal>
          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                <MapPinned className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-white md:text-2xl">
                Areas We Serve Near {city.cityName}
              </h2>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
              We work with clients across {city.cityName} and surrounding
              regions in {city.stateName} — in person where possible and
              remotely across India.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {city.areasServed.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300"
                >
                  {area}
                </li>
              ))}
            </ul>
            {city.alternateNames && city.alternateNames.length > 0 && (
              <p className="mt-6 text-xs text-slate-500">
                Also known as: {city.alternateNames.join(", ")}
              </p>
            )}
          </article>
        </ScrollReveal>
      </div>
    </SectionShell>
  );
}
