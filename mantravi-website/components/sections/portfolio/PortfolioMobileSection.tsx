"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContact } from "@/components/providers/ContactProvider";
import { type CaseStudy } from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";
import { getStableViewportHeight } from "@/lib/utils/scroll-profile";
import { syncEmblaToFloatIndex } from "@/lib/utils/portfolio-embla-sync";
import {
  PORTFOLIO_EMBLA_DURATION,
  PORTFOLIO_NAV_DURATION,
  PORTFOLIO_SCRUB_NATIVE,
  PORTFOLIO_SETTLE_EASE,
  PORTFOLIO_SNAP_DELAY,
  PORTFOLIO_SNAP_DURATION_TOUCH,
  PORTFOLIO_SNAP_EASE,
} from "@/lib/utils/portfolio-motion";
import { wrapCardIndex } from "@/lib/utils/portfolio-mobile-scroll";
import {
  CardVisual,
  Portfolio360BottomChrome,
  PortfolioDetailCaption,
  PortfolioIntroLockup,
} from "./PortfolioShared";

const INTRO_HOLD_VH = 0.45;
const INTRO_TRANSITION_VH = 0.4;
const CARD_STEP_VH = 0.58;
const EXIT_HOLD_VH = 0.38;
const NAV_DURATION = PORTFOLIO_NAV_DURATION;
const NAV_EASE = PORTFOLIO_SETTLE_EASE;
const EMBLA_DURATION = PORTFOLIO_EMBLA_DURATION;

type MobileLayout = {
  totalDistance: number;
  introHold: number;
  introTransition: number;
  introDistance: number;
  carouselDistance: number;
  exitDistance: number;
  introPortion: number;
  carouselPortion: number;
  exitPortion: number;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function getMobileLayout(cardCount: number): MobileLayout {
  const vh = getStableViewportHeight();
  const introHold = vh * INTRO_HOLD_VH;
  const introTransition = vh * INTRO_TRANSITION_VH;
  const introDistance = introHold + introTransition;
  const carouselDistance = vh * CARD_STEP_VH * Math.max(1, cardCount - 1);
  const exitDistance = vh * EXIT_HOLD_VH;
  const totalDistance = introDistance + carouselDistance + exitDistance;

  return {
    totalDistance,
    introHold,
    introTransition,
    introDistance,
    carouselDistance,
    exitDistance,
    introPortion: introDistance / totalDistance,
    carouselPortion: carouselDistance / totalDistance,
    exitPortion: exitDistance / totalDistance,
  };
}

function progressForCard(
  index: number,
  cardCount: number,
  layout: MobileLayout,
) {
  if (cardCount <= 1) return layout.introPortion;
  const phase = clamp(index / (cardCount - 1));
  return layout.introPortion + phase * layout.carouselPortion;
}

function cardIndexFromProgress(
  progress: number,
  cardCount: number,
  layout: MobileLayout,
) {
  if (cardCount <= 1 || progress <= layout.introPortion) return 0;
  const afterIntro = progress - layout.introPortion;
  if (afterIntro >= layout.carouselPortion) return cardCount - 1;
  const phase = clamp(afterIntro / layout.carouselPortion);
  return Math.round(phase * (cardCount - 1));
}

function buildSnapPoints(cardCount: number, layout: MobileLayout) {
  const points = new Set<number>([0, layout.introPortion, 1]);
  for (let i = 0; i < cardCount; i++) {
    points.add(progressForCard(i, cardCount, layout));
  }
  return [...points].sort((a, b) => a - b);
}

function nearestSnapProgress(
  progress: number,
  cardCount: number,
  layout: MobileLayout,
) {
  const points = buildSnapPoints(cardCount, layout);
  let nearest = points[0];
  let minDist = Math.abs(progress - nearest);

  for (const point of points) {
    const dist = Math.abs(progress - point);
    if (dist < minDist) {
      minDist = dist;
      nearest = point;
    }
  }

  return nearest;
}

function resolveMobileSnapProgress(
  progress: number,
  direction: number,
  cardCount: number,
  layout: MobileLayout,
) {
  if (progress < layout.introPortion * 0.55) {
    return direction < 0 ? 0 : progress < layout.introPortion * 0.35 ? 0 : layout.introPortion;
  }

  if (progress < layout.introPortion) {
    return direction >= 0 ? layout.introPortion : 0;
  }

  return nearestSnapProgress(progress, cardCount, layout);
}

function scrollYForProgress(progress: number, sceneSt: ScrollTrigger) {
  return sceneSt.start + progress * (sceneSt.end - sceneSt.start);
}

export function PortfolioMobileSection({ items }: { items: CaseStudy[] }) {
  const cardCount = items.length;
  const { openContact } = useContact();
  const [activeIndex, setActiveIndex] = useState(0);

  const triggerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneStRef = useRef<ScrollTrigger | null>(null);
  const layoutRef = useRef<MobileLayout | null>(null);
  const snapPointsRef = useRef<number[]>([]);
  const activeIndexRef = useRef(0);
  const settledCardRef = useRef(0);
  const navTweenRef = useRef<gsap.core.Tween | null>(null);
  const isEmblaDraggingRef = useRef(false);
  const isProgrammaticRef = useRef(false);
  const clickAllowedRef = useRef(true);
  const gestureActiveRef = useRef(false);
  const gestureBaseCardRef = useRef(0);
  const hasEnteredCarouselRef = useRef(false);
  const suppressIntroRef = useRef(false);
  const gestureSnapLockedRef = useRef(false);
  const visualFloatRef = useRef(0);
  const isVerticalScrollingRef = useRef(false);
  const navLockRef = useRef(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    axis: "x",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
    duration: EMBLA_DURATION,
    skipSnaps: false,
  });

  const setActiveIndexIfChanged = useCallback((index: number) => {
    const idx = Math.max(0, Math.min(index, cardCount - 1));
    if (activeIndexRef.current === idx) return;
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  }, [cardCount]);

  const syncEmblaToIndex = useCallback(
    (index: number, animate = false) => {
      if (!emblaApi) return;
      const target = wrapCardIndex(index, cardCount);
      if (emblaApi.selectedScrollSnap() === target && !animate) return;
      emblaApi.scrollTo(target, !animate);
    },
    [cardCount, emblaApi],
  );

  const syncIntroFromProgress = useCallback((progress: number) => {
    const layout = layoutRef.current;
    if (!layout) return;

    if (progress >= layout.introPortion * 0.9) {
      hasEnteredCarouselRef.current = true;
    } else if (progress <= layout.introHold / layout.totalDistance * 0.85) {
      hasEnteredCarouselRef.current = false;
    }

    if (
      suppressIntroRef.current ||
      (hasEnteredCarouselRef.current && progress >= layout.introPortion * 0.82)
    ) {
      if (introRef.current) {
        introRef.current.style.opacity = "0";
        introRef.current.style.transform = "translate3d(0, -24px, 0)";
      }
      if (backdropRef.current) {
        backdropRef.current.style.opacity = "1";
      }
      if (carouselWrapRef.current) {
        carouselWrapRef.current.style.opacity = "1";
        carouselWrapRef.current.style.transform = "translate3d(0, 0, 0)";
        carouselWrapRef.current.style.pointerEvents = "auto";
      }
      return;
    }

    const introStart = layout.introHold / layout.totalDistance;
    const reveal = clamp(
      (progress - introStart) /
        (layout.introTransition / layout.totalDistance),
    );

    if (introRef.current) {
      introRef.current.style.opacity = String(1 - reveal);
      introRef.current.style.transform = `translate3d(0, ${-24 * reveal}px, 0)`;
    }

    if (backdropRef.current) {
      backdropRef.current.style.opacity = String(reveal);
    }

    if (carouselWrapRef.current) {
      carouselWrapRef.current.style.opacity = String(reveal);
      carouselWrapRef.current.style.transform = `translate3d(0, ${14 * (1 - reveal)}px, 0)`;
      carouselWrapRef.current.style.pointerEvents = reveal > 0.4 ? "auto" : "none";
    }
  }, []);

  const commitCardIndex = useCallback(
    (index: number) => {
      const idx = Math.max(0, Math.min(index, cardCount - 1));
      settledCardRef.current = idx;
      syncEmblaToIndex(idx, false);
      setActiveIndexIfChanged(idx);
    },
    [cardCount, setActiveIndexIfChanged, syncEmblaToIndex],
  );

  const resolveSnapProgress = useCallback(
    (progress: number, direction: number) => {
      const layout = layoutRef.current;
      if (!layout) return progress;
      return resolveMobileSnapProgress(progress, direction, cardCount, layout);
    },
    [cardCount],
  );

  const setMobileSlideVisual = useCallback(
    (floatIdx: number) => {
      const track = trackRef.current;
      if (!track) return Math.round(floatIdx);

      const nearest = Math.max(0, Math.min(cardCount - 1, Math.round(floatIdx)));
      visualFloatRef.current = floatIdx;

      const slides = track.children;
      for (let i = 0; i < slides.length; i++) {
        const dist = Math.abs(i - floatIdx);
        const scale = Math.max(0.88, 1 - dist * 0.1);
        const opacity = Math.max(0.62, 1 - dist * 0.32);
        const slide = slides[i] as HTMLElement;
        const card = slide.querySelector<HTMLElement>(".portfolio-mobile-card");

        slide.classList.toggle("is-active", i === nearest);

        if (card) {
          card.style.transform = `scale(${scale}) translateZ(0)`;
          card.style.opacity = String(opacity);
        }
      }

      setActiveIndexIfChanged(nearest);
      return nearest;
    },
    [cardCount, setActiveIndexIfChanged],
  );

  const clearMobileSlideVisual = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = track.children;
    for (let i = 0; i < slides.length; i++) {
      const card = slides[i].querySelector<HTMLElement>(".portfolio-mobile-card");
      if (card) {
        card.style.removeProperty("transform");
        card.style.removeProperty("opacity");
      }
    }
  }, []);

  const syncCarouselFromProgress = useCallback(
    (progress: number) => {
      const layout = layoutRef.current;
      if (!layout || progress < layout.introPortion * 0.65) return;

      const afterIntro = progress - layout.introPortion;
      const phase = clamp(afterIntro / layout.carouselPortion);
      const floatIdx = phase * (cardCount - 1);

      syncEmblaToFloatIndex(emblaApi ?? undefined, floatIdx, cardCount);
      setMobileSlideVisual(floatIdx);
    },
    [cardCount, emblaApi, setMobileSlideVisual],
  );

  const syncSceneProgress = useCallback(
    (progress: number) => {
      syncIntroFromProgress(progress);

      if (isEmblaDraggingRef.current) return;
      if (isProgrammaticRef.current && suppressIntroRef.current) return;

      syncCarouselFromProgress(progress);
    },
    [syncCarouselFromProgress, syncIntroFromProgress],
  );

  const scrollToProgress = useCallback((progress: number, duration = NAV_DURATION) => {
    const sceneSt = sceneStRef.current;
    if (!sceneSt) return;

    const targetY = scrollYForProgress(clamp(progress), sceneSt);
    const motion = { y: window.scrollY };

    navTweenRef.current?.kill();
    isProgrammaticRef.current = true;

    navTweenRef.current = gsap.to(motion, {
      y: targetY,
      duration,
      ease: NAV_EASE,
      overwrite: true,
      onUpdate: () => {
        window.scrollTo(0, motion.y);
        ScrollTrigger.update();
      },
      onComplete: () => {
        window.scrollTo(0, targetY);
        ScrollTrigger.update();
        navTweenRef.current = null;
        isProgrammaticRef.current = false;
        suppressIntroRef.current = false;
      },
    });
  }, []);

  const goToCard = useCallback(
    (index: number, syncScroll = true, fromControls = false) => {
      if (fromControls && navLockRef.current) return;

      const layout = layoutRef.current;
      const target = wrapCardIndex(index, cardCount);
      if (fromControls && target === activeIndexRef.current) return;

      settledCardRef.current = target;

      if (fromControls) {
        navLockRef.current = true;
        window.setTimeout(() => {
          navLockRef.current = false;
        }, 520);
        suppressIntroRef.current = true;
        hasEnteredCarouselRef.current = true;
        syncIntroFromProgress(layout?.introPortion ?? 1);
      }

      isProgrammaticRef.current = true;
      syncEmblaToIndex(target, true);
      setActiveIndexIfChanged(target);

      if (layout && syncScroll) {
        const cardProgress = progressForCard(target, cardCount, layout);
        scrollToProgress(Math.max(layout.introPortion, cardProgress));
      } else {
        window.setTimeout(() => {
          isProgrammaticRef.current = false;
          if (fromControls) suppressIntroRef.current = false;
        }, 480);
      }
    },
    [
      cardCount,
      scrollToProgress,
      setActiveIndexIfChanged,
      syncEmblaToIndex,
      syncIntroFromProgress,
    ],
  );

  const goToPrev = useCallback(() => {
    goToCard(activeIndexRef.current - 1, true, true);
  }, [goToCard]);

  const goToNext = useCallback(() => {
    goToCard(activeIndexRef.current + 1, true, true);
  }, [goToCard]);

  const guardCardNavigation = useCallback(() => clickAllowedRef.current, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      if (isProgrammaticRef.current) return;
      setActiveIndexIfChanged(emblaApi.selectedScrollSnap());
    };

    const onPointerDown = () => {
      isEmblaDraggingRef.current = true;
      clickAllowedRef.current = false;
      sceneRef.current?.classList.add("is-embla-dragging");
    };

    const onSettle = () => {
      isEmblaDraggingRef.current = false;
      clickAllowedRef.current = true;
      sceneRef.current?.classList.remove("is-embla-dragging");

      if (isProgrammaticRef.current) return;

      const layout = layoutRef.current;
      const idx = emblaApi.selectedScrollSnap();
      commitCardIndex(idx);

      if (layout) {
        hasEnteredCarouselRef.current = true;
        suppressIntroRef.current = true;
        scrollToProgress(
          Math.max(layout.introPortion, progressForCard(idx, cardCount, layout)),
        );
      }
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("settle", onSettle);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("settle", onSettle);
    };
  }, [cardCount, commitCardIndex, emblaApi, scrollToProgress]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const trigger = triggerRef.current;
    const scene = sceneRef.current;
    if (!trigger || !scene) return;

    const buildLayout = () => {
      layoutRef.current = getMobileLayout(cardCount);
      snapPointsRef.current = buildSnapPoints(cardCount, layoutRef.current);
      return layoutRef.current;
    };

    const layout = buildLayout();

    const sceneSt = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: () => `+=${buildLayout().totalDistance}`,
      pin: scene,
      scrub: PORTFOLIO_SCRUB_NATIVE,
      fastScrollEnd: false,
      anticipatePin: 0,
      invalidateOnRefresh: true,
      id: "portfolio-mobile-controller",
      snap: {
        snapTo: (progress, self) =>
          resolveSnapProgress(progress, self?.direction ?? 0),
        duration: PORTFOLIO_SNAP_DURATION_TOUCH,
        delay: PORTFOLIO_SNAP_DELAY,
        ease: PORTFOLIO_SNAP_EASE,
        inertia: false,
      },
      onUpdate: (self) => syncSceneProgress(self.progress),
      onRefresh: (self) => syncSceneProgress(self.progress),
      onSnapComplete: (self) => {
        if (isEmblaDraggingRef.current || isProgrammaticRef.current) return;

        const layoutNow = layoutRef.current ?? layout;
        const idx = cardIndexFromProgress(self.progress, cardCount, layoutNow);
        commitCardIndex(idx);
        setMobileSlideVisual(idx);
        clearMobileSlideVisual();
      },
    });

    sceneStRef.current = sceneSt;
    syncSceneProgress(sceneSt.progress);
    ScrollTrigger.refresh();

    return () => {
      navTweenRef.current?.kill();
      sceneSt.kill();
      sceneStRef.current = null;
    };
  }, [cardCount, commitCardIndex, clearMobileSlideVisual, resolveSnapProgress, scrollToProgress, setMobileSlideVisual, syncCarouselFromProgress, syncSceneProgress]);

  useEffect(() => {
    const scene = sceneRef.current;

    const onTouchStart = () => {
      const layout = layoutRef.current;
      const sceneSt = sceneStRef.current;
      if (!layout || !sceneSt || sceneSt.progress < layout.introPortion * 0.85) return;

      gestureActiveRef.current = true;
      gestureSnapLockedRef.current = false;
      gestureBaseCardRef.current = settledCardRef.current;
      isVerticalScrollingRef.current = true;
      scene?.classList.add("is-vertical-scrolling");
    };

    const onTouchEnd = () => {
      window.setTimeout(() => {
        gestureActiveRef.current = false;
        gestureSnapLockedRef.current = false;
        isVerticalScrollingRef.current = false;
        scene?.classList.remove("is-vertical-scrolling");
        clearMobileSlideVisual();
      }, 320);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      scene?.classList.remove("is-vertical-scrolling");
    };
  }, [clearMobileSlideVisual]);

  const activeStudy = items[activeIndex] ?? items[0];

  return (
    <div ref={triggerRef} className="portfolio-mobile-trigger">
      <section
        ref={sceneRef}
        id="portfolio"
        className="portfolio-mobile-scene"
        aria-label="Portfolio showcase"
      >
        <div ref={introRef} className="portfolio-mobile-intro">
          <PortfolioIntroLockup />
        </div>

        <div
          ref={backdropRef}
          className="portfolio-mobile-backdrop"
          aria-hidden="true"
        />

        <div ref={carouselWrapRef} className="portfolio-mobile-carousel-wrap">
          <div className="portfolio-mobile-viewport" ref={emblaRef}>
            <div className="portfolio-mobile-track" ref={trackRef}>
              {items.map((study, i) => (
                <div
                  key={study.slug}
                  className={cn(
                    "portfolio-mobile-slide",
                    i === activeIndex && "is-active",
                  )}
                >
                  <div className="portfolio-mobile-card">
                    <CardVisual
                      study={study}
                      isActive={i === activeIndex}
                      imagePriority={i === 0}
                      allowNavigation={guardCardNavigation}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="portfolio-360-bottom portfolio-mobile-bottom static mx-auto max-w-none px-0">
            <div className="portfolio-360-details">
              <PortfolioDetailCaption study={activeStudy} instant />
            </div>
            <Portfolio360BottomChrome
              activeIndex={activeIndex}
              cardCount={cardCount}
              items={items}
              onPrev={goToPrev}
              onNext={goToNext}
              onDot={(index) => goToCard(index, true, true)}
              onContact={openContact}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
