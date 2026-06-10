import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { siteConfig } from "@/lib/content/site-data";
import { buildPageMetadata } from "@/lib/seo/metadata";

const MantraviLabsSection = dynamic(() =>
  import("@/components/sections/MantraviLabsSection").then((mod) => ({
    default: mod.MantraviLabsSection,
  })),
);

const PortfolioShowcaseSection = dynamic(() =>
  import("@/components/sections/PortfolioShowcaseSectionWrapper").then(
    (mod) => ({
      default: mod.PortfolioShowcaseSection,
    }),
  ),
);

const TestimonialsSection = dynamic(() =>
  import("@/components/sections/TestimonialsSection").then((mod) => ({
    default: mod.TestimonialsSection,
  })),
);

const ClientMarqueeSection = dynamic(() =>
  import("@/components/sections/MarqueeSections").then((mod) => ({
    default: mod.ClientMarqueeSection,
  })),
);

const PartnersMarqueeSection = dynamic(() =>
  import("@/components/sections/MarqueeSections").then((mod) => ({
    default: mod.PartnersMarqueeSection,
  })),
);

const TechGridSection = dynamic(() =>
  import("@/components/sections/TechGridSection").then((mod) => ({
    default: mod.TechGridSection,
  })),
);

const ComplianceSection = dynamic(() =>
  import("@/components/sections/AwardsComplianceSections").then((mod) => ({
    default: mod.ComplianceSection,
  })),
);

const CTASection = dynamic(() =>
  import("@/components/sections/HomeCTASections").then((mod) => ({
    default: mod.CTASection,
  })),
);

const FAQSection = dynamic(() =>
  import("@/components/sections/HomeCTASections").then((mod) => ({
    default: mod.FAQSection,
  })),
);

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
