"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";

const pipelineSteps = [
  {
    title: "Ingest & model",
    description:
      "Warehouses, APIs, and documents normalized with dbt, Airflow, and quality checks.",
  },
  {
    title: "Embed & index",
    description:
      "Vector search, chunking strategy, and metadata filters tuned for your domain.",
  },
  {
    title: "Ground & reason",
    description:
      "RAG, structured outputs, and evaluation suites that reduce hallucinations.",
  },
  {
    title: "Agents & automate",
    description:
      "Supervised workflows with human escalation for high-stakes decisions.",
  },
  {
    title: "Govern & audit",
    description:
      "Access control, logging, and compliance-friendly patterns from day one.",
  },
  {
    title: "Monitor & improve",
    description:
      "Latency, cost, drift, and accuracy tracked in production.",
  },
];

export function ServiceAiPipeline() {
  return (
    <section className="service-layout-ai__section border-t border-white/[0.06] bg-[#030308] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
            End-to-end stack
          </p>
          <h2 className="title-display mt-5 text-3xl text-white md:text-4xl">
            From raw data to production AI
          </h2>
          <p className="mt-5 leading-relaxed text-slate-400">
            Reliable data infrastructure is what separates demo chatbots from AI
            systems your business can trust.
          </p>
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 space-y-0"
        >
          {pipelineSteps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="service-layout-ai__pipeline-row grid gap-4 border-b border-white/10 py-8 md:grid-cols-[4.5rem_12rem_1fr] md:gap-8 md:py-10"
            >
              <span className="font-mono text-sm text-slate-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400 md:text-base">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
