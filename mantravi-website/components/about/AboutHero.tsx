"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useContact } from "@/components/providers/ContactProvider";
import { aboutHero, aboutStats } from "@/lib/content/about-data";

export function AboutHero() {
  const { openContact } = useContact();

  return (
    <section className="about-page__hero bg-[#f8f7f4]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 md:pb-24 md:pt-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            <ScrollReveal>
              <p className="about-page__kicker">{aboutHero.eyebrow}</p>
              <h1 className="about-page__headline mt-6 text-[#050505]">
                {aboutHero.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-[1.75] text-[#050505]/70">
                {aboutHero.subtitle}
              </p>
              <button
                type="button"
                onClick={openContact}
                className="about-page__text-cta group mt-10 inline-flex items-center gap-2"
              >
                Consult Our Experts
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-4 lg:flex lg:flex-col lg:justify-end">
            <ScrollReveal>
              <dl className="about-page__stat-strip space-y-8 border-t border-[#050505]/12 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                {aboutStats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-3xl font-semibold tracking-tight text-[#050505] md:text-4xl">
                      {stat.value}
                      {stat.suffix}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-[#050505]">
                      {stat.label}
                    </dd>
                    <dd className="mt-1 text-xs leading-relaxed text-[#050505]/55">
                      {stat.sub}
                    </dd>
                  </div>
                ))}
              </dl>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal>
          <div className="about-page__hero-links mt-16 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#050505]/10 pt-8 text-sm">
            <Link href="#story" className="about-page__anchor">
              Our story
            </Link>
            <Link href="#manifest" className="about-page__anchor">
              How we engineer
            </Link>
            <Link href="#services" className="about-page__anchor">
              What we do
            </Link>
            <Link href="#testimonials" className="about-page__anchor">
              Client feedback
            </Link>
            <Link href="#careers" className="about-page__anchor">
              Work with us
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
