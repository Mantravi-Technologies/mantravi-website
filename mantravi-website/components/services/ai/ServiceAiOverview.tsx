"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function ServiceAiOverview({
  intro,
  introExtended,
  outcomes,
}: {
  intro: string;
  introExtended: string;
  outcomes: string[];
}) {
  return (
    <section
      id="overview"
      className="service-layout-ai__section scroll-mt-24 border-t border-white/[0.06] bg-[#050508] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
              Production AI
            </p>
            <h2 className="title-display mt-5 text-3xl text-white md:text-4xl">
              What we deliver
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">{intro}</p>
            <p className="mt-4 text-base leading-relaxed text-slate-500">
              {introExtended}
            </p>
          </motion.div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="divide-y divide-white/10 border-y border-white/10"
          >
            {outcomes.map((outcome) => (
              <motion.li
                key={outcome}
                variants={fadeUp}
                className="py-6 text-sm leading-relaxed text-slate-300 md:text-base"
              >
                <span className="mr-3 text-primary" aria-hidden>
                  —
                </span>
                {outcome}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
