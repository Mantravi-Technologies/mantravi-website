"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { servicesMenu } from "@/lib/content/site-data";
import { serviceLink } from "@/lib/utils/service-link";
import { cn } from "@/lib/utils";

export function MegaMenu({
  open,
  onClose,
  dark = false,
}: {
  open: boolean;
  onClose: () => void;
  dark?: boolean;
}) {
  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute left-0 right-0 top-full border-b shadow-xl",
        dark ? "border-white/10 bg-[#0a0a0a]" : "border-slate-200 bg-white",
      )}
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {servicesMenu.map((col) => (
            <div key={col.title}>
              <Link
                href={col.href}
                className={cn(
                  "mb-4 block text-sm font-bold hover:text-primary",
                  dark ? "text-white" : "text-foreground",
                )}
                onClick={onClose}
              >
                {col.title}
              </Link>
              <ul className="space-y-2">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={serviceLink(col.href, item.anchor)}
                      className={cn(
                        "text-sm transition-colors hover:text-primary",
                        dark ? "text-slate-400" : "text-muted",
                      )}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className={cn(
            "mt-6 border-t pt-6",
            dark ? "border-white/10" : "border-slate-100",
          )}
        >
          <Link
            href="/services"
            className="text-sm font-semibold text-primary hover:underline"
            onClick={onClose}
          >
            View all services →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function NavItemWithMega({
  label,
  href,
  mega,
  activeMega,
  setActiveMega,
  dark = false,
}: {
  label: string;
  href: string;
  mega?: "services";
  activeMega: "services" | null;
  setActiveMega: (v: "services" | null) => void;
  dark?: boolean;
}) {
  const isOpen = mega && activeMega === mega;

  if (!mega) {
    return (
      <Link
        href={href}
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          dark ? "text-white/90" : "text-foreground",
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setActiveMega(mega)}>
      <Link
        href={href}
        className={cn(
          "inline-flex items-center gap-1 text-sm font-medium transition-colors",
          isOpen
            ? "text-primary"
            : dark
              ? "text-white/90 hover:text-primary"
              : "text-foreground hover:text-primary",
        )}
      >
        {label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
        />
      </Link>
    </div>
  );
}
