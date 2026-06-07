import type { Metadata } from "next";
import ServicesHubPage from "./ServicesHubClient";
import { siteConfig } from "@/lib/content/site-data";
import { servicePages } from "@/lib/content/services-data";
import {
  servicesHubMeta,
  servicesHubFaqs,
} from "@/lib/content/services-hub-data";

export const metadata: Metadata = {
  title: servicesHubMeta.title,
  description: servicesHubMeta.description,
  openGraph: {
    title: `${servicesHubMeta.title} | Mantravi`,
    description: servicesHubMeta.description,
    url: `${siteConfig.url}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${servicesHubMeta.title} | Mantravi`,
    description: servicesHubMeta.description,
  },
  alternates: {
    canonical: "/services",
  },
};

function ServicesHubJsonLd() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mantravi Digital Services",
    description: servicesHubMeta.description,
    url: `${siteConfig.url}/services`,
    itemListElement: servicePages.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.metaDescription,
      url: `${siteConfig.url}/services/${service.slug}`,
    })),
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: servicesHubFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: servicesHubMeta.title,
    description: servicesHubMeta.description,
    url: `${siteConfig.url}/services`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
    </>
  );
}

export default function ServicesPage() {
  return (
    <>
      <ServicesHubJsonLd />
      <ServicesHubPage />
    </>
  );
}
