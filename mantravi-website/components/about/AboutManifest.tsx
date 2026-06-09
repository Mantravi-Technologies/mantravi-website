"use client";

import { motion } from "framer-motion";
import { engineeringPractices } from "@/lib/content/about-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

export function AboutManifest() {
  return (
    <section id="manifest" className="about-page__manifest scroll-mt-24 bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="about-page__kicker text-[#050505]/50">Engineering</p>
            <h2 className="about-page__section-title mt-4 text-[#050505]">
              How we build reliable systems
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[#050505]/65">
              Modern stacks, robust architecture, and production practices — not
              slide-deck promises.
            </p>
          </motion.div>

          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="about-page__manifest-list"
          >
            {engineeringPractices.map((item, i) => (
              <motion.li key={item.title} variants={fadeUp} className="about-page__manifest-item">
                <span className="about-page__manifest-index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#050505]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#050505]/65 md:text-base">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
