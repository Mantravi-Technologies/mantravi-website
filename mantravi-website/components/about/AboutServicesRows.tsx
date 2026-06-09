"use client";

import { motion } from "framer-motion";
import { whatWeDo } from "@/lib/content/about-data";
import { fadeUp } from "@/lib/animations/variants";

export function AboutServicesRows() {
  return (
    <section
      id="services"
      className="about-page__services scroll-mt-24 bg-[#eeece6] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mb-14 max-w-xl"
        >
          <p className="about-page__kicker text-[#050505]/50">Capabilities</p>
          <h2 className="about-page__section-title mt-4 text-[#050505]">
            What we do
          </h2>
        </motion.div>

        <div className="divide-y divide-[#050505]/12 border-y border-[#050505]/12">
          {whatWeDo.map((item, i) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className={`about-page__service-row grid gap-6 py-10 md:grid-cols-2 md:gap-16 md:py-14 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <span className="font-mono text-xs text-[#050505]/35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#050505] md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#050505]/70">
                  {item.description}
                </p>
              </div>
              <ul className="space-y-3 self-center">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-4 text-sm text-[#050505]/80 md:text-base"
                  >
                    <span className="mt-2 h-px w-6 shrink-0 bg-[#050505]/25" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
