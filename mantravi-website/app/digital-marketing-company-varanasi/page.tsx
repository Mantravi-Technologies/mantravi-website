import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "varanasi",
);

export default async function VaranasiDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "varanasi");
}
