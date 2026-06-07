"use client";

import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { StatCounter } from "@/components/ui/StatCounter";
import { stats } from "@/lib/content/site-data";

export function StatsSection() {
  return (
    <SectionShell variant="cinematic" className="!py-20 md:!py-28">
      <div className="grain-overlay opacity-15" aria-hidden="true" />
      <SectionHeading
        title="Built on Experience, Measured in Outcomes"
        description="Numbers that reflect years of delivery across AI, engineering, and enterprise transformation."
        display
      />
      <div className="relative mt-16">
        <StatCounter stats={stats} dark staircase />
      </div>
    </SectionShell>
  );
}
