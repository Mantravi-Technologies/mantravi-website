"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BrandLogo } from "@/lib/content/site-data";

export function LogoMarquee({
  logos,
  reverse = false,
  pods = false,
  className,
}: {
  logos: BrandLogo[];
  reverse?: boolean;
  pods?: boolean;
  className?: string;
}) {
  // Four copies so wide screens stay filled; -50% animation loops seamlessly.
  const items = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      className={cn(
        "group",
        pods ? "logo-marquee-shell" : "overflow-hidden py-4",
        className,
      )}
    >
      <div
        className={cn(
          "logo-marquee-track",
          pods ? "gap-6" : "gap-12",
          reverse
            ? "animate-marquee-reverse group-hover:[animation-play-state:paused]"
            : "animate-marquee group-hover:[animation-play-state:paused]",
        )}
      >
        {items.map((logo, i) => (
          <div key={`${logo.name}-${i}`} className={cn(pods && "logo-pod")}>
            <Image
              src={logo.src}
              alt={logo.name}
              width={200}
              height={200}
              className={pods ? "logo-marquee-image" : "h-8 w-auto opacity-70"}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
