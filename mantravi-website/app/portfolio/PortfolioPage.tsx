"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/ui/SectionShell";
import { Badge, Card } from "@/components/ui/Card";
import { HoverCard } from "@/components/motion/HoverCard";
import { CTASection } from "@/components/sections/HomeCTASections";
import { caseStudies, portfolioFilters } from "@/lib/content/case-studies";
import { useContact } from "@/components/providers/ContactProvider";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
type FilterType = "industries" | "services" | "regions";
export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<FilterType>("industries");
  const [filters, setFilters] = useState({
    industry: "all",
    service: "all",
    region: "all",
  });
  const [visibleCount, setVisibleCount] = useState(6);
  const { openContact } = useContact();
  const filtered = useMemo(() => {
    return caseStudies.filter((cs) => {
      const industryMatch =
        filters.industry === "all" || cs.industry.includes(filters.industry);
      const serviceMatch =
        filters.service === "all" || cs.services.includes(filters.service);
      const regionMatch =
        filters.region === "all" || cs.region === filters.region;
      return industryMatch && serviceMatch && regionMatch;
    });
  }, [filters]);
  const filterOptions =
    activeTab === "industries"
      ? portfolioFilters.industries
      : activeTab === "services"
        ? portfolioFilters.services
        : portfolioFilters.regions;
  const filterKey =
    activeTab === "industries"
      ? "industry"
      : activeTab === "services"
        ? "service"
        : "region";
  return (
    <>
      {" "}
      <SectionShell variant="dark" className="!py-20 md:!py-28">
        {" "}
        <div className="text-center">
          {" "}
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Portfolio
          </p>{" "}
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {" "}
            Work That Shows What We Build{" "}
          </h1>{" "}
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            {" "}
            Explore products we've shipped for D2C brands, EdTech platforms,
            healthcare startups, and SaaS teams, each built for real users and
            real business goals.{" "}
          </p>{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell variant="light" className="!pb-8">
        {" "}
        <div className="flex flex-wrap gap-4 border-b border-slate-200 pb-4">
          {" "}
          {(["industries", "services", "regions"] as FilterType[]).map(
            (tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-sm font-semibold capitalize transition-colors",
                  activeTab === tab
                    ? "text-accent-sky"
                    : "text-muted-light hover:text-foreground-dark",
                )}
              >
                {" "}
                {tab}{" "}
              </button>
            ),
          )}{" "}
        </div>{" "}
        <div className="mt-4 flex flex-wrap gap-2">
          {" "}
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFilters((f) => ({ ...f, [filterKey]: opt.id }))}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                filters[filterKey as keyof typeof filters] === opt.id
                  ? "bg-accent-sky text-white"
                  : "bg-slate-100 text-muted-light hover:bg-accent/10",
              )}
            >
              {" "}
              {opt.label}{" "}
            </button>
          ))}{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell variant="light" className="!pt-0">
        {" "}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {" "}
          {filtered.slice(0, visibleCount).map((study, i) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {" "}
              <HoverCard>
                {" "}
                <Card
                  variant="light"
                  className="flex h-full flex-col overflow-hidden p-0"
                >
                  {" "}
                  <div
                    className={cn(
                      "flex h-36 items-end p-4 bg-gradient-to-br",
                      study.gradient || "from-accent-sky/30 to-accent/10",
                    )}
                  >
                    {" "}
                    <Badge>{study.client}</Badge>{" "}
                  </div>{" "}
                  <div className="flex flex-1 flex-col p-6">
                    {" "}
                    <h3 className="font-bold">{study.title}</h3>{" "}
                    <p className="mt-2 text-sm text-muted-light line-clamp-2">
                      {study.summary}
                    </p>{" "}
                    <div className="mt-3 flex flex-wrap gap-3">
                      {" "}
                      {study.metrics.slice(0, 2).map((m) => (
                        <span
                          key={m.label}
                          className="text-xs text-muted-light"
                        >
                          {" "}
                          <strong className="text-accent-sky">
                            {m.value}
                          </strong>{" "}
                          {m.label}{" "}
                        </span>
                      ))}{" "}
                    </div>{" "}
                    <Link
                      href={`/portfolio/${study.slug}`}
                      className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-sky"
                    >
                      {" "}
                      View Case Study <ArrowRight className="h-3 w-3" />{" "}
                    </Link>{" "}
                  </div>{" "}
                </Card>{" "}
              </HoverCard>{" "}
            </motion.div>
          ))}{" "}
        </div>{" "}
        {visibleCount < filtered.length && (
          <div className="mt-8 text-center">
            {" "}
            <Button
              variant="outline"
              className="border-accent-sky text-accent-sky"
              onClick={() => setVisibleCount((c) => c + 6)}
            >
              {" "}
              Load More{" "}
            </Button>{" "}
          </div>
        )}{" "}
      </SectionShell>{" "}
      <SectionShell variant="dark">
        {" "}
        <div className="text-center">
          {" "}
          <h2 className="text-2xl font-bold text-white">
            Have a project in mind?
          </h2>{" "}
          <p className="mt-2 text-slate-400">
            We&apos;d love to hear about it.
          </p>{" "}
          <Button className="mt-6" onClick={openContact}>
            Start a Conversation
          </Button>{" "}
        </div>{" "}
      </SectionShell>{" "}
      <CTASection />{" "}
    </>
  );
}
