"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  needsScrollTriggerIntegration,
  prefersNativeScroll,
} from "@/lib/utils/scroll-profile";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

function attachScrollEndClass(onScroll: () => void) {
  let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;

  const handler = () => {
    onScroll();
    document.documentElement.classList.add("is-scrolling");
    if (scrollEndTimer) clearTimeout(scrollEndTimer);
    scrollEndTimer = setTimeout(() => {
      document.documentElement.classList.remove("is-scrolling");
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

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || prefersNativeScroll(pathname)) {
      setLenis(null);

      const { handler, cleanup } = attachScrollEndClass(() => {});
      window.addEventListener("scroll", handler, { passive: true });
      handler();

      return () => {
        window.removeEventListener("scroll", handler);
        cleanup();
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const useScrollTrigger = needsScrollTriggerIntegration(pathname);

    const instance = new Lenis({
      lerp: useScrollTrigger ? 0.07 : 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
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
            height: window.innerHeight,
          };
        },
        pinType: document.documentElement.style.transform
          ? "transform"
          : "fixed",
      });
    }

    const { handler, cleanup: cleanupScrollClass } = attachScrollEndClass(() => {
      if (useScrollTrigger) {
        ScrollTrigger.update();
      }
    });
    instance.on("scroll", handler);

    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(1000, 16);

    const refresh = () => ScrollTrigger.refresh();
    const onStRefresh = () => instance.resize();

    if (useScrollTrigger) {
      ScrollTrigger.addEventListener("refresh", onStRefresh);
      window.addEventListener("resize", refresh);
      ScrollTrigger.refresh();
      if (document.fonts?.ready) {
        document.fonts.ready.then(refresh);
      }
      window.addEventListener("load", refresh, { once: true });
    }

    return () => {
      cleanupScrollClass();
      gsap.ticker.remove(onTick);
      if (useScrollTrigger) {
        ScrollTrigger.removeEventListener("refresh", onStRefresh);
        window.removeEventListener("resize", refresh);
        ScrollTrigger.scrollerProxy(document.documentElement, {});
        ScrollTrigger.clearScrollMemory();
      }
      instance.destroy();
      setLenis(null);
    };
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
