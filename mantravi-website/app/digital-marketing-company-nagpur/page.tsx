import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "nagpur",
);

export default async function NagpurDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "nagpur");
}
