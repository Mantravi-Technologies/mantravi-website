"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useContact } from "@/components/providers/ContactProvider";
import { trustBadges } from "@/lib/content/site-data";
import { getCityHeroImage } from "@/lib/content/location-heroes";
import type { CityPage } from "@/lib/content/location-types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollScene, useScrollSceneRefresh } from "@/hooks/useScrollScene";

export function CityScrollHero({ page }: { page: CityPage }) {
  const { openContact } = useContact();
  const reducedMotion = useReducedMotion();
  const heroImage = getCityHeroImage(page.slug);

  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useScrollSceneRefresh([page.slug, reducedMotion]);

  useScrollScene(
    ({ gsap: g }) => {
      if (reducedMotion) return;
      const section = sectionRef.current;
      const pin = pinRef.current;
      const copy = copyRef.current;
      const badges = badgesRef.current;
      const cta = ctaRef.current;
      const frame = frameRef.current;
      const overlay = overlayRef.current;
      if (!section || !pin || !copy || !badges || !cta || !frame || !overlay)
        return;

      const mm = g.matchMedia();
      const ctx = g.context(() => {
        mm.add("(min-width: 768px)", () => {
          g.set(frame, {
            width: "min(92vw, 1100px)",
            height: "38vh",
            borderRadius: 28,
            y: "28vh",
            xPercent: -50,
            left: "50%",
            bottom: 0,
            position: "absolute",
          });
          g.set(overlay, { opacity: 0.48 });
          g.set(copy, { xPercent: -50, left: "50%", y: 0, opacity: 1 });
          g.set(badges, { opacity: 1, y: 0 });
          g.set(cta, { opacity: 0, y: 20, pointerEvents: "none" });

          const tl = g.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=120%",
              pin,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(
            frame,
            {
              width: "100%",
              height: "100%",
              borderRadius: 0,
              y: 0,
              ease: "none",
              duration: 1,
            },
            0,
          )
            .to(
              overlay,
              { opacity: 0.78, ease: "none", duration: 0.7 },
              0.1,
            )
            .to(
              copy,
              { y: "22vh", ease: "none", duration: 0.75 },
              0,
            )
            .to(
              badges,
              { opacity: 0, y: -20, ease: "none", duration: 0.35 },
              0.18,
            )
            .to(
              cta,
              {
                opacity: 1,
                y: 0,
                pointerEvents: "auto",
                ease: "none",
                duration: 0.4,
              },
              0.48,
            );

          return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        });
      }, section);

      return () => ctx.revert();
    },
    [page.slug, reducedMotion],
  );

  return (
    <section
      ref={sectionRef}
      className="city-scroll-hero"
      aria-label={`${page.cityName} hero`}
    >
      <div ref={pinRef} className="city-scroll-hero__pin">
        <div className="city-scroll-hero__stage">
          <nav
            aria-label="Breadcrumb"
            className="city-scroll-hero__breadcrumb"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 shrink-0 opacity-50" aria-hidden />
            <span>{page.cityName}</span>
          </nav>

          <div ref={frameRef} className="city-scroll-hero__frame">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              priority
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 100vw, 1100px"
              className="city-scroll-hero__image object-cover"
            />
            <div
              ref={overlayRef}
              className="city-scroll-hero__overlay"
              aria-hidden
            />
          </div>

          <div ref={copyRef} className="city-scroll-hero__copy">
            {page.hasLocalOffice && (
              <p className="city-scroll-hero__badge">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Local studio in {page.cityName}
              </p>
            )}
            <h1 className="city-scroll-hero__title">{page.title}</h1>
            <p className="city-scroll-hero__subtitle">{page.heroSubtitle}</p>
            <div ref={badgesRef} className="city-scroll-hero__badges">
              {trustBadges.slice(0, 3).map((b) => (
                <span key={b}>{b}</span>
              ))}
            </div>
            <div ref={ctaRef} className="city-scroll-hero__copy-cta">
              <Button
                size="lg"
                className="shadow-lg shadow-primary/30"
                onClick={openContact}
              >
                Consult Our {page.cityName} Experts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
