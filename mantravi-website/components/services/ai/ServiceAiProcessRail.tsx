"use client";

import { motion } from "framer-motion";
import type { ServiceProcessStep } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceAiProcessRail({
  steps,
  title,
  description,
}: {
  steps: ServiceProcessStep[];
  title?: string;
  description?: string;
}) {
  return (
    <section
      id="process"
      className="service-layout-ai__section service-dark-band relative scroll-mt-24 border-t border-white/[0.06] py-20 md:py-28"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
            Delivery model
          </p>
          <h2 className="title-display mt-5 text-3xl text-white md:text-4xl">
            {title ?? "How we work"}
          </h2>
          {description && (
            <p className="mt-5 leading-relaxed text-slate-400">{description}</p>
          )}
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 divide-y divide-white/10 border-y border-white/10"
        >
          {steps.map((step) => (
            <motion.li
              key={step.num}
              variants={fadeUp}
              className="grid gap-4 py-8 md:grid-cols-[5rem_11rem_1fr] md:gap-10 md:py-10"
            >
              <span className="title-display text-4xl leading-none text-primary/35 md:text-5xl">
                {step.num}
              </span>
              <h3 className="text-lg font-semibold text-white md:text-xl">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
