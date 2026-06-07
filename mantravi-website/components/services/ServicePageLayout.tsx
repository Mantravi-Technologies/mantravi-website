"use client";

import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceOverviewSection } from "@/components/services/ServiceOverviewSection";
import { ServiceCapabilitiesGrid } from "@/components/services/ServiceCapabilitiesGrid";
import { ServiceShowcaseSection } from "@/components/services/ServiceShowcaseSection";
import { ServiceProcessSection } from "@/components/services/ServiceProcessSection";
import { ServiceDifferentiators } from "@/components/services/ServiceDifferentiators";
import { ServiceCaseStudies } from "@/components/services/ServiceCaseStudies";
import { ServiceTechSection } from "@/components/services/ServiceTechSection";
import { ServicePageCta } from "@/components/services/ServicePageCta";
import {
  ServiceRelatedServices,
  ServiceSeoContentSection,
} from "@/components/services/ServiceSeoContentSection";
import { useServiceHashScroll } from "@/components/services/useServiceHashScroll";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { FAQAccordion } from "@/components/ui/Accordion";
import {
  getServiceBySlug,
  type ServicePage,
} from "@/lib/content/services-data";

const layoutBySlug: Record<
  string,
  {
    capabilitiesVariant: "light" | "surface";
    processVariant: "cinematic" | "dark";
    faqVariant: "surface" | "cream";
  }
> = {
  "product-engineering": {
    capabilitiesVariant: "light",
    processVariant: "cinematic",
    faqVariant: "surface",
  },
  consulting: {
    capabilitiesVariant: "surface",
    processVariant: "dark",
    faqVariant: "cream",
  },
  "qa-it": {
    capabilitiesVariant: "light",
    processVariant: "cinematic",
    faqVariant: "surface",
  },
  "ai-data": {
    capabilitiesVariant: "surface",
    processVariant: "cinematic",
    faqVariant: "cream",
  },
};

function resolveServiceTitle(slug: string) {
  return getServiceBySlug(slug)?.title ?? slug;
}

export function ServicePageLayout({ service }: { service: ServicePage }) {
  useServiceHashScroll();

  const layout =
    layoutBySlug[service.slug] ?? layoutBySlug["product-engineering"];
  const faqItems = service.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <>
      <ServiceHero
        title={service.title}
        subtitle={service.heroSubtitle}
        theme={service.heroTheme}
        heroImage={service.images.hero}
      />
      <ServiceOverviewSection
        intro={service.intro}
        introExtended={service.introExtended}
        outcomes={service.outcomes}
        overviewImage={service.images.overview}
      />
      {service.seoContent && (
        <ServiceSeoContentSection content={service.seoContent} />
      )}
      <ServiceCapabilitiesGrid
        capabilities={service.capabilities}
        title={service.capabilitiesHeading}
        description={service.capabilitiesDescription}
        variant={layout.capabilitiesVariant}
      />
      <ServiceShowcaseSection slot={service.images.showcase} />
      <ServiceProcessSection
        steps={service.processSteps}
        title={service.processHeading}
        description={service.processDescription}
        variant={layout.processVariant}
        processImage={service.images.process}
      />
      <ServiceDifferentiators
        differentiators={service.differentiators}
        whyUsImage={service.images.whyUs}
      />
      <ServiceCaseStudies serviceTags={service.serviceTags} />
      <ServicePageCta serviceTitle={service.title} />
      <ServiceTechSection
        title={service.techSection.title}
        description={service.techSection.description}
        techStack={service.techStack}
        variant={service.techSection.variant}
      />
      {service.relatedSlugs && service.relatedSlugs.length > 0 && (
        <ServiceRelatedServices
          currentSlug={service.slug}
          relatedSlugs={service.relatedSlugs}
          getTitle={resolveServiceTitle}
        />
      )}
      <SectionShell
        id="faq"
        variant={layout.faqVariant}
        className="!py-16 md:!py-20"
      >
        <SectionHeading
          title={service.faqHeading ?? "Frequently Asked Questions"}
          description={service.faqDescription}
          light
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <FAQAccordion items={faqItems} variant="light" />
        </div>
      </SectionShell>
    </>
  );
}
