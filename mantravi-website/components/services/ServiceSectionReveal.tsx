"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations/variants";
import { cn } from "@/lib/utils";

const serviceViewport = { once: true, margin: "-10% 0px" as const };

export function ServiceSectionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={serviceViewport}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  );
}
