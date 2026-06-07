"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import type { TechStackCategory } from "@/lib/content/services-data";
import { cn } from "@/lib/utils";

export function TechStackTabs({
  techStack,
}: {
  techStack: TechStackCategory[];
}) {
  const [active, setActive] = useState(0);
  const current = techStack[active];

  return (
    <SectionShell variant="surface">
      <SectionHeading
        title="Tech Stack We Use"
        description="Our engineers are proficient across modern languages, frameworks, and cloud platforms."
        light
      />
      <div className="mt-8 flex flex-wrap gap-2">
        {techStack.map((cat, i) => (
          <button
            key={cat.category}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-all",
              active === i
                ? "bg-primary text-white"
                : "bg-white border border-slate-200 text-muted hover:border-primary/30",
            )}
          >
            {cat.category}
          </button>
        ))}
      </div>
      <motion.div
        key={current.category}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 flex flex-wrap gap-3"
      >
        {current.items.map((item) => (
          <span
            key={item}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </SectionShell>
  );
}
