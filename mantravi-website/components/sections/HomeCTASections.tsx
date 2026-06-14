"use client";

import { useEffect, useState } from "react";
import { useContact } from "@/components/providers/ContactProvider";
import { SwapTextButton } from "@/components/ui/SwapTextButton";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { FAQAccordion } from "@/components/ui/Accordion";
import { faqs } from "@/lib/content/about-data";
import { homeCtaSection } from "@/lib/content/site-data";
import { isMobilePerfProfile } from "@/lib/utils/scroll-profile";

export function FAQSection() {
  return (
    <SectionShell id="faq" variant="cream" className="!py-20">
      <SectionHeading
        eyebrow="Got Questions?"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services and how we can help transform your business."
        light
        display
      />
      <ScrollReveal className="mt-14">
        <FAQAccordion items={faqs} variant="light" />
      </ScrollReveal>
    </SectionShell>
  );
}

export function CTASection() {
  const { openContact } = useContact();
  const [staticReveal, setStaticReveal] = useState(false);

  useEffect(() => {
    setStaticReveal(isMobilePerfProfile());
  }, []);

  const TitleBlock = (
    <h2 className="title-display text-4xl text-slate-950 md:text-5xl lg:text-6xl">
      {homeCtaSection.title}
    </h2>
  );

  const BodyBlock = (
    <>
      <p className="text-lg leading-relaxed text-slate-800">
        {homeCtaSection.description}
      </p>
      <div className="mt-6">
        <SwapTextButton variant="light" onClick={openContact}>
          {homeCtaSection.button}
        </SwapTextButton>
      </div>
    </>
  );

  return (
    <SectionShell
      id="contact"
      variant="none"
      container={false}
      className="!py-0"
    >
      <div className="cta-section relative overflow-hidden py-12 md:py-14 lg:py-16">
        <div className="cta-section__bg" aria-hidden="true" />
        <div className="cta-section__scrim" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
          {staticReveal ? (
            TitleBlock
          ) : (
            <ScrollReveal>{TitleBlock}</ScrollReveal>
          )}
          {staticReveal ? (
            BodyBlock
          ) : (
            <ScrollReveal>{BodyBlock}</ScrollReveal>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
