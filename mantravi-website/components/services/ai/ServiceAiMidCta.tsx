"use client";

import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useContact } from "@/components/providers/ContactProvider";

export function ServiceAiMidCta({ serviceTitle }: { serviceTitle: string }) {
  const { openContact } = useContact();

  return (
    <section
      id="get-started"
      className="service-layout-ai__mid-cta scroll-mt-24 bg-primary"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#050505]/60">
              Ready to move beyond demos?
            </p>
            <h2 className="title-display mt-3 text-3xl text-[#050505] md:text-4xl lg:text-5xl">
              Let&apos;s scope your {serviceTitle.toLowerCase()} roadmap
            </h2>
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-base leading-relaxed text-[#050505]/80 md:text-lg">
              Share your use case, data landscape, and timeline. We respond with
              a practical plan for RAG, agents, pipelines, or MLOps — whatever
              fits your stage.
            </p>
            <button
              type="button"
              onClick={openContact}
              className="service-layout-ai__mid-cta-btn group mt-6 inline-flex items-center gap-2"
            >
              Consult Our Experts
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
