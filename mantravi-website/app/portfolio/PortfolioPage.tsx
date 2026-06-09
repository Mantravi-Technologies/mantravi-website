import type { CaseStudy } from "@/lib/content/case-studies";
import { PortfolioListingPage } from "@/components/portfolio/PortfolioListingPage";

export default function PortfolioPage({ studies }: { studies: CaseStudy[] }) {
  return <PortfolioListingPage studies={studies} />;
}
