"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content/case-studies";
import { getCaseStudyImage } from "@/lib/content/case-study-images";
import { cn } from "@/lib/utils";

export function ServiceCaseStudyCard({ study }: { study: CaseStudy }) {
  const cover = getCaseStudyImage(study, "serviceCard");
  const hasCover = Boolean(cover);

  return (
    <Link
      href={`/portfolio/${study.slug}`}
      className={cn(
        "service-case-card group block h-full",
        hasCover && "service-case-card--cover",
      )}
    >
      {hasCover ? (
        <>
          <Image
            src={cover!}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="service-case-card__cover object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/85 to-[#080808]/35"
            aria-hidden="true"
          />
        </>
      ) : (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br",
            study.gradient || "from-primary/35 to-primary/10",
          )}
        >
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.22),transparent_52%)]"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="service-case-card__content relative z-10 flex h-full min-h-[22rem] flex-col p-5 md:min-h-[24rem] md:p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="service-case-card__client">{study.client}</span>
          <span className="service-case-card__arrow" aria-hidden="true">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-auto pt-8">
          <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-primary md:text-xl">
            {study.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400 line-clamp-2">
            {study.summary}
          </p>

          <div className="service-case-card__metrics">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <div className="text-xl font-bold tracking-tight text-primary md:text-2xl">
                  {m.value}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">{m.label}</div>
              </div>
            ))}
          </div>

          <span className="service-case-card__link">
            View Case Study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
