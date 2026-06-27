import type { ServiceSeoContent } from "./service-seo-extensions";
import type {
  ServiceCapability,
  ServiceDifferentiator,
  ServiceFAQ,
  ServiceProcessStep,
  ServiceTrustMetric,
  TechStackCategory,
} from "./services-data";

export type CitySlug =
  | "lucknow"
  | "varanasi"
  | "bhopal"
  | "indore"
  | "jaipur"
  | "chandigarh"
  | "nagpur"
  | "coimbatore"
  | "ghaziabad";

export type LocationPageType =
  | "mobile-app-development-company"
  | "website-development-company"
  | "digital-marketing-company"
  | "ai-development-company";

export type CityPage = {
  pageType: LocationPageType;
  slug: CitySlug;
  cityName: string;
  stateName: string;
  alternateNames?: string[];
  title: string;
  seoTitle: string;
  metaDescription: string;
  focusKeywords: string[];
  heroSubtitle: string;
  intro: string;
  introExtended: string;
  outcomes: string[];
  localMarketInsight: string;
  industries: string[];
  areasServed: string[];
  capabilities: ServiceCapability[];
  capabilitiesHeading: string;
  capabilitiesDescription: string;
  processSteps: ServiceProcessStep[];
  processHeading: string;
  processDescription: string;
  differentiators: ServiceDifferentiator[];
  trustMetrics: ServiceTrustMetric[];
  techStack: TechStackCategory[];
  techSection: {
    title: string;
    description: string;
    variant: "light" | "dark" | "cream" | "cinematic";
  };
  seoContent: ServiceSeoContent;
  faqs: ServiceFAQ[];
  faqHeading: string;
  faqDescription: string;
  hasLocalOffice?: boolean;
};

export function getLocationPagePath(
  pageType: LocationPageType,
  slug: CitySlug,
) {
  return `/${pageType}-${slug}`;
}
