import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import type { CaseStudy } from "@/lib/content/case-studies";
import type { PortableTextBlock } from "@/lib/content/portable-text";
import { RichContent } from "@/components/content/RichContent";
import { CaseStudyConsultLink } from "@/components/portfolio/CaseStudyConsultLink";
import {
  getCaseStudyIntro,
  getIndustryLabel,
  getOutcomeMetrics,
  getRegionLabel,
  getServiceLabel,
  splitChallengeCopy,
} from "@/lib/content/case-study-page";
import { getCaseStudyImage } from "@/lib/content/case-study-images";
import { cn } from "@/lib/utils";

/* ── Hero: immersive cover, content anchored bottom-left (not centered clone) ── */
function CaseStudyCover({ study }: { study: CaseStudy }) {
  const heroImage = getCaseStudyImage(study, "hero");
  const hasImage = Boolean(heroImage);

  return (
    <section className="relative -mt-[var(--header-height)] flex min-h-[calc(58vh+var(--header-height))] flex-col justify-between overflow-hidden bg-[#060b18] sm:min-h-[calc(65vh+var(--header-height))] lg:min-h-[calc(72vh+var(--header-height))]">
      {hasImage ? (
        <Image
          src={heroImage!}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-60",
              study.gradient || "from-cyan-900/80 to-indigo-950",
            )}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(0,229,255,0.35), transparent), radial-gradient(ellipse 60% 50% at 10% 80%, rgba(79,70,229,0.25), transparent)",
            }}
          />
        </>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-[#060b18]/75 to-[#060b18]/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <Link
          href="/portfolio"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-black/45"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
          Portfolio
        </Link>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pb-14 lg:px-8 lg:pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary sm:text-sm">
          {study.client}
        </p>
        <h1 className="title-display mt-3 max-w-4xl text-[1.75rem] leading-[1.12] text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          {study.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
          {study.summary}
        </p>
        {study.projectUrl && (
          <a
            href={study.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#060b18] transition-opacity hover:opacity-90"
          >
            View live product
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </section>
  );
}

/* ── Floating metrics card bridging hero → content ── */
function MetricsFloat({ study }: { study: CaseStudy }) {
  const metrics = getOutcomeMetrics(study);
  if (!metrics.length) return null;

  return (
    <div className="relative z-20 -mt-8 px-4 sm:-mt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-slate-200 shadow-xl shadow-black/10 ring-1 ring-black/5 sm:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="flex flex-col justify-center bg-white px-6 py-5 sm:px-8 sm:py-6"
            >
              <span className="text-2xl font-bold tracking-tight text-[#050505] sm:text-3xl">
                {m.value}
              </span>
              <span className="mt-1 text-sm leading-snug text-slate-500">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Quick facts: scroll on mobile, grid on desktop ── */
function ProjectFacts({ study }: { study: CaseStudy }) {
  const facts = [
    { label: "Industry", value: study.industry.map(getIndustryLabel).join(", ") },
    { label: "Services", value: study.services.map(getServiceLabel).join(", ") },
    { label: "Region", value: getRegionLabel(study.region) },
    {
      label: "Stack",
      value: study.technologies.slice(0, 4).join(", ") || "—",
    },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
      {facts.map((f) => (
        <div
          key={f.label}
          className="min-w-[160px] flex-shrink-0 snap-start rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 sm:min-w-0"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {f.label}
          </p>
          <p className="mt-1.5 text-sm font-medium leading-snug text-[#050505]">
            {f.value}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Context + intro (single narrative opener, not “About client” clone) ── */
function ProjectContext({ study }: { study: CaseStudy }) {
  const intro = getCaseStudyIntro(study);

  return (
    <section className="bg-white pt-6 pb-14 sm:pt-8 sm:pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProjectFacts study={study} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:items-start">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#050505] sm:text-3xl">
              Project context
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-slate-600 sm:text-lg">
              {intro}
            </p>
            {study.solution && (
              <p className="mt-5 text-base leading-[1.75] text-slate-600 sm:text-lg">
                {study.solution}
              </p>
            )}
          </div>
          <div className="rounded-2xl bg-[#060b18] p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Work with us
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-300">
              Planning a similar product? We handle design, engineering, and
              launch under one senior team.
            </p>
            <div className="mt-6">
              <CaseStudyConsultLink className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-[#060b18] hover:opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Challenge: card treatment, not 50/50 split clone ── */
function ProblemFocus({ study }: { study: CaseStudy }) {
  if (!study.challenge) return null;

  const { headline, detail } = splitChallengeCopy(study.challenge);

  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/80">
          <div className="h-1.5 bg-gradient-to-r from-primary via-cyan-400 to-indigo-500" />
          <div className="grid gap-0 lg:grid-cols-5">
            <div className="border-b border-slate-100 p-6 sm:p-8 lg:col-span-2 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                The problem
              </p>
              <h2 className="mt-4 text-xl font-bold leading-snug text-[#050505] sm:text-2xl lg:text-[1.65rem] lg:leading-tight">
                {headline}
              </h2>
            </div>
            <div className="p-6 sm:p-8 lg:col-span-3">
              <p className="text-base leading-[1.75] text-slate-600 sm:text-lg">
                {detail || study.challenge}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Story body ── */
function ProjectStory({ blocks, fallback }: { blocks: PortableTextBlock[]; fallback?: string }) {
  if (!blocks.length && !fallback) return null;

  return (
    <section className="bg-white py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Inside the build
        </p>
        <h2 className="mt-3 text-2xl font-bold text-[#050505] sm:text-3xl">
          Approach &amp; execution
        </h2>
        <div className="mt-8 case-study-prose max-w-none lg:max-w-5xl xl:max-w-6xl">
          {blocks.length > 0 ? (
            <RichContent value={blocks} />
          ) : (
            <p className="text-base leading-[1.75] text-slate-600 sm:text-lg">
              {fallback}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Highlights: stacked mobile, grid desktop ── */
function ShippedWork({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <section className="bg-[#060b18] py-14 text-white sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold sm:text-3xl">What we shipped</h2>
        <p className="mt-2 max-w-lg text-sm text-slate-400 sm:text-base">
          Core capabilities delivered in the release.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item}
              className="min-w-0 w-full rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-primary/30"
            >
              <div className="mb-3 h-0.5 w-10 rounded-full bg-primary" aria-hidden />
              <p className="text-sm leading-relaxed break-words text-slate-200 sm:text-base">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Tech strip ── */
function TechStrip({ technologies }: { technologies: string[] }) {
  if (!technologies.length) return null;

  return (
    <section className="border-t border-slate-200 bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Built with
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-[#050505]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Related: stacked mobile, 2-col desktop ── */
function MoreWork({ studies }: { studies: CaseStudy[] }) {
  if (!studies.length) return null;

  return (
    <section className="bg-slate-50 py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Portfolio
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#050505] sm:text-3xl">
              Explore more work
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-slate-600 hover:text-primary"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {studies.slice(0, 4).map((s) => {
            const cardImage = getCaseStudyImage(s, "relatedCard");
            return (
            <Link
              key={s.slug}
              href={`/portfolio/${s.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div
                className={cn(
                  "relative aspect-[2/1] overflow-hidden bg-gradient-to-br",
                  s.gradient || "from-slate-800 to-slate-900",
                )}
              >
                {cardImage && (
                  <Image
                    src={cardImage}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-semibold uppercase tracking-wider text-white/90">
                  {s.client}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="font-bold leading-snug text-[#050505] group-hover:text-primary">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
                  {s.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Read case study
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type CaseStudyLayoutProps = {
  study: CaseStudy;
  bodyBlocks: PortableTextBlock[];
  related: CaseStudy[];
};

export function CaseStudyLayout({
  study,
  bodyBlocks,
  related,
}: CaseStudyLayoutProps) {
  return (
    <article className="case-study-page">
      <CaseStudyCover study={study} />
      <MetricsFloat study={study} />
      <ProjectContext study={study} />
      <ProblemFocus study={study} />
      <ProjectStory blocks={bodyBlocks} fallback={study.solution} />
      <ShippedWork items={study.highlights ?? []} />
      <TechStrip technologies={study.technologies} />
      <MoreWork studies={related} />
    </article>
  );
}
