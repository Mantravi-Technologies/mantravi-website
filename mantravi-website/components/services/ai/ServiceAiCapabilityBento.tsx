"use client";

import { motion } from "framer-motion";
import type { ServiceCapability } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceAiCapabilityBento({
  capabilities,
  title,
  description,
}: {
  capabilities: ServiceCapability[];
  title?: string;
  description?: string;
}) {
  const midpoint = Math.ceil(capabilities.length / 2);
  const columns = [
    capabilities.slice(0, midpoint),
    capabilities.slice(midpoint),
  ];

  return (
    <section
      id="capabilities"
      className="service-layout-ai__section scroll-mt-24 border-t border-white/[0.06] bg-[#050508] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
              Capabilities
            </p>
            <h2 className="title-display mt-5 text-3xl text-white md:text-4xl lg:text-[2.75rem]">
              {title ?? "AI & data engineering capabilities"}
            </h2>
            {description && (
              <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                {description}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-12 sm:grid-cols-2 sm:gap-x-10 lg:gap-x-14"
          >
            {columns.map((col, colIndex) => (
              <ol key={colIndex} className="space-y-0">
                {col.map((cap, i) => {
                  const index = colIndex * midpoint + i + 1;
                  return (
                    <motion.li
                      key={cap.id}
                      id={cap.id}
                      variants={fadeUp}
                      className="scroll-mt-28 border-b border-white/10 py-8 first:pt-0 last:border-b-0"
                    >
                      <span className="font-mono text-xs text-slate-600">
                        {String(index).padStart(2, "0")}
                      </span>
                      <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">
                        {cap.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {cap.description}
                      </p>
                    </motion.li>
                  );
                })}
              </ol>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
