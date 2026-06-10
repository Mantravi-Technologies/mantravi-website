"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { FAQAccordion } from "@/components/ui/Accordion";
import {
  ServicesHubIntroBand,
  ServicesHubTrustBand,
} from "@/components/services/ServicesHubEditorial";
import { useContact } from "@/components/providers/ContactProvider";
import { servicesMenu, stats } from "@/lib/content/site-data";
import {
  servicesHubFaqs,
  servicesHubHero,
  servicesHubIndustries,
  servicesHubPractices,
  servicesHubProcess,
} from "@/lib/content/services-hub-data";
import { serviceLink } from "@/lib/utils/service-link";
import { cn } from "@/lib/utils";

const hubStats = stats.slice(0, 4);

const practiceAccents = [
  "shub-practices__panel--indigo",
  "shub-practices__panel--amber",
  "shub-practices__panel--emerald",
  "shub-practices__panel--violet",
] as const;

export default function ServicesHubPage() {
  const { openContact } = useContact();
  const [activePractice, setActivePractice] = useState(0);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (!panels.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const idx = panels.indexOf(visible[0].target as HTMLElement);
          if (idx >= 0) setActivePractice(idx);
        }
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    panels.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="shub">
      {/* Hero — light parchment, typographic watermark */}
      <section className="shub-hero">
        <div className="shub-wrap shub-hero__inner">
          <div className="shub-hero__watermark" aria-hidden="true">
            Services
          </div>
          <nav className="shub-crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">→</span>
            <span>Services</span>
          </nav>
          <div className="shub-hero__content">
            <p className="shub-label">{servicesHubHero.eyebrow}</p>
            <h1 className="shub-hero__title">{servicesHubHero.title}</h1>
            <p className="shub-hero__lead">{servicesHubHero.subtitle}</p>
            <div className="shub-hero__tags">
              {servicesHubHero.keywords.map((kw) => (
                <span key={kw}>{kw}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServicesHubIntroBand />

      {/* Practices — sticky nav + scroll panels (unique layout) */}
      <section
        id="services-list"
        className="shub-practices"
        aria-labelledby="practices-heading"
      >
        <div className="shub-wrap shub-practices__layout">
          <aside className="shub-practices__nav" aria-label="Service practices">
            <p className="shub-label">Practices</p>
            <h2 id="practices-heading" className="shub-practices__nav-title">
              Our service practices
            </h2>
            <p className="shub-practices__nav-desc">
              Select a practice to read capabilities, delivery process,
              technology stack, and case studies.
            </p>
            <ol className="shub-practices__index">
              {servicesHubPractices.map((practice, index) => (
                <li key={practice.slug}>
                  <a
                    href={`#practice-${practice.slug}`}
                    className={cn(
                      "shub-practices__index-link",
                      activePractice === index && "is-active",
                    )}
                    onClick={() => setActivePractice(index)}
                  >
                    <span className="shub-practices__index-bar" aria-hidden />
                    {practice.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="shub-practices__panels">
            {servicesHubPractices.map((practice, index) => (
              <article
                key={practice.slug}
                id={`practice-${practice.slug}`}
                ref={(el) => {
                  panelRefs.current[index] = el;
                }}
                className={cn(
                  "shub-practices__panel",
                  practiceAccents[index],
                )}
              >
                <div className="shub-practices__panel-inner">
                  <p className="shub-practices__panel-tag">{practice.summary}</p>
                  <h3>
                    <Link href={practice.href}>{practice.title}</Link>
                  </h3>
                  <p className="shub-practices__panel-body">{practice.body}</p>
                  <ul className="shub-practices__panel-list">
                    {practice.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <Link href={practice.href} className="shub-link-arrow">
                    {practice.cta}
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Industries — word mosaic */}
      <section
        className="shub-industries"
        aria-labelledby="industries-heading"
      >
        <div className="shub-wrap">
          <p className="shub-label shub-label--light">Sectors</p>
          <h2 id="industries-heading" className="shub-industries__title">
            {servicesHubIndustries.heading}
          </h2>
          <p className="shub-industries__desc">{servicesHubIndustries.description}</p>
          <div className="shub-industries__mosaic" role="list">
            {servicesHubIndustries.items.map((item, i) => (
              <span
                key={item}
                role="listitem"
                className={cn(
                  "shub-industries__word",
                  i % 3 === 1 && "shub-industries__word--lg",
                  i % 3 === 2 && "shub-industries__word--sm",
                )}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process — vertical spine */}
      <section className="shub-process" aria-labelledby="process-heading">
        <div className="shub-wrap shub-process__layout">
          <header className="shub-process__head">
            <p className="shub-label">Delivery</p>
            <h2 id="process-heading" className="shub-process__title">
              How we deliver
            </h2>
            <p className="shub-process__desc">
              A consistent delivery model across engineering, marketing, QA, and
              AI — adapted to your timeline and team.
            </p>
          </header>
          <ol className="shub-process__spine">
            {servicesHubProcess.map((step, i) => (
              <li key={step.num}>
                <span className="shub-process__dot" aria-hidden="true" />
                {i < servicesHubProcess.length - 1 ? (
                  <span className="shub-process__line" aria-hidden="true" />
                ) : null}
                <div>
                  <span className="shub-process__step-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ServicesHubTrustBand />

      {/* Capabilities — flowing link river */}
      <section
        id="capabilities"
        className="shub-caps"
        aria-labelledby="capabilities-heading"
      >
        <div className="shub-wrap">
          <p className="shub-label shub-label--light">Deep dive</p>
          <h2 id="capabilities-heading" className="shub-caps__title">
            Browse capabilities by practice
          </h2>
          <div className="shub-caps__river">
            {servicesMenu.map((col) => (
              <div key={col.title} className="shub-caps__group">
                <Link href={col.href} className="shub-caps__group-title">
                  {col.title}
                </Link>
                <ul>
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <Link href={serviceLink(col.href, item.anchor)}>
                        <span aria-hidden="true">↳</span>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats — asymmetric display */}
      <section className="shub-stats" aria-label="Track record">
        <div className="shub-wrap">
          <dl className="shub-stats__display">
            {hubStats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn("shub-stats__item", i % 2 === 1 && "shub-stats__item--offset")}
              >
                <dt>
                  {stat.value}
                  {stat.suffix}
                </dt>
                <dd>{stat.label}</dd>
                {stat.sub ? <dd className="shub-stats__sub">{stat.sub}</dd> : null}
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="faq" className="shub-faq" aria-labelledby="faq-heading">
        <div className="shub-wrap shub-faq__layout">
          <header>
            <p className="shub-label">FAQ</p>
            <h2 id="faq-heading" className="shub-faq__title">
              Services FAQ
            </h2>
            <p className="shub-faq__desc">
              For search and procurement teams evaluating Mantravi&apos;s software,
              SEO, QA, and AI services.
            </p>
          </header>
          <div className="shub-faq__accordion">
            <FAQAccordion items={servicesHubFaqs} variant="light" />
          </div>
        </div>
      </section>

      <section className="shub-cta" aria-labelledby="cta-heading">
        <div className="shub-wrap shub-cta__inner">
          <div>
            <p className="shub-label shub-label--light">Consultation</p>
            <h2 id="cta-heading" className="shub-cta__title">
              Tell us what you&apos;re building
            </h2>
            <p className="shub-cta__quote">
              We&apos;ll reply with scope options, tooling recommendations, and
              realistic milestones — not a generic pitch deck.
            </p>
          </div>
          <button type="button" onClick={openContact} className="shub-cta__action">
            <span>Request a proposal</span>
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </section>
    </div>
  );
}
