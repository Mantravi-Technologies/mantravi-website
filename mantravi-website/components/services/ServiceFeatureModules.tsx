"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import type { ServiceCapability } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceFeatureModules({
  capabilities,
  title = "AI & data modules",
  description,
}: {
  capabilities: ServiceCapability[];
  title?: string;
  description?: string;
}) {
  return (
    <SectionShell
      id="capabilities"
      variant="light"
      className="service-layout-modular__modules !py-16 md:!py-20"
    >
      <SectionHeading title={title} description={description} light align="left" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-12 grid gap-4 sm:grid-cols-2"
      >
        {capabilities.map((cap) => (
          <motion.article
            key={cap.id}
            id={cap.id}
            variants={fadeUp}
            className="group scroll-mt-28 rounded-xl border border-slate-200 bg-slate-50/80 p-6 transition-colors hover:border-primary/30 hover:bg-white"
          >
            <h3 className="font-bold text-lg">{cap.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {cap.description}
            </p>
            <a
              href={`#${cap.id}`}
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100"
            >
              Learn more <ArrowRight className="h-3 w-3" />
            </a>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
