"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp, viewportDefaults } from "@/lib/animations/variants";
import { useLightScrollMotion } from "@/hooks/useLightScrollMotion";
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
  const lightMotion = useLightScrollMotion();

  if (lightMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportDefaults}
      variants={variants}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}
