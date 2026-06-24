import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "jaipur",
);

export default async function JaipurDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "jaipur");
}
