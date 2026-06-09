"use client";

import type { PortableTextBlock } from "@/lib/content/portable-text";
import { extractTocFromPortableText } from "@/lib/content/portable-text";
import { RichContent } from "@/components/content/RichContent";
import { StickyContentSidebar } from "@/components/content/StickyContentSidebar";
import { cn } from "@/lib/utils";

function MobileArticleToc({ items }: { items: ReturnType<typeof extractTocFromPortableText> }) {
  if (!items.length) return null;
  return (
    <details className="mb-8 rounded-lg border border-[#050505]/10 bg-[#f8fafc] lg:hidden">
      <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-[#050505]">
        In this article
      </summary>
      <ul className="space-y-2 border-t border-[#050505]/10 px-4 py-3">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-sm text-[#050505]/70 hover:text-primary",
                item.level === 3 && "pl-3 text-xs",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}

export function BlogPostLayout({ blocks }: { blocks: PortableTextBlock[] }) {
  const toc = extractTocFromPortableText(blocks);

  return (
    <div>
      <MobileArticleToc items={toc} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-16">
        <RichContent value={blocks} />
        <StickyContentSidebar items={toc} />
      </div>
    </div>
  );
}
