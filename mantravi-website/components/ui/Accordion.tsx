"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AccordionItem = {
  question: string;
  answer: string;
};

export function FAQAccordion({
  items,
  variant = "light",
}: {
  items: AccordionItem[];
  variant?: "light" | "dark";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isLight = variant === "light";

  return (
    <div
      className={cn(
        "divide-y rounded-2xl border",
        isLight
          ? "divide-slate-100 border-slate-200 bg-white"
          : "divide-white/10 border-white/10 bg-white/5",
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "font-semibold",
                  isLight ? "text-foreground-dark" : "text-white",
                )}
              >
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "px-6 pb-5 leading-relaxed",
                      isLight ? "text-muted-light" : "text-slate-300",
                    )}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
