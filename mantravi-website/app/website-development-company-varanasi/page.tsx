import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "varanasi",
);

export default async function VaranasiWebsitePage() {
  return renderLocationPage("website-development-company", "varanasi");
}
