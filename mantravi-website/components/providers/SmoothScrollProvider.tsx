"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import {
  getStableViewportHeight,
  isCoarsePointer,
  needsScrollTriggerIntegration,
  prefersNativeScroll,
  prefersSimplePortfolio,
} from "@/lib/utils/scroll-profile";

const LenisContext = createContext<Lenis | null>(null);

/** Global scroll feel — lower lerp = slower ease; lower multipliers = less distance per input. */
const LENIS_LERP = { default: 0.07, scrollTrigger: 0.05 } as const;
const LENIS_WHEEL_MULTIPLIER = 0.75;
const LENIS_TOUCH_MULTIPLIER = 0.8;
const REFRESH_DEBOUNCE_MS = 200;

export function useLenis() {
  return useContext(LenisContext);
}

function attachScrollEndClass(
  onScroll: () => void,
  classToggleThrottleMs = 0,
) {
  let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;
  let isScrollingClassActive = false;
  let lastClassToggleAt = 0;

  const handler = () => {
    onScroll();
    const now = Date.now();
    const canToggleClass =
      !isScrollingClassActive ||
      classToggleThrottleMs === 0 ||
      now - lastClassToggleAt >= classToggleThrottleMs;

    if (canToggleClass) {
      document.documentElement.classList.add("is-scrolling");
      isScrollingClassActive = true;
      lastClassToggleAt = now;
    }

    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      document.documentElement.classList.remove("is-scrolling");
      isScrollingClassActive = false;
    }, 120);
  };

  return {
    handler,
    cleanup: () => {
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      document.documentElement.classList.remove("is-scrolling");
    },
  };
}

function createDebouncedScrollTriggerRefresh(
  ScrollTrigger: { refresh: () => void },
  isScrolling: () => boolean,
) {
  let refreshTimer: ReturnType<typeof setTimeout> | undefined;

  const refresh = () => {
    if (refreshTimer) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
      if (isScrolling()) return;
      ScrollTrigger.refresh();
    }, REFRESH_DEBOUNCE_MS);
  };

  return {
    refresh,
    cleanup: () => {
      if (refreshTimer) clearTimeout(refreshTimer);
    },
  };
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanupLenis: (() => void) | undefined;
    let cleanupNativeSt: (() => void) | undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || prefersNativeScroll(pathname)) {
      setLenis(null);

      const scrollClassThrottle = isCoarsePointer() ? 100 : 0;
      const { handler, cleanup } = attachScrollEndClass(
        () => {},
        scrollClassThrottle,
      );
      window.addEventListener("scroll", handler, { passive: true });
      handler();

      if (needsScrollTriggerIntegration(pathname)) {
        void (async () => {
          const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
          ]);
          if (cancelled) return;

          gsap.registerPlugin(ScrollTrigger);

          if (isCoarsePointer()) {
            ScrollTrigger.config({ ignoreMobileResize: true });
          }

          let scrolling = false;
          let scrollIdleTimer: ReturnType<typeof setTimeout> | undefined;
          const markScrolling = () => {
            scrolling = true;
            if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
            scrollIdleTimer = setTimeout(() => {
              scrolling = false;
            }, 150);
          };
          window.addEventListener("scroll", markScrolling, { passive: true });

          const { refresh, cleanup: cleanupRefresh } =
            createDebouncedScrollTriggerRefresh(ScrollTrigger, () => scrolling);

          const onViewportResize = () => refresh();
          window.visualViewport?.addEventListener("resize", onViewportResize);
          window.addEventListener("resize", onViewportResize);

          if (document.fonts?.ready) {
            document.fonts.ready.then(refresh);
          }
          window.addEventListener("load", refresh, { once: true });

          cleanupNativeSt = () => {
            cleanupRefresh();
            window.visualViewport?.removeEventListener(
              "resize",
              onViewportResize,
            );
            window.removeEventListener("resize", onViewportResize);
            window.removeEventListener("scroll", markScrolling);
            if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
          };
        })();
      }

      return () => {
        cancelled = true;
        window.removeEventListener("scroll", handler);
        cleanup();
        cleanupNativeSt?.();
      };
    }

    void (async () => {
      const [{ default: LenisCtor }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const useScrollTrigger = needsScrollTriggerIntegration(pathname);

      const instance = new LenisCtor({
        lerp: useScrollTrigger
          ? LENIS_LERP.scrollTrigger
          : LENIS_LERP.default,
        smoothWheel: true,
        wheelMultiplier: LENIS_WHEEL_MULTIPLIER,
        touchMultiplier: LENIS_TOUCH_MULTIPLIER,
        syncTouch: true,
        autoResize: true,
      });

      setLenis(instance);

      if (useScrollTrigger) {
        ScrollTrigger.scrollerProxy(document.documentElement, {
          scrollTop(value) {
            if (arguments.length && typeof value === "number") {
              instance.scrollTo(value, { immediate: true });
            }
            return instance.scroll;
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: getStableViewportHeight(),
            };
          },
          pinType: document.documentElement.style.transform
            ? "transform"
            : "fixed",
        });
      }

      let scrolling = false;
      let scrollIdleTimer: ReturnType<typeof setTimeout> | undefined;
      const markScrolling = () => {
        scrolling = true;
        if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
        scrollIdleTimer = setTimeout(() => {
          scrolling = false;
        }, 150);
      };

      const scrollClassThrottle = isCoarsePointer() ? 100 : 0;
      const { handler, cleanup: cleanupScrollClass } = attachScrollEndClass(
        () => {
          markScrolling();
          if (useScrollTrigger) {
            ScrollTrigger.update();
          }
        },
        scrollClassThrottle,
      );
      instance.on("scroll", handler);

      const onTick = (time: number) => {
        instance.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(1000, 16);

      const onStRefresh = () => instance.resize();

      let cleanupRefresh: (() => void) | undefined;
      let onViewportResize: (() => void) | undefined;

      if (useScrollTrigger) {
        const debounced = createDebouncedScrollTriggerRefresh(
          ScrollTrigger,
          () => scrolling,
        );
        cleanupRefresh = debounced.cleanup;
        onViewportResize = debounced.refresh;

        ScrollTrigger.addEventListener("refresh", onStRefresh);
        window.visualViewport?.addEventListener("resize", onViewportResize);
        window.addEventListener("resize", onViewportResize);

        debounced.refresh();
        if (document.fonts?.ready) {
          document.fonts.ready.then(debounced.refresh);
        }
        window.addEventListener("load", debounced.refresh, { once: true });
      }

      cleanupLenis = () => {
        cleanupScrollClass();
        cleanupRefresh?.();
        gsap.ticker.remove(onTick);
        if (scrollIdleTimer) clearTimeout(scrollIdleTimer);
        if (useScrollTrigger) {
          ScrollTrigger.removeEventListener("refresh", onStRefresh);
          if (onViewportResize) {
            window.visualViewport?.removeEventListener(
              "resize",
              onViewportResize,
            );
            window.removeEventListener("resize", onViewportResize);
          }
          ScrollTrigger.scrollerProxy(document.documentElement, {});
          ScrollTrigger.clearScrollMemory();
        }
        instance.destroy();
        setLenis(null);
      };
    })();

    return () => {
      cancelled = true;
      cleanupLenis?.();
    };
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
