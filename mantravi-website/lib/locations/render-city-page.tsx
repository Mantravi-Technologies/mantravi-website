import { notFound } from "next/navigation";
import { CityPageLayout } from "@/components/locations/CityPageLayout";
import { JsonLdMulti } from "@/components/seo/JsonLd";
import {
  getLocationPage,
  getLocationPagePath,
  type CitySlug,
  type LocationPageType,
} from "@/lib/content/city-pages-data";
import { getCityHeroImage } from "@/lib/content/location-heroes";
import {
  enhancedLocalBusinessSchema,
  locationServiceListSchema,
  locationWebPageSchema,
} from "@/lib/locations/location-page-schemas";
import { getServiceCaseStudies } from "@/lib/content/portfolio";
import {
  breadcrumbSchema,
  faqPageSchema,
} from "@/lib/seo/schema";

const serviceTypeByPage: Record<LocationPageType, string> = {
  "mobile-app-development-company": "Mobile App Development",
  "website-development-company": "Website Development",
};

export async function renderLocationPage(
  pageType: LocationPageType,
  slug: CitySlug,
) {
  const page = getLocationPage(pageType, slug);
  if (!page) notFound();

  const caseStudies = await getServiceCaseStudies(
    "product-engineering",
    pageType === "website-development-company"
      ? ["web", "ui"]
      : ["mobile", "web", "ui"],
    4,
  );

  const pagePath = getLocationPagePath(pageType, slug);
  const heroImage = getCityHeroImage(slug);

  const schemas = [
    locationWebPageSchema(page, pagePath, heroImage),
    enhancedLocalBusinessSchema({
      page,
      pagePath,
      image: heroImage,
      serviceType: serviceTypeByPage[pageType],
    }),
    locationServiceListSchema(page, pagePath),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: page.title, path: pagePath },
    ]),
    faqPageSchema(page.faqs),
  ].filter(Boolean);

  return (
    <>
      <JsonLdMulti schemas={schemas} />
      <CityPageLayout page={page} caseStudies={caseStudies} />
    </>
  );
}
