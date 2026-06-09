"use client";

import { Package } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";

export function ServiceDeliverablesGrid({
  deliverables,
}: {
  deliverables: string[];
}) {
  if (deliverables.length === 0) return null;

  return (
    <SectionShell variant="cream" className="service-layout-modular__deliverables !py-14 md:!py-18">
      <SectionHeading
        title="Typical deliverables"
        description="Concrete outputs you receive at each stage of an AI or data engagement."
        light
        align="left"
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {deliverables.map((item) => (
          <li
            key={item.slice(0, 48)}
            className="flex gap-3 rounded-xl border border-[#050505]/10 bg-white p-4 text-sm leading-relaxed text-[#050505]/80"
          >
            <Package
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
