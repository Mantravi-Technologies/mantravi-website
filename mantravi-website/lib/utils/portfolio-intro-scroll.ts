import { getStableViewportHeight } from "@/lib/utils/scroll-profile";

/** Scroll with SHIP only before text→card transition begins */
export const SWIPE_INTRO_HOLD_VH = 0.45;
/** Scroll span for SHIP fade + carousel reveal */
export const SWIPE_INTRO_TRANSITION_VH = 0.35;
/** When carousel fade-in starts within the intro timeline (0–1) */
export const SWIPE_CAROUSEL_FADE_START = 0.18;

/** Viewport height of scroll per card step while pinned */
export const SWIPE_CAROUSEL_STEP_VH = 0.4;
/** Extra scroll on last card before the section unpins (one step ≈ one card step) */
export const SWIPE_EXIT_HOLD_VH = 0.32;
/** Fraction of one card step needed to commit to the next card */
export const SWIPE_GESTURE_COMMIT_RATIO = 0.2;
/** Smooth settle when a vertical scroll gesture completes */
export const SWIPE_CARD_SETTLE_DURATION = 0.45;

export function getSwipeIntroHoldDistance() {
  if (typeof window === "undefined") return 360;
  return getStableViewportHeight() * SWIPE_INTRO_HOLD_VH;
}

export function getSwipeIntroTransitionDistance() {
  if (typeof window === "undefined") return 280;
  return getStableViewportHeight() * SWIPE_INTRO_TRANSITION_VH;
}

export function getSwipeIntroScrollDistance() {
  return getSwipeIntroHoldDistance() + getSwipeIntroTransitionDistance();
}

export function getSwipeIntroHoldRatio() {
  const total = getSwipeIntroScrollDistance();
  if (total <= 0) return 0;
  return getSwipeIntroHoldDistance() / total;
}

export function getSwipeCarouselScrollDistance(cardCount: number) {
  if (typeof window === "undefined") return 800;
  const steps = Math.max(1, cardCount - 1);
  return getStableViewportHeight() * SWIPE_CAROUSEL_STEP_VH * steps;
}

export function getSwipeExitHoldDistance() {
  if (typeof window === "undefined") return 160;
  return getStableViewportHeight() * SWIPE_EXIT_HOLD_VH;
}

export function getSwipeTotalScrollDistance(cardCount: number) {
  return (
    getSwipeIntroScrollDistance() +
    getSwipeCarouselScrollDistance(cardCount) +
    getSwipeExitHoldDistance()
  );
}

export type SwipeScrollLayout = {
  totalDistance: number;
  introPortion: number;
  carouselPortion: number;
  exitPortion: number;
};

export function getSwipeScrollLayout(cardCount: number): SwipeScrollLayout {
  const totalDistance = getSwipeTotalScrollDistance(cardCount);
  const intro = getSwipeIntroScrollDistance();
  const carousel = getSwipeCarouselScrollDistance(cardCount);
  const exit = getSwipeExitHoldDistance();

  return {
    totalDistance,
    introPortion: totalDistance > 0 ? intro / totalDistance : 0,
    carouselPortion: totalDistance > 0 ? carousel / totalDistance : 0,
    exitPortion: totalDistance > 0 ? exit / totalDistance : 0,
  };
}

export function getSwipeCarouselStepPx(
  cardCount: number,
  layout: SwipeScrollLayout,
) {
  const steps = Math.max(1, cardCount - 1);
  return (layout.carouselPortion * layout.totalDistance) / steps;
}

export function scrollProgressForCardIndex(
  index: number,
  cardCount: number,
  layout: SwipeScrollLayout,
) {
  if (cardCount <= 1) return layout.introPortion;
  const carouselPhase = index / (cardCount - 1);
  return layout.introPortion + carouselPhase * layout.carouselPortion;
}

export function cardIndexFromScrollProgress(
  progress: number,
  cardCount: number,
  layout: SwipeScrollLayout,
) {
  if (cardCount <= 1) return 0;
  if (progress <= layout.introPortion) return 0;

  const afterIntro = progress - layout.introPortion;
  if (afterIntro >= layout.carouselPortion) return cardCount - 1;

  const phase = afterIntro / layout.carouselPortion;
  return Math.round(phase * (cardCount - 1));
}

export function isInSwipeCarouselZone(
  progress: number,
  layout: SwipeScrollLayout,
) {
  if (progress <= layout.introPortion) return false;
  return progress - layout.introPortion < layout.carouselPortion;
}

/** All vertical snap targets: intro start/end, each card, then section exit */
export function buildSwipeSnapPoints(
  cardCount: number,
  layout: SwipeScrollLayout,
) {
  const points = new Set<number>([0, layout.introPortion, 1]);
  for (let i = 0; i < cardCount; i++) {
    points.add(scrollProgressForCardIndex(i, cardCount, layout));
  }
  return [...points].sort((a, b) => a - b);
}

export function getLastCardSnapProgress(
  cardCount: number,
  layout: SwipeScrollLayout,
) {
  return scrollProgressForCardIndex(Math.max(0, cardCount - 1), cardCount, layout);
}

/** Normalized progress where the pin ends and the next section appears */
export function getSectionExitProgress() {
  return 1;
}

export function cardIndexFromSnapProgress(
  progress: number,
  cardCount: number,
  layout: SwipeScrollLayout,
) {
  if (cardCount <= 1) return 0;
  if (progress <= layout.introPortion + 0.0001) return 0;

  const afterIntro = progress - layout.introPortion;
  if (afterIntro >= layout.carouselPortion - 0.0001) return cardCount - 1;

  for (let i = cardCount - 1; i >= 1; i--) {
    const snap = scrollProgressForCardIndex(i, cardCount, layout);
    if (progress >= snap - 0.0001) return i;
  }
  return 0;
}
