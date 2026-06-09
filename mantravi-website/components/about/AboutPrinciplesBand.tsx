"use client";

import { motion } from "framer-motion";
import { engineeringPrinciples } from "@/lib/content/about-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function AboutPrinciplesBand() {
  return (
    <section className="about-page__principles bg-primary py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-xs font-semibold uppercase tracking-[0.24em] text-[#050505]/55"
        >
          Our principles
        </motion.p>
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 grid gap-10 md:grid-cols-3 md:gap-12"
        >
          {engineeringPrinciples.map((item) => (
            <motion.li key={item.title} variants={fadeUp}>
              <h3 className="text-lg font-bold text-[#050505] md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#050505]/75 md:text-base">
                {item.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
