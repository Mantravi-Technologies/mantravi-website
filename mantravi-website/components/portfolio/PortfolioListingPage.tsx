"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getCaseStudyImage } from "@/lib/content/case-study-images";
import {
  getIndustryLabel,
  getRegionLabel,
  getServiceLabel,
} from "@/lib/content/case-study-page";
import { CTASection } from "@/components/sections/HomeCTASections";
import type { CaseStudy } from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";

function PortfolioCard({ study, index }: { study: CaseStudy; index: number }) {
  const cover = getCaseStudyImage(study, "portfolioListing");
  const primaryMetric = study.metrics[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="portfolio-index-card group"
    >
      <Link
        href={`/portfolio/${study.slug}`}
        className="portfolio-index-card__link"
      >
        <div
          className={cn(
            "portfolio-index-card__visual",
            !cover &&
              cn(
                "bg-gradient-to-br",
                study.gradient || "from-slate-800 to-slate-950",
              ),
          )}
        >
          {cover && (
            <Image
              src={cover}
              alt=""
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
          <div className="portfolio-index-card__visual-noise" aria-hidden />
          <div className="portfolio-index-card__visual-gradient" aria-hidden />
          <div className="portfolio-index-card__hover-cta">
            <span>Open case study</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </div>
          {primaryMetric && (
            <div className="portfolio-index-card__metric-pill">
              <strong>{primaryMetric.value}</strong>
              <span>{primaryMetric.label}</span>
            </div>
          )}
        </div>

        <div className="portfolio-index-card__body">
          <div className="portfolio-index-card__meta">
            <span className="portfolio-index-card__client">{study.client}</span>
            <span className="portfolio-index-card__region">
              {getRegionLabel(study.region)}
            </span>
          </div>
          <h2 className="portfolio-index-card__title">{study.title}</h2>
          <p className="portfolio-index-card__summary">{study.summary}</p>
          <div className="portfolio-index-card__tags">
            {study.industry.slice(0, 1).map((id) => (
              <span key={id}>{getIndustryLabel(id)}</span>
            ))}
            {study.services.slice(0, 2).map((id) => (
              <span key={id}>{getServiceLabel(id)}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function PortfolioListingPage({ studies }: { studies: CaseStudy[] }) {
  const [visibleCount, setVisibleCount] = useState(9);
  const visible = studies.slice(0, visibleCount);

  return (
    <main className="portfolio-index">
      <header className="portfolio-index-hero">
        <div className="portfolio-index-hero__grid" aria-hidden />
        <div className="portfolio-index-hero__inner">
          <h1 className="portfolio-index-hero__title">
            Work built for
            <span className="portfolio-index-hero__title-accent">
              real users
            </span>
            and real outcomes
          </h1>
          <p className="portfolio-index-hero__lede">
            Case studies across mobile, web, and AI. Each project focused on
            usability, performance, and results you can measure.
          </p>
        </div>
      </header>

      <section className="portfolio-index-grid-section">
        <div className="portfolio-index-grid-section__inner">
          <div className="portfolio-index-grid">
            {visible.map((study, i) => (
              <PortfolioCard key={study.slug} study={study} index={i} />
            ))}
          </div>

          {visibleCount < studies.length && (
            <div className="portfolio-index-more">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + 6)}
                className="portfolio-index-more__btn"
              >
                Load more work
                <span className="portfolio-index-more__count">
                  {studies.length - visibleCount} remaining
                </span>
              </button>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </main>
  );
}
