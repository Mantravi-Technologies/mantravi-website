import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "ghaziabad",
);

export default async function GhaziabadDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "ghaziabad");
}
