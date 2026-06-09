"use client";

import { motion } from "framer-motion";
import type { ServiceDifferentiator } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

const trustPillars = [
  {
    label: "Explain",
    text: "Citation trails and confidence signals on every output",
  },
  {
    label: "Govern",
    text: "Auth, audit logs, and human-in-the-loop by default",
  },
  {
    label: "Scale",
    text: "Latency, cost, and accuracy tracked after launch",
  },
];

export function ServiceAiWhySection({
  differentiators,
}: {
  differentiators: ServiceDifferentiator[];
}) {
  return (
    <section
      id="why-us"
      className="service-layout-ai__why scroll-mt-24 overflow-hidden bg-[#080b14] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
            Why Mantravi
          </p>
          <h2 className="title-display mt-5 text-3xl text-white md:text-4xl lg:text-5xl">
            Intelligence you can ship
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-400 md:text-lg">
            We embed AI in real workflows with the same rigor as product
            engineering: clear problem framing, measurable outcomes, and
            responsibility for what goes live.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-14 grid gap-8 border-y border-white/10 py-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/10 md:py-12"
        >
          {trustPillars.map((pillar) => (
            <motion.div
              key={pillar.label}
              variants={fadeUp}
              className="px-0 text-center md:px-8"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {pillar.label}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {pillar.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 space-y-20 md:mt-24 md:space-y-28"
        >
          {differentiators.map((d, i) => {
            const isEven = i % 2 === 1;
            return (
              <motion.article
                key={d.num}
                variants={fadeUp}
                className={`service-layout-ai__why-zigzag relative grid gap-6 md:grid-cols-12 md:items-end md:gap-8 ${
                  isEven ? "md:text-right" : ""
                }`}
              >
                <span
                  className={`service-layout-ai__why-watermark pointer-events-none absolute -top-6 font-mono text-[clamp(4rem,12vw,9rem)] leading-none text-white/[0.04] ${
                    isEven ? "right-0 md:right-8" : "left-0 md:left-8"
                  }`}
                  aria-hidden
                >
                  {d.num}
                </span>
                <div
                  className={`relative z-[1] md:col-span-5 ${
                    isEven ? "md:col-start-8" : "md:col-start-1"
                  }`}
                >
                  <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl lg:text-4xl">
                    {d.title}
                  </h3>
                </div>
                <p
                  className={`relative z-[1] text-sm leading-relaxed text-slate-400 md:col-span-6 md:text-base ${
                    isEven
                      ? "md:col-start-1 md:row-start-1 md:self-end"
                      : "md:col-start-7"
                  }`}
                >
                  {d.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
