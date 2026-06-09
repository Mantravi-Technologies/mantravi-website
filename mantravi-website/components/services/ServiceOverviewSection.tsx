"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { ServiceImageSlot } from "@/components/services/ServiceImageSlot";
import type { ServiceImageSlot as ServiceImageSlotConfig } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceOverviewSection({
  intro,
  introExtended,
  outcomes,
  overviewImage,
  showImage = true,
}: {
  intro: string;
  introExtended: string;
  outcomes: string[];
  overviewImage: ServiceImageSlotConfig;
  showImage?: boolean;
}) {
  return (
    <SectionShell id="overview" variant="cream" className="!py-16 md:!py-20">
      <div
        className={
          showImage
            ? "grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16"
            : "grid gap-12 lg:grid-cols-1"
        }
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <SectionHeading
            title="What We Deliver"
            description={intro}
            display
            align="left"
            light
          />
          <p className="mt-5 text-base leading-relaxed text-[#050505]/70 md:text-lg">
            {introExtended}
          </p>
          {showImage && (
            <div className="mt-8 hidden md:block">
              <ServiceImageSlot
                slot={overviewImage}
                className="w-full max-w-lg"
              />
            </div>
          )}
        </motion.div>

        <div className="flex flex-col gap-8">
          {showImage && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className="md:hidden"
            >
              <ServiceImageSlot slot={overviewImage} className="w-full" />
            </motion.div>
          )}

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col justify-center gap-4"
          >
            {outcomes.map((outcome) => (
              <motion.li
                key={outcome}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-2xl border border-[#050505]/10 bg-white p-5"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-[#050505]/80 md:text-base">
                  {outcome}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </SectionShell>
  );
}
