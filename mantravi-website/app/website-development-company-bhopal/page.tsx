import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "bhopal",
);

export default async function BhopalWebsitePage() {
  return renderLocationPage("website-development-company", "bhopal");
}
