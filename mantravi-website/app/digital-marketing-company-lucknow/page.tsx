import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "lucknow",
);

export default async function LucknowDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "lucknow");
}
