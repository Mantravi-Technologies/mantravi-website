"use client";

import { CityCompanionServiceLink } from "@/components/locations/CityCompanionServiceLink";
import { CityScrollHero } from "@/components/locations/CityScrollHero";
import { CityLocalContextSection } from "@/components/locations/CityLocalContextSection";
import { CityRelatedLocations } from "@/components/locations/CityRelatedLocations";
import { ServiceOverviewSection } from "@/components/services/ServiceOverviewSection";
import { ServiceCapabilitiesGrid } from "@/components/services/ServiceCapabilitiesGrid";
import { ServiceProcessSection } from "@/components/services/ServiceProcessSection";
import { ServiceMetricsBand } from "@/components/services/ServiceMetricsBand";
import { ServiceDifferentiators } from "@/components/services/ServiceDifferentiators";
import { ServiceCaseStudies } from "@/components/services/ServiceCaseStudies";
import { ServicePageCta } from "@/components/services/ServicePageCta";
import { ServiceTechSection } from "@/components/services/ServiceTechSection";
import { ServiceSeoContentSection } from "@/components/services/ServiceSeoContentSection";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { FAQAccordion } from "@/components/ui/Accordion";
import type { CaseStudy } from "@/lib/content/case-studies";
import type { CityPage } from "@/lib/content/location-types";
import { getOtherLocationPages } from "@/lib/content/city-pages-data";

const placeholderImage = {
  alt: "Development services",
  hint: "City page overview",
  path: "/images/services/product-engineering/overview.webp",
  aspect: "landscape" as const,
};

const ctaLabel: Record<CityPage["pageType"], string> = {
  "mobile-app-development-company": "mobile app",
  "website-development-company": "website",
  "digital-marketing-company": "digital marketing",
  "ai-development-company": "AI development",
};

export function CityPageLayout({
  page,
  caseStudies,
}: {
  page: CityPage;
  caseStudies: CaseStudy[];
}) {
  const otherPages = getOtherLocationPages(page.pageType, page.slug);
  const faqItems = page.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <div className="city-page-layout">
      <CityScrollHero page={page} />
      <ServiceMetricsBand metrics={page.trustMetrics} />
      <ServiceOverviewSection
        title={`What We Deliver in ${page.cityName}`}
        intro={page.intro}
        introExtended={page.introExtended}
        outcomes={page.outcomes}
        overviewImage={placeholderImage}
        showImage={false}
      />
      <CityLocalContextSection city={page} />
      <ServiceCapabilitiesGrid
        capabilities={page.capabilities}
        title={page.capabilitiesHeading}
        description={page.capabilitiesDescription}
        variant="light"
      />
      <ServiceSeoContentSection content={page.seoContent} />
      <ServiceProcessSection
        steps={page.processSteps}
        title={page.processHeading}
        description={page.processDescription}
        processImage={placeholderImage}
        showImage={false}
      />
      <ServiceDifferentiators
        differentiators={page.differentiators}
        whyUsImage={placeholderImage}
        showImage={false}
      />
      <ServiceCaseStudies studies={caseStudies} />
      <ServicePageCta
        serviceTitle={`${ctaLabel[page.pageType]} in ${page.cityName}`}
      />
      <ServiceTechSection
        title={page.techSection.title}
        description={page.techSection.description}
        techStack={page.techStack}
        variant={page.techSection.variant}
      />
      <CityCompanionServiceLink page={page} />
      <CityRelatedLocations
        pages={otherPages}
        currentCity={page.cityName}
        pageType={page.pageType}
      />
      <SectionShell id="faq" variant="cream" className="!py-16 md:!py-20">
        <SectionHeading
          title={page.faqHeading}
          description={page.faqDescription}
          light
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <FAQAccordion items={faqItems} variant="light" />
        </div>
      </SectionShell>
    </div>
  );
}
