"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { techExpertise } from "@/lib/content/site-data";
import { serviceLink } from "@/lib/utils/service-link";
import { staggerContainer, fadeUp } from "@/lib/animations/variants";
export function TechGridSection() {
  return (
    <SectionShell variant="cinematic" grain={0.15} className="!py-16 md:!py-20">
      <SectionHeading
        title="Technology Expertise That Powers Innovation"
        description="Deep capabilities across AI, cloud, data, and full-stack engineering, engineered for enterprise reliability."
        display
      />{" "}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {" "}
        {techExpertise.map((tech) => (
          <motion.div key={tech.title} variants={fadeUp} className="h-full">
            {" "}
            <Link
              href={serviceLink(tech.href, tech.anchor)}
              className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-primary/40 md:p-7"
            >
              {" "}
              <h3 className="min-h-[3.25rem] text-lg font-bold leading-snug text-white group-hover:text-primary transition-colors">
                {" "}
                {tech.title}{" "}
              </h3>{" "}
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                {tech.description}
              </p>{" "}
              <p className="mt-5 flex min-h-[2.75rem] items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs font-medium tracking-wide text-primary/80">
                {" "}
                <span>{tech.tags?.join(" · ") ?? "\u00A0"}</span>{" "}
                <ArrowRight className="h-4 w-4 shrink-0 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />{" "}
              </p>{" "}
            </Link>{" "}
          </motion.div>
        ))}{" "}
      </motion.div>{" "}
    </SectionShell>
  );
}
