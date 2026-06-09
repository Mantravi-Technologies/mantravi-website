import type { PortableTextBlock } from "@/lib/content/portable-text";
import { portfolioFilters, type CaseStudy } from "@/lib/content/case-studies";

function blockText(block: PortableTextBlock): string {
  if (block._type !== "block") return "";
  return (block.children ?? [])
    .filter((c) => c._type === "span")
    .map((c) => ("text" in c ? c.text : ""))
    .join("");
}

export function getIndustryLabel(id: string): string {
  return portfolioFilters.industries.find((i) => i.id === id)?.label ?? id;
}

export function getServiceLabel(id: string): string {
  return portfolioFilters.services.find((s) => s.id === id)?.label ?? id;
}

export function getRegionLabel(id: string): string {
  return portfolioFilters.regions.find((r) => r.id === id)?.label ?? id;
}

export function getCaseStudyIntro(study: CaseStudy): string {
  const blocks = study.bodyBlocks;
  if (blocks?.length) {
    const intro = blocks.find(
      (b) => b._type === "block" && (b.style === "normal" || !b.style),
    );
    const text = intro ? blockText(intro) : "";
    if (text) return text;
  }
  return study.summary;
}

export function splitChallengeCopy(challenge?: string): {
  headline: string;
  detail: string;
} {
  if (!challenge?.trim()) {
    return { headline: "The business challenge", detail: "" };
  }
  const sentences = challenge.match(/[^.!?]+[.!?]+/g) ?? [challenge];
  return {
    headline: sentences[0]?.trim() ?? challenge,
    detail: sentences.slice(1).join(" ").trim(),
  };
}

export function getOutcomeMetrics(study: CaseStudy) {
  return study.heroMetrics?.length ? study.heroMetrics : study.metrics;
}

export function filterCaseStudyBody(
  blocks: PortableTextBlock[],
  study: CaseStudy,
): PortableTextBlock[] {
  let result = [...blocks];

  const introIdx = result.findIndex(
    (b) => b._type === "block" && (b.style === "normal" || !b.style),
  );
  if (introIdx >= 0) {
    result = result.filter((_, i) => i !== introIdx);
  }

  if (study.challenge) {
    const challengeIdx = result.findIndex((b) => {
      if (b._type !== "block" || b.style !== "h2") return false;
      return blockText(b).toLowerCase().includes("challenge");
    });
    if (challengeIdx >= 0) {
      const remove = new Set<number>([challengeIdx]);
      const next = result[challengeIdx + 1];
      if (next?._type === "block" && (next.style === "normal" || !next.style)) {
        remove.add(challengeIdx + 1);
      }
      result = result.filter((_, i) => !remove.has(i));
    }
  }

  return result;
}
