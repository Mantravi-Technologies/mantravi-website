"use client";

import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import type { TechStackCategory } from "@/lib/content/services-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

type TechVariant = "light" | "dark" | "cream" | "cinematic";

export function ServiceTechSection({
  title,
  description,
  techStack,
  variant = "light",
}: {
  title: string;
  description: string;
  techStack: TechStackCategory[];
  variant?: TechVariant;
}) {
  const isDark = variant === "dark" || variant === "cinematic";

  const content = (
    <>
      <SectionHeading
        title={title}
        description={description}
        light={!isDark}
        display={variant === "cinematic"}
        align="left"
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className={cn(
          "mt-10 divide-y border-y",
          isDark
            ? "divide-white/10 border-white/10"
            : "divide-slate-200 border-slate-200",
        )}
      >
        {techStack.map((cat) => (
          <motion.article
            key={cat.category}
            variants={fadeUp}
            className="grid gap-3 py-8 md:grid-cols-[minmax(0,0.28fr)_minmax(0,1fr)_minmax(0,0.35fr)] md:gap-8 md:py-10"
          >
            <h3 className={cn("font-bold", isDark && "text-white")}>
              {cat.category}
            </h3>
            <p
              className={cn(
                "text-sm leading-relaxed",
                isDark ? "text-slate-400" : "text-muted",
              )}
            >
              {cat.description}
            </p>
            <p
              className={cn(
                "text-xs font-medium tracking-wide md:text-right",
                isDark ? "text-primary" : "text-primary/80",
              )}
            >
              {cat.items.join(" · ")}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </>
  );

  if (isDark) {
    return (
      <SectionShell
        id="tech"
        variant="none"
        container={false}
        className="service-dark-band !py-16 md:!py-20"
      >
        <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {content}
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell id="tech" variant={variant} className="!py-16 md:!py-20">
      {content}
    </SectionShell>
  );
}
