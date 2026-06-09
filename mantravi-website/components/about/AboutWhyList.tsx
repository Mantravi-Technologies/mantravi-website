"use client";

import { motion } from "framer-motion";
import { whyChooseMantravi } from "@/lib/content/about-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function AboutWhyList() {
  return (
    <section className="about-page__why bg-[#050505] py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="max-w-lg"
        >
          <p className="about-page__kicker about-page__kicker--dark">Why Mantravi</p>
          <h2 className="title-display mt-4 text-3xl md:text-4xl">
            An engineering team of record
          </h2>
        </motion.div>

        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 space-y-0"
        >
          {whyChooseMantravi.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="about-page__why-row grid gap-4 border-t border-white/10 py-8 md:grid-cols-[6rem_14rem_1fr] md:items-baseline md:gap-8 md:py-10"
            >
              <dt className="font-mono text-sm text-white/30">
                {String(i + 1).padStart(2, "0")}
              </dt>
              <dt className="text-lg font-semibold text-white">{item.title}</dt>
              <dd className="text-sm leading-relaxed text-slate-400 md:text-base">
                {item.description}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
