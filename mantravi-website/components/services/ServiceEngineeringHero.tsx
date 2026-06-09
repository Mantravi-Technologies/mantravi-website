"use client";

import Link from "next/link";
import { ChevronRight, Code2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContact } from "@/components/providers/ContactProvider";
import { trustBadges } from "@/lib/content/site-data";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const engineeringChips = [
  "React & Next.js",
  "Flutter & mobile",
  "Cloud-native APIs",
  "MVP to enterprise",
];

export function ServiceEngineeringHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { openContact } = useContact();

  return (
    <section className="service-hero service-hero--engineering service-decor-section relative overflow-hidden">
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

        <div className="max-w-3xl">
          <ScrollReveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Code2 className="h-3.5 w-3.5" aria-hidden />
              Product engineering
            </div>
            <h1 className="title-display text-4xl text-white md:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {subtitle}
            </p>
            <Button
              className="mt-8 shadow-lg shadow-primary/30"
              size="lg"
              onClick={openContact}
            >
              Consult Our Experts
            </Button>
          </ScrollReveal>

          <ScrollReveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {engineeringChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300"
                >
                  {chip}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {trustBadges.slice(0, 3).map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-500"
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
