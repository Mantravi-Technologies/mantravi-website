import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "digital-marketing-company",
  "chandigarh",
);

export default async function ChandigarhDigitalMarketingPage() {
  return renderLocationPage("digital-marketing-company", "chandigarh");
}
