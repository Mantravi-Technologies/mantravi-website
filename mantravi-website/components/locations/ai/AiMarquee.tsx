"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

function MarqueeGroup({ items, prefix }: { items: string[]; prefix: string }) {
  return (
    <div className="ai-marquee__group">
      {items.map((item, i) => (
        <span key={`${prefix}-${item}-${i}`} className="ai-marquee__item">
          {item}
        </span>
      ))}
    </div>
  );
}

export function AiMarquee({ items }: { items: string[] }) {
  const reducedMotion = useReducedMotion();
  // Six passes per group so each half fills ultrawide screens.
  const groupItems = Array.from({ length: 6 }, () => items).flat();

  return (
    <div className="ai-marquee" aria-hidden="true">
      <div className="ai-marquee__fade ai-marquee__fade--left" />
      <div className="ai-marquee__fade ai-marquee__fade--right" />
      <div
        className={`ai-marquee__inner${reducedMotion ? "" : " ai-marquee__inner--loop"}`}
      >
        <MarqueeGroup items={groupItems} prefix="a" />
        <MarqueeGroup items={groupItems} prefix="b" />
      </div>
    </div>
  );
}
