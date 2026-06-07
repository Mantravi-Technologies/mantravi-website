"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const instance = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      autoResize: true,
    });

    setLenis(instance);

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
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    instance.on("scroll", ScrollTrigger.update);

    let scrollEndTimer: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      document.documentElement.classList.add("is-scrolling");
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 120);
    };
    instance.on("scroll", onScroll);

    const onTick = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(1000, 16);

    const refresh = () => ScrollTrigger.refresh();
    const onStRefresh = () => instance.resize();

    ScrollTrigger.addEventListener("refresh", onStRefresh);
    window.addEventListener("resize", refresh);

    ScrollTrigger.refresh();
    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }
    window.addEventListener("load", refresh, { once: true });

    return () => {
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      document.documentElement.classList.remove("is-scrolling");
      gsap.ticker.remove(onTick);
      ScrollTrigger.removeEventListener("refresh", onStRefresh);
      window.removeEventListener("resize", refresh);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.clearScrollMemory();
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
