"use client";

import { motion } from "framer-motion";
import { SwapTextButton } from "@/components/ui/SwapTextButton";
import { SectionShell } from "@/components/ui/SectionShell";
import { servicePillars } from "@/lib/content/site-data";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";

export function ServicesSection() {
  return (
    <SectionShell id="services" variant="cream" className="!py-20 md:!py-28">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="title-script text-xl text-[#050505]/70 md:text-2xl">What we do</p>
          <h2 className="title-display mt-3 text-4xl text-[#050505] md:text-5xl lg:text-6xl">
            What We Do Best
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#050505]/65 md:text-lg">
            Four focused practice areas: product engineering, growth marketing, quality assurance,
            and AI. You get the right team for every stage of your digital journey.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="services-modules-list divide-y divide-[#050505]/10 border-y border-[#050505]/10"
        >
          {servicePillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              variants={fadeUp}
              className="services-module-row group py-10 md:py-12"
            >
              <div className="flex flex-wrap items-start gap-4 md:gap-6">
                <span
                  className="title-display text-5xl leading-none text-[#050505]/12 md:text-6xl"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="title-display text-2xl text-[#050505] md:text-3xl">{pillar.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#050505]/65 md:text-base">
                    {pillar.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {pillar.features.map((feature) => (
                      <li
                        key={feature}
                        className="services-feature-pill rounded-full border border-[#050505]/10 bg-white px-3 py-1 text-xs font-medium text-[#050505]/75"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <SwapTextButton href={pillar.href} variant="dark">
                      {pillar.cta}
                    </SwapTextButton>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}
