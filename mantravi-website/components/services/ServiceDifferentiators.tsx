"use client";

import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { ServiceImageSlot } from "@/components/services/ServiceImageSlot";
import type {
  ServiceDifferentiator,
  ServiceImageSlot as ServiceImageSlotConfig,
} from "@/lib/content/services-data";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";

export function ServiceDifferentiators({
  differentiators,
  whyUsImage,
}: {
  differentiators: ServiceDifferentiator[];
  whyUsImage: ServiceImageSlotConfig;
}) {
  return (
    <SectionShell id="why-us" variant="surface" className="!py-16 md:!py-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="lg:order-2"
        >
          <SectionHeading
            title="Why Mantravi"
            description="What sets our delivery apart from typical vendors."
            light
            align="left"
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-10 divide-y divide-slate-200 border-y border-slate-200"
          >
            {differentiators.map((d) => (
              <motion.div
                key={d.num}
                variants={fadeUp}
                className="grid gap-4 py-8 md:grid-cols-[4.5rem_1fr] md:gap-8 md:py-10"
              >
                <span className="title-display text-5xl leading-none text-primary/35 md:text-6xl">
                  {d.num}
                </span>
                <div>
                  <h3 className="text-xl font-bold md:text-2xl">{d.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {d.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="lg:order-1 lg:sticky lg:top-28 lg:self-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <ServiceImageSlot
              slot={{ ...whyUsImage, aspect: whyUsImage.aspect ?? "portrait" }}
              className="mx-auto w-full max-w-md lg:max-w-none"
            />
          </motion.div>
        </div>
      </div>
    </SectionShell>
  );
}
