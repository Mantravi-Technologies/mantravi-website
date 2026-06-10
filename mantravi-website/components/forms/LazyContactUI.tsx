"use client";

import dynamic from "next/dynamic";

const ContactModal = dynamic(
  () =>
    import("@/components/forms/ContactModal").then((mod) => ({
      default: mod.ContactModal,
    })),
  { ssr: false },
);

const FloatingContactButton = dynamic(
  () =>
    import("@/components/forms/ContactModal").then((mod) => ({
      default: mod.FloatingContactButton,
    })),
  { ssr: false },
);

export function LazyContactUI() {
  return (
    <>
      <ContactModal />
      <FloatingContactButton />
    </>
  );
}
