"use client";

import { motion } from "framer-motion";
import type { ServiceSeoContent } from "@/lib/content/service-seo-extensions";
import { fadeUp } from "@/lib/animations/variants";

export function ServiceAiAudience({ content }: { content: ServiceSeoContent }) {
  return (
    <section className="service-layout-ai__section border-t border-white/[0.06] bg-[#050508] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <h2 className="title-display text-2xl text-white md:text-3xl">
              Who this service is for
            </h2>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {content.whoItsFor.map((item) => (
                <li
                  key={item.slice(0, 48)}
                  className="py-5 text-sm leading-relaxed text-slate-300 md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
          >
            <h2 className="title-display text-2xl text-white md:text-3xl">
              When to engage Mantravi
            </h2>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {content.whenToEngage.map((item) => (
                <li
                  key={item.slice(0, 48)}
                  className="py-5 text-sm leading-relaxed text-slate-300 md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
