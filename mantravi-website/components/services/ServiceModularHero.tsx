"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContact } from "@/components/providers/ContactProvider";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const practicePills = [
  "Generative AI",
  "RAG systems",
  "Data pipelines",
  "MLOps",
];

export function ServiceModularHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { openContact } = useContact();

  return (
    <section className="service-layout-modular__hero relative overflow-hidden bg-[#f8f7f4]">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_100%_50%,rgba(0,229,255,0.12),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-12 lg:px-8">
        <ScrollReveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-1 text-sm text-muted"
          >
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 opacity-50" aria-hidden />
            <span className="text-foreground">{title}</span>
          </nav>
        </ScrollReveal>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ScrollReveal>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{subtitle}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {practicePills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                >
                  {pill}
                </span>
              ))}
            </div>
            <Button className="mt-8" size="lg" onClick={openContact}>
              Consult Our Experts
            </Button>
          </ScrollReveal>
          <ScrollReveal>
            <div className="service-layout-modular__hero-panel rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Production AI delivery
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                From discovery and data readiness through grounded GenAI, agent
                workflows, and MLOps, with guardrails built in from day one.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-primary">•</span> RAG & vector search
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> LLM agents & automation
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span> Snowflake & dbt pipelines
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
