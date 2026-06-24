import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "nagpur",
);

export default async function NagpurWebsitePage() {
  return renderLocationPage("website-development-company", "nagpur");
}
