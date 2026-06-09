import type { PortableTextBlock } from "@portabletext/types";

export type { PortableTextBlock };

export type TocItem = {
  id: string;
  label: string;
  level: 2 | 3;
};

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function extractTocFromPortableText(
  blocks: PortableTextBlock[] | undefined,
): TocItem[] {
  if (!blocks?.length) return [];

  const items: TocItem[] = [];
  for (const block of blocks) {
    if (block._type !== "block") continue;
    const style = block.style as string | undefined;
    if (style !== "h2" && style !== "h3") continue;

    const label = (block.children ?? [])
      .filter((c) => c._type === "span")
      .map((c) => ("text" in c ? c.text : ""))
      .join("")
      .trim();
    if (!label) continue;

    items.push({
      id: slugifyHeading(label),
      label,
      level: style === "h3" ? 3 : 2,
    });
  }
  return items;
}

/** Convert legacy markdown-ish blog body to minimal portable text blocks */
export function markdownishToPortableText(text: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  let key = 0;

  for (const para of text.split("\n\n")) {
    const trimmed = para.trim();
    if (!trimmed) continue;

    if (trimmed.startsWith("## ")) {
      blocks.push({
        _type: "block",
        _key: `b${key++}`,
        style: "h2",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: `s${key++}`,
            text: trimmed.replace(/^##\s+/, ""),
            marks: [],
          },
        ],
      });
      continue;
    }

    blocks.push({
      _type: "block",
      _key: `b${key++}`,
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `s${key++}`,
          text: trimmed,
          marks: [],
        },
      ],
    });
  }

  return blocks;
}

/** Build portable text from challenge + solution sections */
export function challengeSolutionToPortableText(
  challenge?: string,
  solution?: string,
): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  let key = 0;

  const pushSection = (style: "h2", title: string, body?: string) => {
    if (!body) return;
    blocks.push({
      _type: "block",
      _key: `b${key++}`,
      style,
      markDefs: [],
      children: [
        { _type: "span", _key: `s${key++}`, text: title, marks: [] },
      ],
    });
    blocks.push({
      _type: "block",
      _key: `b${key++}`,
      style: "normal",
      markDefs: [],
      children: [
        { _type: "span", _key: `s${key++}`, text: body, marks: [] },
      ],
    });
  };

  pushSection("h2", "The Challenge", challenge);
  pushSection("h2", "Our Approach", solution);
  return blocks;
}

export function resolveBlogBody(post: {
  bodyBlocks?: PortableTextBlock[];
  body?: string;
}): PortableTextBlock[] {
  if (post.bodyBlocks?.length) return post.bodyBlocks;
  if (post.body) return markdownishToPortableText(post.body);
  return [];
}

export function resolveCaseStudyBody(study: {
  bodyBlocks?: PortableTextBlock[];
  challenge?: string;
  solution?: string;
}): PortableTextBlock[] {
  if (study.bodyBlocks?.length) return study.bodyBlocks;
  return challengeSolutionToPortableText(study.challenge, study.solution);
}
