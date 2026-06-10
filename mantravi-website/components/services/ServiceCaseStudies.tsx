"use client";

import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import type { CaseStudy } from "@/lib/content/case-studies";
import { techExpertise } from "@/lib/content/site-data";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
import { ServiceCaseStudyCard } from "@/components/services/ServiceCaseStudyCard";

export function ServiceCaseStudies({
  studies,
}: {
  studies: CaseStudy[];
}) {

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
              <ServiceCaseStudyCard study={study} />
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
