import {
  caseStudies,
  type CaseStudy,
} from "@/lib/content/case-studies";
import {
  getCaseStudiesFromSanity,
  getCaseStudyBySlugFromSanity,
} from "@/lib/sanity/queries";

function published(studies: CaseStudy[]) {
  return studies.filter((c) => c.status === "published");
}

function sortByHomepageOrder(studies: CaseStudy[]) {
  return [...studies].sort(
    (a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99),
  );
}

async function loadCaseStudies(): Promise<CaseStudy[]> {
  const fromSanity = await getCaseStudiesFromSanity();
  return fromSanity.length > 0 ? fromSanity : caseStudies;
}

export async function getHomepageCarousel(limit = 6): Promise<CaseStudy[]> {
  const all = published(await loadCaseStudies());
  const flagged = sortByHomepageOrder(all.filter((c) => c.showOnHomepage));
  if (flagged.length > 0) return flagged.slice(0, limit);

  const featured = all.filter((c) => c.featured);
  const rest = all.filter((c) => !c.featured);
  return [...featured, ...rest].slice(0, limit);
}

export async function getServiceCaseStudies(
  serviceSlug: string,
  serviceTags: string[],
  limit = 4,
): Promise<CaseStudy[]> {
  const all = published(await loadCaseStudies());
  const pinned = all.filter((c) =>
    c.pinnedOnServices.includes(serviceSlug),
  );
  const pinnedSlugs = new Set(pinned.map((c) => c.slug));

  const matched = all.filter(
    (c) =>
      !pinnedSlugs.has(c.slug) &&
      c.services.some((s) => serviceTags.includes(s)),
  );

  return [...pinned, ...matched].slice(0, limit);
}

export async function getPortfolioListing(): Promise<CaseStudy[]> {
  return published(await loadCaseStudies());
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  const fromSanity = await getCaseStudyBySlugFromSanity(slug);
  if (fromSanity) return fromSanity;
  return caseStudies.find((c) => c.slug === slug && c.status === "published") ?? null;
}

export async function getRelatedCaseStudies(
  study: CaseStudy,
  limit = 3,
): Promise<CaseStudy[]> {
  const all = published(await loadCaseStudies());
  return all
    .filter(
      (c) =>
        c.slug !== study.slug &&
        c.industry.some((i) => study.industry.includes(i)),
    )
    .slice(0, limit);
}

/** Sync helpers for client components during static fallback */
export function getHomepageCarouselSync(limit = 6): CaseStudy[] {
  const all = published(caseStudies);
  const flagged = sortByHomepageOrder(all.filter((c) => c.showOnHomepage));
  if (flagged.length > 0) return flagged.slice(0, limit);
  const featured = all.filter((c) => c.featured);
  const rest = all.filter((c) => !c.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getServiceCaseStudiesSync(
  serviceSlug: string,
  serviceTags: string[],
  limit = 4,
): CaseStudy[] {
  const all = published(caseStudies);
  const pinned = all.filter((c) => c.pinnedOnServices.includes(serviceSlug));
  const pinnedSlugs = new Set(pinned.map((c) => c.slug));
  const matched = all.filter(
    (c) =>
      !pinnedSlugs.has(c.slug) &&
      c.services.some((s) => serviceTags.includes(s)),
  );
  return [...pinned, ...matched].slice(0, limit);
}

type CaseStudyAccent = { bar: string; label: string };

const CASE_STUDY_ACCENTS: Record<string, CaseStudyAccent> = {
  vedlik: { bar: "bg-sky-500", label: "text-sky-600" },
  "mobile-case-hub": { bar: "bg-cyan-500", label: "text-cyan-600" },
  plantropan: { bar: "bg-emerald-500", label: "text-emerald-600" },
  ameyru: { bar: "bg-violet-500", label: "text-violet-600" },
};

const DEFAULT_ACCENT: CaseStudyAccent = {
  bar: "bg-primary",
  label: "text-primary-dark",
};

export function getCaseStudyAccent(slug: string): CaseStudyAccent {
  return CASE_STUDY_ACCENTS[slug] ?? DEFAULT_ACCENT;
}
