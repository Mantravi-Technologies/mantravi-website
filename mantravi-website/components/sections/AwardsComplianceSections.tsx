"use client";

import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { awards, complianceCategories } from "@/lib/content/site-data";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations/variants";

export function AwardsSection() {
  return (
    <SectionShell variant="cream" className="!py-20">
      <SectionHeading
        eyebrow="Recognition"
        title="Awards & Accolades"
        description="Industry recognition for engineering excellence and client outcomes."
        light
        display
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {awards.map((award) => (
          <motion.div
            key={`${award.year}-${award.title}`}
            variants={scaleIn}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="text-sm font-bold text-primary">{award.year}</span>
            <h3 className="mt-2 font-semibold text-foreground">
              {award.title}
            </h3>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}

export function ComplianceSection() {
  return (
    <SectionShell variant="light" className="!py-16 md:!py-20">
      <SectionHeading
        title="Compliance & Security Frameworks"
        description="We design for regulated environments with privacy, security, and AI governance built in."
        light
        display
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 divide-y divide-slate-200 border-y border-slate-200"
      >
        {complianceCategories.map((cat) => (
          <motion.div
            key={cat.title}
            variants={fadeUp}
            className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-8 sm:py-7"
          >
            <h3 className="font-display text-base font-bold text-foreground sm:col-span-4 lg:col-span-3">
              {cat.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 sm:col-span-8 lg:col-span-9">
              {cat.badges.join(" · ")}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  );
}
