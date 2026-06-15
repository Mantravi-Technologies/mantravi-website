"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContact } from "@/components/providers/ContactProvider";
import { type CaseStudy } from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";
import {
  getExitCommitProgress,
  getLastCardSnapProgress,
  getSectionExitProgress,
  getSwipeIntroHoldRatio,
  getSwipeScrollLayout,
  isInSwipeCarouselZone,
  scrollProgressForCardIndex,
  SWIPE_CARD_SETTLE_DURATION,
  SWIPE_CAROUSEL_FADE_START,
} from "@/lib/utils/portfolio-intro-scroll";
import {
  easeGestureFraction,
  getCarouselStepPx,
  getSwipeExitHoldPx,
  isInSwipeGestureZone,
  resolveGestureTarget,
  resolveInterimCardIndex,
  scrollYForProgress,
  wrapCardIndex,
} from "@/lib/utils/portfolio-mobile-scroll";
import { isCoarsePointer } from "@/lib/utils/scroll-profile";
import {
  CardVisual,
  Portfolio360BottomChrome,
  PortfolioDetailCaption,
  PortfolioIntroLockup,
} from "./PortfolioShared";

const GESTURE_FINALIZE_MS = 140;
const GESTURE_SETTLE_EASE = "power3.out";

export function PortfolioSwipeSection({ items }: { items: CaseStudy[] }) {
  const cardCount = items.length;
  const { openContact } = useContact();
  const [activeIndex, setActiveIndex] = useState(0);
  const clickAllowedRef = useRef(true);

  const triggerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const focusBackdropRef = useRef<HTMLDivElement>(null);
  const carouselWrapRef = useRef<HTMLDivElement>(null);
  const sceneStRef = useRef<ScrollTrigger | null>(null);
  const emblaApiRef = useRef<ReturnType<typeof useEmblaCarousel>[1]>(null);
  const activeIndexRef = useRef(0);
  const settledCardRef = useRef(0);
  const pendingCardRef = useRef<number | null>(null);
  const isProgrammaticRef = useRef(false);
  const isProgrammaticEmblaScrollRef = useRef(false);
  const navTweenRef = useRef<gsap.core.Tween | null>(null);
  const gestureStartIndexRef = useRef(0);
  const gestureStartScrollRef = useRef(0);
  const isCarouselGesturingRef = useRef(false);
  const isFinalizingGestureRef = useRef(false);
  const isAnimatingGestureRef = useRef(false);
  const isTouchActiveRef = useRef(false);
  const previewCardRef = useRef(-1);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    axis: "x",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
    duration: 24,
    skipSnaps: false,
  });

  useEffect(() => {
    emblaApiRef.current = emblaApi;
  }, [emblaApi]);

  const flushCaptionIndex = useCallback((index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const applyCardIndex = useCallback(
    (index: number, animateEmbla = false) => {
      const idx = Math.max(0, Math.min(index, cardCount - 1));
      settledCardRef.current = idx;
      gestureStartIndexRef.current = idx;
      previewCardRef.current = idx;

      if (emblaApiRef.current?.selectedScrollSnap() !== idx) {
        isProgrammaticEmblaScrollRef.current = true;
        emblaApiRef.current?.scrollTo(idx, animateEmbla);
      }
      flushCaptionIndex(idx);
    },
    [cardCount, flushCaptionIndex],
  );

  const previewCardIndex = useCallback(
    (index: number, animateEmbla = true) => {
      const idx = Math.max(0, Math.min(index, cardCount - 1));
      if (previewCardRef.current === idx) return;
      previewCardRef.current = idx;

      if (emblaApiRef.current?.selectedScrollSnap() !== idx) {
        isProgrammaticEmblaScrollRef.current = true;
        emblaApiRef.current?.scrollTo(idx, animateEmbla);
      }
      flushCaptionIndex(idx);
    },
    [cardCount, flushCaptionIndex],
  );

  const scrollToProgress = useCallback(
    (
      progress: number,
      immediate: boolean,
      duration: number,
      onDone?: () => void,
    ) => {
      const sceneSt = sceneStRef.current;
      if (!sceneSt) {
        onDone?.();
        return;
      }

      const scrollPos = scrollYForProgress(progress, sceneSt);
      navTweenRef.current?.kill();

      if (immediate || Math.abs(window.scrollY - scrollPos) < 2) {
        window.scrollTo(0, scrollPos);
        ScrollTrigger.update();
        onDone?.();
        return;
      }

      const motion = { scroll: window.scrollY };

      navTweenRef.current = gsap.to(motion, {
        scroll: scrollPos,
        duration,
        ease: GESTURE_SETTLE_EASE,
        overwrite: true,
        onUpdate: () => {
          window.scrollTo(0, motion.scroll);
        },
        onComplete: () => {
          ScrollTrigger.update();
          navTweenRef.current = null;
          onDone?.();
        },
      });
    },
    [],
  );

  const scrollToCardIndex = useCallback(
    (
      index: number,
      immediate: boolean,
      duration = 0.38,
      onDone?: () => void,
    ) => {
      const layout = getSwipeScrollLayout(cardCount);
      const progress = scrollProgressForCardIndex(index, cardCount, layout);
      scrollToProgress(progress, immediate, duration, onDone);
    },
    [cardCount, scrollToProgress],
  );

  useEffect(
    () => () => {
      navTweenRef.current?.kill();
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onReInit = () => {
      const idx = emblaApi.selectedScrollSnap();
      settledCardRef.current = idx;
      gestureStartIndexRef.current = idx;
      flushCaptionIndex(idx);
    };

    const onSettle = () => {
      clickAllowedRef.current = true;

      if (isProgrammaticEmblaScrollRef.current) {
        isProgrammaticEmblaScrollRef.current = false;
        return;
      }

      if (isProgrammaticRef.current) return;

      const idx = emblaApi.selectedScrollSnap();
      if (idx === settledCardRef.current) return;

      settledCardRef.current = idx;
      gestureStartIndexRef.current = idx;
      flushCaptionIndex(idx);

      isProgrammaticRef.current = true;
      scrollToCardIndex(idx, true, 0.38, () => {
        isProgrammaticRef.current = false;
      });
    };

    const onPointerDown = () => {
      clickAllowedRef.current = false;
    };

    settledCardRef.current = emblaApi.selectedScrollSnap();
    gestureStartIndexRef.current = emblaApi.selectedScrollSnap();
    flushCaptionIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("settle", onSettle);
    emblaApi.on("reInit", onReInit);
    emblaApi.on("pointerDown", onPointerDown);

    return () => {
      emblaApi.off("settle", onSettle);
      emblaApi.off("reInit", onReInit);
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi, flushCaptionIndex, scrollToCardIndex]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const scene = sceneRef.current;
    const intro = introRef.current;
    const focusBackdrop = focusBackdropRef.current;
    const carouselWrap = carouselWrapRef.current;

    if (!trigger || !scene || !intro || !focusBackdrop || !carouselWrap) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    ScrollTrigger.config({ ignoreMobileResize: true });

    if (prefersReducedMotion) {
      gsap.set(intro, { autoAlpha: 0 });
      gsap.set(focusBackdrop, { opacity: 0 });
      gsap.set(carouselWrap, { autoAlpha: 1, y: 0, scale: 1 });
      return;
    }

    const layout = getSwipeScrollLayout(cardCount);
    const introHoldRatio = getSwipeIntroHoldRatio();
    const lastCardProgress = getLastCardSnapProgress(cardCount, layout);
    const sectionExitProgress = getSectionExitProgress();
    const exitCommitProgress = getExitCommitProgress(layout);
    const useMobileGesture = isCoarsePointer();
    const carouselStepPx = getCarouselStepPx(cardCount, layout);
    const exitHoldPx = getSwipeExitHoldPx(layout);
    const snapExitDirectional = ScrollTrigger.snapDirectional([
      lastCardProgress,
      sectionExitProgress,
    ]);

    gsap.set(intro, {
      opacity: 1,
      scale: 1,
      visibility: "visible",
      force3D: true,
    });
    gsap.set(focusBackdrop, { opacity: 0 });
    gsap.set(carouselWrap, {
      autoAlpha: 0,
      y: 28,
      scale: 0.97,
      pointerEvents: "none",
      force3D: true,
    });

    const introTl = gsap.timeline({ paused: true });

    introTl.to(
      intro,
      {
        opacity: 0,
        scale: 1.015,
        duration: 0.42,
        ease: "power2.inOut",
        force3D: true,
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
          force3D: true,
          onStart: () => {
            gsap.set(carouselWrap, { pointerEvents: "auto" });
          },
          onReverseComplete: () => {
            gsap.set(carouselWrap, { pointerEvents: "none" });
          },
        },
        SWIPE_CAROUSEL_FADE_START,
      );

    let lastIntroProgress = -1;

    const syncIntroTimeline = (progress: number) => {
      if (layout.introPortion <= 0) return;
      const introProgress = progress / layout.introPortion;
      let tlProgress = 0;
      if (introProgress > introHoldRatio) {
        tlProgress = gsap.utils.clamp(
          0,
          1,
          (introProgress - introHoldRatio) / (1 - introHoldRatio),
        );
      }
      if (Math.abs(tlProgress - lastIntroProgress) < 0.002) return;
      lastIntroProgress = tlProgress;
      introTl.progress(tlProgress);
    };

    const syncGesturePreview = (delta: number) => {
      if (
        !useMobileGesture ||
        !isCarouselGesturingRef.current ||
        isFinalizingGestureRef.current ||
        isAnimatingGestureRef.current
      ) {
        return;
      }

      const startIdx = gestureStartIndexRef.current;
      const interimIdx = resolveInterimCardIndex(
        startIdx,
        delta,
        carouselStepPx,
        cardCount,
      );
      previewCardIndex(interimIdx, true);
    };

    const syncSettledFromProgress = (progress: number) => {
      if (!useMobileGesture || isProgrammaticRef.current) return;

      const lastIdx = cardCount - 1;
      if (progress >= lastCardProgress - 0.001) {
        if (settledCardRef.current !== lastIdx) {
          settledCardRef.current = lastIdx;
          gestureStartIndexRef.current = lastIdx;
          previewCardRef.current = lastIdx;
          isProgrammaticEmblaScrollRef.current = true;
          emblaApiRef.current?.scrollTo(lastIdx, false);
          flushCaptionIndex(lastIdx);
        }
        return;
      }

      if (
        progress > layout.introPortion + 0.001 &&
        isInSwipeCarouselZone(progress, layout)
      ) {
        const idx = Math.max(
          0,
          Math.min(
            lastIdx,
            Math.round(
              ((progress - layout.introPortion) / layout.carouselPortion) *
                (cardCount - 1),
            ),
          ),
        );
        if (settledCardRef.current !== idx) {
          settledCardRef.current = idx;
          gestureStartIndexRef.current = idx;
          previewCardRef.current = idx;
          isProgrammaticEmblaScrollRef.current = true;
          emblaApiRef.current?.scrollTo(idx, false);
          flushCaptionIndex(idx);
        }
      }
    };

    const syncSceneProgress = (progress: number) => {
      if (isAnimatingGestureRef.current) return;

      syncSettledFromProgress(progress);

      if (
        useMobileGesture &&
        isCarouselGesturingRef.current &&
        !isFinalizingGestureRef.current &&
        !isProgrammaticRef.current
      ) {
        const delta = window.scrollY - gestureStartScrollRef.current;
        syncGesturePreview(delta);
      }

      if (
        useMobileGesture &&
        isInSwipeGestureZone(progress, layout) &&
        !isCarouselGesturingRef.current &&
        !isFinalizingGestureRef.current &&
        !isProgrammaticRef.current &&
        isTouchActiveRef.current
      ) {
        isCarouselGesturingRef.current = true;
        gestureStartScrollRef.current = window.scrollY;
        gestureStartIndexRef.current = settledCardRef.current;
      }

      if (progress <= layout.introPortion) {
        syncIntroTimeline(progress);
        if (useMobileGesture && progress <= layout.introPortion * 0.55) {
          settledCardRef.current = 0;
          gestureStartIndexRef.current = 0;
          previewCardRef.current = 0;
        }
        return;
      }

      if (lastIntroProgress !== 1) {
        lastIntroProgress = 1;
        introTl.progress(1);
      }
    };

    const resolveSnapProgress = (progress: number, direction: number) => {
      if (isProgrammaticRef.current) return progress;

      if (progress < layout.introPortion * 0.55) {
        pendingCardRef.current = 0;
        return 0;
      }

      if (progress < layout.introPortion) {
        pendingCardRef.current = 0;
        return direction >= 0 ? layout.introPortion : 0;
      }

      if (progress >= lastCardProgress - 0.0001) {
        pendingCardRef.current = cardCount - 1;

        if (direction < 0) {
          if (progress > exitCommitProgress) {
            return lastCardProgress;
          }
          if (progress > lastCardProgress + 0.002) {
            return snapExitDirectional(progress, direction);
          }
          if (cardCount > 1) {
            const prevIdx = cardCount - 2;
            pendingCardRef.current = prevIdx;
            return scrollProgressForCardIndex(prevIdx, cardCount, layout);
          }
          return lastCardProgress;
        }

        if (progress < exitCommitProgress) {
          return lastCardProgress;
        }
        return sectionExitProgress;
      }

      const settled = settledCardRef.current;

      if (settled <= 0 && direction < 0) {
        pendingCardRef.current = 0;
        return 0;
      }

      const targetIdx =
        direction > 0
          ? Math.min(settled + 1, cardCount - 1)
          : direction < 0
            ? Math.max(settled - 1, 0)
            : settled;

      pendingCardRef.current = targetIdx;
      return scrollProgressForCardIndex(targetIdx, cardCount, layout);
    };

    const commitSnapToCards = () => {
      if (isProgrammaticRef.current) return;

      const idx = pendingCardRef.current ?? settledCardRef.current;
      pendingCardRef.current = null;

      if (
        idx === settledCardRef.current &&
        emblaApiRef.current?.selectedScrollSnap() === idx
      ) {
        return;
      }

      settledCardRef.current = idx;
      gestureStartIndexRef.current = idx;
      isProgrammaticEmblaScrollRef.current = true;
      emblaApiRef.current?.scrollTo(idx, false);
      flushCaptionIndex(idx);
    };

    let finalizeTimer: ReturnType<typeof setTimeout> | undefined;

    const finalizeCarouselGesture = () => {
      const sceneSt = sceneStRef.current;
      if (!useMobileGesture || !sceneSt) return;
      if (!isCarouselGesturingRef.current || isFinalizingGestureRef.current) {
        return;
      }
      if (isProgrammaticRef.current) return;

      isFinalizingGestureRef.current = true;
      isCarouselGesturingRef.current = false;

      const removeGesturingClass = () => {
        scene.classList.remove("portfolio-swipe-scene--gesturing");
      };

      const delta = window.scrollY - gestureStartScrollRef.current;
      const startIdx = gestureStartIndexRef.current;
      const startProgress = scrollProgressForCardIndex(
        startIdx,
        cardCount,
        layout,
      );

      const gesture = resolveGestureTarget({
        startIdx,
        delta,
        stepPx: carouselStepPx,
        exitHoldPx,
        cardCount,
        currentProgress: sceneSt.progress,
        layout,
      });

      const committed =
        gesture.targetIdx !== startIdx ||
        Math.abs(gesture.targetProgress - startProgress) > 0.0001;

      const settleProgress = committed
        ? gesture.targetProgress
        : startProgress;
      const settleIdx = committed ? gesture.targetIdx : startIdx;
      const targetScroll = scrollYForProgress(settleProgress, sceneSt);

      navTweenRef.current?.kill();
      isAnimatingGestureRef.current = true;

      const motion = { scroll: window.scrollY };
      const startScroll = window.scrollY;
      const startEmblaIdx =
        emblaApiRef.current?.selectedScrollSnap() ?? startIdx;

      navTweenRef.current = gsap.to(motion, {
        scroll: targetScroll,
        duration: committed
          ? SWIPE_CARD_SETTLE_DURATION
          : SWIPE_CARD_SETTLE_DURATION * 0.5,
        ease: GESTURE_SETTLE_EASE,
        overwrite: true,
        onUpdate: () => {
          window.scrollTo(0, motion.scroll);
          const frac = gsap.utils.clamp(
            0,
            1,
            Math.abs(motion.scroll - startScroll) /
              Math.max(1, Math.abs(targetScroll - startScroll)),
          );
          const easedFrac = easeGestureFraction(
            frac * carouselStepPx,
            carouselStepPx,
          );
          const interimIdx =
            settleIdx === startEmblaIdx
              ? settleIdx
              : Math.round(
                  startEmblaIdx + (settleIdx - startEmblaIdx) * easedFrac,
                );
          if (emblaApiRef.current?.selectedScrollSnap() !== interimIdx) {
            isProgrammaticEmblaScrollRef.current = true;
            emblaApiRef.current?.scrollTo(interimIdx, false);
            flushCaptionIndex(interimIdx);
          }
        },
        onComplete: () => {
          ScrollTrigger.update();
          isAnimatingGestureRef.current = false;
          isFinalizingGestureRef.current = false;
          navTweenRef.current = null;

          if (gesture.exitingSection && committed) {
            settledCardRef.current = cardCount - 1;
            gestureStartIndexRef.current = cardCount - 1;
            previewCardRef.current = cardCount - 1;
            removeGesturingClass();
            return;
          }

          if (gesture.showingIntro && committed) {
            settledCardRef.current = 0;
            gestureStartIndexRef.current = 0;
            previewCardRef.current = 0;
            applyCardIndex(0, true);
            removeGesturingClass();
            return;
          }

          applyCardIndex(settleIdx, true);
          removeGesturingClass();
        },
      });
    };

    const scheduleFinalizeGesture = () => {
      if (
        !useMobileGesture ||
        !isCarouselGesturingRef.current ||
        isAnimatingGestureRef.current ||
        isProgrammaticRef.current
      ) {
        return;
      }
      if (finalizeTimer) clearTimeout(finalizeTimer);
      finalizeTimer = setTimeout(finalizeCarouselGesture, GESTURE_FINALIZE_MS);
    };

    const beginCarouselGesture = () => {
      const sceneSt = sceneStRef.current;
      if (
        !useMobileGesture ||
        !sceneSt ||
        isFinalizingGestureRef.current ||
        isAnimatingGestureRef.current ||
        isProgrammaticRef.current
      ) {
        return;
      }

      const progress = sceneSt.progress;
      if (progress < layout.introPortion - 0.001 && progress > 0.02) {
        return;
      }
      if (!isInSwipeGestureZone(progress, layout) && progress < layout.introPortion) {
        return;
      }
      if (progress >= sectionExitProgress - 0.001) return;

      isCarouselGesturingRef.current = true;
      gestureStartScrollRef.current = window.scrollY;
      gestureStartIndexRef.current = settledCardRef.current;
      scene.classList.add("portfolio-swipe-scene--gesturing");
    };

    const onTouchStart = () => {
      isTouchActiveRef.current = true;
      beginCarouselGesture();
    };

    const onTouchEnd = () => {
      isTouchActiveRef.current = false;
      scheduleFinalizeGesture();
    };

    const onGestureScroll = () => {
      if (isTouchActiveRef.current) {
        const sceneSt = sceneStRef.current;
        if (sceneSt && isCarouselGesturingRef.current) {
          syncGesturePreview(window.scrollY - gestureStartScrollRef.current);
        }
        return;
      }
      scheduleFinalizeGesture();
    };

    const sceneSt = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: `+=${layout.totalDistance}`,
      pin: scene,
      scrub: true,
      ...(useMobileGesture
        ? {}
        : {
            snap: {
              snapTo: (progress, self) =>
                resolveSnapProgress(progress, self?.direction ?? 1),
              duration: { min: 0.28, max: 0.42 },
              delay: 0.08,
              ease: "power2.out",
              inertia: false,
            },
          }),
      anticipatePin: 0,
      invalidateOnRefresh: true,
      id: "portfolio-swipe-scene",
      onUpdate: (self) => syncSceneProgress(self.progress),
      onSnapComplete: () => {
        if (!useMobileGesture) {
          commitSnapToCards();
        }
      },
      onRefresh: (self) => {
        syncSceneProgress(self.progress);
        if (!useMobileGesture) {
          commitSnapToCards();
        } else if (self.progress > layout.introPortion + 0.001) {
          const idx = isInSwipeCarouselZone(self.progress, layout)
            ? settledCardRef.current
            : cardCount - 1;
          settledCardRef.current = idx;
          gestureStartIndexRef.current = idx;
          applyCardIndex(idx);
        }
      },
    });

    sceneStRef.current = sceneSt;
    syncSceneProgress(sceneSt.progress);
    if (!useMobileGesture) {
      commitSnapToCards();
    }
    ScrollTrigger.refresh();

    if (useMobileGesture) {
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
      window.addEventListener("touchcancel", onTouchEnd, { passive: true });
      window.addEventListener("scroll", onGestureScroll, { passive: true });
    }

    return () => {
      if (finalizeTimer) clearTimeout(finalizeTimer);
      navTweenRef.current?.kill();
      isAnimatingGestureRef.current = false;
      isFinalizingGestureRef.current = false;
      scene.classList.remove("portfolio-swipe-scene--gesturing");
      if (useMobileGesture) {
        window.removeEventListener("touchstart", onTouchStart);
        window.removeEventListener("touchend", onTouchEnd);
        window.removeEventListener("touchcancel", onTouchEnd);
        window.removeEventListener("scroll", onGestureScroll);
      }
      sceneSt.kill();
      introTl.kill();
      sceneStRef.current = null;
    };
  }, [cardCount, applyCardIndex, flushCaptionIndex, previewCardIndex]);

  const navigateByDelta = useCallback(
    (delta: number) => {
      const current = activeIndexRef.current;
      const target = wrapCardIndex(current + delta, cardCount);
      if (target === current && cardCount <= 1) return;

      navTweenRef.current?.kill();
      isCarouselGesturingRef.current = false;
      isFinalizingGestureRef.current = false;
      isAnimatingGestureRef.current = false;
      sceneRef.current?.classList.remove("portfolio-swipe-scene--gesturing");
      isProgrammaticRef.current = true;
      pendingCardRef.current = null;

      settledCardRef.current = target;
      gestureStartIndexRef.current = target;
      previewCardRef.current = target;
      isProgrammaticEmblaScrollRef.current = true;
      emblaApiRef.current?.scrollTo(target, true);
      flushCaptionIndex(target);

      scrollToCardIndex(target, false, SWIPE_CARD_SETTLE_DURATION, () => {
        isProgrammaticRef.current = false;
      });
    },
    [cardCount, flushCaptionIndex, scrollToCardIndex],
  );

  const goToIndex = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(index, cardCount - 1));
      if (target === activeIndexRef.current) return;

      navTweenRef.current?.kill();
      isCarouselGesturingRef.current = false;
      isFinalizingGestureRef.current = false;
      isAnimatingGestureRef.current = false;
      sceneRef.current?.classList.remove("portfolio-swipe-scene--gesturing");
      isProgrammaticRef.current = true;
      pendingCardRef.current = null;

      settledCardRef.current = target;
      gestureStartIndexRef.current = target;
      previewCardRef.current = target;
      isProgrammaticEmblaScrollRef.current = true;
      emblaApiRef.current?.scrollTo(target, true);
      flushCaptionIndex(target);

      scrollToCardIndex(target, false, SWIPE_CARD_SETTLE_DURATION, () => {
        isProgrammaticRef.current = false;
      });
    },
    [cardCount, flushCaptionIndex, scrollToCardIndex],
  );

  const goToPrev = useCallback(() => {
    navigateByDelta(-1);
  }, [navigateByDelta]);

  const goToNext = useCallback(() => {
    navigateByDelta(1);
  }, [navigateByDelta]);

  const guardCardNavigation = useCallback(() => clickAllowedRef.current, []);

  const activeStudy = items[activeIndex] ?? items[0];

  return (
    <div ref={triggerRef} className="portfolio-swipe-trigger">
      <section
        ref={sceneRef}
        id="portfolio"
        className="portfolio-swipe-scene portfolio-swipe-scene--scroll"
        aria-label="Portfolio showcase"
      >
        <div ref={introRef} className="portfolio-360-intro">
          <PortfolioIntroLockup />
        </div>

        <div
          ref={focusBackdropRef}
          className="portfolio-360-focus-backdrop"
          aria-hidden="true"
        />

        <div ref={carouselWrapRef} className="portfolio-swipe-carousel-wrap">
          <div className="portfolio-swipe-viewport" ref={emblaRef}>
            <div className="portfolio-swipe-track">
              {items.map((study, i) => (
                <div
                  key={study.slug}
                  className={cn(
                    "portfolio-swipe-slide",
                    i === activeIndex && "is-active",
                  )}
                >
                  <div className="portfolio-swipe-card">
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

          <div className="portfolio-360-bottom static mx-auto max-w-none px-0">
            <div className="portfolio-360-details">
              <PortfolioDetailCaption study={activeStudy} instant />
            </div>
            <Portfolio360BottomChrome
              activeIndex={activeIndex}
              cardCount={cardCount}
              items={items}
              onPrev={goToPrev}
              onNext={goToNext}
              onDot={goToIndex}
              onContact={openContact}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
