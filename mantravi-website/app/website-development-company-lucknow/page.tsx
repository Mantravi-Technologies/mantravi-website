import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "lucknow",
);

export default async function LucknowWebsitePage() {
  return renderLocationPage("website-development-company", "lucknow");
}
