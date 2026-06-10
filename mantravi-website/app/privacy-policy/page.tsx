import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import {
  privacyPolicyIntro,
  privacyPolicyMeta,
  privacyPolicySections,
  privacyPolicyToc,
} from "@/lib/content/privacy-policy";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Mantravi collects, uses, and protects your personal information when you visit mantravi.com.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title={privacyPolicyMeta.title}
      subtitle={privacyPolicyMeta.subtitle}
      lastUpdated={privacyPolicyMeta.lastUpdated}
      toc={privacyPolicyToc}
    >
      <div className="space-y-4">
        {privacyPolicyIntro.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-base leading-relaxed text-[#050505]/75"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {privacyPolicySections.map((section) => (
        <LegalSection key={section.id} {...section} />
      ))}

      <LegalSection
        id="contact"
        title="Contact Us"
        contactEmail={privacyPolicyMeta.contactEmail}
      />
    </LegalPageLayout>
  );
}
