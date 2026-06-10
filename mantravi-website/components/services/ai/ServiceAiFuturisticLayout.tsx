"use client";

import { ServiceAiHero } from "@/components/services/ai/ServiceAiHero";
import { ServiceAiMetrics } from "@/components/services/ai/ServiceAiMetrics";
import { ServiceAiOverview } from "@/components/services/ai/ServiceAiOverview";
import { ServiceAiPipeline } from "@/components/services/ai/ServiceAiPipeline";
import { ServiceAiCapabilityBento } from "@/components/services/ai/ServiceAiCapabilityBento";
import { ServiceAiProcessRail } from "@/components/services/ai/ServiceAiProcessRail";
import { ServiceAiWhySection } from "@/components/services/ai/ServiceAiWhySection";
import { ServiceAiMidCta } from "@/components/services/ai/ServiceAiMidCta";
import { ServiceAiDeliverables } from "@/components/services/ai/ServiceAiDeliverables";
import { ServiceAiAudience } from "@/components/services/ai/ServiceAiAudience";
import { ServiceCaseStudies } from "@/components/services/ServiceCaseStudies";
import { ServicePageCta } from "@/components/services/ServicePageCta";
import { ServiceTechSection } from "@/components/services/ServiceTechSection";
import { ServiceRelatedServices } from "@/components/services/ServiceSeoContentSection";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { FAQAccordion } from "@/components/ui/Accordion";
import type { CaseStudy } from "@/lib/content/case-studies";
import { getServiceBySlug, type ServicePage } from "@/lib/content/services-data";

function resolveServiceTitle(slug: string) {
  return getServiceBySlug(slug)?.title ?? slug;
}

export function ServiceAiFuturisticLayout({
  service,
  caseStudies,
}: {
  service: ServicePage;
  caseStudies: CaseStudy[];
}) {
  const faqItems = service.faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
  }));

  return (
    <div className="service-layout-ai">
      <ServiceAiHero title={service.title} subtitle={service.heroSubtitle} />

      {service.trustMetrics && (
        <ServiceAiMetrics metrics={service.trustMetrics} />
      )}

      <ServiceAiOverview
        intro={service.intro}
        introExtended={service.introExtended}
        outcomes={service.outcomes}
      />

      <ServiceAiPipeline />

      <ServiceAiCapabilityBento
        capabilities={service.capabilities}
        title={service.capabilitiesHeading}
        description={service.capabilitiesDescription}
      />

      <ServiceAiMidCta serviceTitle={service.title} />

      <ServiceAiProcessRail
        steps={service.processSteps}
        title={service.processHeading}
        description={service.processDescription}
      />

      {service.seoContent && (
        <ServiceAiDeliverables
          deliverables={service.seoContent.deliverables}
          industries={service.seoContent.industries}
        />
      )}

      <ServiceAiWhySection differentiators={service.differentiators} />

      <ServiceCaseStudies studies={caseStudies} />

      <ServicePageCta serviceTitle={service.title} />

      {service.seoContent && (
        <ServiceAiAudience content={service.seoContent} />
      )}

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
        variant="dark"
        className="service-layout-ai__faq !py-16 md:!py-20"
      >
        <SectionHeading
          title={service.faqHeading ?? "Frequently Asked Questions"}
          description={service.faqDescription}
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <FAQAccordion items={faqItems} variant="dark" />
        </div>
      </SectionShell>
    </div>
  );
}
