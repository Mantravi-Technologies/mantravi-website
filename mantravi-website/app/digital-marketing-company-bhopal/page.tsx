import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "bhopal",
);

export default async function BhopalDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "bhopal");
}
