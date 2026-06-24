import type { Metadata } from "next";
import { ContactUsContent } from "./ContactUsContent";
import { JsonLdMulti } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/content/site-data";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Mantravi for web, mobile, AI, and digital marketing projects. Share your goals and our team will respond with next steps within two business days.",
  path: "/contact-us",
});

export default function ContactUsPage() {
  const schemas = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact Us", path: "/contact-us" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Mantravi",
      url: `${siteConfig.url}/contact-us`,
      description:
        "Contact Mantravi for product engineering, web development, mobile apps, and digital marketing.",
      mainEntity: {
        "@type": "Organization",
        name: siteConfig.name,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        url: siteConfig.url,
      },
    },
  ];

  return (
    <>
      <JsonLdMulti schemas={schemas} />
      <ContactUsContent />
    </>
  );
}
