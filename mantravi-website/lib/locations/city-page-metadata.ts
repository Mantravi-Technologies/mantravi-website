import type { Metadata } from "next";
import {
  getLocationPage,
  getLocationPagePath,
  type CitySlug,
  type LocationPageType,
} from "@/lib/content/city-pages-data";
import { AI_NEURAL_HERO } from "@/lib/content/ai-development-location-pages";
import { getCityHeroImage } from "@/lib/content/location-heroes";
import { buildPageMetadata } from "@/lib/seo/metadata";

export function createLocationPageMetadata(
  pageType: LocationPageType,
  slug: CitySlug,
): Metadata {
  const page = getLocationPage(pageType, slug);
  if (!page) return { title: "Location" };

  const heroImage =
    pageType === "ai-development-company"
      ? AI_NEURAL_HERO
      : getCityHeroImage(slug);
  const base = buildPageMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: getLocationPagePath(pageType, slug),
    image: heroImage.src,
  });

  return {
    ...base,
    keywords: page.focusKeywords,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      ...base.openGraph,
      locale: "en_IN",
    },
  };
}
