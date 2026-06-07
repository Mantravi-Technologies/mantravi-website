"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionShell";
import { TextReveal } from "@/components/motion/TextReveal";
import { aiSection, mantraviLabs } from "@/lib/content/site-data";
import { serviceLink } from "@/lib/utils/service-link";
import { cn } from "@/lib/utils";

export function MantraviLabsSection() {
  const [active, setActive] = useState(0);
  const lab = mantraviLabs[active];

  return (
    <section
      id="mantravi-ai"
      className="labs-section relative isolate overflow-hidden text-white"
    >
      <div className="labs-section__bg" aria-hidden="true" />
      <div className="labs-section__scrim" aria-hidden="true" />
      <div className="grain-overlay opacity-15" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <SectionHeading
          eyebrow={aiSection.eyebrow}
          title={aiSection.title}
          display
        />

        <div className="mx-auto mt-5 max-w-3xl text-center md:mt-6">
          <TextReveal
            as="p"
            text={aiSection.description}
            className="text-lg leading-relaxed text-slate-300"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2 border-b border-white/10 pb-4 md:mt-9">
          {mantraviLabs.map((item, i) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
                active === i ? "text-white" : "text-slate-400 hover:text-white",
              )}
            >
              {active === i && (
                <motion.span
                  layoutId="labs-tab"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.title}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={lab.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mt-8 grid gap-4 sm:grid-cols-3 md:mt-9"
          >
            {lab.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-primary/25"
              >
                <div className="mb-3 h-1 w-8 rounded-full bg-primary" />
                <h3 className="text-lg font-bold text-white">{item}</h3>
                <p className="mt-2 text-sm text-slate-400">{lab.description}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 text-center md:mt-9">
          <Link
            href={serviceLink("/services/ai-data", lab.anchor)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            Explore AI Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
