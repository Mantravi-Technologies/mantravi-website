"use client";
import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { ServiceImageSlot } from "@/components/services/ServiceImageSlot";
import type {
  ServiceImageSlot as ServiceImageSlotConfig,
  ServiceProcessStep,
} from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
export function ServiceProcessSection({
  steps,
  title = "How We Work",
  description = "A clear path from discovery to launch, so you always know what's next.",
  variant = "cinematic",
  processImage,
}: {
  steps: ServiceProcessStep[];
  title?: string;
  description?: string;
  variant?: "cinematic" | "dark";
  processImage: ServiceImageSlotConfig;
}) {
  return (
    <SectionShell id="process" variant={variant} className="!py-16 md:!py-20">
      {" "}
      <div className="grain-overlay opacity-15" aria-hidden="true" />{" "}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
        {" "}
        <div>
          {" "}
          <SectionHeading
            title={title}
            description={description}
            display
            align="left"
          />{" "}
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative mt-10 space-y-0 divide-y divide-white/10 border-y border-white/10"
          >
            {" "}
            {steps.map((step) => (
              <motion.li
                key={step.num}
                variants={fadeUp}
                className="grid gap-4 py-8 md:grid-cols-[5rem_1fr] md:gap-8 md:py-10"
              >
                {" "}
                <span className="title-display text-5xl leading-none text-primary/40 md:text-6xl">
                  {step.num}
                </span>{" "}
                <div>
                  {" "}
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    {step.title}
                  </h3>{" "}
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
                    {" "}
                    {step.description}{" "}
                  </p>{" "}
                </div>{" "}
              </motion.li>
            ))}{" "}
          </motion.ol>{" "}
        </div>{" "}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="lg:sticky lg:top-28"
        >
          {" "}
          <ServiceImageSlot
            slot={processImage}
            variant="dark"
            className="w-full"
          />{" "}
        </motion.div>{" "}
      </div>{" "}
    </SectionShell>
  );
}
