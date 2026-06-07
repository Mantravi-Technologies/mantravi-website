import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Badge, Card } from "@/components/ui/Card";
import { CTASection } from "@/components/sections/HomeCTASections";
import { caseStudies } from "@/lib/content/case-studies";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) return { title: "Case Study Not Found" };
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find((cs) => cs.slug === slug);
  if (!study) notFound();

  const related = caseStudies
    .filter(
      (cs) =>
        cs.slug !== slug && cs.industry.some((i) => study.industry.includes(i)),
    )
    .slice(0, 3);

  return (
    <>
      <SectionShell
        variant="none"
        className={cn(
          "!py-20 bg-gradient-to-br hero-pattern",
          study.gradient || "from-[#050a30] to-navy-light",
        )}
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>
        <Badge dark className="mt-6">
          {study.client}
        </Badge>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold text-white md:text-5xl">
          {study.title}
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">{study.summary}</p>
        <div className="mt-8 flex flex-wrap gap-8">
          {study.metrics.map((m) => (
            <div key={m.label}>
              <div className="text-3xl font-bold text-accent">{m.value}</div>
              <div className="text-sm text-slate-400">{m.label}</div>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell variant="light">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            {study.challenge && (
              <div>
                <h2 className="text-2xl font-bold text-foreground-dark">
                  The Challenge
                </h2>
                <p className="mt-4 text-muted-light leading-relaxed">
                  {study.challenge}
                </p>
              </div>
            )}
            {study.solution && (
              <div>
                <h2 className="text-2xl font-bold text-foreground-dark">
                  Our Approach
                </h2>
                <p className="mt-4 text-muted-light leading-relaxed">
                  {study.solution}
                </p>
              </div>
            )}
          </div>
          <div>
            <Card variant="light">
              <h3 className="font-bold">Technologies</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {study.technologies.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </SectionShell>

      {related.length > 0 && (
        <SectionShell variant="dark">
          <h2 className="text-2xl font-bold text-white">Related Work</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/portfolio/${r.slug}`}>
                <div className="glass-card p-6 hover:border-accent/30">
                  <Badge dark>{r.client}</Badge>
                  <h3 className="mt-2 font-bold text-white">{r.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-accent">
                    Read more <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </SectionShell>
      )}

      <CTASection />
    </>
  );
}
