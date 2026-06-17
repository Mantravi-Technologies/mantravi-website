import type { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  getSectionExitProgress,
  getSwipeCarouselStepPx,
  scrollProgressForCardIndex,
  SWIPE_GESTURE_COMMIT_RATIO,
  type SwipeScrollLayout,
} from "@/lib/utils/portfolio-intro-scroll";

export type GestureTarget = {
  targetIdx: number;
  targetProgress: number;
  exitingSection: boolean;
  showingIntro: boolean;
};

export function scrollYForProgress(
  progress: number,
  sceneSt: ScrollTrigger,
) {
  return sceneSt.start + progress * (sceneSt.end - sceneSt.start);
}

export function scrollYForCardIndex(
  index: number,
  cardCount: number,
  layout: SwipeScrollLayout,
  sceneSt: ScrollTrigger,
) {
  const progress = scrollProgressForCardIndex(index, cardCount, layout);
  return scrollYForProgress(progress, sceneSt);
}

/** Carousel or exit-hold zone — gesture finalization applies here */
export function isInSwipeGestureZone(
  progress: number,
  layout: SwipeScrollLayout,
) {
  if (progress < layout.introPortion - 0.001) return false;
  return progress < getSectionExitProgress() - 0.001;
}

export function getSwipeExitHoldPx(layout: SwipeScrollLayout) {
  return layout.exitPortion * layout.totalDistance;
}

export function resolveGestureTarget({
  startIdx,
  delta,
  stepPx,
  exitHoldPx,
  cardCount,
  currentProgress,
  layout,
  commitRatio = SWIPE_GESTURE_COMMIT_RATIO,
}: {
  startIdx: number;
  delta: number;
  stepPx: number;
  exitHoldPx: number;
  cardCount: number;
  currentProgress: number;
  layout: SwipeScrollLayout;
  commitRatio?: number;
}): GestureTarget {
  const sectionExitProgress = getSectionExitProgress();
  const startProgress = scrollProgressForCardIndex(startIdx, cardCount, layout);
  const commitStep = stepPx * commitRatio;
  const commitExit = exitHoldPx * commitRatio;

  let targetIdx = startIdx;
  let targetProgress = startProgress;
  let exitingSection = false;
  let showingIntro = false;

  const lastIdx = Math.max(0, cardCount - 1);

  if (startIdx === lastIdx && delta > commitExit) {
    targetIdx = lastIdx;
    targetProgress = sectionExitProgress;
    exitingSection = true;
    return { targetIdx, targetProgress, exitingSection, showingIntro };
  }

  if (startIdx === lastIdx && delta < -commitStep && cardCount > 1) {
    targetIdx = lastIdx - 1;
    targetProgress = scrollProgressForCardIndex(targetIdx, cardCount, layout);
    return { targetIdx, targetProgress, exitingSection, showingIntro };
  }

  if (
    startIdx === 0 &&
    delta < -commitStep &&
    currentProgress <= layout.introPortion + 0.02
  ) {
    targetIdx = 0;
    targetProgress = 0;
    showingIntro = true;
    return { targetIdx, targetProgress, exitingSection, showingIntro };
  }

  if (delta > commitStep) {
    targetIdx = Math.min(startIdx + 1, lastIdx);
    targetProgress = scrollProgressForCardIndex(targetIdx, cardCount, layout);
    return { targetIdx, targetProgress, exitingSection, showingIntro };
  }

  if (delta < -commitStep) {
    targetIdx = Math.max(startIdx - 1, 0);
    targetProgress = scrollProgressForCardIndex(targetIdx, cardCount, layout);
    return { targetIdx, targetProgress, exitingSection, showingIntro };
  }

  return { targetIdx, targetProgress, exitingSection, showingIntro };
}

export function getCarouselStepPx(cardCount: number, layout: SwipeScrollLayout) {
  return getSwipeCarouselStepPx(cardCount, layout);
}

/** Preview threshold — fraction of one step before showing the next/prev card */
export const GESTURE_PREVIEW_RATIO = 0.12;

export function resolveInterimCardIndex(
  startIdx: number,
  delta: number,
  stepPx: number,
  cardCount: number,
  previewRatio = GESTURE_PREVIEW_RATIO,
) {
  const lastIdx = Math.max(0, cardCount - 1);
  const previewPx = stepPx * previewRatio;

  if (delta > previewPx) {
    return Math.min(startIdx + 1, lastIdx);
  }
  if (delta < -previewPx) {
    return Math.max(startIdx - 1, 0);
  }
  return startIdx;
}

export function easeGestureFraction(delta: number, stepPx: number) {
  if (stepPx <= 0) return 0;
  const raw = Math.min(1, Math.abs(delta) / stepPx);
  return 1 - (1 - raw) ** 2;
}

export function scrollProgressBetweenCardIndices(
  fromIdx: number,
  toIdx: number,
  fraction: number,
  cardCount: number,
  layout: SwipeScrollLayout,
) {
  const fromProgress = scrollProgressForCardIndex(fromIdx, cardCount, layout);
  const toProgress = scrollProgressForCardIndex(toIdx, cardCount, layout);
  return fromProgress + (toProgress - fromProgress) * Math.max(0, Math.min(1, fraction));
}
