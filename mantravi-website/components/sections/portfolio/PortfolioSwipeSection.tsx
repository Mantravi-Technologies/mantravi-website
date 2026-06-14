"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useContact } from "@/components/providers/ContactProvider";
import { type CaseStudy } from "@/lib/content/case-studies";
import {
  CardVisual,
  Portfolio360BottomChrome,
  PortfolioDetailCaption,
  PortfolioSectionHeader,
  normalizeIndex,
} from "./PortfolioShared";

export function PortfolioSwipeSection({ items }: { items: CaseStudy[] }) {
  const cardCount = items.length;
  const { openContact } = useContact();
  const [activeIndex, setActiveIndex] = useState(0);
  const clickAllowedRef = useRef(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    axis: "x",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: false,
    duration: 22,
    skipSnaps: false,
  });

  const syncActiveIndex = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSettle = () => {
      clickAllowedRef.current = true;
      syncActiveIndex();
    };

    const onPointerDown = () => {
      clickAllowedRef.current = false;
    };

    syncActiveIndex();
    emblaApi.on("settle", onSettle);
    emblaApi.on("reInit", onSettle);
    emblaApi.on("pointerDown", onPointerDown);

    return () => {
      emblaApi.off("settle", onSettle);
      emblaApi.off("reInit", onSettle);
      emblaApi.off("pointerDown", onPointerDown);
    };
  }, [emblaApi, syncActiveIndex]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(normalizeIndex(index, cardCount));
    },
    [emblaApi, cardCount],
  );

  const guardCardNavigation = useCallback(() => clickAllowedRef.current, []);

  const activeStudy = items[activeIndex] ?? items[0];

  return (
    <section id="portfolio" className="portfolio-swipe-scene">
      <PortfolioSectionHeader />

      <div className="portfolio-swipe-viewport" ref={emblaRef}>
        <div className="portfolio-swipe-track">
          {items.map((study, i) => (
            <div key={study.slug} className="portfolio-swipe-slide">
              <div className="portfolio-swipe-card">
                <CardVisual
                  study={study}
                  isActive={i === activeIndex}
                  imagePriority={i === 0}
                  allowNavigation={guardCardNavigation}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="portfolio-360-bottom static mx-auto max-w-none px-0">
        <div className="portfolio-360-details">
          <PortfolioDetailCaption study={activeStudy} instant />
        </div>
        <Portfolio360BottomChrome
          activeIndex={activeIndex}
          cardCount={cardCount}
          items={items}
          onPrev={() => scrollTo(activeIndex - 1)}
          onNext={() => scrollTo(activeIndex + 1)}
          onDot={scrollTo}
          onContact={openContact}
        />
      </div>
    </section>
  );
}
