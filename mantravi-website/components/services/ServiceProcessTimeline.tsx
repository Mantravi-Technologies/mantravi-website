"use client";

import { motion } from "framer-motion";
import { SectionShell } from "@/components/ui/SectionShell";
import { ServiceImageSlot } from "@/components/services/ServiceImageSlot";
import type {
  ServiceImageSlot as ServiceImageSlotConfig,
  ServiceProcessStep,
} from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceProcessTimeline({
  steps,
  title = "How We Work",
  description,
  processImage,
  showImage = false,
}: {
  steps: ServiceProcessStep[];
  title?: string;
  description?: string;
  processImage: ServiceImageSlotConfig;
  showImage?: boolean;
}) {
  const hasImage = showImage && Boolean(processImage.src);
  return (
    <SectionShell
      id="process"
      variant="none"
      container={false}
      className="service-layout-qa__process service-dark-band !py-16 md:!py-20"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="title-display text-3xl text-white md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-4 text-slate-400">{description}</p>
          )}
        </div>
        <div
          className={
            hasImage
              ? "mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14"
              : "mt-12 max-w-3xl"
          }
        >
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative space-y-0"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.num}
                variants={fadeUp}
                className="relative grid gap-4 border-l border-primary/30 py-8 pl-8 md:pl-10"
              >
                {i < steps.length - 1 && (
                  <span
                    className="absolute left-0 top-10 h-[calc(100%-2rem)] w-px bg-primary/20"
                    aria-hidden
                  />
                )}
                <span className="absolute left-0 top-8 flex h-3 w-3 -translate-x-1/2 rounded-full bg-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step {step.num}
                </span>
                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </motion.ol>
          {hasImage && (
            <div className="lg:sticky lg:top-28 lg:self-start">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                <ServiceImageSlot
                  slot={processImage}
                  variant="dark"
                  className="w-full shadow-xl shadow-black/30"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
