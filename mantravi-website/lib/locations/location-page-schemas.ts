import { siteConfig } from "@/lib/content/site-data";
import { absoluteUrl } from "@/lib/seo/metadata";
import type { CityPage } from "@/lib/content/location-types";

export function locationWebPageSchema(
  page: CityPage,
  pagePath: string,
  image: { src: string; alt: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.metaDescription,
    url: absoluteUrl(pagePath),
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Thing",
      name: `${page.cityName}, ${page.stateName}`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(image.src),
      contentUrl: absoluteUrl(image.src),
      caption: image.alt,
    },
  };
}

export function locationServiceListSchema(page: CityPage, pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.capabilitiesHeading,
    description: page.capabilitiesDescription,
    url: absoluteUrl(pagePath),
    itemListElement: page.capabilities.map((cap, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: cap.title,
      description: cap.description,
    })),
  };
}

export function enhancedLocalBusinessSchema(input: {
  page: CityPage;
  pagePath: string;
  image: { src: string; alt: string };
  serviceType: string;
}) {
  const { page, pagePath, image, serviceType } = input;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: page.title,
    description: page.metaDescription,
    url: absoluteUrl(pagePath),
    image: absoluteUrl(image.src),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "₹₹₹",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      sameAs: [siteConfig.social.linkedin, siteConfig.social.instagram],
    },
    ...(page.hasLocalOffice
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: page.cityName,
            addressRegion: page.stateName,
            addressCountry: "IN",
          },
        }
      : {}),
    areaServed: [
      {
        "@type": "City",
        name: page.cityName,
        containedInPlace: {
          "@type": "State",
          name: page.stateName,
          containedInPlace: { "@type": "Country", name: "India" },
        },
      },
      ...page.areasServed.map((area) => ({
        "@type": "Place",
        name: area,
      })),
    ],
    serviceType,
    knowsAbout: page.focusKeywords,
  };
}
