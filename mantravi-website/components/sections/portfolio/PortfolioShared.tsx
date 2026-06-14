"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { portfolioSection } from "@/lib/content/site-data";
import { type CaseStudy } from "@/lib/content/case-studies";
import { getCaseStudyImage } from "@/lib/content/case-study-images";
import { cn } from "@/lib/utils";

export function normalizeIndex(index: number, cardCount: number) {
  return ((index % cardCount) + cardCount) % cardCount;
}

export function Portfolio360BottomChrome({
  activeIndex,
  cardCount,
  onPrev,
  onNext,
  onDot,
  onContact,
  items,
}: {
  activeIndex: number;
  cardCount: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (index: number) => void;
  onContact: () => void;
  items: CaseStudy[];
}) {
  return (
    <>
      <div className="portfolio-360-controls">
        <div className="portfolio-360-controls__pager">
          <button
            type="button"
            className="portfolio-360-nav-btn"
            aria-label="Previous project"
            onClick={onPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="portfolio-360-dots" role="tablist" aria-label="Projects">
            {items.map((study, i) => (
              <button
                key={study.slug}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                className={cn(
                  "portfolio-360-dot",
                  i === activeIndex && "is-active",
                )}
                aria-label={`Go to project ${i + 1}`}
                onClick={() => onDot(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="portfolio-360-nav-btn"
            aria-label="Next project"
            onClick={onNext}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          className="portfolio-360-cta-btn"
          onClick={onContact}
        >
          {portfolioSection.ctaPill}
        </button>
      </div>

      <Link href="/portfolio" className="portfolio-360-footer-link">
        {portfolioSection.viewAllLabel} <ArrowRight className="h-4 w-4" />
      </Link>
    </>
  );
}

export function PortfolioDetailCaption({
  study,
  instant = false,
}: {
  study: CaseStudy;
  instant?: boolean;
}) {
  const content = (
    <>
      <h3 className="portfolio-360-detail-title line-clamp-2">{study.title}</h3>
      <p className="portfolio-360-detail-desc line-clamp-2">{study.summary}</p>
      {study.metrics[0] && (
        <p className="portfolio-360-detail-metric">
          {study.metrics[0].value} <span>{study.metrics[0].label}</span>
        </p>
      )}
    </>
  );

  if (instant) {
    return (
      <div key={study.slug} className="portfolio-360-detail-item">
        {content}
      </div>
    );
  }

  return (
    <motion.div
      key={study.slug}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, position: "absolute", left: 0, right: 0 }}
      transition={{ duration: 0.25 }}
      className="portfolio-360-detail-item"
    >
      {content}
    </motion.div>
  );
}

export function CardVisual({
  study,
  isActive,
  imagePriority = false,
  className,
  allowNavigation,
}: {
  study: CaseStudy;
  isActive: boolean;
  imagePriority?: boolean;
  className?: string;
  allowNavigation?: () => boolean;
}) {
  const cardImage = getCaseStudyImage(study, "homepageCarousel");

  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className={cn(
        "portfolio-360-card-inner block h-full",
        isActive && "ring-2 ring-primary/40",
        className,
      )}
      tabIndex={isActive ? 0 : -1}
      draggable={false}
      onClick={(event) => {
        if (allowNavigation && !allowNavigation()) {
          event.preventDefault();
        }
      }}
    >
      <div className="portfolio-360-card-glow" aria-hidden="true" />
      <div
        className={cn(
          "portfolio-360-card-visual bg-gradient-to-br",
          study.gradient || "from-primary/40 to-primary/10",
          isActive && !cardImage && "from-primary/55 to-primary/20",
        )}
      >
        {cardImage ? (
          <Image
            src={cardImage}
            alt=""
            fill
            className="pointer-events-none object-cover"
            sizes="(max-width: 1023px) 85vw, 300px"
            priority={imagePriority}
            loading={imagePriority ? undefined : "lazy"}
            draggable={false}
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
            <div className="absolute right-4 top-4 h-24 w-36 rounded-lg border border-white/15 bg-white/10 shadow-lg">
              <div className="h-2.5 border-b border-white/15 bg-white/10" />
              <div className="space-y-1.5 p-2">
                <div className="h-1.5 w-3/4 rounded bg-white/30" />
                <div className="h-1.5 w-1/2 rounded bg-white/20" />
                <div className="mt-2 h-6 w-full rounded bg-white/25" />
              </div>
            </div>
          </>
        )}
        <div className="portfolio-360-card-overlay" />
        <div className="portfolio-360-card-meta portfolio-360-card-meta--on-card">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            {study.client}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PortfolioSectionHeader() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12 text-center sm:py-16">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        {portfolioSection.eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">
        {portfolioSection.title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-white/65">
        {portfolioSection.description}
      </p>
    </div>
  );
}
