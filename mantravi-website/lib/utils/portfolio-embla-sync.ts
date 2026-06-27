import type { EmblaCarouselType } from "embla-carousel";

/** Drive Embla horizontally from a fractional card index (0 … cardCount - 1). */
export function syncEmblaToFloatIndex(
  emblaApi: EmblaCarouselType | undefined,
  floatIndex: number,
  cardCount: number,
) {
  if (!emblaApi || cardCount <= 0) return 0;

  const engine = emblaApi.internalEngine();
  const snaps = engine.scrollSnapList;
  if (!snaps.length) return 0;

  const clamped = Math.max(0, Math.min(cardCount - 1, floatIndex));
  const lower = Math.floor(clamped);
  const upper = Math.min(cardCount - 1, Math.ceil(clamped));
  const frac = clamped - lower;
  const targetDistance =
    lower === upper
      ? snaps[lower]
      : snaps[lower] + (snaps[upper] - snaps[lower]) * frac;

  engine.scrollBody.useDuration(0);
  engine.location.set(targetDistance);
  engine.offsetLocation.set(targetDistance);
  engine.previousLocation.set(targetDistance);
  engine.target.set(targetDistance);
  engine.translate.to(targetDistance);

  const activeIdx = Math.round(clamped);
  engine.index.set(activeIdx);

  return activeIdx;
}
