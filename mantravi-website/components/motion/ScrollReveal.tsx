"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportDefaults } from "@/lib/animations/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
};

export function ScrollReveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefaults}
      variants={
        reduced ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : variants
      }
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
