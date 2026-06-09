"use client";

import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats } from "@/lib/content/site-data";

export function StatsSection() {
  return (
    <SectionShell variant="cinematic" grain={0.15} className="!py-20 md:!py-28">
      <SectionHeading
        title="Built on Experience, Measured in Outcomes"
        description="Figures from Mantravi's delivery track record across engineering, growth, QA, and AI."
        display
      />
      <div className="relative mt-16">
        <StatCounter stats={stats} dark staircase />
      </div>
    </SectionShell>
  );
}
