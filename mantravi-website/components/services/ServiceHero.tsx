"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContact } from "@/components/providers/ContactProvider";
import { trustBadges } from "@/lib/content/site-data";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ServiceImageSlot } from "@/components/services/ServiceImageSlot";
import type { ServiceImageSlot as ServiceImageSlotConfig } from "@/lib/content/services-data";
import { cn } from "@/lib/utils";

type HeroTheme = "engineering" | "marketing" | "qa" | "ai";

export function ServiceHero({
  title,
  subtitle,
  theme = "engineering",
  heroImage,
}: {
  title: string;
  subtitle: string;
  theme?: HeroTheme;
  heroImage: ServiceImageSlotConfig;
}) {
  const { openContact } = useContact();

  return (
    <section
      className={cn(
        "service-hero relative overflow-hidden",
        `service-hero--${theme}`,
      )}
    >
      <div className="service-hero__mesh" aria-hidden="true" />
      <div className="grain-overlay opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-12 lg:px-8">
        <ScrollReveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-1 text-sm text-slate-400 md:mb-12"
          >
            <Link
              href="/services"
              className="transition-colors hover:text-primary"
            >
              Services
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
            <span className="text-slate-300">{title}</span>
          </nav>
        </ScrollReveal>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div>
            <ScrollReveal>
              <h1 className="title-display text-4xl text-white md:text-5xl lg:text-6xl xl:text-7xl">
                {title}
              </h1>
            </ScrollReveal>
            <ScrollReveal>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                {subtitle}
              </p>
              <Button
                className="mt-8 shadow-lg shadow-primary/30"
                size="lg"
                onClick={openContact}
              >
                Consult Our Experts
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

          <ScrollReveal className="lg:justify-self-end lg:w-full lg:max-w-xl">
            <ServiceImageSlot
              slot={heroImage}
              priority
              variant="dark"
              className="w-full shadow-2xl shadow-black/40"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
