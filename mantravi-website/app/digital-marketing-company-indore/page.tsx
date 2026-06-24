import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "indore",
);

export default async function IndoreDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "indore");
}
