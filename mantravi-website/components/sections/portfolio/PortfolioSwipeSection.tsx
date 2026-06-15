"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContact } from "@/components/providers/ContactProvider";
import { type CaseStudy } from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";
import {
  cardIndexFromSnapProgress,
  getExitCommitProgress,
  getLastCardSnapProgress,
  getSectionExitProgress,
  getSwipeIntroHoldRatio,
  getSwipeScrollLayout,
  isInSwipeCarouselZone,
  scrollProgressForCardIndex,
  SWIPE_CAROUSEL_FADE_START,
} from "@/lib/utils/portfolio-intro-scroll";
import { isCoarsePointer } from "@/lib/utils/scroll-profile";
import {
  CardVisual,
  Portfolio360BottomChrome,
  PortfolioDetailCaption,
  PortfolioIntroLockup,
  normalizeIndex,
} from "./PortfolioShared";

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
  const syncedEmblaIndexRef = useRef(-1);
  const lastSnapCardRef = useRef(0);
  const pendingSnapCardRef = useRef<number | null>(null);
  const emblaSettleFromUserRef = useRef(false);
  const isEmblaDraggingRef = useRef(false);
  const isScrollSyncingRef = useRef(false);
  const scrollSyncTweenRef = useRef<gsap.core.Tween | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    axis: "x",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
    duration: 28,
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

  useEffect(
    () => () => {
      scrollSyncTweenRef.current?.kill();
    },
    [],
  );

  const syncScrollToCardIndex = useCallback(
    (index: number, animated: boolean) => {
      const sceneSt = sceneStRef.current;
      if (!sceneSt) return;

      const layout = getSwipeScrollLayout(cardCount);
      const scrollPos =
        sceneSt.start +
        scrollProgressForCardIndex(index, cardCount, layout) *
          (sceneSt.end - sceneSt.start);

      scrollSyncTweenRef.current?.kill();

      if (Math.abs(window.scrollY - scrollPos) < 2) {
        lastSnapCardRef.current = index;
        return;
      }

      if (!animated) {
        window.scrollTo(0, scrollPos);
        ScrollTrigger.update();
        lastSnapCardRef.current = index;
        return;
      }

      isScrollSyncingRef.current = true;
      const motion = { scroll: window.scrollY };

      scrollSyncTweenRef.current = gsap.to(motion, {
        scroll: scrollPos,
        duration: 0.42,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          window.scrollTo(0, motion.scroll);
        },
        onComplete: () => {
          ScrollTrigger.update();
          isScrollSyncingRef.current = false;
          lastSnapCardRef.current = index;
          syncedEmblaIndexRef.current = index;
          scrollSyncTweenRef.current = null;
          flushCaptionIndex(index);
        },
      });
    },
    [cardCount],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onReInit = () => {
      const idx = emblaApi.selectedScrollSnap();
      syncedEmblaIndexRef.current = idx;
      lastSnapCardRef.current = idx;
      flushCaptionIndex(idx);
    };

    const onSettle = () => {
      clickAllowedRef.current = true;
      isEmblaDraggingRef.current = false;
      const idx = emblaApi.selectedScrollSnap();
      syncedEmblaIndexRef.current = idx;
      flushCaptionIndex(idx);

      // Only sync vertical scroll after a horizontal user swipe — not after
      // programmatic scrollTo from commitSnapToCards (avoids snap feedback loop).
      if (emblaSettleFromUserRef.current) {
        emblaSettleFromUserRef.current = false;
        lastSnapCardRef.current = idx;
        syncScrollToCardIndex(idx, true);
      }
    };

    const onPointerDown = () => {
      clickAllowedRef.current = false;
      isEmblaDraggingRef.current = true;
      emblaSettleFromUserRef.current = true;
      scrollSyncTweenRef.current?.kill();
      isScrollSyncingRef.current = false;
    };

    syncedEmblaIndexRef.current = emblaApi.selectedScrollSnap();
    flushCaptionIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("settle", onSettle);
    emblaApi.on("reInit", onReInit);
    emblaApi.on("pointerDown", onPointerDown);

    return () => {
      emblaApi.off("settle", onSettle);
      emblaApi.off("reInit", onReInit);
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi, flushCaptionIndex, syncScrollToCardIndex]);

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
    const snapExitDirectional = ScrollTrigger.snapDirectional([
      lastCardProgress,
      sectionExitProgress,
    ]);
    const useNativeScrub = isCoarsePointer();

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

    const syncSceneProgress = (progress: number) => {
      if (isEmblaDraggingRef.current || isScrollSyncingRef.current) {
        if (progress <= layout.introPortion) {
          syncIntroTimeline(progress);
        } else if (lastIntroProgress !== 1) {
          lastIntroProgress = 1;
          introTl.progress(1);
        }
        return;
      }

      if (progress <= layout.introPortion) {
        syncIntroTimeline(progress);
        return;
      }

      if (lastIntroProgress !== 1) {
        lastIntroProgress = 1;
        introTl.progress(1);
      }
    };

    const resolveSnapProgress = (progress: number, direction: number) => {
      if (isEmblaDraggingRef.current || isScrollSyncingRef.current) {
        return scrollProgressForCardIndex(
          lastSnapCardRef.current,
          cardCount,
          layout,
        );
      }

      if (progress < layout.introPortion * 0.55) return 0;
      if (progress < layout.introPortion) {
        return direction >= 0 ? layout.introPortion : 0;
      }

      // Last card + exit hold — require scrolling through exit hold before unpins
      if (progress >= lastCardProgress - 0.0001) {
        if (direction < 0) {
          if (progress > exitCommitProgress) {
            return lastCardProgress;
          }
          if (progress > lastCardProgress + 0.002) {
            return snapExitDirectional(progress, direction);
          }
          if (cardCount > 1) {
            const prevIdx = cardCount - 2;
            const prevProgress = scrollProgressForCardIndex(
              prevIdx,
              cardCount,
              layout,
            );
            lastSnapCardRef.current = prevIdx;
            pendingSnapCardRef.current = prevIdx;
            return prevProgress;
          }
          return lastCardProgress;
        }

        if (progress < exitCommitProgress) {
          return lastCardProgress;
        }
        return sectionExitProgress;
      }

      // Carousel — exactly one card per scroll gesture (never skip)
      const settled = lastSnapCardRef.current;

      if (settled <= 0 && direction < 0) {
        return 0;
      }

      const targetIdx =
        direction > 0
          ? Math.min(settled + 1, cardCount - 1)
          : direction < 0
            ? Math.max(settled - 1, 0)
            : settled;

      lastSnapCardRef.current = targetIdx;
      pendingSnapCardRef.current = targetIdx;
      return scrollProgressForCardIndex(targetIdx, cardCount, layout);
    };

    const commitSnapToCards = (progress: number) => {
      if (isEmblaDraggingRef.current || isScrollSyncingRef.current) return;

      let idx: number;
      if (progress >= sectionExitProgress - 0.002) {
        idx = cardCount - 1;
      } else if (progress <= layout.introPortion + 0.001) {
        idx = 0;
      } else if (isInSwipeCarouselZone(progress, layout)) {
        idx = pendingSnapCardRef.current ?? lastSnapCardRef.current;
      } else {
        idx = cardIndexFromSnapProgress(progress, cardCount, layout);
      }

      pendingSnapCardRef.current = null;

      if (syncedEmblaIndexRef.current === idx) {
        lastSnapCardRef.current = idx;
        return;
      }

      lastSnapCardRef.current = idx;
      syncedEmblaIndexRef.current = idx;
      emblaSettleFromUserRef.current = false;
      emblaApiRef.current?.scrollTo(idx, false);
      flushCaptionIndex(idx);
    };

    const sceneSt = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: `+=${layout.totalDistance}`,
      pin: scene,
      scrub: useNativeScrub ? true : 0.45,
      snap: {
        snapTo: (progress, self) =>
          resolveSnapProgress(progress, self?.direction ?? 1),
        duration: useNativeScrub
          ? { min: 0.28, max: 0.42 }
          : { min: 0.38, max: 0.56 },
        delay: useNativeScrub ? 0.06 : 0.12,
        ease: "power2.inOut",
        inertia: false,
      },
      anticipatePin: 0,
      invalidateOnRefresh: true,
      id: "portfolio-swipe-scene",
      onUpdate: (self) => syncSceneProgress(self.progress),
      onSnapComplete: (self) => commitSnapToCards(self.progress),
      onRefresh: (self) => {
        syncSceneProgress(self.progress);
        commitSnapToCards(self.progress);
      },
    });

    sceneStRef.current = sceneSt;
    syncSceneProgress(sceneSt.progress);
    commitSnapToCards(sceneSt.progress);
    ScrollTrigger.refresh();

    return () => {
      scrollSyncTweenRef.current?.kill();
      sceneSt.kill();
      introTl.kill();
      sceneStRef.current = null;
    };
  }, [cardCount, flushCaptionIndex]);

  const goToIndex = useCallback(
    (index: number) => {
      const target = normalizeIndex(index, cardCount);

      lastSnapCardRef.current = target;
      pendingSnapCardRef.current = target;
      syncedEmblaIndexRef.current = target;
      emblaSettleFromUserRef.current = false;
      emblaApiRef.current?.scrollTo(target, false);
      flushCaptionIndex(target);
      syncScrollToCardIndex(target, true);
    },
    [cardCount, flushCaptionIndex, syncScrollToCardIndex],
  );

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
