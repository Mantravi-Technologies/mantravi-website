"use client";

import { motion } from "framer-motion";
import type { Testimonial } from "@/lib/content/about-data";
import { fadeUp } from "@/lib/animations/variants";

export function AboutQuotes({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section
      id="testimonials"
      className="about-page__quotes scroll-mt-24 bg-[#f8f7f4] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="about-page__kicker text-[#050505]/50"
        >
          Client feedback
        </motion.p>

        <div className="mt-12 space-y-16 md:space-y-20">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              className={`about-page__quote grid gap-8 md:grid-cols-12 md:gap-10 ${
                i % 2 === 1 ? "md:[&>blockquote]:col-start-4" : ""
              }`}
            >
              <span
                className="about-page__quote-mark font-serif text-6xl leading-none text-primary/40 md:col-span-1"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="md:col-span-11">
                <p className="text-xl leading-[1.65] text-[#050505] md:text-2xl md:leading-[1.6]">
                  {t.quote}
                </p>
                <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-2 text-sm">
                  <span className="font-semibold text-[#050505]">{t.name}</span>
                  <span className="text-[#050505]/45">—</span>
                  <span className="text-[#050505]/60">
                    {t.company ? `${t.title}, ${t.company}` : t.title}
                  </span>
                </figcaption>
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
