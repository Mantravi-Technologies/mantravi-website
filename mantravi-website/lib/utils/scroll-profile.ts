/** Routes where Lenis smooth scroll hurts more than it helps (long pages, sticky, many observers). */
export function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function getStableViewportHeight() {
  if (typeof window === "undefined") return 800;
  return window.visualViewport?.height ?? window.innerHeight;
}

export function prefersNativeScroll(pathname: string | null) {
  if (!pathname) return false;
  if (pathname.startsWith("/services")) return true;
  // Touch devices: Lenis touch smoothing causes global snap-back on homepage
  if (pathname === "/" && isCoarsePointer()) return true;
  return false;
}

/** Homepage portfolio pin needs ScrollTrigger — with or without Lenis. */
export function needsScrollTriggerIntegration(pathname: string | null) {
  return pathname === "/";
}
