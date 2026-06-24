import { siteConfig } from "@/lib/content/site-data";
import { absoluteUrl } from "@/lib/seo/metadata";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    description: siteConfig.description,
    sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function blogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: string;
  readTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    ...(post.featuredImage ? { image: [post.featuredImage] } : {}),
  };
}

export function faqPageSchema(
  faqs: { question: string; answer: string }[],
) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function creativeWorkSchema(study: {
  title: string;
  summary: string;
  slug: string;
  client: string;
  featuredImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    url: absoluteUrl(`/portfolio/${study.slug}`),
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    about: study.client,
    ...(study.featuredImage ? { image: study.featuredImage } : {}),
  };
}

export function localBusinessServiceSchema(input: {
  name: string;
  description: string;
  url: string;
  cityName: string;
  stateName: string;
  areasServed: string[];
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
    },
    areaServed: [
      {
        "@type": "City",
        name: input.cityName,
        containedInPlace: {
          "@type": "State",
          name: input.stateName,
          containedInPlace: {
            "@type": "Country",
            name: "India",
          },
        },
      },
      ...input.areasServed.map((area) => ({
        "@type": "Place",
        name: area,
      })),
    ],
    serviceType: input.serviceType ?? "Mobile App Development",
  };
}
