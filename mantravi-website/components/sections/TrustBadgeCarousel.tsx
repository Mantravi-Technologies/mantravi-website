"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function TrustBadgeCarousel({ badges }: { badges: string[] }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 3500, stopOnInteraction: false })],
  );

  return (
    <div
      className="overflow-hidden border-t border-white/10 pt-8"
      ref={emblaRef}
    >
      <div className="flex gap-6">
        {[...badges, ...badges].map((badge, i) => (
          <div
            key={`${badge}-${i}`}
            className="flex min-w-0 flex-[0_0_auto] items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-sm"
          >
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-slate-200 md:text-sm">
              {badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
