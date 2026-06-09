"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { portfolioSection } from "@/lib/content/site-data";
import { type CaseStudy } from "@/lib/content/case-studies";
import { getCaseStudyImage } from "@/lib/content/case-study-images";
import { cn } from "@/lib/utils";

/** Single pin: intro timeline + carousel rotation share one ScrollTrigger progress */
const CAROUSEL_FADE_START = 0.18;
const ROTATION_DEADZONE = 0.14;
const SCENE_SCRUB = 0.85;
/** Scroll with SHIP only before text→card transition begins */
const INTRO_HOLD_VH = 0.7;
/** Scroll span for SHIP blur/fade + carousel reveal */
const INTRO_TRANSITION_VH = 0.55;
/** Extra viewport scroll after the last card centers before the section unpins */
const CAROUSEL_EXIT_HOLD_VH = 0.55;

function getIntroHoldDistance() {
  if (typeof window === "undefined") return 480;
  return window.innerHeight * INTRO_HOLD_VH;
}

function getIntroTransitionDistance() {
  if (typeof window === "undefined") return 320;
  return window.innerHeight * INTRO_TRANSITION_VH;
}

function getIntroScrollDistance() {
  return getIntroHoldDistance() + getIntroTransitionDistance();
}

function getCarouselCardScrollDistance(cardCount: number) {
  if (typeof window === "undefined") return 1650;
  return window.innerHeight * (1.1 + cardCount * 0.74);
}

function getCarouselHoldDistance() {
  if (typeof window === "undefined") return 420;
  return window.innerHeight * CAROUSEL_EXIT_HOLD_VH;
}

function getCarouselScrollDistance(cardCount: number) {
  return getCarouselCardScrollDistance(cardCount) + getCarouselHoldDistance();
}

function getCarouselActivePortion(cardCount: number) {
  const total = getCarouselScrollDistance(cardCount);
  if (total <= 0) return 1;
  return getCarouselCardScrollDistance(cardCount) / total;
}

function rawCarouselPhaseToVisualPhase(rawPhase: number, cardCount: number) {
  const activePortion = getCarouselActivePortion(cardCount);
  if (activePortion <= 0) return Math.min(1, rawPhase);
  return Math.min(1, rawPhase / activePortion);
}

function visualCarouselPhaseToRawPhase(visualPhase: number, cardCount: number) {
  return visualPhase * getCarouselActivePortion(cardCount);
}

function maxVisualProgress(cardCount: number) {
  if (cardCount <= 1) return 0;
  return (cardCount - 1) / cardCount;
}

function angleStep(cardCount: number) {
  return 360 / cardCount;
}

function cardWidthFromStage(width: number) {
  if (width < 768) return Math.min(280, Math.max(230, width * 0.68));
  return Math.min(245, Math.max(165, width * 0.2));
}

/** Tight ring radius so adjacent cards sit close like Appinventiv's 360 carousel */
function radiusFromStageWidth(width: number, cardCount: number) {
  const cardWidth = cardWidthFromStage(width);
  const halfAngle = Math.PI / Math.max(2, cardCount);
  const edgeGapRatio = 0.06;
  const chord = cardWidth * (1 + edgeGapRatio);
  return Math.round(chord / (2 * Math.sin(halfAngle)));
}


function carouselPhaseFromIndex(index: number, cardCount: number) {
  const maxVis = maxVisualProgress(cardCount);
  const visual = visualProgressFromIndex(index, cardCount);
  if (maxVis <= 0 || visual <= 0) return 0;
  const raw = visual / maxVis;
  return ROTATION_DEADZONE + raw * (1 - ROTATION_DEADZONE);
}

function visualFromCarouselPhase(phase: number, cardCount: number) {
  if (phase <= ROTATION_DEADZONE) return 0;
  const normalized =
    (phase - ROTATION_DEADZONE) / (1 - ROTATION_DEADZONE);
  return normalized * maxVisualProgress(cardCount);
}

function normalizeIndex(index: number, cardCount: number) {
  return ((index % cardCount) + cardCount) % cardCount;
}

function rotationToIndex(degrees: number, cardCount: number) {
  const step = angleStep(cardCount);
  const normalized = ((degrees % 360) + 360) % 360;
  return normalizeIndex(Math.round(normalized / step), cardCount);
}

function visualProgressFromIndex(index: number, cardCount: number) {
  if (cardCount <= 1) return 0;
  return normalizeIndex(index, cardCount) / cardCount;
}

function scrollPosForIndex(
  index: number,
  cardCount: number,
  sceneSt: ScrollTrigger,
  introPortion: number,
) {
  const carouselPhase = carouselPhaseFromIndex(index, cardCount);
  const carouselRawPhase =
    carouselPhase <= 0 ? 0.001 : visualCarouselPhaseToRawPhase(carouselPhase, cardCount);
  const overallProgress =
    introPortion + carouselRawPhase * (1 - introPortion);
  return sceneSt.start + overallProgress * (sceneSt.end - sceneSt.start);
}

function applyCarouselVisual(
  visualProgress: number,
  cardCount: number,
  ring: HTMLDivElement,
  syncCardStates: (rotationDeg: number, active: number) => void,
  setActiveIndexIfChanged: (index: number) => void,
) {
  const maxVis = maxVisualProgress(cardCount);
  const carouselProgress = gsap.utils.clamp(0, maxVis, visualProgress);
  const rotationDeg = carouselProgress * 360;
  const active = rotationToIndex(rotationDeg, cardCount);
  gsap.set(ring, { rotateY: -rotationDeg, force3D: true });
  syncCardStates(rotationDeg, active);
  setActiveIndexIfChanged(active);
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
  const cardImage = getCaseStudyImage(study, "homepageCarousel");

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
          isActive && !cardImage && "from-primary/55 to-primary/20",
        )}
      >
        {cardImage ? (
          <Image
            src={cardImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 72vw, 280px"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
            <div className="absolute right-4 top-4 h-24 w-36 rounded-lg border border-white/15 bg-white/10 backdrop-blur-sm shadow-lg">
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
        <div className="portfolio-360-card-meta">
          <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
            {study.client}
          </span>
        </div>
      </div>
    </Link>
  );
}

function Portfolio360Fallback({ items }: { items: CaseStudy[] }) {
  const cardCount = items.length;
  const [active, setActive] = useState(0);
  const study = items[active] ?? items[0];
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
              onClick={() =>
                setActive((i) => normalizeIndex(i - 1, cardCount))
              }
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
              onClick={() =>
                setActive((i) => normalizeIndex(i + 1, cardCount))
              }
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

function Portfolio360Experience({ items }: { items: CaseStudy[] }) {
  const cardCount = items.length;
  const step = angleStep(cardCount);

  const triggerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const focusBackdropRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const introScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const lenis = useLenis();

  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(320);
  const { openContact } = useContact();

  const activeStudy = items[activeIndex] ?? items[0];

  const setActiveIndexIfChanged = useCallback((index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const syncCardStates = useCallback(
    (rotationDeg: number, active: number) => {
      if (!ringRef.current) return;
      const cards = ringRef.current.querySelectorAll<HTMLElement>(
        "[data-carousel-card]",
      );
      cards.forEach((card, i) => {
        const cardAngle = (i * step + rotationDeg) % 360;
        const dist = Math.min(Math.abs(cardAngle), Math.abs(360 - cardAngle));
        const isActive = i === active;
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const sideScaleMin = isMobile ? 0.68 : 0.74;
        const sideOpacityMin = isMobile ? 0.38 : 0.5;
        const scale = isActive ? 1 : Math.max(sideScaleMin, 1 - dist / 200);
        card.style.setProperty("--card-scale", String(scale));
        card.style.opacity = String(
          isActive ? 1 : Math.max(sideOpacityMin, 1 - dist / 110),
        );
        card.style.filter = isActive
          ? "none"
          : `blur(${Math.min(1.5, dist / 60)}px) brightness(0.82)`;
        card.style.zIndex = String(isActive ? 10 : Math.max(1, 6 - Math.round(dist / 25)));
        card.classList.toggle("is-active", isActive);
      });
    },
    [step],
  );

  const goToIndex = useCallback(
    (index: number) => {
      const target = normalizeIndex(index, cardCount);
      const sceneSt = introScrollTriggerRef.current;
      if (!sceneSt) {
        setActiveIndex(target);
        return;
      }

      const introDistance = getIntroScrollDistance();
      const carouselDistance = getCarouselScrollDistance(cardCount);
      const introPortion =
        introDistance / (introDistance + carouselDistance);
      const scrollPos = scrollPosForIndex(
        target,
        cardCount,
        sceneSt,
        introPortion,
      );

      if (lenis) {
        lenis.scrollTo(scrollPos, { duration: 1.1 });
      } else {
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
      }
    },
    [lenis, cardCount],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateRadius = () => {
      setRadius(radiusFromStageWidth(stage.clientWidth, cardCount));
    };

    updateRadius();
    const observer = new ResizeObserver(updateRadius);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [cardCount]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const scene = sceneRef.current;
    const intro = introRef.current;
    const focusBackdrop = focusBackdropRef.current;
    const carouselWrap = carouselWrapRef.current;
    const ring = ringRef.current;

    if (!trigger || !scene || !intro || !focusBackdrop || !carouselWrap || !ring)
      return;

    const introDistance = getIntroScrollDistance();
    const introHoldDistance = getIntroHoldDistance();
    const introHoldRatio =
      introDistance > 0 ? introHoldDistance / introDistance : 0;
    const carouselDistance = getCarouselScrollDistance(cardCount);
    const totalDistance = introDistance + carouselDistance;
    const introPortion = introDistance / totalDistance;

    const applyVisual = (visual: number) => {
      applyCarouselVisual(
        visual,
        cardCount,
        ring,
        syncCardStates,
        setActiveIndexIfChanged,
      );
    };

    const syncCarouselPhase = (phase: number) => {
      const visual = visualFromCarouselPhase(phase, cardCount);
      applyVisual(visual);
    };

    const syncSceneProgress = (progress: number) => {
      if (progress <= introPortion) {
        const introProgress = progress / introPortion;
        if (introProgress <= introHoldRatio) {
          introTl.progress(0);
        } else {
          const transitionProgress =
            (introProgress - introHoldRatio) / (1 - introHoldRatio);
          introTl.progress(transitionProgress);
        }
        syncCarouselPhase(0);
        return;
      }

      introTl.progress(1);
      const carouselRawPhase = (progress - introPortion) / (1 - introPortion);
      const carouselPhase = rawCarouselPhaseToVisualPhase(
        carouselRawPhase,
        cardCount,
      );
      syncCarouselPhase(carouselPhase);
    };

    gsap.set(intro, { opacity: 1, scale: 1, filter: "none", visibility: "visible" });
    gsap.set(focusBackdrop, { opacity: 0 });
    gsap.set(carouselWrap, { autoAlpha: 0, y: 28, scale: 0.97 });

    const introTl = gsap.timeline({ paused: true });

    introTl
      .to(
        intro,
        {
          opacity: 0,
          scale: 1.015,
          filter: "blur(14px)",
          duration: 0.42,
          ease: "power2.inOut",
        },
        0,
      )
      .fromTo(
        focusBackdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.38, ease: "power1.out" },
        0.06,
      )
      .fromTo(
        carouselWrap,
        { autoAlpha: 0, y: 28, scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          ease: "power2.out",
        },
        CAROUSEL_FADE_START,
      );

    const sceneSt = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: `+=${totalDistance}`,
      pin: scene,
      scrub: SCENE_SCRUB,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      id: "portfolio-scene",
      onUpdate: (self) => syncSceneProgress(self.progress),
      onRefresh: (self) => syncSceneProgress(self.progress),
    });

    introScrollTriggerRef.current = sceneSt;
    applyVisual(0);
    syncSceneProgress(sceneSt.progress);

    return () => {
      sceneSt.kill();
      introTl.kill();
      introScrollTriggerRef.current = null;
    };
  }, [cardCount, syncCardStates, setActiveIndexIfChanged]);

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
              <span className="portfolio-360-intro-title title-display">
                {portfolioSection.introTitle}
              </span>
            </div>
            <span className="portfolio-360-intro-suffix">
              {portfolioSection.introSuffix}
            </span>
          </div>
        </div>

        <div
          ref={focusBackdropRef}
          className="portfolio-360-focus-backdrop"
          aria-hidden="true"
        />

        <div ref={carouselWrapRef} className="portfolio-360-carousel-wrap">
          <div className="portfolio-360-stage-area">
            <div ref={stageRef} className="portfolio-360-stage">
              <div className="portfolio-360-scene-inner">
                <div className="portfolio-360-ring-pivot">
                  <div ref={ringRef} className="portfolio-360-ring">
                    {items.map((study, i) => (
                      <div
                        key={study.slug}
                        data-carousel-card
                        className={cn(
                          "portfolio-360-card",
                          i === activeIndex && "is-active",
                        )}
                        style={
                          {
                            "--angle": `${i * step}deg`,
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
              {items.map((study, i) => (
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

export function PortfolioShowcaseSectionClient({
  items,
}: {
  items: CaseStudy[];
}) {
  const reducedMotion = useReducedMotion();

  if (items.length === 0) return null;

  if (reducedMotion) {
    return <Portfolio360Fallback items={items} />;
  }

  return <Portfolio360Experience items={items} />;
}
