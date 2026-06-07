"use client";
import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import type { ServiceCapability } from "@/lib/content/services-data";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
export function ServiceCapabilitiesGrid({
  capabilities,
  title = "What We Offer",
  description = "Focused capabilities aligned to outcomes, not a laundry list of buzzwords.",
  variant = "light",
}: {
  capabilities: ServiceCapability[];
  title?: string;
  description?: string;
  variant?: "light" | "surface";
}) {
  return (
    <SectionShell
      id="capabilities"
      variant={variant}
      className="!py-16 md:!py-20"
    >
      {" "}
      <SectionHeading
        title={title}
        description={description}
        light
        align="left"
      />{" "}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mt-12 divide-y divide-slate-200 border-y border-slate-200"
      >
        {" "}
        {capabilities.map((cap) => (
          <motion.article
            key={cap.id}
            id={cap.id}
            variants={fadeUp}
            className="scroll-mt-28 grid gap-3 py-8 md:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)] md:gap-10 md:py-10"
          >
            {" "}
            <h3 className="font-bold md:text-lg">{cap.title}</h3>{" "}
            <p className="text-sm leading-relaxed text-muted md:text-base">
              {cap.description}
            </p>{" "}
          </motion.article>
        ))}{" "}
      </motion.div>{" "}
    </SectionShell>
  );
}
