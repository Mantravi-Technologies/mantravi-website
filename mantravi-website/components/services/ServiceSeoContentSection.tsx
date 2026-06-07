"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import type { ServiceSeoContent } from "@/lib/content/service-seo-extensions";
export function ServiceSeoContentSection({
  content,
}: {
  content: ServiceSeoContent;
}) {
  return (
    <SectionShell
      id="service-details"
      variant="cream"
      className="!py-16 md:!py-20"
    >
      {" "}
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        {" "}
        <article>
          {" "}
          <h2 className="text-2xl font-bold md:text-3xl">
            Who this service is for
          </h2>{" "}
          <ul className="mt-6 space-y-4">
            {" "}
            {content.whoItsFor.map((item) => (
              <li
                key={item.slice(0, 48)}
                className="flex gap-3 text-sm leading-relaxed text-[#050505]/75 md:text-base"
              >
                {" "}
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />{" "}
                {item}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
          <h2 className="mt-12 text-2xl font-bold md:text-3xl">
            When to engage Mantravi
          </h2>{" "}
          <ul className="mt-6 space-y-4">
            {" "}
            {content.whenToEngage.map((item) => (
              <li
                key={item.slice(0, 48)}
                className="flex gap-3 text-sm leading-relaxed text-[#050505]/75 md:text-base"
              >
                {" "}
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />{" "}
                {item}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </article>{" "}
        <article>
          {" "}
          <h2 className="text-2xl font-bold md:text-3xl">
            Typical deliverables
          </h2>{" "}
          <ul className="mt-6 space-y-4">
            {" "}
            {content.deliverables.map((item) => (
              <li
                key={item.slice(0, 48)}
                className="flex gap-3 text-sm leading-relaxed text-[#050505]/75 md:text-base"
              >
                {" "}
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  aria-hidden
                />{" "}
                {item}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
          <h2 className="mt-12 text-2xl font-bold md:text-3xl">
            Industries we support
          </h2>{" "}
          <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
            {" "}
            We adapt compliance, integrations, and release processes to your
            sector. Common industries include:{" "}
          </p>{" "}
          <ul className="mt-5 flex flex-wrap gap-2">
            {" "}
            {content.industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-[#050505]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#050505]/80 md:text-sm"
              >
                {" "}
                {industry}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </article>{" "}
      </div>{" "}
    </SectionShell>
  );
}
export function ServiceRelatedServices({
  currentSlug,
  relatedSlugs,
  getTitle,
}: {
  currentSlug: string;
  relatedSlugs: string[];
  getTitle: (slug: string) => string;
}) {
  const links = relatedSlugs.filter((s) => s !== currentSlug);
  if (links.length === 0) return null;
  return (
    <SectionShell variant="surface" className="!py-12 md:!py-16">
      {" "}
      <SectionHeading
        align="left"
        title="Related Mantravi services"
        description="Explore complementary practices, many clients combine product engineering with QA, SEO, or AI delivery."
        light
      />{" "}
      <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
        {" "}
        {links.map((slug) => (
          <li key={slug}>
            {" "}
            <Link
              href={`/services/${slug}`}
              className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-primary"
            >
              {" "}
              <span className="font-semibold">{getTitle(slug)}</span>{" "}
              <ArrowRight className="h-4 w-4 shrink-0 opacity-40 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />{" "}
            </Link>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
      <Link
        href="/services"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
      >
        {" "}
        View all services <ArrowRight className="h-4 w-4" />{" "}
      </Link>{" "}
    </SectionShell>
  );
}
