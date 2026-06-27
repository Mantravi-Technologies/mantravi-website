"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContact } from "@/components/providers/ContactProvider";
import { type CaseStudy } from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";
import {
  PORTFOLIO_EMBLA_DURATION,
  PORTFOLIO_NAV_DURATION,
  PORTFOLIO_SCRUB_SMOOTH,
  PORTFOLIO_SETTLE_DURATION,
  PORTFOLIO_SETTLE_EASE,
  PORTFOLIO_SNAP_DELAY,
  PORTFOLIO_SNAP_DURATION,
  PORTFOLIO_SNAP_EASE,
} from "@/lib/utils/portfolio-motion";
import {
  getExitCommitProgress,
  getLastCardSnapProgress,
  getSectionExitProgress,
  getSwipeIntroHoldRatio,
  getSwipeScrollLayout,
  isInSwipeCarouselZone,
  scrollProgressForCardIndex,
  SWIPE_CAROUSEL_FADE_START,
} from "@/lib/utils/portfolio-intro-scroll";
import { syncEmblaToFloatIndex } from "@/lib/utils/portfolio-embla-sync";
import {
  getCarouselStepPx,
  getSwipeExitHoldPx,
  isInSwipeGestureZone,
  resolveGestureTarget,
  scrollYForProgress,
} from "@/lib/utils/portfolio-swipe-gesture";
import { wrapCardIndex } from "@/lib/utils/portfolio-mobile-scroll";
import { isCoarsePointer } from "@/lib/utils/scroll-profile";
import {
  CardVisual,
  Portfolio360BottomChrome,
  PortfolioDetailCaption,
  PortfolioIntroLockup,
} from "./PortfolioShared";

const GESTURE_FINALIZE_MS = 120;
const GESTURE_SETTLE_EASE = PORTFOLIO_SETTLE_EASE;
const NAV_SETTLE_DURATION = PORTFOLIO_NAV_DURATION;

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
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneStRef = useRef<ScrollTrigger | null>(null);
  const emblaApiRef = useRef<ReturnType<typeof useEmblaCarousel>[1]>(null);
  const activeIndexRef = useRef(0);
  const visualIndexRef = useRef(0);
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

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    axis: "x",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
    duration: PORTFOLIO_EMBLA_DURATION,
    skipSnaps: false,
  });

  useEffect(() => {
    emblaApiRef.current = emblaApi;
  }, [emblaApi]);

  const setSlideVisual = useCallback((index: number) => {
    const idx = Math.max(0, Math.min(index, cardCount - 1));
    if (visualIndexRef.current === idx) return;
    visualIndexRef.current = idx;

    const track = trackRef.current;
    if (!track) return;

    const slides = track.children;
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.toggle("is-active", i === idx);
    }
  }, [cardCount]);

  const flushCaptionIndex = useCallback((index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const commitCardIndex = useCallback(
    (index: number, animateEmbla = false) => {
      const idx = Math.max(0, Math.min(index, cardCount - 1));
      settledCardRef.current = idx;
      gestureStartIndexRef.current = idx;
      visualIndexRef.current = idx;

      setSlideVisual(idx);

      if (emblaApiRef.current?.selectedScrollSnap() !== idx) {
        isProgrammaticEmblaScrollRef.current = true;
        emblaApiRef.current?.scrollTo(idx, animateEmbla);
      }
      flushCaptionIndex(idx);
    },
    [cardCount, flushCaptionIndex, setSlideVisual],
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

      isAnimatingGestureRef.current = true;
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
          isAnimatingGestureRef.current = false;
          navTweenRef.current = null;
          onDone?.();
        },
        onInterrupt: () => {
          isAnimatingGestureRef.current = false;
          navTweenRef.current = null;
        },
      });
    },
    [],
  );

  const scrollToCardIndex = useCallback(
    (
      index: number,
      immediate: boolean,
      duration = NAV_SETTLE_DURATION,
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
      visualIndexRef.current = idx;
      setSlideVisual(idx);
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

      isProgrammaticRef.current = true;
      commitCardIndex(idx, false);
      scrollToCardIndex(idx, true, NAV_SETTLE_DURATION, () => {
        isProgrammaticRef.current = false;
      });
    };

    const onPointerDown = () => {
      clickAllowedRef.current = false;
    };

    const idx = emblaApi.selectedScrollSnap();
    settledCardRef.current = idx;
    gestureStartIndexRef.current = idx;
    visualIndexRef.current = idx;
    setSlideVisual(idx);
    flushCaptionIndex(idx);

    emblaApi.on("settle", onSettle);
    emblaApi.on("reInit", onReInit);
    emblaApi.on("pointerDown", onPointerDown);

    return () => {
      emblaApi.off("settle", onSettle);
      emblaApi.off("reInit", onReInit);
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi, commitCardIndex, flushCaptionIndex, scrollToCardIndex, setSlideVisual]);

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
      if (Math.abs(tlProgress - lastIntroProgress) < 0.004) return;
      lastIntroProgress = tlProgress;
      introTl.progress(tlProgress);
    };

    const isBusy = () =>
      isAnimatingGestureRef.current ||
      isFinalizingGestureRef.current ||
      isProgrammaticRef.current ||
      isCarouselGesturingRef.current ||
      isTouchActiveRef.current;

    const syncSceneProgress = (progress: number) => {
      if (isAnimatingGestureRef.current) return;

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
        scene.classList.add("portfolio-swipe-scene--gesturing");
      }

      if (progress <= layout.introPortion) {
        syncIntroTimeline(progress);
        return;
      }

      if (lastIntroProgress !== 1) {
        lastIntroProgress = 1;
        introTl.progress(1);
      }

      if (
        !useMobileGesture &&
        !isCarouselGesturingRef.current &&
        !isFinalizingGestureRef.current &&
        !isProgrammaticRef.current &&
        isInSwipeCarouselZone(progress, layout)
      ) {
        const afterIntro = progress - layout.introPortion;
        const phase = gsap.utils.clamp(0, 1, afterIntro / layout.carouselPortion);
        const floatIdx = phase * (cardCount - 1);

        isProgrammaticEmblaScrollRef.current = true;
        const activeIdx = syncEmblaToFloatIndex(
          emblaApiRef.current ?? undefined,
          floatIdx,
          cardCount,
        );
        setSlideVisual(activeIdx);
        flushCaptionIndex(activeIdx);
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

      commitCardIndex(idx, false);
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
      scene.classList.remove("portfolio-swipe-scene--gesturing");

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

      const settleProgress = committed ? gesture.targetProgress : startProgress;
      const settleIdx = committed ? gesture.targetIdx : startIdx;
      const targetScroll = scrollYForProgress(settleProgress, sceneSt);

      navTweenRef.current?.kill();

      const finish = () => {
        isFinalizingGestureRef.current = false;

        if (gesture.exitingSection && committed) {
          settledCardRef.current = cardCount - 1;
          gestureStartIndexRef.current = cardCount - 1;
          return;
        }

        if (gesture.showingIntro && committed) {
          commitCardIndex(0, true);
          return;
        }

        commitCardIndex(settleIdx, true);
      };

      if (!committed && Math.abs(window.scrollY - targetScroll) < 2) {
        setSlideVisual(settleIdx);
        finish();
        return;
      }

      isProgrammaticRef.current = true;
      scrollToProgress(
        settleProgress,
        false,
        committed ? PORTFOLIO_SETTLE_DURATION : PORTFOLIO_SETTLE_DURATION * 0.45,
        () => {
          isProgrammaticRef.current = false;
          finish();
        },
      );
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
      if (!useMobileGesture || !sceneSt || isBusy()) return;

      const progress = sceneSt.progress;
      if (progress < layout.introPortion - 0.001 && progress > 0.02) return;
      if (
        !isInSwipeGestureZone(progress, layout) &&
        progress < layout.introPortion
      ) {
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
      if (!isTouchActiveRef.current) {
        scheduleFinalizeGesture();
      }
    };

    const sceneSt = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: `+=${layout.totalDistance}`,
      pin: scene,
      scrub: PORTFOLIO_SCRUB_SMOOTH,
      fastScrollEnd: true,
      ...(useMobileGesture
        ? {}
        : {
            snap: {
              snapTo: (progress, self) =>
                resolveSnapProgress(progress, self?.direction ?? 1),
              duration: PORTFOLIO_SNAP_DURATION,
              delay: PORTFOLIO_SNAP_DELAY,
              ease: PORTFOLIO_SNAP_EASE,
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
  }, [cardCount, commitCardIndex, setSlideVisual]);

  const runProgrammaticNav = useCallback(
    (target: number) => {
      navTweenRef.current?.kill();
      isCarouselGesturingRef.current = false;
      isFinalizingGestureRef.current = false;
      sceneRef.current?.classList.remove("portfolio-swipe-scene--gesturing");
      isProgrammaticRef.current = true;
      pendingCardRef.current = null;

      settledCardRef.current = target;
      gestureStartIndexRef.current = target;
      setSlideVisual(target);

      scrollToCardIndex(target, false, NAV_SETTLE_DURATION, () => {
        commitCardIndex(target, true);
        isProgrammaticRef.current = false;
      });
    },
    [commitCardIndex, scrollToCardIndex, setSlideVisual],
  );

  const navigateByDelta = useCallback(
    (delta: number) => {
      const current = activeIndexRef.current;
      const target = wrapCardIndex(current + delta, cardCount);
      if (target === current && cardCount <= 1) return;
      runProgrammaticNav(target);
    },
    [cardCount, runProgrammaticNav],
  );

  const goToIndex = useCallback(
    (index: number) => {
      const target = Math.max(0, Math.min(index, cardCount - 1));
      if (target === activeIndexRef.current) return;
      runProgrammaticNav(target);
    },
    [cardCount, runProgrammaticNav],
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
            <div className="portfolio-swipe-track" ref={trackRef}>
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
