"use client";

import { motion } from "framer-motion";
import type { ServiceTrustMetric } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceMetricsBand({ metrics }: { metrics: ServiceTrustMetric[] }) {
  if (metrics.length === 0) return null;

  return (
    <section className="service-layout-qa__metrics border-y border-slate-200 bg-slate-50">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8"
      >
        {metrics.map((m) => (
          <motion.div key={m.label} variants={fadeUp} className="text-center">
            <div className="text-3xl font-bold text-primary md:text-4xl">
              {m.value}
            </div>
            <div className="mt-1 text-xs font-medium text-muted md:text-sm">
              {m.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
