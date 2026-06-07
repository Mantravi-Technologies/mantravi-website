"use client";

import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { clientLogos, partners } from "@/lib/content/site-data";

export function ClientMarqueeSection() {
  return (
    <SectionShell variant="cream" className="!py-16 md:!py-20">
      <SectionHeading
        eyebrow="Trusted By"
        title="Brands That Scale With Mantravi"
        light
        display
      />
      <LogoMarquee logos={clientLogos} pods className="mt-10" />
    </SectionShell>
  );
}

export function PartnersMarqueeSection() {
  return (
    <SectionShell variant="cream" className="!py-12 border-t border-black/5">
      <p className="title-display text-center text-2xl text-[#050505] md:text-3xl">
        Technology Partners
      </p>
      <LogoMarquee logos={partners} pods reverse className="mt-8" />
    </SectionShell>
  );
}
