"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useScrollSceneRefresh(deps: unknown[] = []) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const refresh = () => ScrollTrigger.refresh();

    refresh();
    window.addEventListener("resize", refresh);

    if (document.fonts?.ready) {
      document.fonts.ready.then(refresh);
    }

    return () => window.removeEventListener("resize", refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function useScrollScene(
  setup: (ctx: {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
  }) => (() => void) | void,
  deps: unknown[] = []
) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cleanup = setupRef.current({ gsap, ScrollTrigger });
    return () => {
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
