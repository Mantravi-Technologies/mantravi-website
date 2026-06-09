"use client";

import { motion } from "framer-motion";
import { aboutStory, partnershipHighlights } from "@/lib/content/about-data";
import { fadeUp } from "@/lib/animations/variants";

export function AboutStorySection() {
  const pullQuote = aboutStory.paragraphs[0];

  return (
    <section id="story" className="about-page__story scroll-mt-24 bg-[#080b14] text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="grid gap-12 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-5">
            <p className="about-page__kicker about-page__kicker--dark">
              {aboutStory.title}
            </p>
            <blockquote className="about-page__pull-quote mt-8">
              &ldquo;{pullQuote}&rdquo;
            </blockquote>
          </div>

          <div className="lg:col-span-7 lg:pt-12">
            <p className="text-base leading-[1.85] text-slate-300 md:text-lg">
              {aboutStory.paragraphs[1]}
            </p>
          </div>
        </motion.div>

        <div className="mt-20 grid gap-0 md:grid-cols-3 md:divide-x md:divide-white/10">
          {partnershipHighlights.map((item) => (
            <div key={item.title} className="about-page__partnership-cell py-8 md:px-8 md:first:pl-0 md:last:pr-0">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
