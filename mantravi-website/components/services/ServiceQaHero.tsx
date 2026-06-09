"use client";

import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContact } from "@/components/providers/ContactProvider";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const qaChips = [
  "Playwright & Cypress",
  "CI/CD quality gates",
  "k6 load testing",
  "Production monitoring",
];

export function ServiceQaHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const { openContact } = useContact();

  return (
    <section className="service-layout-qa__hero service-dark-band relative">
      <div className="relative z-[1] mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-12 lg:px-8">
        <ScrollReveal>
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-1 text-sm text-slate-400"
          >
            <Link href="/services" className="hover:text-primary">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 opacity-50" aria-hidden />
            <span className="text-slate-300">{title}</span>
          </nav>
        </ScrollReveal>
        <div className="max-w-3xl">
          <ScrollReveal>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
              Independent QA & IT
            </div>
            <h1 className="title-display text-4xl text-white md:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {subtitle}
            </p>
            <Button
              className="mt-8 shadow-lg shadow-primary/20"
              size="lg"
              onClick={openContact}
            >
              Consult Our Experts
            </Button>
          </ScrollReveal>
          <ScrollReveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {qaChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
