"use client";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useContact } from "@/components/providers/ContactProvider";
export function ServicePageCta({ serviceTitle }: { serviceTitle: string }) {
  const { openContact } = useContact();
  const shortName = serviceTitle.split("&")[0]?.trim() ?? serviceTitle;
  return (
    <SectionShell variant="none" className="!py-12 md:!py-16">
      {" "}
      <div className="service-page-cta">
        {" "}
        <div className="service-page-cta__glow" aria-hidden="true" />{" "}
        <div className="service-page-cta__grid">
          {" "}
          <ScrollReveal>
            {" "}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Next step
            </p>{" "}
            <h2 className="title-display mt-3 text-3xl text-white md:text-4xl lg:text-5xl">
              {" "}
              Let&apos;s build your {shortName.toLowerCase()} roadmap{" "}
            </h2>{" "}
          </ScrollReveal>{" "}
          <ScrollReveal>
            {" "}
            <p className="text-base leading-relaxed text-slate-300 md:text-lg">
              {" "}
              Share your goals and constraints, we&apos;ll reply with a
              practical plan, timeline, and what success looks like for your
              team.{" "}
            </p>{" "}
            <button
              type="button"
              onClick={openContact}
              className="service-page-cta__btn group mt-6 inline-flex items-center gap-2"
            >
              {" "}
              Start a conversation{" "}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />{" "}
            </button>{" "}
          </ScrollReveal>{" "}
        </div>{" "}
      </div>{" "}
    </SectionShell>
  );
}
