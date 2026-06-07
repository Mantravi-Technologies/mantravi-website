"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Card";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TextReveal } from "@/components/motion/TextReveal";

type Props = {
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  slug: string;
};

export function BlogFeaturedHero({
  category,
  title,
  excerpt,
  author,
  date,
  slug,
}: Props) {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ScrollReveal>
          <Badge dark>{category}</Badge>
        </ScrollReveal>
        <Link href={`/blog/${slug}`}>
          <h1 className="mt-4 text-3xl font-bold text-white hover:text-primary transition-colors md:text-4xl">
            <TextReveal as="span" text={title} />
          </h1>
        </Link>
        <ScrollReveal delay={0.1}>
          <p className="mt-4 text-slate-300">{excerpt}</p>
          <p className="mt-4 text-sm text-slate-400">
            {author} · {date}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
