import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "jaipur",
);

export default async function JaipurWebsitePage() {
  return renderLocationPage("website-development-company", "jaipur");
}
