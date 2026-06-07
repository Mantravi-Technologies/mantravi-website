"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { HoverCard } from "@/components/motion/HoverCard";
import { testimonials, type Testimonial } from "@/lib/content/about-data";
import { fadeUp } from "@/lib/animations/variants";

function testimonialSubtitle(t: Testimonial) {
  return t.company ? `${t.title}, ${t.company}` : t.title;
}

export function TestimonialsSection() {
  return (
    <SectionShell variant="cinematic" className="!py-16 md:!py-20">
      <div className="grain-overlay opacity-15" aria-hidden="true" />
      <SectionHeading title="What Our Partners Say" display />
      <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            className="h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <HoverCard className="h-full">
              <div className="flex h-full min-h-[280px] flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-md">
                <Quote className="h-7 w-7 shrink-0 text-primary/50" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">
                      {testimonialSubtitle(t)}
                    </p>
                  </div>
                </div>
              </div>
            </HoverCard>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
