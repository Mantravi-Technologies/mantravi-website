"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContact } from "@/components/providers/ContactProvider";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const practiceAreas = [
  "Generative AI & LLM integrations",
  "Retrieval-augmented generation (RAG)",
  "Autonomous agents with guardrails",
  "Data pipelines & warehouse modeling",
  "MLOps & production monitoring",
];

export function ServiceAiHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { openContact } = useContact();

  return (
    <section className="service-layout-ai__hero service-hero service-hero--ai service-decor-section relative overflow-hidden">
      <div className="service-hero__mesh" aria-hidden="true" />
      <div className="service-layout-ai__beam" aria-hidden="true" />
      <div className="grain-overlay opacity-[0.08]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pb-28 md:pt-14 lg:px-8">
        <ScrollReveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-12 flex items-center gap-1 text-sm text-slate-500"
          >
            <Link href="/services" className="transition-colors hover:text-primary">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 opacity-40" aria-hidden />
            <span className="text-slate-400">{title}</span>
          </nav>
        </ScrollReveal>

        <div className="grid gap-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
          <div>
            <ScrollReveal>
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
                AI &amp; Data Engineering
              </p>
              <h1 className="title-display mt-6 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.92] text-white">
                {title}
              </h1>
              <div className="service-layout-ai__rule mt-8" aria-hidden="true" />
              <p className="mt-8 max-w-xl text-lg leading-[1.7] text-slate-300">
                {subtitle}
              </p>
              <Button className="mt-10" size="lg" onClick={openContact}>
                Consult Our Experts
              </Button>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="lg:pb-2">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                What we build
              </p>
              <ul className="mt-6 space-y-0 divide-y divide-white/10">
                {practiceAreas.map((area) => (
                  <li
                    key={area}
                    className="py-4 text-sm leading-relaxed text-slate-300 md:text-base"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
