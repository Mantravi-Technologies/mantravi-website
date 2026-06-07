"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { FAQAccordion } from "@/components/ui/Accordion";
import { StatCounter } from "@/components/ui/StatCounter";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ServiceImageSlot } from "@/components/services/ServiceImageSlot";
import { ServicesHubCta } from "@/components/services/ServicesHubCta";
import { servicesMenu, stats, trustBadges } from "@/lib/content/site-data";
import {
  servicesHubFaqs,
  servicesHubHero,
  servicesHubImages,
  servicesHubIndustries,
  servicesHubIntro,
  servicesHubPractices,
  servicesHubProcess,
  servicesHubTrust,
} from "@/lib/content/services-hub-data";
import { serviceLink } from "@/lib/utils/service-link";
import { cn } from "@/lib/utils";
export default function ServicesHubPage() {
  return (
    <>
      {" "}
      <section className="services-hub-hero services-hub-hero--editorial">
        {" "}
        <div className="services-hub-hero__bg" aria-hidden="true" />{" "}
        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 sm:px-6 md:pb-16 md:pt-14 lg:px-8">
          {" "}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-400">
            {" "}
            <Link href="/" className="transition-colors hover:text-primary">
              {" "}
              Home{" "}
            </Link>{" "}
            <span className="mx-2 opacity-40">/</span>{" "}
            <span className="text-slate-300">Services</span>{" "}
          </nav>{" "}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {" "}
            <div>
              {" "}
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {servicesHubHero.eyebrow}
              </p>{" "}
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
                {" "}
                {servicesHubHero.title}{" "}
              </h1>{" "}
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                {servicesHubHero.subtitle}
              </p>{" "}
              <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
                {" "}
                {servicesHubHero.keywords.map((kw) => (
                  <li key={kw} className="flex items-center gap-2">
                    {" "}
                    <span
                      className="h-1 w-1 rounded-full bg-primary"
                      aria-hidden
                    />{" "}
                    {kw}{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </div>{" "}
            <ScrollReveal className="lg:justify-self-end lg:w-full lg:max-w-xl">
              {" "}
              <ServiceImageSlot
                slot={servicesHubImages.hero}
                priority
                variant="dark"
                className="w-full shadow-2xl shadow-black/30"
              />{" "}
            </ScrollReveal>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
      <SectionShell variant="cream" className="!py-16 md:!py-20">
        {" "}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {" "}
          <article>
            {" "}
            <h2 className="text-2xl font-bold md:text-3xl">
              {servicesHubIntro.heading}
            </h2>{" "}
            <div className="mt-6 space-y-5 text-base leading-relaxed text-[#050505]/75 md:text-lg">
              {" "}
              {servicesHubIntro.paragraphs.map((p) => (
                <p key={p.slice(0, 60)}>{p}</p>
              ))}{" "}
            </div>{" "}
          </article>{" "}
          <ScrollReveal>
            {" "}
            <ServiceImageSlot
              slot={servicesHubImages.intro}
              className="w-full"
            />{" "}
          </ScrollReveal>{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell
        id="services-list"
        variant="light"
        className="!py-16 md:!py-24"
      >
        {" "}
        <SectionHeading
          align="left"
          title="Our service practices"
          description="Select a practice to read capabilities, delivery process, technology stack, and case studies on the dedicated service page."
          light
        />{" "}
        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {" "}
          {servicesHubPractices.map((practice, index) => {
            const imageFirst = index % 2 === 1;
            return (
              <article
                key={practice.slug}
                className={cn(
                  "grid gap-8 py-10 md:gap-10 md:py-12",
                  "md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,0.9fr)] md:items-center",
                )}
              >
                {" "}
                <span
                  className="title-display text-4xl leading-none text-primary/25 md:text-5xl"
                  aria-hidden="true"
                >
                  {" "}
                  {String(index + 1).padStart(2, "0")}{" "}
                </span>{" "}
                <div className={cn(imageFirst && "md:order-3")}>
                  {" "}
                  <h3 className="text-xl font-bold md:text-2xl">
                    {" "}
                    <Link
                      href={practice.href}
                      className="transition-colors hover:text-primary"
                    >
                      {" "}
                      {practice.title}{" "}
                    </Link>{" "}
                  </h3>{" "}
                  <p className="mt-1 text-sm font-medium text-primary/80">
                    {practice.summary}
                  </p>{" "}
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
                    {practice.body}
                  </p>{" "}
                  <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {" "}
                    {practice.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-sm text-[#050505]/70 before:mr-2 before:text-primary before:content-['•']"
                      >
                        {" "}
                        {h}{" "}
                      </li>
                    ))}{" "}
                  </ul>{" "}
                  <Link
                    href={practice.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                  >
                    {" "}
                    {practice.cta} <ArrowRight className="h-4 w-4" />{" "}
                  </Link>{" "}
                </div>{" "}
                <ScrollReveal
                  className={cn("md:order-2", imageFirst && "md:order-1")}
                >
                  {" "}
                  <ServiceImageSlot
                    slot={practice.image}
                    className="w-full"
                  />{" "}
                </ScrollReveal>{" "}
              </article>
            );
          })}{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell variant="none" className="!py-8 md:!py-12">
        {" "}
        <ScrollReveal>
          {" "}
          <ServiceImageSlot
            slot={servicesHubImages.showcase}
            className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
          />{" "}
        </ScrollReveal>{" "}
      </SectionShell>{" "}
      <SectionShell variant="surface" className="!py-14 md:!py-18">
        {" "}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-16">
          {" "}
          <ScrollReveal className="lg:sticky lg:top-28">
            {" "}
            <ServiceImageSlot
              slot={{ ...servicesHubImages.trust, aspect: "portrait" }}
              className="mx-auto w-full max-w-sm lg:max-w-none"
            />{" "}
          </ScrollReveal>{" "}
          <div>
            {" "}
            <SectionHeading
              align="left"
              title="Why teams trust Mantravi"
              description="Accountability, production discipline, and direct communication, built into how we scope and deliver every engagement."
              light
            />{" "}
            <div className="mt-10 grid gap-8 md:grid-cols-1">
              {" "}
              {servicesHubTrust.map((item) => (
                <article
                  key={item.title}
                  className="border-l-2 border-primary/40 pl-5"
                >
                  {" "}
                  <h3 className="text-lg font-bold">{item.title}</h3>{" "}
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                    {item.description}
                  </p>{" "}
                </article>
              ))}{" "}
            </div>{" "}
            <ul className="mt-10 flex flex-wrap gap-3 border-t border-slate-200 pt-10">
              {" "}
              {trustBadges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-[#050505]/70 md:text-sm"
                >
                  {" "}
                  {badge}{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell variant="cream" className="!py-16 md:!py-20">
        {" "}
        <SectionHeading
          align="left"
          title={servicesHubIndustries.heading}
          description={servicesHubIndustries.description}
          light
        />{" "}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {" "}
          {servicesHubIndustries.items.map((item) => (
            <li
              key={item}
              className="border-l-2 border-primary/40 py-2 pl-4 text-sm font-medium text-[#050505]/80 md:text-base"
            >
              {" "}
              {item}{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </SectionShell>{" "}
      <SectionShell variant="light" className="!py-16 md:!py-20">
        {" "}
        <SectionHeading
          title="How we deliver"
          description="A consistent delivery model across engineering, marketing, QA, and AI, adapted to your timeline and team."
          light
        />{" "}
        <ol className="services-hub-process mt-12">
          {" "}
          {servicesHubProcess.map((step) => (
            <li key={step.num} className="services-hub-process__step">
              {" "}
              <span className="services-hub-process__num">{step.num}</span>{" "}
              <div>
                {" "}
                <h3 className="font-bold">{step.title}</h3>{" "}
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>{" "}
              </div>{" "}
            </li>
          ))}{" "}
        </ol>{" "}
      </SectionShell>{" "}
      <SectionShell
        id="capabilities"
        variant="dark"
        className="!py-16 md:!py-24"
      >
        {" "}
        <SectionHeading
          align="left"
          title="Browse capabilities by practice"
          description="Deep links to specific offerings on each service page, useful when you know the outcome you need."
        />{" "}
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {" "}
          {servicesMenu.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              {" "}
              <Link
                href={col.href}
                className="font-bold text-white transition-colors hover:text-primary"
              >
                {" "}
                {col.title}{" "}
              </Link>{" "}
              <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                {" "}
                {col.items.map((item) => (
                  <li key={item.label}>
                    {" "}
                    <Link
                      href={serviceLink(col.href, item.anchor)}
                      className="text-sm text-slate-400 transition-colors hover:text-primary"
                    >
                      {" "}
                      {item.label}{" "}
                    </Link>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </nav>
          ))}{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell variant="cinematic" className="!py-16 md:!py-20">
        {" "}
        <div className="grain-overlay opacity-15" aria-hidden="true" />{" "}
        <SectionHeading
          title="Trusted delivery at scale"
          description="Experience across product builds, SEO programs, QA automation, and production AI systems."
          display
        />{" "}
        <div className="relative mt-12">
          {" "}
          <StatCounter stats={stats.slice(0, 4)} dark />{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell id="faq" variant="cream" className="!py-16 md:!py-20">
        {" "}
        <SectionHeading
          title="Services FAQ"
          description="Answers about Mantravi's software development, SEO, QA, and AI services, for search and procurement teams."
          light
        />{" "}
        <div className="mx-auto mt-8 max-w-3xl">
          {" "}
          <FAQAccordion items={servicesHubFaqs} variant="light" />{" "}
        </div>{" "}
      </SectionShell>{" "}
      <div className="pb-16 md:pb-24">
        {" "}
        <ServicesHubCta />{" "}
      </div>{" "}
    </>
  );
}
