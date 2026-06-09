import { getHomepageCarousel } from "@/lib/content/portfolio";
import { PortfolioShowcaseSectionClient } from "./PortfolioShowcaseSection";

export async function PortfolioShowcaseSection() {
  const items = await getHomepageCarousel();
  return <PortfolioShowcaseSectionClient items={items} />;
}
