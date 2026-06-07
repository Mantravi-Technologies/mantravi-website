"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

function AnimatedNumber({
  value,
  suffix = "",
  dark = false,
}: {
  value: number;
  suffix?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return (
    <span ref={ref} className={dark ? "text-accent" : "text-accent-sky"}>
      0{suffix}
    </span>
  );
}

type Stat = { value: number; suffix?: string; label: string; sub?: string };

export function StatCounter({
  stats,
  dark = false,
  staircase = false,
}: {
  stats: Stat[];
  dark?: boolean;
  staircase?: boolean;
}) {
  const cols = stats.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  const wrapperClass = staircase
    ? "stats-staircase"
    : `grid gap-8 sm:grid-cols-2 ${cols}`;

  return (
    <div className={wrapperClass}>
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={
            staircase ? "stat-block-stair min-w-[140px]" : "text-center"
          }
        >
          <div
            className={`text-4xl font-bold md:text-5xl ${dark ? "text-accent" : "text-accent-sky"}`}
          >
            <AnimatedNumber
              value={stat.value}
              suffix={stat.suffix}
              dark={dark}
            />
          </div>
          <h3
            className={`mt-2 text-lg font-semibold ${dark ? "text-white" : "text-foreground-dark"}`}
          >
            {stat.label}
          </h3>
          {stat.sub && (
            <p
              className={`mt-1 text-sm ${dark ? "text-slate-400" : "text-muted-light"}`}
            >
              {stat.sub}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
