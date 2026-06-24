import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "website-development-company",
  "ghaziabad",
);

export default async function GhaziabadPage() {
  return renderLocationPage("website-development-company", "ghaziabad");
}
