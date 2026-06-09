"use client";

import { ServiceHero } from "@/components/services/ServiceHero";
import { ServiceEngineeringHero } from "@/components/services/ServiceEngineeringHero";
import { ServiceAuthorityHero } from "@/components/services/ServiceAuthorityHero";
import { ServiceQaHero } from "@/components/services/ServiceQaHero";
import { ServiceModularHero } from "@/components/services/ServiceModularHero";
import { ServiceAiFuturisticLayout } from "@/components/services/ai/ServiceAiFuturisticLayout";
import { ServiceOverviewSection } from "@/components/services/ServiceOverviewSection";
import { ServiceCapabilitiesGrid } from "@/components/services/ServiceCapabilitiesGrid";
import { ServiceCapabilityCards } from "@/components/services/ServiceCapabilityCards";
import { ServiceQaCapabilities } from "@/components/services/ServiceQaCapabilities";
import { ServiceFeatureModules } from "@/components/services/ServiceFeatureModules";
import { ServiceProcessSection } from "@/components/services/ServiceProcessSection";
import { ServiceProcessTimeline } from "@/components/services/ServiceProcessTimeline";
import { ServiceMetricsBand } from "@/components/services/ServiceMetricsBand";
import { ServiceDifferentiators } from "@/components/services/ServiceDifferentiators";
import { ServiceCaseStudies } from "@/components/services/ServiceCaseStudies";
import { ServiceTechSection } from "@/components/services/ServiceTechSection";
import { ServicePageCta } from "@/components/services/ServicePageCta";
import { ServiceDeliverablesGrid } from "@/components/services/ServiceDeliverablesGrid";
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
    faqVariant: "surface" | "cream";
  }
> = {
  "product-engineering": {
    capabilitiesVariant: "light",
    faqVariant: "surface",
  },
  consulting: {
    capabilitiesVariant: "surface",
    faqVariant: "cream",
  },
  "qa-it": {
    capabilitiesVariant: "light",
    faqVariant: "surface",
  },
  "ai-data": {
    capabilitiesVariant: "surface",
    faqVariant: "cream",
  },
};

function resolveServiceTitle(slug: string) {
  return getServiceBySlug(slug)?.title ?? slug;
}

function SharedTail({
  service,
  faqVariant,
}: {
  service: ServicePage;
  faqVariant: "surface" | "cream";
}) {
  const faqItems = service.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <>
      <ServiceCaseStudies
        serviceSlug={service.slug}
        serviceTags={service.serviceTags}
      />
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
        variant={faqVariant}
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

function EditorialLayout({ service }: { service: ServicePage }) {
  const layout = layoutBySlug[service.slug] ?? layoutBySlug["product-engineering"];
  const show = service.showSections;

  const Hero =
    service.slug === "product-engineering" ? (
      <ServiceEngineeringHero
        title={service.title}
        subtitle={service.heroSubtitle}
      />
    ) : (
      <ServiceHero
        title={service.title}
        subtitle={service.heroSubtitle}
        theme={service.heroTheme}
        heroImage={service.images.hero}
        showImage={show.heroImage}
      />
    );

  return (
    <>
      {Hero}
      <ServiceOverviewSection
        intro={service.intro}
        introExtended={service.introExtended}
        outcomes={service.outcomes}
        overviewImage={service.images.overview}
        showImage={show.overviewImage}
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
      <ServiceProcessSection
        steps={service.processSteps}
        title={service.processHeading}
        description={service.processDescription}
        processImage={service.images.process}
        showImage={show.processImage}
      />
      <ServiceDifferentiators
        differentiators={service.differentiators}
        whyUsImage={service.images.whyUs}
        showImage={show.whyUsImage}
      />
      <SharedTail service={service} faqVariant={layout.faqVariant} />
    </>
  );
}

function AuthorityLayout({ service }: { service: ServicePage }) {
  const layout = layoutBySlug[service.slug] ?? layoutBySlug.consulting;

  return (
    <>
      <ServiceAuthorityHero
        title={service.title}
        subtitle={service.heroSubtitle}
      />
      <ServiceOverviewSection
        intro={service.intro}
        introExtended={service.introExtended}
        outcomes={service.outcomes}
        overviewImage={service.images.overview}
        showImage={false}
      />
      {service.seoContent && (
        <ServiceSeoContentSection content={service.seoContent} />
      )}
      <ServiceCapabilityCards
        capabilities={service.capabilities}
        title={service.capabilitiesHeading}
        description={service.capabilitiesDescription}
      />
      <ServiceProcessSection
        steps={service.processSteps}
        title={service.processHeading}
        description={service.processDescription}
        processImage={service.images.process}
        showImage={service.showSections.processImage}
      />
      <ServiceDifferentiators
        differentiators={service.differentiators}
        whyUsImage={service.images.whyUs}
        showImage={false}
      />
      <SharedTail service={service} faqVariant={layout.faqVariant} />
    </>
  );
}

function QaTechnicalLayout({ service }: { service: ServicePage }) {
  const layout = layoutBySlug[service.slug] ?? layoutBySlug["qa-it"];

  return (
    <>
      <ServiceQaHero title={service.title} subtitle={service.heroSubtitle} />
      <ServiceOverviewSection
        intro={service.intro}
        introExtended={service.introExtended}
        outcomes={service.outcomes}
        overviewImage={service.images.overview}
        showImage={false}
      />
      {service.trustMetrics && (
        <ServiceMetricsBand metrics={service.trustMetrics} />
      )}
      <ServiceQaCapabilities
        capabilities={service.capabilities}
        title={service.capabilitiesHeading}
        description={service.capabilitiesDescription}
      />
      <ServiceProcessTimeline
        steps={service.processSteps}
        title={service.processHeading}
        description={service.processDescription}
        processImage={service.images.process}
        showImage={service.showSections.processImage}
      />
      <ServiceDifferentiators
        differentiators={service.differentiators}
        whyUsImage={service.images.whyUs}
        showImage={false}
      />
      <SharedTail service={service} faqVariant={layout.faqVariant} />
    </>
  );
}

function ModularLayout({ service }: { service: ServicePage }) {
  const layout = layoutBySlug[service.slug] ?? layoutBySlug["ai-data"];

  return (
    <>
      <ServiceModularHero title={service.title} subtitle={service.heroSubtitle} />
      <ServiceOverviewSection
        intro={service.intro}
        introExtended={service.introExtended}
        outcomes={service.outcomes}
        overviewImage={service.images.overview}
        showImage={false}
      />
      <ServiceFeatureModules
        capabilities={service.capabilities}
        title={service.capabilitiesHeading}
        description={service.capabilitiesDescription}
      />
      <ServiceProcessSection
        steps={service.processSteps}
        title={service.processHeading}
        description={service.processDescription}
        processImage={service.images.process}
        showImage={service.showSections.processImage}
      />
      {service.seoContent && (
        <ServiceDeliverablesGrid
          deliverables={service.seoContent.deliverables}
        />
      )}
      <ServiceDifferentiators
        differentiators={service.differentiators}
        whyUsImage={service.images.whyUs}
        showImage={false}
      />
      {service.seoContent && (
        <ServiceSeoContentSection content={service.seoContent} />
      )}
      <SharedTail service={service} faqVariant={layout.faqVariant} />
    </>
  );
}

export function ServicePageLayout({ service }: { service: ServicePage }) {
  useServiceHashScroll();

  switch (service.layoutVariant) {
    case "authority":
      return <AuthorityLayout service={service} />;
    case "qa-technical":
      return <QaTechnicalLayout service={service} />;
    case "ai-futuristic":
      return <ServiceAiFuturisticLayout service={service} />;
    case "modular":
      return <ModularLayout service={service} />;
    case "editorial":
    default:
      return <EditorialLayout service={service} />;
  }
}
