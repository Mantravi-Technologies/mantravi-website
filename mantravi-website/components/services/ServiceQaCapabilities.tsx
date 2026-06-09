"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import type { ServiceCapability } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceQaCapabilities({
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
      variant="surface"
      className="service-layout-qa__capabilities !py-16 md:!py-20"
    >
      <SectionHeading title={title} description={description} light align="left" />
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-10 grid gap-4 md:grid-cols-2"
      >
        {capabilities.map((cap) => (
          <motion.li
            key={cap.id}
            id={cap.id}
            variants={fadeUp}
            className="scroll-mt-28 flex gap-4 rounded-xl border border-slate-200 bg-white p-5"
          >
            <CheckCircle2
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
              aria-hidden
            />
            <div>
              <h3 className="font-bold">{cap.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {cap.description}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </SectionShell>
  );
}
