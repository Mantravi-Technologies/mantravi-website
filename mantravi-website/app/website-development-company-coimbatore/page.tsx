import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "coimbatore",
);

export default async function CoimbatoreWebsitePage() {
  return renderLocationPage("website-development-company", "coimbatore");
}
