"use client";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useContact } from "@/components/providers/ContactProvider";
export function ServicesHubCta() {
  const { openContact } = useContact();
  return (
    <section className="services-hub-cta-wrap mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {" "}
      <div className="services-hub-cta">
        {" "}
        <div className="services-hub-cta__glow" aria-hidden="true" />{" "}
        <div className="services-hub-cta__inner">
          {" "}
          <ScrollReveal>
            {" "}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Get a free consultation
            </p>{" "}
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
              {" "}
              Tell us what you&apos;re building, we&apos;ll reply with a
              plan{" "}
            </h2>{" "}
          </ScrollReveal>{" "}
          <ScrollReveal>
            {" "}
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
              {" "}
              Share your goals, timeline, and constraints. Our team responds
              with scope options, tooling recommendations, and realistic
              milestones, no generic pitch decks.{" "}
            </p>{" "}
            <button
              type="button"
              onClick={openContact}
              className="service-page-cta__btn group mt-6 inline-flex items-center gap-2"
            >
              {" "}
              Request a proposal{" "}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />{" "}
            </button>{" "}
          </ScrollReveal>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
