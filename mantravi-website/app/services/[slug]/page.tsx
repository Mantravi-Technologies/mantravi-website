import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePageLayout } from "@/components/services/ServicePageLayout";
import {
  getAllServiceSlugs,
  getServiceBySlug,
} from "@/lib/content/services-data";
import { getServiceCaseStudies } from "@/lib/content/portfolio";
import { siteConfig } from "@/lib/content/site-data";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service" };

  const pageTitle = `${service.title} | Mantravi`;

  return {
    title: pageTitle,
    description: service.metaDescription,
    openGraph: {
      title: pageTitle,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: service.metaDescription,
    },
    alternates: {
      canonical: `/services/${service.slug}`,
    },
  };
}

function ServiceJsonLd({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);
  if (!service) return null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/services/${service.slug}`,
    areaServed: "Worldwide",
    serviceType: service.title,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const caseStudies = await getServiceCaseStudies(
    service.slug,
    service.serviceTags,
    4,
  );
  return (
    <>
      <ServiceJsonLd slug={slug} />
      <ServicePageLayout service={service} caseStudies={caseStudies} />
    </>
  );
}
