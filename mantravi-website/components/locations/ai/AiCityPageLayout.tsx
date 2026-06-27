"use client";

import "./ai-city.css";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AiCityHero } from "@/components/locations/ai/AiCityHero";
import { AiMarquee } from "@/components/locations/ai/AiMarquee";
import { SwapTextButton } from "@/components/ui/SwapTextButton";
import { useContact } from "@/components/providers/ContactProvider";
import {
  getCompanionLocationPages,
  getLocationPagePath,
  getOtherLocationPages,
} from "@/lib/content/city-pages-data";
import type { CaseStudy } from "@/lib/content/case-studies";
import type { CityPage } from "@/lib/content/location-types";

const companionLabels: Record<string, string> = {
  "mobile-app-development-company": "Mobile apps",
  "website-development-company": "Websites",
  "digital-marketing-company": "Digital marketing",
  "ai-development-company": "AI systems",
};

const partnerTech = [
  "OpenAI",
  "Gemini",
  "Claude",
  "LangChain",
  "AWS",
  "GCP",
  "Pinecone",
  "PostgreSQL",
];

export function AiCityPageLayout({
  page,
  caseStudies,
}: {
  page: CityPage;
  caseStudies: CaseStudy[];
}) {
  const { openContact } = useContact();
  const companions = getCompanionLocationPages(page);
  const otherAiCities = getOtherLocationPages("ai-development-company", page.slug);

  return (
    <div className="ai-city-page">
      <AiCityHero page={page} />

      <section className="ai-city-section ai-city-section--lift">
        <div className="ai-city-wrap">
          <h2 className="ai-city-section-title">
            How we solve AI for {page.cityName} businesses
          </h2>
          <p className="ai-city-lead">{page.introExtended}</p>
          <ul className="ai-city-outcomes-grid">
            {page.outcomes.map((item) => (
              <li key={item} className="ai-city-outcome-card">
                <h3>{item}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Numbered service cards */}
      <section className="ai-city-section" id="capabilities">
        <div className="ai-city-wrap">
          <h2 className="ai-city-section-title ai-city-section-title--sm">
            {page.capabilitiesHeading}
          </h2>
          <p className="ai-city-lead">{page.capabilitiesDescription}</p>
          <ol className="ai-city-service-list">
            {page.capabilities.map((cap, index) => (
              <li key={cap.id} className="ai-city-service-card">
                <span className="ai-city-service-card__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="ai-city-service-card__body">
                  <h3>{cap.title}</h3>
                  <p>{cap.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stat CTA band */}
      <section className="ai-city-stat-band">
        <div className="ai-city-wrap ai-city-stat-band__inner">
          <div>
            <p className="ai-city-stat-band__value">
              {page.trustMetrics[0]?.value ?? "40+"}
            </p>
            <p className="ai-city-stat-band__text">
              {page.trustMetrics[0]?.label ?? "AI features shipped"} for teams
              across {page.stateName}
            </p>
            <p className="ai-city-stat-band__sub">
              Most {page.cityName} projects start with a working prototype in two
              to four weeks once data access is ready.
            </p>
          </div>
          <SwapTextButton onClick={openContact}>Book a free AI consult</SwapTextButton>
        </div>
      </section>

      {/* Tech partners marquee */}
      <section className="ai-city-section ai-city-section--lift">
        <div className="ai-city-wrap">
          <h2 className="ai-city-section-title ai-city-section-title--sm">
            Technology we deploy in {page.cityName}
          </h2>
          <p className="ai-city-lead">{page.techSection.description}</p>
        </div>
        <AiMarquee items={partnerTech} />
        <div className="ai-city-wrap ai-city-tech-grid">
          {page.techStack.map((group) => (
            <div key={group.category} className="ai-city-tech-card">
              <h3>{group.category}</h3>
              <p>{group.description}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Case studies */}
      {caseStudies.length > 0 ? (
        <section className="ai-city-section">
          <div className="ai-city-wrap">
            <h2 className="ai-city-section-title ai-city-section-title--sm">
              AI products we have shipped
            </h2>
            <p className="ai-city-lead">
              Real engineering work from the Mantravi team, built for production
              use.
            </p>
            <ul className="ai-city-case-grid">
              {caseStudies.slice(0, 3).map((study) => (
                <li key={study.slug}>
                  <Link href={`/portfolio/${study.slug}`} className="ai-city-case-card">
                    <span className="ai-city-case-card__tag">
                      {study.industry[0] ?? "Product"}
                    </span>
                    <h3>{study.title}</h3>
                    <p>{study.summary}</p>
                    {study.metrics?.length ? (
                      <ul className="ai-city-case-card__results">
                        {study.metrics.slice(0, 3).map((m) => (
                          <li key={m.label}>
                            <strong>{m.value}</strong> {m.label}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <span className="ai-city-case-card__link">
                      View case study <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Philosophy pillars */}
      <section className="ai-city-section ai-city-section--lift">
        <div className="ai-city-wrap">
          <h2 className="ai-city-section-title ai-city-section-title--sm">
            The Mantravi approach to AI in {page.cityName}
          </h2>
          <ul className="ai-city-pillar-grid">
            {page.differentiators.map((d, i) => (
              <li key={d.title} className="ai-city-pillar-card">
                <span className="ai-city-pillar-card__label">
                  Pillar {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{d.title}</h3>
                <p>{d.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Local context + industries */}
      <section className="ai-city-section">
        <div className="ai-city-wrap ai-city-split">
          <div>
            <h2 className="ai-city-section-title ai-city-section-title--sm">
              Built for {page.cityName} markets
            </h2>
            <p className="ai-city-body">{page.localMarketInsight}</p>
            <h3 className="ai-city-eyebrow">Industries we work with</h3>
            <ul className="ai-city-tag-list">
              {page.industries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside className="ai-city-local-card">
            <h3>Areas we serve near {page.cityName}</h3>
            <ul className="ai-city-tag-list ai-city-tag-list--compact">
              {page.areasServed.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Process */}
      <section className="ai-city-section ai-city-section--lift">
        <div className="ai-city-wrap">
          <h2 className="ai-city-section-title ai-city-section-title--sm">
            {page.processHeading}
          </h2>
          <p className="ai-city-lead">{page.processDescription}</p>
          <ol className="ai-city-process-list">
            {page.processSteps.map((step) => (
              <li key={step.num}>
                <span className="ai-city-process-list__num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="ai-city-cta-band">
        <div className="ai-city-wrap ai-city-cta-band__inner">
          <div>
            <p className="ai-city-cta-band__eyebrow">Your AI partner in {page.cityName}</p>
            <h2 className="ai-city-section-title ai-city-section-title--sm">
              Let Mantravi be your strategic edge in AI
            </h2>
          </div>
          <SwapTextButton onClick={openContact}>
            {`Start AI project in ${page.cityName}`}
          </SwapTextButton>
        </div>
      </section>

      {/* Companion + other cities */}
      {companions.length > 0 ? (
        <section className="ai-city-section">
          <div className="ai-city-wrap">
            <h2 className="ai-city-eyebrow">Also in {page.cityName}</h2>
            <ul className="ai-city-link-row">
              {companions.map((c) => (
                <li key={c.pageType}>
                  <Link href={getLocationPagePath(c.pageType, c.slug)}>
                    {companionLabels[c.pageType] ?? c.title}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {otherAiCities.length > 0 ? (
        <section className="ai-city-section ai-city-section--lift">
          <div className="ai-city-wrap">
            <h2 className="ai-city-eyebrow">AI development across India</h2>
            <ul className="ai-city-city-grid">
              {otherAiCities.map((c) => (
                <li key={c.slug}>
                  <Link href={getLocationPagePath("ai-development-company", c.slug)}>
                    {c.cityName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="ai-city-section ai-city-section--faq" id="faq">
        <div className="ai-city-wrap">
          <h2 className="ai-city-section-title ai-city-section-title--sm">{page.faqHeading}</h2>
          <p className="ai-city-lead">{page.faqDescription}</p>
          <dl className="ai-city-faq">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="ai-city-faq__item">
                <dt>{faq.question}</dt>
                <dd>{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
