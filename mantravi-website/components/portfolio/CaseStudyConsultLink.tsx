"use client";

import { ArrowRight } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";

export function CaseStudyConsultLink({ className }: { className?: string }) {
  const { openContact } = useContact();

  return (
    <button
      type="button"
      onClick={openContact}
      className={
        className ??
        "group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
      }
    >
      Consult our experts
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  );
}
