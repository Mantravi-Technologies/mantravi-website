import Link from "next/link";
import { Fragment } from "react";
import { footerLinks, offices, siteConfig } from "@/lib/content/site-data";
import { MantraviLogo } from "@/components/ui/Logo";
import { Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer border-t border-white/10">
      <div className="site-footer__bg" aria-hidden="true" />
      <div className="site-footer__content mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <MantraviLogo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={siteConfig.social.linkedin}
                aria-label="LinkedIn"
                className="hover:text-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                aria-label="Instagram"
                className="hover:text-accent transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white capitalize">
                {key}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-3 border-t border-white/10 pt-8">
          <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Studios
          </span>
          {offices.map((office, i) => (
            <Fragment key={office.city}>
              {i > 0 && (
                <span className="text-slate-600" aria-hidden="true">
                  ·
                </span>
              )}
              <span className="text-sm font-medium text-white">
                {office.city}
              </span>
            </Fragment>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">
            Copyright &copy; {new Date().getFullYear()} {siteConfig.name}. All
            Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-accent"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
