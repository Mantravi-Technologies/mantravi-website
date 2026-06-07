"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { getCaseStudiesForServices } from "@/lib/content/case-studies";
import { techExpertise } from "@/lib/content/site-data";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

export function ServiceCaseStudies({ serviceTags }: { serviceTags: string[] }) {
  const studies = getCaseStudiesForServices(serviceTags).slice(0, 4);

  if (studies.length === 0) return null;

  return (
    <SectionShell
      id="work"
      variant="none"
      container={false}
      className="service-case-studies service-dark-band !py-16 md:!py-24"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Selected work"
          title="Client Success Stories"
          description="Products we've shipped for teams like yours, with measurable outcomes across conversion, adoption, and operational speed."
          align="left"
          display
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2"
        >
          {studies.map((study) => (
            <motion.article key={study.slug} variants={fadeUp}>
              <Link
                href={`/portfolio/${study.slug}`}
                className="service-case-card group block h-full"
              >
                <div
                  className={cn(
                    "service-case-card__visual bg-gradient-to-br",
                    study.gradient || "from-primary/35 to-primary/10",
                  )}
                >
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.22),transparent_52%)]"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(8,8,8,0.92)_100%)]"
                    aria-hidden="true"
                  />
                  <span className="service-case-card__client">
                    {study.client}
                  </span>
                  <span className="service-case-card__arrow" aria-hidden="true">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="service-case-card__body">
                  <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-primary md:text-xl">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">
                    {study.summary}
                  </p>

                  <div className="service-case-card__metrics">
                    {study.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="text-xl font-bold tracking-tight text-primary md:text-2xl">
                          {m.value}
                        </div>
                        <div className="mt-0.5 text-xs text-slate-500">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <span className="service-case-card__link">
                    View Case Study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}

export function ServiceTechExpertise({ titles }: { titles: string[] }) {
  const items = techExpertise.filter((t) => titles.includes(t.title));

  return (
    <SectionShell variant="light">
      <SectionHeading title="Technologies We Leverage" light />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((tech) => (
          <motion.div
            key={tech.title}
            variants={fadeUp}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <h3 className="font-bold">{tech.title}</h3>
            <p className="mt-2 text-sm text-muted">{tech.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
