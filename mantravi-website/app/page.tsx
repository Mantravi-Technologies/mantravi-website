import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MantraviLabsSection } from "@/components/sections/MantraviLabsSection";
import { PortfolioShowcaseSection } from "@/components/sections/PortfolioShowcaseSectionWrapper";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import {
  ClientMarqueeSection,
  PartnersMarqueeSection,
} from "@/components/sections/MarqueeSections";
import { TechGridSection } from "@/components/sections/TechGridSection";
import { ComplianceSection } from "@/components/sections/AwardsComplianceSections";
import { FAQSection, CTASection } from "@/components/sections/HomeCTASections";
import { siteConfig } from "@/lib/content/site-data";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: `${siteConfig.name} | AI-Native Digital Solutions`,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <MantraviLabsSection />
      <PortfolioShowcaseSection />
      <TestimonialsSection />
      <ClientMarqueeSection />
      <TechGridSection />
      <ComplianceSection />
      <CTASection />
      <PartnersMarqueeSection />
      <FAQSection />
    </>
  );
}
