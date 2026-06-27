"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@/lib/content/portable-text";
import { slugifyHeading } from "@/lib/content/portable-text";
import { BlogRichCta } from "@/components/blog/BlogRichCta";
import { imageUrlFromSanity } from "@/lib/sanity/client";
import { cn } from "@/lib/utils";
import { isValidElement, type ReactNode } from "react";

type RichContentProps = {
  value: PortableTextBlock[];
  className?: string;
};

function headingText(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map((child) => headingText(child)).join("");
  }
  if (isValidElement<{ children?: ReactNode }>(children)) {
    return headingText(children.props.children);
  }
  return "";
}

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      const text = headingText(children);
      const id = slugifyHeading(text);
      return (
        <h2
          id={id}
          className="mb-4 mt-8 scroll-mt-24 text-xl font-bold text-[#050505] first:mt-0 sm:mt-10 sm:scroll-mt-28 sm:text-2xl"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = headingText(children);
      const id = slugifyHeading(text);
      return (
        <h3
          id={id}
          className="mb-3 mt-6 scroll-mt-24 text-lg font-bold text-[#050505] sm:mt-8 sm:scroll-mt-28 sm:text-xl"
        >
          {children}
        </h3>
      );
    },
    normal: ({ children }) => (
      <p className="my-4 text-[0.9375rem] leading-[1.75] text-[#050505]/75 sm:text-base sm:leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc space-y-2 pl-6 text-[#050505]/75">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal space-y-2 pl-6 text-[#050505]/75">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#050505]">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      const blank = value?.blank !== false;
      return (
        <a
          href={href}
          className="font-medium text-primary underline-offset-2 hover:underline"
          target={blank ? "_blank" : undefined}
          rel={blank ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url = imageUrlFromSanity(value);
      if (!url) return null;
      const alt = (value?.alt as string) || "";
      const caption = value?.caption as string | undefined;
      return (
        <figure className="my-6 max-w-full overflow-hidden rounded-xl border border-[#050505]/10 sm:my-8">
          <Image
            src={url}
            alt={alt}
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            loading="lazy"
          />
          {caption && (
            <figcaption className="border-t border-[#050505]/10 bg-white px-4 py-2 text-sm text-[#050505]/60">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
    richTable: ({ value }) => {
      const headers = (value?.headers as string[]) ?? [];
      const rows =
        (value?.rows as { cells?: string[] }[] | undefined) ?? [];
      if (!headers.length) return null;
      const caption = value?.caption ? String(value.caption) : undefined;
      return (
        <figure className="blog-rich-table-figure not-prose my-6 sm:my-8">
          <div
            className="blog-rich-table-scroll"
            data-lenis-prevent
            data-lenis-prevent-touch
            data-lenis-prevent-wheel
            tabIndex={0}
            role="region"
            aria-label={caption ?? "Scrollable table"}
          >
            <table className="blog-rich-table__table">
              <colgroup>
                <col className="blog-rich-table-col-label" />
                {headers.slice(1).map((h) => (
                  <col key={h} className="blog-rich-table-col-data" />
                ))}
              </colgroup>
              <thead>
                <tr>
                  {headers.map((h, j) => (
                    <th
                      key={h}
                      scope="col"
                      className={cn(
                        "blog-rich-table-th",
                        j === 0 && "blog-rich-table-th-first",
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className={cn(
                      "border-t border-[#050505]/10",
                      i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]",
                    )}
                  >
                    {(row.cells ?? []).map((cell, j) => (
                      <td
                        key={j}
                        className={cn(
                          "blog-rich-table-td",
                          j === 0 && "blog-rich-table-td-first",
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {caption && (
            <figcaption className="mt-2 text-xs font-medium text-[#050505]/60">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
    richCallout: ({ value }) => {
      const variant = (value?.variant as string) ?? "insight";
      return (
        <aside
          className={cn(
            "my-6 rounded-xl border-l-4 px-4 py-3.5 sm:my-8 sm:px-5 sm:py-4",
            variant === "warning" && "border-amber-500 bg-amber-50",
            variant === "tip" && "border-primary bg-primary/5",
            variant === "insight" && "border-violet-500 bg-violet-50",
          )}
        >
          {value?.title && (
            <p className="font-bold text-[#050505]">{String(value.title)}</p>
          )}
          {value?.body && (
            <p className="mt-2 text-sm leading-relaxed text-[#050505]/75">
              {String(value.body)}
            </p>
          )}
        </aside>
      );
    },
    richCta: ({ value }) => (
      <BlogRichCta value={value as Record<string, unknown>} />
    ),
    richQuote: ({ value }) => (
      <blockquote className="my-6 border-l-4 border-primary pl-4 sm:my-8 sm:pl-6">
        <p className="text-base italic leading-relaxed text-[#050505]/80 sm:text-lg">
          &ldquo;{String(value?.quote ?? "")}&rdquo;
        </p>
        {(value?.attribution || value?.role) && (
          <footer className="mt-3 text-sm text-[#050505]/55">
            {value?.attribution && (
              <cite className="not-italic font-semibold text-[#050505]">
                {String(value.attribution)}
              </cite>
            )}
            {value?.role && <span> — {String(value.role)}</span>}
          </footer>
        )}
      </blockquote>
    ),
  },
};

export function RichContent({ value, className }: RichContentProps) {
  if (!value?.length) return null;
  return (
    <div className={cn("prose-mantravi rich-content min-w-0 max-w-full", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}
