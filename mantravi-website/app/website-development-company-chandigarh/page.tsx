import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "chandigarh",
);

export default async function ChandigarhWebsitePage() {
  return renderLocationPage("website-development-company", "chandigarh");
}
