import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/portfolio/CaseStudyLayout";
import { JsonLdMulti } from "@/components/seo/JsonLd";
import { CTASection } from "@/components/sections/HomeCTASections";
import { caseStudies } from "@/lib/content/case-studies";
import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  getPortfolioListing,
} from "@/lib/content/portfolio";
import { filterCaseStudyBody } from "@/lib/content/case-study-page";
import { resolveCaseStudyBody } from "@/lib/content/portable-text";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, creativeWorkSchema } from "@/lib/seo/schema";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const listing = await getPortfolioListing();
  const slugs =
    listing.length > 0
      ? listing
      : caseStudies.filter((c) => c.status === "published");
  return slugs.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };
  return buildPageMetadata({
    title: study.title,
    description: study.summary,
    path: `/portfolio/${study.slug}`,
    image: study.featuredImage,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const related = await getRelatedCaseStudies(study, 4);
  const bodyBlocks = filterCaseStudyBody(resolveCaseStudyBody(study), study);

  const jsonLd = [
    creativeWorkSchema(study),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Portfolio", path: "/portfolio" },
      { name: study.title, path: `/portfolio/${study.slug}` },
    ]),
  ];

  return (
    <>
      <JsonLdMulti schemas={jsonLd} />
      <CaseStudyLayout
        study={study}
        bodyBlocks={bodyBlocks}
        related={related}
      />
      <CTASection />
    </>
  );
}
