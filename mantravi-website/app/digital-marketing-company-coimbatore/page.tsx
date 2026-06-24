import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "coimbatore",
);

export default async function CoimbatoreDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "coimbatore");
}
