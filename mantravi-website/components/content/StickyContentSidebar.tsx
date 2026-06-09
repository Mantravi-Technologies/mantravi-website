"use client";

import type { TocItem } from "@/lib/content/portable-text";
import { cn } from "@/lib/utils";

export function StickyContentSidebar({
  items,
  className,
}: {
  items: TocItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <aside
      className={cn(
        "sticky top-28 hidden self-start lg:block",
        className,
      )}
    >
      <nav aria-label="In this article">
        <p className="text-xs font-bold uppercase tracking-wider text-[#050505]/45">
          In this article
        </p>
        <ul className="mt-4 space-y-2 border-l border-[#050505]/12 pl-4">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-sm leading-snug text-[#050505]/65 transition-colors hover:text-primary",
                  item.level === 3 && "pl-2 text-xs",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
