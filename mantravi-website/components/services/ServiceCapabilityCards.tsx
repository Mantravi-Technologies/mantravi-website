"use client";

import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import type { ServiceCapability } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceCapabilityCards({
  capabilities,
  title = "What We Offer",
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
      className="service-layout-authority__capabilities !py-16 md:!py-20"
    >
      <SectionHeading title={title} description={description} light align="center" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-12 grid gap-5 sm:grid-cols-2"
      >
        {capabilities.map((cap) => (
          <motion.article
            key={cap.id}
            id={cap.id}
            variants={fadeUp}
            className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="text-lg font-bold">{cap.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
              {cap.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  );
}
