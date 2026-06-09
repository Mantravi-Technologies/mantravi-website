"use client";

import { motion } from "framer-motion";
import type { ServiceTrustMetric } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceAiMetrics({ metrics }: { metrics: ServiceTrustMetric[] }) {
  if (metrics.length === 0) return null;

  return (
    <section className="border-t border-white/[0.06] bg-[#030308]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mx-auto flex max-w-7xl flex-wrap divide-y divide-white/10 md:divide-x md:divide-y-0"
      >
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={fadeUp}
            className="flex min-w-[50%] flex-1 flex-col justify-center px-6 py-10 md:min-w-0 md:px-10 lg:px-12"
          >
            <div className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              {m.value}
            </div>
            <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              {m.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
