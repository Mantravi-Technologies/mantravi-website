"use client";

import { SectionShell } from "@/components/ui/SectionShell";
import { ServiceImageSlot } from "@/components/services/ServiceImageSlot";
import type { ServiceImageSlot as ServiceImageSlotConfig } from "@/lib/content/services-data";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export function ServiceShowcaseSection({
  slot,
}: {
  slot: ServiceImageSlotConfig;
}) {
  return (
    <SectionShell variant="none" className="!py-8 md:!py-12">
      <ScrollReveal>
        <ServiceImageSlot
          slot={{ ...slot, aspect: slot.aspect ?? "wide" }}
          className="w-full"
        />
      </ScrollReveal>
    </SectionShell>
  );
}
