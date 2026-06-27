import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "ai-development-company",
  "varanasi",
);

export default async function Page() {
  return renderLocationPage("ai-development-company", "varanasi");
}
