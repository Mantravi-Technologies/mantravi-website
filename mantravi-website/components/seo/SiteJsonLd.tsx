import { JsonLdMulti } from "@/components/seo/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

export function SiteJsonLd() {
  return (
    <JsonLdMulti schemas={[organizationSchema(), websiteSchema()]} />
  );
}
