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
  showImage = false,
}: {
  steps: ServiceProcessStep[];
  title?: string;
  description?: string;
  /** Kept for per-service layout config; dark sections share `.service-dark-band`. */
  variant?: "cinematic" | "dark";
  processImage: ServiceImageSlotConfig;
  showImage?: boolean;
}) {
  const hasImage = showImage && Boolean(processImage.src);

  return (
    <SectionShell
      id="process"
      variant="none"
      container={false}
      className="service-dark-band !py-16 md:!py-20"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={
            hasImage
              ? "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14"
              : "max-w-3xl"
          }
        >
          <div>
            <SectionHeading
              title={title}
              description={description}
              display
              align="left"
            />
            <motion.ol
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative mt-10 space-y-0 divide-y divide-white/10 border-y border-white/10"
            >
              {steps.map((step) => (
                <motion.li
                  key={step.num}
                  variants={fadeUp}
                  className="grid gap-4 py-8 md:grid-cols-[5rem_1fr] md:gap-8 md:py-10"
                >
                  <span className="title-display text-5xl leading-none text-primary/40 md:text-6xl">
                    {step.num}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
                      {step.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
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
                  className="w-full"
                />
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
