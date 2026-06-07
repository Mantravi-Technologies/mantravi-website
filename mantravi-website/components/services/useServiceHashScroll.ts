"use client";

import { useEffect } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

function getHeaderOffsetPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-height").trim();
  if (raw.endsWith("rem")) {
    return parseFloat(raw) * 16;
  }
  return parseFloat(raw) || 72;
}

export function useServiceHashScroll() {
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    const scrollToHash = () => {
      const el = document.getElementById(hash);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - getHeaderOffsetPx() - 16;

      if (lenis) {
        lenis.scrollTo(top, { duration: 1.1 });
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    const t = window.setTimeout(scrollToHash, 200);
    return () => window.clearTimeout(t);
  }, [lenis]);
}
