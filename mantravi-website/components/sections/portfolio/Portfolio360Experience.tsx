"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import { useContact } from "@/components/providers/ContactProvider";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { type CaseStudy } from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";
import {
  getStableViewportHeight,
  isMobilePerfProfile,
} from "@/lib/utils/scroll-profile";
import {
  PORTFOLIO_SCRUB_SMOOTH,
  PORTFOLIO_SETTLE_DURATION,
  PORTFOLIO_SETTLE_EASE,
  PORTFOLIO_SNAP_DELAY,
  PORTFOLIO_SNAP_DURATION,
  PORTFOLIO_SNAP_EASE,
} from "@/lib/utils/portfolio-motion";
import {
  CardVisual,
  Portfolio360BottomChrome,
  PortfolioDetailCaption,
  PortfolioIntroLockup,
} from "./PortfolioShared";

/** Single pin: intro timeline + carousel rotation share one ScrollTrigger progress */
const CAROUSEL_FADE_START = 0.18;
const ROTATION_DEADZONE = 0.1;
/** Scroll with SHIP only before text→card transition begins */
const INTRO_HOLD_VH = 0.7;
/** Scroll span for SHIP blur/fade + carousel reveal */
const INTRO_TRANSITION_VH = 0.55;
/** Extra viewport scroll after the last card centers before the section unpins */
const CAROUSEL_EXIT_HOLD_VH = 0.55;

const MOBILE_INTRO_HOLD_VH = 0.45;
const MOBILE_INTRO_TRANSITION_VH = 0.35;
/** Viewport height of scroll per card step on mobile (even steps between cards) */
const MOBILE_CAROUSEL_STEP_VH = 0.4;
const MOBILE_EXIT_HOLD_VH = 0.2;
const MOBILE_ROTATION_DEADZONE = 0.02;
/** Fraction of one step scroll needed to advance to the next card */
const MOBILE_GESTURE_COMMIT_RATIO = 0.2;
/** Smooth settle when a mobile gesture completes */
const MOBILE_CARD_SETTLE_DURATION = PORTFOLIO_SETTLE_DURATION;
const MOBILE_CARD_SETTLE_EASE = PORTFOLIO_SETTLE_EASE;
const easeGestureProgress = gsap.parseEase("power2.out");

function getScrollMetrics() {
  return {
    introHoldVh: INTRO_HOLD_VH,
    introTransitionVh: INTRO_TRANSITION_VH,
    carouselPerCard: 0.74,
    carouselBaseVh: 1.1,
    exitHoldVh: CAROUSEL_EXIT_HOLD_VH,
    rotationDeadzone: ROTATION_DEADZONE,
  };
}

function getRotationDeadzone() {
  return getScrollMetrics().rotationDeadzone;
}

function getIntroHoldDistance() {
  if (typeof window === "undefined") return 480;
  return getStableViewportHeight() * getScrollMetrics().introHoldVh;
}

function getIntroTransitionDistance() {
  if (typeof window === "undefined") return 320;
  return getStableViewportHeight() * getScrollMetrics().introTransitionVh;
}

function getIntroScrollDistance() {
  return getIntroHoldDistance() + getIntroTransitionDistance();
}

function getCarouselCardScrollDistance(cardCount: number) {
  if (typeof window === "undefined") return 1650;
  const { carouselPerCard, carouselBaseVh } = getScrollMetrics();
  const vh = getStableViewportHeight();
  const steps = Math.max(1, cardCount - 1);
  return vh * (carouselBaseVh + steps * carouselPerCard);
}

function getCarouselHoldDistance() {
  if (typeof window === "undefined") return 420;
  return getStableViewportHeight() * getScrollMetrics().exitHoldVh;
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
  if (width < 768) return Math.min(238, Math.max(195, width * 0.58));
  return Math.min(258, Math.max(170, width * 0.2));
}

function overallProgressForCardIndex(
  index: number,
  cardCount: number,
  introPortion: number,
) {
  const carouselPhase = carouselPhaseFromIndex(index, cardCount);
  const carouselRawPhase = visualCarouselPhaseToRawPhase(
    carouselPhase,
    cardCount,
  );
  return introPortion + carouselRawPhase * (1 - introPortion);
}

/** Discrete ScrollTrigger snap targets — one per card center plus intro + section end */
function buildCarouselSnapPoints(cardCount: number, introPortion: number) {
  const points = new Set<number>([0, introPortion, 1]);
  for (let i = 0; i < cardCount; i++) {
    points.add(overallProgressForCardIndex(i, cardCount, introPortion));
  }
  return [...points].sort((a, b) => a - b);
}

function isInCarouselProgress(
  progress: number,
  introPortion: number,
  cardCount: number,
) {
  if (progress <= introPortion) return false;
  const carouselRaw = (progress - introPortion) / (1 - introPortion);
  return carouselRaw < getCarouselActivePortion(cardCount);
}

function getCarouselStepScrollPx(
  totalScrollDistance: number,
  cardCount: number,
  introPortion: number,
) {
  const span = totalScrollDistance * (1 - introPortion);
  const carouselSpan = span * getCarouselActivePortion(cardCount);
  const steps = Math.max(1, cardCount - 1);
  return carouselSpan / steps;
}

function visualProgressBetweenIndices(
  fromIndex: number,
  toIndex: number,
  fraction: number,
  cardCount: number,
) {
  const fromVisual = visualProgressFromIndex(fromIndex, cardCount);
  const toVisual = visualProgressFromIndex(toIndex, cardCount);
  return fromVisual + (toVisual - fromVisual) * gsap.utils.clamp(0, 1, fraction);
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
  const deadzone = getRotationDeadzone();
  const maxVis = maxVisualProgress(cardCount);
  const visual = visualProgressFromIndex(index, cardCount);
  if (maxVis <= 0 || visual <= 0) return deadzone;
  const raw = visual / maxVis;
  return deadzone + raw * (1 - deadzone);
}

function visualFromCarouselPhase(phase: number, cardCount: number) {
  const deadzone = getRotationDeadzone();
  if (phase <= deadzone) return 0;
  const normalized = (phase - deadzone) / (1 - deadzone);
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
  onActiveIndex: (index: number) => void,
) {
  const maxVis = maxVisualProgress(cardCount);
  const carouselProgress = gsap.utils.clamp(0, maxVis, visualProgress);
  const rotationDeg = carouselProgress * 360;
  const active = rotationToIndex(rotationDeg, cardCount);
  gsap.set(ring, { rotateY: -rotationDeg, force3D: true });
  syncCardStates(rotationDeg, active);
  onActiveIndex(active);
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
  const mobilePerfRef = useRef(false);
  const captionIdleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const gestureStartIndexRef = useRef(0);
  const gestureStartScrollRef = useRef(0);
  const isCarouselGesturingRef = useRef(false);
  const isFinalizingGestureRef = useRef(false);
  const isAnimatingCardRef = useRef(false);
  const carouselStepPxRef = useRef(400);
  const syncRafRef = useRef<number | null>(null);
  const pendingSyncRef = useRef<{ rotationDeg: number; active: number } | null>(
    null,
  );
  const cardCacheRef = useRef<
    Map<
      number,
      {
        scale: string;
        opacity: string;
        filter: string;
        zIndex: string;
        isActive: boolean;
      }
    >
  >(new Map());
  const lenis = useLenis();

  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(320);
  const [instantCaption, setInstantCaption] = useState(false);
  const { openContact } = useContact();

  const activeStudy = items[activeIndex] ?? items[0];

  useEffect(() => {
    mobilePerfRef.current = isMobilePerfProfile();
    setInstantCaption(isMobilePerfProfile());
  }, []);

  const setActiveIndexIfChanged = useCallback((index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const setActiveIndexFromScroll = useCallback(
    (index: number) => {
      if (!mobilePerfRef.current) {
        setActiveIndexIfChanged(index);
        return;
      }

      if (captionIdleTimerRef.current) {
        clearTimeout(captionIdleTimerRef.current);
      }

      captionIdleTimerRef.current = setTimeout(() => {
        setActiveIndexIfChanged(index);
      }, 120);
    },
    [setActiveIndexIfChanged],
  );

  const applyCardStates = useCallback(
    (rotationDeg: number, active: number) => {
      if (!ringRef.current) return;

      const mobilePerf = mobilePerfRef.current;
      const cards = ringRef.current.querySelectorAll<HTMLElement>(
        "[data-carousel-card]",
      );
      const sideScaleMin = mobilePerf ? 0.68 : 0.74;
      const sideOpacityMin = mobilePerf ? 0.38 : 0.5;

      cards.forEach((card, i) => {
        const cardAngle = (i * step + rotationDeg) % 360;
        const dist = Math.min(Math.abs(cardAngle), Math.abs(360 - cardAngle));
        const isActiveCard = i === active;
        const scale = isActiveCard
          ? 1
          : Math.max(sideScaleMin, 1 - dist / 200);
        const opacity = isActiveCard
          ? 1
          : Math.max(sideOpacityMin, 1 - dist / 110);
        const scaleStr = String(scale);
        const opacityStr = String(opacity);
        const filterStr =
          isActiveCard || mobilePerf
            ? "none"
            : `blur(${Math.min(1.5, dist / 60)}px) brightness(0.82)`;
        const zIndexStr = String(
          isActiveCard ? 10 : Math.max(1, 6 - Math.round(dist / 25)),
        );

        const cached = cardCacheRef.current.get(i);
        if (
          cached &&
          cached.scale === scaleStr &&
          cached.opacity === opacityStr &&
          cached.filter === filterStr &&
          cached.zIndex === zIndexStr &&
          cached.isActive === isActiveCard
        ) {
          return;
        }

        card.style.setProperty("--card-scale", scaleStr);
        card.style.opacity = opacityStr;
        card.style.filter = filterStr;
        card.style.zIndex = zIndexStr;
        card.classList.toggle("is-active", isActiveCard);

        cardCacheRef.current.set(i, {
          scale: scaleStr,
          opacity: opacityStr,
          filter: filterStr,
          zIndex: zIndexStr,
          isActive: isActiveCard,
        });
      });
    },
    [step],
  );

  const syncCardStates = useCallback(
    (rotationDeg: number, active: number) => {
      pendingSyncRef.current = { rotationDeg, active };
      if (syncRafRef.current !== null) return;

      syncRafRef.current = requestAnimationFrame(() => {
        syncRafRef.current = null;
        const pending = pendingSyncRef.current;
        if (!pending) return;
        applyCardStates(pending.rotationDeg, pending.active);
      });
    },
    [applyCardStates],
  );

  useEffect(
    () => () => {
      if (syncRafRef.current !== null) {
        cancelAnimationFrame(syncRafRef.current);
      }
      if (captionIdleTimerRef.current) {
        clearTimeout(captionIdleTimerRef.current);
      }
    },
    [],
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

      setActiveIndexIfChanged(target);

      if (lenis) {
        lenis.scrollTo(scrollPos, { duration: 1.35 });
      } else {
        window.scrollTo({ top: scrollPos, behavior: "smooth" });
      }
    },
    [lenis, cardCount, setActiveIndexIfChanged],
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateRadius = () => {
      setRadius(radiusFromStageWidth(stage.clientWidth, cardCount));
    };

    updateRadius();

    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      updateRadius();
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        if (document.documentElement.classList.contains("is-scrolling")) return;
        ScrollTrigger.refresh();
      }, 200);
    });
    observer.observe(stage);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      observer.disconnect();
    };
  }, [cardCount]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mobilePerf = isMobilePerfProfile();
    if (mobilePerf) {
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

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
    const carouselSnapPoints = buildCarouselSnapPoints(cardCount, introPortion);
    let sceneSt: ScrollTrigger;

    const applyVisual = (visual: number) => {
      applyCarouselVisual(
        visual,
        cardCount,
        ring,
        syncCardStates,
        setActiveIndexFromScroll,
      );
    };

    const updateCarouselStepPx = () => {
      carouselStepPxRef.current = getCarouselStepScrollPx(
        totalDistance,
        cardCount,
        introPortion,
      );
    };

    const syncCarouselPhase = (phase: number) => {
      if (
        mobilePerf &&
        isCarouselGesturingRef.current &&
        !isFinalizingGestureRef.current
      ) {
        const delta = window.scrollY - gestureStartScrollRef.current;
        const stepPx = carouselStepPxRef.current;
        const startIdx = gestureStartIndexRef.current;

        let targetIdx = startIdx;
        if (delta > 0) {
          targetIdx = Math.min(startIdx + 1, cardCount - 1);
        } else if (delta < 0) {
          targetIdx = Math.max(startIdx - 1, 0);
        }

        if (targetIdx === startIdx) {
          applyVisual(visualProgressFromIndex(startIdx, cardCount));
          return;
        }

        const rawFrac = Math.min(1, Math.abs(delta) / stepPx);
        const frac = easeGestureProgress(rawFrac);
        applyVisual(
          visualProgressBetweenIndices(startIdx, targetIdx, frac, cardCount),
        );
        return;
      }

      const visual = visualFromCarouselPhase(phase, cardCount);
      applyVisual(visual);
    };

    let cardSettleTween: gsap.core.Tween | null = null;

    const finalizeCarouselGesture = () => {
      if (!mobilePerf || isFinalizingGestureRef.current || !sceneSt) return;
      if (!isCarouselGesturingRef.current) return;

      isFinalizingGestureRef.current = true;
      isCarouselGesturingRef.current = false;

      const delta = window.scrollY - gestureStartScrollRef.current;
      const stepPx = carouselStepPxRef.current;
      const startIdx = gestureStartIndexRef.current;

      let targetIdx = startIdx;
      if (delta > stepPx * MOBILE_GESTURE_COMMIT_RATIO) {
        targetIdx = Math.min(startIdx + 1, cardCount - 1);
      } else if (delta < -stepPx * MOBILE_GESTURE_COMMIT_RATIO) {
        targetIdx = Math.max(startIdx - 1, 0);
      }

      const endVisual = visualProgressFromIndex(targetIdx, cardCount);
      const endScroll = scrollPosForIndex(
        targetIdx,
        cardCount,
        sceneSt,
        introPortion,
      );

      let startVisual = visualProgressFromIndex(startIdx, cardCount);
      if (targetIdx !== startIdx) {
        const rawFrac = Math.min(1, Math.abs(delta) / stepPx);
        startVisual = visualProgressBetweenIndices(
          startIdx,
          targetIdx,
          easeGestureProgress(rawFrac),
          cardCount,
        );
      }

      cardSettleTween?.kill();
      isAnimatingCardRef.current = true;

      const motion = { visual: startVisual, scroll: window.scrollY };

      cardSettleTween = gsap.to(motion, {
        visual: endVisual,
        scroll: endScroll,
        duration:
          targetIdx === startIdx
            ? MOBILE_CARD_SETTLE_DURATION * 0.55
            : MOBILE_CARD_SETTLE_DURATION,
        ease: MOBILE_CARD_SETTLE_EASE,
        overwrite: true,
        onUpdate: () => {
          window.scrollTo(0, motion.scroll);
          applyVisual(motion.visual);
          ScrollTrigger.update();
        },
        onComplete: () => {
          gestureStartIndexRef.current = targetIdx;
          activeIndexRef.current = targetIdx;
          setActiveIndexIfChanged(targetIdx);
          isAnimatingCardRef.current = false;
          isFinalizingGestureRef.current = false;
          cardSettleTween = null;
        },
      });
    };

    let finalizeTimer: ReturnType<typeof setTimeout> | undefined;

    const scheduleFinalizeGesture = () => {
      if (
        !mobilePerf ||
        !isCarouselGesturingRef.current ||
        isAnimatingCardRef.current
      ) {
        return;
      }
      if (finalizeTimer) clearTimeout(finalizeTimer);
      finalizeTimer = setTimeout(finalizeCarouselGesture, 90);
    };

    const beginCarouselGesture = () => {
      if (
        !mobilePerf ||
        isFinalizingGestureRef.current ||
        isAnimatingCardRef.current ||
        !sceneSt
      ) {
        return;
      }
      if (!isInCarouselProgress(sceneSt.progress, introPortion, cardCount)) {
        return;
      }

      isCarouselGesturingRef.current = true;
      gestureStartScrollRef.current = window.scrollY;
      gestureStartIndexRef.current = activeIndexRef.current;
    };

    const onTouchStart = () => beginCarouselGesture();
    const onTouchEnd = () => scheduleFinalizeGesture();
    const onGestureScroll = () => scheduleFinalizeGesture();

    const syncSceneProgress = (progress: number) => {
      if (isAnimatingCardRef.current) return;

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

      if (
        mobilePerf &&
        isInCarouselProgress(progress, introPortion, cardCount) &&
        !isCarouselGesturingRef.current &&
        !isFinalizingGestureRef.current
      ) {
        isCarouselGesturingRef.current = true;
        gestureStartScrollRef.current = window.scrollY;
        gestureStartIndexRef.current = activeIndexRef.current;
      }

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

    introTl.to(
      intro,
      mobilePerf
        ? {
            opacity: 0,
            scale: 1.015,
            duration: 0.42,
            ease: "power2.inOut",
          }
        : {
            opacity: 0,
            scale: 1.015,
            filter: "blur(14px)",
            duration: 0.42,
            ease: "power2.inOut",
          },
      0,
    );

    introTl
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

    sceneSt = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: `+=${totalDistance}`,
      pin: scene,
      scrub: PORTFOLIO_SCRUB_SMOOTH,
      ...(mobilePerf
        ? {}
        : {
            snap: {
              snapTo: carouselSnapPoints,
              directional: true,
              duration: PORTFOLIO_SNAP_DURATION,
              delay: PORTFOLIO_SNAP_DELAY,
              ease: PORTFOLIO_SNAP_EASE,
              inertia: false,
            },
          }),
      fastScrollEnd: false,
      anticipatePin: mobilePerf ? 0 : 1,
      invalidateOnRefresh: true,
      id: "portfolio-scene",
      onUpdate: (self) => syncSceneProgress(self.progress),
      onSnapComplete: (self) => syncSceneProgress(self.progress),
      onRefresh: (self) => {
        updateCarouselStepPx();
        syncSceneProgress(self.progress);
      },
    });

    introScrollTriggerRef.current = sceneSt;
    updateCarouselStepPx();
    applyVisual(0);
    syncSceneProgress(sceneSt.progress);
    ScrollTrigger.refresh();

    if (mobilePerf) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("touchcancel", onTouchEnd, { passive: true });
      window.addEventListener("scroll", onGestureScroll, { passive: true });
    }

    return () => {
      cardSettleTween?.kill();
      if (finalizeTimer) clearTimeout(finalizeTimer);
      isAnimatingCardRef.current = false;
      if (mobilePerf) {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchcancel", onTouchEnd);
        window.removeEventListener("scroll", onGestureScroll);
      }
      sceneSt.kill();
      introTl.kill();
      introScrollTriggerRef.current = null;
    };
  }, [cardCount, syncCardStates, setActiveIndexFromScroll, setActiveIndexIfChanged]);

  return (
    <div ref={triggerRef} className="portfolio-360-trigger" id="portfolio">
      <section
        ref={sceneRef}
        className="portfolio-360-scene"
        aria-label="Portfolio showcase"
      >
        <div className="portfolio-360-grain grain-overlay" aria-hidden="true" />

        <div ref={introRef} className="portfolio-360-intro">
          <PortfolioIntroLockup />
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
                          imagePriority={i === 0}
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
              {instantCaption ? (
                <PortfolioDetailCaption study={activeStudy} instant />
              ) : (
                <AnimatePresence mode="wait">
                  <PortfolioDetailCaption study={activeStudy} />
                </AnimatePresence>
              )}
            </div>

            <Portfolio360BottomChrome
              activeIndex={activeIndex}
              cardCount={cardCount}
              items={items}
              onPrev={() => goToIndex(activeIndex - 1)}
              onNext={() => goToIndex(activeIndex + 1)}
              onDot={goToIndex}
              onContact={openContact}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio360Experience;
