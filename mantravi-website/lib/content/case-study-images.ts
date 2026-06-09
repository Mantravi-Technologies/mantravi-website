import type { CaseStudy } from "@/lib/content/case-studies";

/** Where a case study image can appear across the site */
export type CaseStudyImagePlacement =
  | "hero"
  | "homepageCarousel"
  | "portfolioListing"
  | "serviceCard"
  | "relatedCard";

const PLACEMENT_FIELD: Record<
  Exclude<CaseStudyImagePlacement, "hero">,
  keyof CaseStudy
> = {
  homepageCarousel: "homepageCardImage",
  portfolioListing: "listingImage",
  serviceCard: "serviceCardImage",
  relatedCard: "relatedCardImage",
};

/** Resolve image URL for a placement; falls back to featuredImage (hero). */
export function getCaseStudyImage(
  study: CaseStudy,
  placement: CaseStudyImagePlacement,
): string | undefined {
  if (placement === "hero") {
    return study.featuredImage ?? study.image;
  }

  const specific = study[PLACEMENT_FIELD[placement]] as string | undefined;
  if (specific) return specific;

  return study.featuredImage ?? study.image;
}

export function hasCaseStudyImage(
  study: CaseStudy,
  placement: CaseStudyImagePlacement,
): boolean {
  return Boolean(getCaseStudyImage(study, placement));
}
