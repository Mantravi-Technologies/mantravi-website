"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useContact } from "@/components/providers/ContactProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SwapTextButton } from "@/components/ui/SwapTextButton";
import { contactForm, trustBadges, siteConfig } from "@/lib/content/site-data";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

const heroLines = [
  { text: "Engineering Digital", accent: false },
  { text: "Systems That Deliver", accent: false },
];

const heroAccentMobile = ["AI, Intelligence,", "and Impact"];
const heroAccentDesktop = [`AI, ${siteConfig.headlineAccent}`];

function HeroVideoBackground() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="hero-media" aria-hidden="true">
      <img
        src="/hero/hero-poster.jpg"
        alt=""
        className="hero-media__poster"
        fetchPriority="high"
        decoding="async"
      />
      {!reducedMotion && (
        <video
          className="hero-media__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero/hero-poster.jpg"
        >
          <source src="/hero/hero-bg.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-media__scrim" />
      <div className="hero-media__content-gradient" />
      <div className="hero-media__bottom-fade" />
      <div className="hero-media__corner-cover" />
    </div>
  );
}

export function HeroSection() {
  const { openContact } = useContact();
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 3500, stopOnInteraction: false }),
  ]);

  return (
    <section className="relative -mt-[var(--header-height)] flex min-h-[calc(100dvh+var(--header-height))] flex-col overflow-hidden bg-[#050505]">
      <HeroVideoBackground />
      <div className="grain-overlay opacity-15" aria-hidden="true" />

      <div className="relative z-10 flex flex-1 flex-col justify-center pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12">
        <div className="relative w-full max-w-7xl pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-10 lg:pl-14 xl:pl-20">
          <div className="hero-content-scrim" aria-hidden="true" />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="relative z-10 max-w-3xl"
          >
            <motion.h1
              variants={fadeUp}
              className="title-display text-[clamp(2.25rem,7vw,5.75rem)] leading-[0.92] text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)]"
            >
              {heroLines.map((line) => (
                <span key={line.text} className="block sm:whitespace-nowrap">
                  {line.text}
                </span>
              ))}
              <span className="block text-primary sm:hidden">
                {heroAccentMobile.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
              <span className="hidden text-primary sm:block sm:whitespace-nowrap">
                {heroAccentDesktop[0]}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:mt-6 sm:text-lg md:max-w-2xl md:text-xl"
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4"
            >
              <SwapTextButton onClick={openContact}>
                Consult Our Experts
              </SwapTextButton>
              <SwapTextButton onClick={openContact} variant="dark">
                {contactForm.submitLabel}
              </SwapTextButton>
              <SwapTextButton href="/portfolio" variant="dark" showIcon={false}>
                View Our Work
              </SwapTextButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 border-t border-white/10 bg-[#050505]/75 py-4 backdrop-blur-md sm:py-5">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {[...trustBadges, ...trustBadges].map((badge, i) => (
              <div
                key={`${badge}-${i}`}
                className="min-w-0 flex-[0_0_auto] px-4 sm:px-6 md:flex-[0_0_33%] lg:flex-[0_0_25%]"
              >
                <div className="flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-200 backdrop-blur sm:h-14 sm:px-6 sm:text-xs">
                  {badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
