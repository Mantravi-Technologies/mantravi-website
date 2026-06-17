export function wrapCardIndex(index: number, cardCount: number) {
  if (cardCount <= 0) return 0;
  return ((index % cardCount) + cardCount) % cardCount;
}
