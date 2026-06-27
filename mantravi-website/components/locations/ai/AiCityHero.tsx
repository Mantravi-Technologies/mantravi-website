"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AiMarquee } from "@/components/locations/ai/AiMarquee";
import { SwapTextButton } from "@/components/ui/SwapTextButton";
import { useContact } from "@/components/providers/ContactProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AI_NEURAL_HERO } from "@/lib/content/ai-development-location-pages";
import type { CityPage } from "@/lib/content/location-types";

function splitTitle(title: string, cityName: string) {
  const suffix = ` in ${cityName}`;
  if (title.endsWith(suffix)) {
    return {
      lead: title.slice(0, -suffix.length),
      city: cityName,
    };
  }
  return { lead: title, city: cityName };
}

const marqueeItems = [
  "LLM Apps",
  "RAG Systems",
  "AI Agents",
  "Computer Vision",
  "MLOps",
  "Document AI",
  "AI Copilots",
  "Predictive Analytics",
];

export function AiCityHero({ page }: { page: CityPage }) {
  const { openContact } = useContact();
  const reducedMotion = useReducedMotion();
  const { lead, city } = splitTitle(page.title, page.cityName);

  return (
    <header
      className={`ai-city-hero${reducedMotion ? " ai-city-hero--static" : ""}`}
    >
      <div className="ai-city-hero__media" aria-hidden="true">
        <Image
          src={AI_NEURAL_HERO.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="ai-city-hero__img"
        />
        <div className="ai-city-hero__mesh" />
        <div className="ai-city-hero__shade ai-city-hero__shade--read" />
        <div className="ai-city-hero__shade ai-city-hero__shade--top" />
        <div className="ai-city-hero__shade ai-city-hero__shade--bottom" />
      </div>

      <div className="ai-city-hero__inner">
        <nav
          aria-label="Breadcrumb"
          className="ai-city-hero__crumb ai-city-hero__reveal ai-city-hero__reveal--0"
        >
          <Link href="/">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
          <span>{page.cityName}</span>
          <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
          <span>AI</span>
        </nav>

        <div className="ai-city-hero__copy">
          <p className="ai-city-hero__eyebrow ai-city-hero__reveal ai-city-hero__reveal--1">
            {page.hasLocalOffice
              ? `Mantravi · ${page.cityName} studio`
              : `Mantravi · Serving ${page.cityName}`}
          </p>

          <h1 className="ai-city-hero__title title-display ai-city-hero__reveal ai-city-hero__reveal--2">
            <span className="ai-city-hero__title-line">{lead}</span>
            <span className="ai-city-hero__title-line ai-city-hero__title-line--city">
              in {city}
            </span>
          </h1>

          <p className="ai-city-hero__lead ai-city-hero__reveal ai-city-hero__reveal--3">
            {page.heroSubtitle}
          </p>

          <div className="ai-city-hero__cta ai-city-hero__reveal ai-city-hero__reveal--4">
            <SwapTextButton onClick={openContact}>
              {`Start your ${page.cityName} AI build`}
            </SwapTextButton>
            <SwapTextButton href="#capabilities" variant="dark" showIcon={false}>
              Explore services
            </SwapTextButton>
          </div>
        </div>
      </div>

      <div className="ai-city-hero__footer">
        <AiMarquee items={marqueeItems} />

        <div className="ai-city-hero__dock">
          <div className="ai-city-hero__dock-inner">
            <p className="ai-city-hero__dock-label">AI Services</p>
            <ul className="ai-city-hero__dock-list">
              {page.capabilities.slice(0, 6).map((cap) => (
                <li key={cap.id}>
                  <a href="#capabilities">{cap.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
