/** Routes where Lenis smooth scroll hurts more than it helps (long pages, sticky, many observers). */
export function prefersNativeScroll(pathname: string | null) {
  if (!pathname) return false;
  return pathname.startsWith("/services");
}

/** Only the homepage portfolio carousel needs Lenis + ScrollTrigger integration. */
export function needsScrollTriggerIntegration(pathname: string | null) {
  return pathname === "/";
}
