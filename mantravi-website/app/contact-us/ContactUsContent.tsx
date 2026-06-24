"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { contactForm, siteConfig } from "@/lib/content/site-data";

export function ContactUsContent() {
  return (
    <div className="contact-page bg-[#050505]">
      <section className="contact-page__hero border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-[calc(var(--header-height,72px)+3rem)] sm:px-6 lg:px-8 lg:pb-20 lg:pt-[calc(var(--header-height,72px)+4rem)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Contact
          </p>
          <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-tight text-white sm:text-5xl">
            {contactForm.title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-400 sm:text-lg">
            {contactForm.subtitle}
          </p>
        </div>
      </section>

      <section className="contact-page__body">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Talk to our team
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Share your product idea, timeline, and goals. We help startups and
              enterprises with web, mobile, AI, and digital marketing, backed by
              clear milestones and reliable delivery.
            </p>

            <ul className="mt-8 space-y-5">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-start gap-3 text-slate-300 transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">
                      Email
                    </span>
                    {siteConfig.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-slate-300 transition-colors hover:text-primary"
                >
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>
                    <span className="block text-xs uppercase tracking-wider text-slate-500">
                      Phone
                    </span>
                    {siteConfig.phone}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-300">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-slate-500">
                    Studios
                  </span>
                  Noida &amp; Lucknow, India
                </span>
              </li>
            </ul>

            <p className="mt-10 text-sm text-slate-500">
              Prefer email? Write to{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-primary hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              or explore our{" "}
              <Link href="/services" className="text-primary hover:underline">
                services
              </Link>
              .
            </p>
          </div>

          <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl shadow-black/40 sm:p-8">
            <div className="grain-overlay opacity-20" aria-hidden="true" />
            <div className="relative">
              <h2 className="text-xl font-bold text-white">
                {contactForm.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                {contactForm.subtitle}
              </p>
              <ContactForm className="mt-6" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
