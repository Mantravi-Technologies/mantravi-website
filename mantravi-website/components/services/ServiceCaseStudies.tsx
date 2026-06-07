"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { Badge } from "@/components/ui/Card";
import { HoverCard } from "@/components/motion/HoverCard";
import { getCaseStudiesForServices } from "@/lib/content/case-studies";
import { techExpertise } from "@/lib/content/site-data";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";

export function ServiceCaseStudies({ serviceTags }: { serviceTags: string[] }) {
  const studies = getCaseStudiesForServices(serviceTags).slice(0, 4);

  if (studies.length === 0) return null;

  return (
    <SectionShell id="work" variant="dark" className="!py-16 md:!py-20">
      <SectionHeading title="Client Success Stories" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 grid gap-6 sm:grid-cols-2"
      >
        {studies.map((study) => (
          <motion.div key={study.slug} variants={fadeUp}>
            <HoverCard>
              <Link
                href={`/portfolio/${study.slug}`}
                className="group block glass-card p-6 h-full hover:border-primary/30 transition-colors"
              >
                <Badge dark>{study.client}</Badge>
                <h3 className="mt-4 text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                  {study.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-6">
                  {study.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <div className="text-2xl font-bold text-primary">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-400">{m.label}</div>
                    </div>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View Case Study <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </HoverCard>
          </motion.div>
        ))}
      </motion.div>
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
