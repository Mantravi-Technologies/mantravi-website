/** Routes where Lenis smooth scroll hurts more than it helps (long pages, sticky, many observers). */
export function isCoarsePointer() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: coarse)").matches;
}

export function getStableViewportHeight() {
  if (typeof window === "undefined") return 800;
  return window.visualViewport?.height ?? window.innerHeight;
}

const TABLET_MAX_WIDTH = 1023;

/** Mobile/tablet perf profile: lighter scroll-linked effects, no GPU blur stacks. */
export function isMobilePerfProfile() {
  if (typeof window === "undefined") return false;
  return (
    isCoarsePointer() ||
    window.matchMedia(`(max-width: ${TABLET_MAX_WIDTH}px)`).matches
  );
}

/** Simple swipe portfolio instead of pinned 360 carousel (mobile + tablet). */
export function prefersSimplePortfolio() {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${TABLET_MAX_WIDTH}px)`).matches;
}

export function isLocationPage(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname.includes("-development-company-") ||
    pathname.includes("-marketing-company-")
  );
}

export function prefersNativeScroll(pathname: string | null) {
  if (!pathname) return false;
  if (pathname.startsWith("/services")) return true;
  // Touch devices: Lenis touch smoothing causes global snap-back on homepage
  if (pathname === "/" && isCoarsePointer()) return true;
  // Long-form article pages — native scroll so tables and nested regions scroll correctly
  if (pathname.startsWith("/portfolio") || pathname.startsWith("/blog")) {
    return true;
  }
  // Long geo landing pages — native momentum scroll on touch
  if (isCoarsePointer() && isLocationPage(pathname)) return true;
  if (
    isCoarsePointer() &&
    (pathname.startsWith("/about") || pathname.startsWith("/contact"))
  ) {
    return true;
  }
  return false;
}

/** Homepage portfolio pin / intro — desktop 360 and mobile swipe intro. */
export function needsScrollTriggerIntegration(pathname: string | null) {
  return pathname === "/";
}
