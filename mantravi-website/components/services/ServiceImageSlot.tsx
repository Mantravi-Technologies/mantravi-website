"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ServiceImageSlot as ServiceImageSlotConfig } from "@/lib/content/services-data";
import { cn } from "@/lib/utils";

const aspectClasses: Record<
  NonNullable<ServiceImageSlotConfig["aspect"]>,
  string
> = {
  hero: "aspect-[4/3] lg:aspect-[5/4]",
  landscape: "aspect-video",
  square: "aspect-square max-w-md",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

const aspectSizes: Record<
  NonNullable<ServiceImageSlotConfig["aspect"]>,
  string
> = {
  hero: "(max-width: 1024px) 100vw, 576px",
  landscape: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px",
  square: "(max-width: 768px) 100vw, 448px",
  portrait: "(max-width: 768px) 100vw, 400px",
  wide: "(max-width: 768px) 100vw, 960px",
};

type Props = {
  slot: ServiceImageSlotConfig;
  className?: string;
  priority?: boolean;
  variant?: "light" | "dark";
};

export function ServiceImageSlot({
  slot,
  className,
  priority,
  variant = "light",
}: Props) {
  const aspect = slot.aspect ?? "landscape";

  if (slot.src) {
    return (
      <figure
        className={cn(
          "relative overflow-hidden rounded-2xl",
          aspectClasses[aspect],
          className,
        )}
      >
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          priority={priority}
          className="object-cover"
          sizes={aspectSizes[aspect]}
        />
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        "service-image-slot",
        variant === "dark" && "service-image-slot--dark",
        aspectClasses[aspect],
        className,
      )}
      aria-label={slot.alt}
    >
      <div className="service-image-slot__pattern" aria-hidden="true" />
      <div className="service-image-slot__content">
        <div className="service-image-slot__icon" aria-hidden="true">
          <ImageIcon className="h-6 w-6" />
        </div>
        <p className="service-image-slot__hint">{slot.hint}</p>
        <p className="service-image-slot__path">
          <span className="service-image-slot__path-label">Add image at</span>
          <code>{slot.path}</code>
        </p>
      </div>
    </figure>
  );
}
