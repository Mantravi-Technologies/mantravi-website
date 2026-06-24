import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "indore",
);

export default async function IndoreWebsitePage() {
  return renderLocationPage("website-development-company", "indore");
}
