"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/content/site-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

const hubStats = stats.slice(0, 4);

export function ServicesHubTrustStats() {
  return (
    <section className="services-hub-trust border-t border-[#050505]/8 bg-[#f8f7f4] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#050505]/45">
            Track record
          </p>
          <h2 className="title-display mt-4 text-3xl text-[#050505] md:text-4xl">
            Trusted delivery at scale
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#050505]/65">
            Product builds, SEO programs, QA automation, and production AI — one
            partner with accountable squads and measurable outcomes.
          </p>
        </motion.div>

        <motion.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#050505]/10"
        >
          {hubStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="lg:px-8 lg:first:pl-0 lg:last:pr-0"
            >
              <dt className="text-4xl font-semibold tracking-tight text-[#050505] md:text-5xl">
                {stat.value}
                {stat.suffix}
              </dt>
              <dd className="mt-2 text-sm font-semibold text-[#050505] md:text-base">
                {stat.label}
              </dd>
              {stat.sub && (
                <dd className="mt-2 text-xs leading-relaxed text-[#050505]/55 md:text-sm">
                  {stat.sub}
                </dd>
              )}
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
