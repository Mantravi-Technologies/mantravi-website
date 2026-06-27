"use client";

import { useEffect, useState } from "react";
import { isMobilePerfProfile } from "@/lib/utils/scroll-profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Skip scroll-linked motion on touch / tablet and when reduced motion is preferred. */
export function useLightScrollMotion() {
  const reduced = useReducedMotion();
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(isMobilePerfProfile());
    const onResize = () => setLight(isMobilePerfProfile());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return reduced || light;
}
