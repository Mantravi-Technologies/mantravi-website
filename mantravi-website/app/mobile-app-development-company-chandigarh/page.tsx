import { createLocationPageMetadata } from "@/lib/locations/city-page-metadata";
import { renderLocationPage } from "@/lib/locations/render-city-page";

export const metadata = createLocationPageMetadata(
  "mobile-app-development-company",
  "chandigarh",
);

export default async function ChandigarhMobileAppPage() {
  return renderLocationPage("mobile-app-development-company", "chandigarh");
}
