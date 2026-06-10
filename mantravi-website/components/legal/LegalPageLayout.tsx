import Link from "next/link";
import type { ReactNode } from "react";

type TocItem = { id: string; label: string };

type LegalPageLayoutProps = {
  title: string;
  subtitle: string;
  lastUpdated: string;
  toc: readonly TocItem[];
  children: ReactNode;
};

export function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  toc,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="bg-white text-[#050505]">
      <section className="border-b border-black/10 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#050505]/50">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#050505] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[#050505]/70">
            {subtitle}
          </p>
          <p className="mt-6 text-sm font-medium text-[#050505]/50">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Table of contents"
            className="rounded-2xl border border-black/10 bg-[#fafafa] p-6 md:p-8"
          >
            <h2 className="text-lg font-bold text-[#050505]">
              Table of Contents
            </h2>
            <ol className="mt-4 space-y-2 text-sm leading-relaxed text-[#050505]/80">
              {toc.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-prose mt-12 space-y-12">{children}</div>
        </div>
      </section>
    </div>
  );
}

type LegalSectionProps = {
  id: string;
  title: string;
  paragraphs?: string[];
  subsections?: { title: string; paragraphs: string[] }[];
  note?: string;
  contactEmail?: string;
};

export function LegalSection({
  id,
  title,
  paragraphs,
  subsections,
  note,
  contactEmail,
}: LegalSectionProps) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-2xl font-bold tracking-tight text-[#050505]">
        {title}
      </h2>

      {paragraphs?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="mt-4 text-base leading-relaxed text-[#050505]/75"
        >
          {paragraph.includes("info@mantravi.com") ? (
            <>
              {paragraph.split("info@mantravi.com")[0]}
              <a
                href="mailto:info@mantravi.com"
                className="text-primary hover:underline"
              >
                info@mantravi.com
              </a>
              {paragraph.split("info@mantravi.com")[1]}
            </>
          ) : (
            paragraph
          )}
        </p>
      ))}

      {subsections?.map((subsection) => {
        const isList =
          subsection.title === "" &&
          subsection.paragraphs.length > 1 &&
          subsection.paragraphs.every((p) => p.startsWith("To "));

        if (isList) {
          return (
            <ul
              key="list"
              className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#050505]/75"
            >
              {subsection.paragraphs.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <div key={subsection.title || subsection.paragraphs[0]?.slice(0, 40)}>
            {subsection.title ? (
              <h3 className="mt-6 text-lg font-semibold text-[#050505]">
                {subsection.title}
              </h3>
            ) : null}
            {subsection.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mt-3 text-base leading-relaxed text-[#050505]/75"
              >
                {paragraph}
              </p>
            ))}
          </div>
        );
      })}

      {note ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
          <span className="font-bold">NOTE: </span>
          {note}
        </p>
      ) : null}

      {contactEmail ? (
        <p className="mt-4 text-base leading-relaxed text-[#050505]/75">
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="text-primary hover:underline"
          >
            {contactEmail}
          </a>
          .
        </p>
      ) : null}
    </section>
  );
}
