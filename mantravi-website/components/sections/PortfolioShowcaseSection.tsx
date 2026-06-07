"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { portfolioSection } from "@/lib/content/site-data";
import {
  getCarouselCaseStudies,
  type CaseStudy,
} from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";

const CAROUSEL_ITEMS = getCarouselCaseStudies();
const CARD_COUNT = CAROUSEL_ITEMS.length;
const ANGLE_STEP = 360 / CARD_COUNT;
const INTRO_PORTION = 0.15;
const CAROUSEL_PORTION = 1 - INTRO_PORTION;

function radiusFromStageWidth(width: number) {
  if (width < 768) return Math.min(260, Math.max(180, width * 0.42));
  return Math.min(400, Math.max(240, width * 0.38));
}

function getScrollDistance() {
  if (typeof window === "undefined") return 2800;
  return window.innerHeight * (1.2 + CARD_COUNT * 0.45);
}

function normalizeIndex(index: number) {
  return ((index % CARD_COUNT) + CARD_COUNT) % CARD_COUNT;
}

function rotationToIndex(degrees: number) {
  const normalized = ((degrees % 360) + 360) % 360;
  return normalizeIndex(Math.round(normalized / ANGLE_STEP));
}

function progressFromIndex(index: number) {
  return (
    INTRO_PORTION + (normalizeIndex(index) / CARD_COUNT) * CAROUSEL_PORTION
  );
}

function applyCarouselProgress(
  p: number,
  ring: HTMLDivElement,
  syncCardStates: (rotationDeg: number, active: number) => void,
  setActiveIndex: (index: number) => void,
) {
  let carouselProgress = 0;
  let active = 0;

  if (p > INTRO_PORTION) {
    carouselProgress = (p - INTRO_PORTION) / CAROUSEL_PORTION;
    carouselProgress = Math.min(1, Math.max(0, carouselProgress));
    active = rotationToIndex(carouselProgress * 360);
  }

  const rotateY = -carouselProgress * 360;
  gsap.set(ring, { rotateY });
  syncCardStates(carouselProgress * 360, active);
  setActiveIndex(active);
}

function PortfolioDetailCaption({ study }: { study: CaseStudy }) {
  return (
    <motion.div
      key={study.slug}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="portfolio-360-detail-item"
    >
      <h3 className="portfolio-360-detail-title line-clamp-2">{study.title}</h3>
      <p className="portfolio-360-detail-desc line-clamp-2">{study.summary}</p>
      {study.metrics[0] && (
        <p className="portfolio-360-detail-metric">
          {study.metrics[0].value} <span>{study.metrics[0].label}</span>
        </p>
      )}
    </motion.div>
  );
}

function CardVisual({
  study,
  isActive,
}: {
  study: CaseStudy;
  isActive: boolean;
}) {
  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className={cn(
        "portfolio-360-card-inner block h-full",
        isActive && "ring-2 ring-primary/40",
      )}
      tabIndex={isActive ? 0 : -1}
    >
      <div className="portfolio-360-card-glow" aria-hidden="true" />
      <div
        className={cn(
          "portfolio-360-card-visual bg-gradient-to-br",
          study.gradient || "from-primary/40 to-primary/10",
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute right-4 top-4 h-24 w-36 rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm shadow-lg">
          <div className="h-2.5 border-b border-white/15 bg-white/10" />
          <div className="space-y-1.5 p-2">
            <div className="h-1.5 w-3/4 rounded bg-white/30" />
            <div className="h-1.5 w-1/2 rounded bg-white/20" />
            <div className="mt-2 h-6 w-full rounded bg-white/25" />
          </div>
        </div>
        <div className="portfolio-360-card-overlay" />
        <div className="portfolio-360-card-meta">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {study.client}
          </span>
        </div>
      </div>
    </Link>
  );
}

function Portfolio360Fallback() {
  const [active, setActive] = useState(0);
  const study = CAROUSEL_ITEMS[active];
  const { openContact } = useContact();

  return (
    <section id="portfolio" className="portfolio-360-scene">
      <div className="portfolio-360-grain grain-overlay" aria-hidden="true" />
      <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
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
      <div className="mx-auto w-full max-w-md px-6">
        <CardVisual study={study} isActive />
        <div className="portfolio-360-bottom static max-w-none px-0">
          <div className="portfolio-360-details">
            <AnimatePresence mode="wait">
              <PortfolioDetailCaption study={study} />
            </AnimatePresence>
          </div>
          <div className="portfolio-360-controls">
            <button
              type="button"
              className="portfolio-360-nav-btn"
              aria-label="Previous project"
              onClick={() => setActive((i) => normalizeIndex(i - 1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="portfolio-360-cta-pill"
              onClick={openContact}
            >
              {portfolioSection.ctaPill}
            </button>
            <button
              type="button"
              className="portfolio-360-nav-btn"
              aria-label="Next project"
              onClick={() => setActive((i) => normalizeIndex(i + 1))}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <Link href="/portfolio" className="portfolio-360-footer-link">
            {portfolioSection.viewAllLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Portfolio360Experience() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const lenis = useLenis();

  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(320);
  const { openContact } = useContact();

  const activeStudy = CAROUSEL_ITEMS[activeIndex];

  const syncCardStates = useCallback((rotationDeg: number, active: number) => {
    if (!ringRef.current) return;
    const cards = ringRef.current.querySelectorAll<HTMLElement>(
      "[data-carousel-card]",
    );
    cards.forEach((card, i) => {
      const cardAngle = (i * ANGLE_STEP + rotationDeg) % 360;
      const dist = Math.min(Math.abs(cardAngle), Math.abs(360 - cardAngle));
      const isActive = i === active;
      card.style.opacity = String(isActive ? 1 : Math.max(0.35, 1 - dist / 90));
      card.style.filter = isActive
        ? "blur(0px)"
        : `blur(${Math.min(2, dist / 45)}px)`;
      card.classList.toggle("is-active", isActive);
    });
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      const target = normalizeIndex(index);
      const st = scrollTriggerRef.current;
      if (!st) {
        setActiveIndex(target);
        return;
      }

      const targetProgress = progressFromIndex(target);
      const scrollPos = st.start + (st.end - st.start) * targetProgress;

      if (lenis) {
        lenis.scrollTo(scrollPos, { duration: 1.1 });
      } else {
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
      }
    },
    [lenis],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateRadius = () => {
      setRadius(radiusFromStageWidth(stage.clientWidth));
    };

    updateRadius();
    const observer = new ResizeObserver(updateRadius);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const scene = sceneRef.current;
    const intro = introRef.current;
    const carouselWrap = carouselWrapRef.current;
    const ring = ringRef.current;

    if (!trigger || !scene || !intro || !carouselWrap || !ring) return;

    const scrollDistance = getScrollDistance();

    const syncFromProgress = (p: number) => {
      applyCarouselProgress(p, ring, syncCardStates, setActiveIndex);
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: scene,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => syncFromProgress(self.progress),
        onRefresh: (self) => syncFromProgress(self.progress),
      },
    });

    tl.to(
      intro,
      {
        opacity: 0,
        scale: 1.02,
        filter: "blur(16px)",
        duration: 0.2,
        ease: "power2.inOut",
      },
      0,
    ).fromTo(
      carouselWrap,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" },
      0.1,
    );

    scrollTriggerRef.current = tl.scrollTrigger ?? null;
    syncFromProgress(tl.scrollTrigger?.progress ?? 0);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tl.scrollTrigger?.kill();
      tl.kill();
      scrollTriggerRef.current = null;
    };
  }, [syncCardStates]);

  return (
    <div ref={triggerRef} className="portfolio-360-trigger" id="portfolio">
      <section
        ref={sceneRef}
        className="portfolio-360-scene"
        aria-label="Portfolio showcase"
      >
        <div className="portfolio-360-grain grain-overlay" aria-hidden="true" />

        <div ref={introRef} className="portfolio-360-intro">
          <div className="portfolio-360-intro-lockup">
            <div className="portfolio-360-intro-hero">
              <span className="portfolio-360-intro-label">
                {portfolioSection.introLabel}
              </span>
              <span className="portfolio-360-intro-title">
                {portfolioSection.introTitle}
              </span>
            </div>
            <span className="portfolio-360-intro-suffix">
              {portfolioSection.introSuffix}
            </span>
          </div>
        </div>

        <div ref={carouselWrapRef} className="portfolio-360-carousel-wrap">
          <div className="portfolio-360-stage-area">
            <div ref={stageRef} className="portfolio-360-stage">
              <div className="portfolio-360-scene-inner">
                <div className="portfolio-360-ring-pivot">
                  <div ref={ringRef} className="portfolio-360-ring">
                    {CAROUSEL_ITEMS.map((study, i) => (
                      <div
                        key={study.slug}
                        data-carousel-card
                        className={cn(
                          "portfolio-360-card",
                          i === activeIndex && "is-active",
                        )}
                        style={
                          {
                            "--angle": `${i * ANGLE_STEP}deg`,
                            "--radius": `${radius}px`,
                          } as React.CSSProperties
                        }
                      >
                        <CardVisual
                          study={study}
                          isActive={i === activeIndex}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="portfolio-360-bottom">
            <div className="portfolio-360-details">
              <AnimatePresence mode="wait">
                <PortfolioDetailCaption study={activeStudy} />
              </AnimatePresence>
            </div>

            <div className="portfolio-360-controls">
              <button
                type="button"
                className="portfolio-360-nav-btn"
                aria-label="Previous project"
                onClick={() => goToIndex(activeIndex - 1)}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className="portfolio-360-cta-pill"
                onClick={openContact}
              >
                {portfolioSection.ctaPill}
              </button>
              <button
                type="button"
                className="portfolio-360-nav-btn"
                aria-label="Next project"
                onClick={() => goToIndex(activeIndex + 1)}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="portfolio-360-dots" aria-hidden="true">
              {CAROUSEL_ITEMS.map((study, i) => (
                <button
                  key={study.slug}
                  type="button"
                  className={cn(
                    "portfolio-360-dot",
                    i === activeIndex && "is-active",
                  )}
                  aria-label={`Go to project ${i + 1}`}
                  onClick={() => goToIndex(i)}
                />
              ))}
            </div>

            <Link href="/portfolio" className="portfolio-360-footer-link">
              {portfolioSection.viewAllLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PortfolioShowcaseSection() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <Portfolio360Fallback />;
  }

  return <Portfolio360Experience />;
}
