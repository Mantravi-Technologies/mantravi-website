import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { MantraviLabsSection } from "@/components/sections/MantraviLabsSection";
import { PortfolioShowcaseSection } from "@/components/sections/PortfolioShowcaseSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import {
  ClientMarqueeSection,
  PartnersMarqueeSection,
} from "@/components/sections/MarqueeSections";
import { TechGridSection } from "@/components/sections/TechGridSection";
import { ComplianceSection } from "@/components/sections/AwardsComplianceSections";
import { FAQSection, CTASection } from "@/components/sections/HomeCTASections";

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
