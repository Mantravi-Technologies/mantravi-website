"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceAiDeliverables({
  deliverables,
  industries,
}: {
  deliverables: string[];
  industries?: string[];
}) {
  if (deliverables.length === 0) return null;

  return (
    <section className="service-layout-ai__deliverables border-t border-[#050505]/8 bg-[#f8f7f4] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted">
              Deliverables
            </p>
            <h2 className="title-display mt-5 text-3xl text-foreground md:text-4xl lg:text-[2.75rem]">
              What you get at each stage
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted">
              Concrete outputs from discovery through governed production rollout,
              scoped to your data and AI maturity.
            </p>
          </motion.div>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="divide-y divide-[#050505]/10 border-y border-[#050505]/10"
          >
            {deliverables.map((item, i) => (
              <motion.li
                key={item.slice(0, 48)}
                variants={fadeUp}
                className="grid gap-3 py-8 md:grid-cols-[3rem_1fr] md:gap-6 md:py-10"
              >
                <span className="font-mono text-sm text-[#050505]/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-relaxed text-[#050505]/80 md:text-lg">
                  {item}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </div>

        {industries && industries.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="mt-16 border-t border-[#050505]/10 pt-12 md:mt-20"
          >
            <div className="grid gap-8 md:grid-cols-[10rem_1fr] md:items-start md:gap-12">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted">
                Industries
              </p>
              <p className="text-sm leading-relaxed text-[#050505]/75 md:text-base">
                {industries.map((industry, i) => (
                  <span key={industry}>
                    {i > 0 && (
                      <span className="mx-2 text-[#050505]/25" aria-hidden>
                        /
                      </span>
                    )}
                    {industry}
                  </span>
                ))}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
