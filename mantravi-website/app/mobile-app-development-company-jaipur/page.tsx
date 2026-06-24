import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "mobile-app-development-company",
  "jaipur",
);

export default async function JaipurMobileAppPage() {
  return renderLocationPage("mobile-app-development-company", "jaipur");
}
