"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell, SectionHeading } from "@/components/ui/SectionShell";
import { StatCounter } from "@/components/ui/StatCounter";
import { FAQAccordion } from "@/components/ui/Accordion";
import { Card, Badge } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/HomeCTASections";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { HoverCard } from "@/components/motion/HoverCard";
import { TextReveal } from "@/components/motion/TextReveal";
import { siteConfig, companyStats, advantages } from "@/lib/content/site-data";
import {
  timeline,
  teamMembers,
  testimonials,
  faqs,
} from "@/lib/content/about-data";
import { useContact } from "@/components/providers/ContactProvider";
export function AboutContent() {
  const [activeYear, setActiveYear] = useState(
    timeline[timeline.length - 1].year,
  );
  const { openContact } = useContact();
  const activeEvent = timeline.find((t) => t.year === activeYear)!;
  const filteredTestimonials = testimonials.filter((t) => t.type === "client");
  const aboutFaqs = faqs.slice(0, 5);
  return (
    <>
      {" "}
      <SectionShell variant="dark" className="!py-20 md:!py-28">
        {" "}
        <div className="text-center">
          {" "}
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            About Mantravi
          </p>{" "}
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            {" "}
            <TextReveal
              as="span"
              text="A Global Digital Engineering Partner"
            />{" "}
          </h1>{" "}
          <ScrollReveal>
            {" "}
            <p className="mx-auto mt-6 max-w-3xl text-slate-300 leading-relaxed">
              {" "}
              {siteConfig.mission}{" "}
            </p>{" "}
            <Button className="mt-8" onClick={openContact}>
              Consult Our Experts
            </Button>{" "}
          </ScrollReveal>{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell variant="light" className="!py-16">
        {" "}
        <StatCounter stats={companyStats} />{" "}
      </SectionShell>{" "}
      <SectionShell variant="light">
        {" "}
        <SectionHeading
          title="Our Story"
          description={siteConfig.vision}
          light
        />{" "}
        <div className="mt-8 max-w-3xl mx-auto text-muted-light leading-relaxed space-y-4">
          {" "}
          <p>
            {" "}
            Mantravi started in 2020 with a simple belief: technology should
            solve real business problems, not create more complexity. What began
            as a web and marketing studio has grown into a full-stack digital
            partner for startups and growing companies.{" "}
          </p>{" "}
          <p>
            {" "}
            Today we deliver product development, brand and SEO, and QA under
            one roof, so clients don&apos;t have to coordinate multiple vendors
            to ship and grow.{" "}
          </p>{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell variant="dark">
        {" "}
        <SectionHeading title="Our Journey" />{" "}
        <div className="mt-8 flex flex-wrap gap-2">
          {" "}
          {timeline.map((event) => (
            <button
              key={event.year}
              type="button"
              onClick={() => setActiveYear(event.year)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${activeYear === event.year ? "bg-accent text-navy" : "bg-white/5 text-slate-300 hover:bg-white/10"}`}
            >
              {" "}
              {event.year}{" "}
            </button>
          ))}{" "}
        </div>{" "}
        <AnimatePresence mode="wait">
          {" "}
          <motion.div
            key={activeYear}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 glass-card p-8"
          >
            {" "}
            <h3 className="text-2xl font-bold text-white">
              {activeEvent.title}
            </h3>{" "}
            <p className="mt-4 text-slate-300 leading-relaxed max-w-3xl">
              {activeEvent.description}
            </p>{" "}
          </motion.div>{" "}
        </AnimatePresence>{" "}
      </SectionShell>{" "}
      <SectionShell variant="light">
        {" "}
        <SectionHeading title="Why Clients Choose Us" light />{" "}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {" "}
          {advantages.map((item) => (
            <HoverCard key={item.title}>
              {" "}
              <Card variant="light">
                {" "}
                <h3 className="text-lg font-bold">{item.title}</h3>{" "}
                <p className="mt-3 text-sm text-muted-light leading-relaxed">
                  {item.description}
                </p>{" "}
              </Card>{" "}
            </HoverCard>
          ))}{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell id="testimonials" variant="dark">
        {" "}
        <SectionHeading title="Client Feedback" />{" "}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {" "}
          {filteredTestimonials.map((t) => (
            <div key={t.id} className="glass-card p-6">
              {" "}
              <p className="text-sm text-slate-300 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>{" "}
              <div className="mt-4">
                {" "}
                <p className="font-semibold text-white text-sm">
                  {t.name}
                </p>{" "}
                <p className="text-xs text-slate-400">
                  {" "}
                  {t.company ? `${t.title}, ${t.company}` : t.title}{" "}
                </p>{" "}
              </div>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell id="team" variant="light">
        {" "}
        <SectionHeading title="Our Core Team" light />{" "}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {" "}
          {teamMembers.map((member) => (
            <HoverCard key={member.name}>
              {" "}
              <Card variant="light" className="text-center">
                {" "}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent-sky to-accent text-2xl font-bold text-navy">
                  {" "}
                  {member.name.charAt(0)}{" "}
                </div>{" "}
                <h3 className="mt-4 font-bold">{member.name}</h3>{" "}
                <p className="text-sm text-accent-sky">{member.title}</p>{" "}
                {member.bio && (
                  <p className="mt-2 text-xs text-muted-light">{member.bio}</p>
                )}{" "}
              </Card>{" "}
            </HoverCard>
          ))}{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell id="careers" variant="dark">
        {" "}
        <SectionHeading
          title="Work With Us"
          description="Join a team that values craft, clarity, and client outcomes."
        />{" "}
        <div className="mt-8 glass-card max-w-2xl mx-auto p-8 text-center">
          {" "}
          <Badge dark>Careers</Badge>{" "}
          <p className="mt-4 text-slate-300 leading-relaxed">
            {" "}
            We&apos;re always looking for engineers, designers, and marketers
            who care about quality work. Reach out with your portfolio and what
            you&apos;d like to build.{" "}
          </p>{" "}
          <Button className="mt-6" variant="outline" onClick={openContact}>
            Get In Touch
          </Button>{" "}
        </div>{" "}
      </SectionShell>{" "}
      <SectionShell variant="light">
        {" "}
        <SectionHeading title="FAQ" light />{" "}
        <div className="mt-8">
          {" "}
          <FAQAccordion items={aboutFaqs} variant="light" />{" "}
        </div>{" "}
      </SectionShell>{" "}
      <CTASection />{" "}
    </>
  );
}
