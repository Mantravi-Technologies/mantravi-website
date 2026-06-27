import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "ai-development-company",
  "jaipur",
);

export default async function Page() {
  return renderLocationPage("ai-development-company", "jaipur");
}
