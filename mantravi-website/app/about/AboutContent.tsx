"use client";

import { FAQAccordion } from "@/components/ui/Accordion";
import { CTASection } from "@/components/sections/HomeCTASections";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStorySection } from "@/components/about/AboutStorySection";
import { AboutManifest } from "@/components/about/AboutManifest";
import { AboutServicesRows } from "@/components/about/AboutServicesRows";
import { AboutPrinciplesBand } from "@/components/about/AboutPrinciplesBand";
import { AboutWhyList } from "@/components/about/AboutWhyList";
import { AboutQuotes } from "@/components/about/AboutQuotes";
import { AboutJoinBand } from "@/components/about/AboutJoinBand";
import { faqs, testimonials } from "@/lib/content/about-data";

export function AboutContent() {
  const filteredTestimonials = testimonials.filter((t) => t.type === "client");
  const aboutFaqs = faqs.slice(0, 6);

  return (
    <div className="about-page">
      <AboutHero />
      <AboutStorySection />
      <AboutManifest />
      <AboutServicesRows />
      <AboutPrinciplesBand />
      <AboutWhyList />
      <AboutQuotes testimonials={filteredTestimonials} />
      <AboutJoinBand />

      <section className="about-page__faq bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="about-page__kicker text-[#050505]/50">FAQ</p>
          <h2 className="about-page__section-title mt-4 text-[#050505]">
            Common questions
          </h2>
          <div className="mt-10">
            <FAQAccordion items={aboutFaqs} variant="light" />
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
