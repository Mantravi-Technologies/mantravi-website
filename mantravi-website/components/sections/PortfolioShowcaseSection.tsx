"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { type CaseStudy } from "@/lib/content/case-studies";
import { prefersSimplePortfolio } from "@/lib/utils/scroll-profile";
import { PortfolioSwipeSection } from "./portfolio/PortfolioSwipeSection";

const Portfolio360Experience = dynamic(
  () => import("./portfolio/Portfolio360Experience"),
  { ssr: false },
);

export function PortfolioShowcaseSectionClient({
  items,
}: {
  items: CaseStudy[];
}) {
  const reducedMotion = useReducedMotion();
  const [useSwipe, setUseSwipe] = useState(true);

  useEffect(() => {
    setUseSwipe(prefersSimplePortfolio());
  }, []);

  if (items.length === 0) return null;

  if (reducedMotion || useSwipe) {
    return <PortfolioSwipeSection items={items} />;
  }

  return <Portfolio360Experience items={items} />;
}
