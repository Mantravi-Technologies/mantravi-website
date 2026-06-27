import type { Metadata } from "next";
import { portfolioFilters, type CaseStudy } from "@/lib/content/case-studies";
import { getPortfolioListing } from "@/lib/content/portfolio";
import PortfolioPage from "./PortfolioPage";

import { buildPageMetadata } from "@/lib/seo/metadata";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadata({
  title: "Portfolio",
  description:
    "Explore Mantravi case studies and client success stories across D2C, EdTech, SaaS, and more.",
  path: "/portfolio",
});

export default async function Page() {
  const studies = await getPortfolioListing();
  return <PortfolioPage studies={studies} />;
}
