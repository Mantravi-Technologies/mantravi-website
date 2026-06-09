"use client";

import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useContact } from "@/components/providers/ContactProvider";

export function AboutJoinBand() {
  const { openContact } = useContact();

  return (
    <section
      id="careers"
      className="about-page__join scroll-mt-24 border-t border-white/10 bg-[#080b14] py-20 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-end lg:gap-16 lg:px-8">
        <ScrollReveal>
          <p className="about-page__kicker about-page__kicker--dark">Careers</p>
          <h2 className="title-display mt-4 text-3xl text-white md:text-4xl">
            Work with us
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-slate-400">
            We hire engineers, designers, and marketers who care about craft. Share
            your portfolio, or tell us about a product you want to ship together.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <button
            type="button"
            onClick={openContact}
            className="about-page__join-cta group inline-flex items-center gap-2 text-lg font-semibold text-primary"
          >
            Get in touch
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
}
