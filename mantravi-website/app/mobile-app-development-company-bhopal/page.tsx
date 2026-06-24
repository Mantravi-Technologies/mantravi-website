import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "mobile-app-development-company",
  "bhopal",
);

export default async function BhopalMobileAppPage() {
  return renderLocationPage("mobile-app-development-company", "bhopal");
}
