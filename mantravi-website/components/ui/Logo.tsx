import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO = {
  light: {
    src: "/images/logo/mantravi-logo-light.webp",
    width: 464,
    height: 96,
  },
  dark: {
    src: "/images/logo/mantravi-logo-dark.webp",
    width: 520,
    height: 107,
  },
} as const;

export function MantraviLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center transition-opacity hover:opacity-90",
        className,
      )}
      aria-label="Mantravi home"
    >
      <Image
        src={LOGO.light.src}
        alt="Mantravi"
        width={LOGO.light.width}
        height={LOGO.light.height}
        className={cn(
          "h-7 w-auto sm:h-8",
          variant === "light" ? "block" : "hidden",
        )}
        sizes="(max-width: 640px) 140px, 180px"
        priority={variant === "light"}
      />
      <Image
        src={LOGO.dark.src}
        alt="Mantravi"
        width={LOGO.dark.width}
        height={LOGO.dark.height}
        className={cn(
          "h-7 w-auto sm:h-8",
          variant === "dark" ? "block" : "hidden",
        )}
        sizes="(max-width: 640px) 140px, 180px"
        priority={variant === "dark"}
      />
    </Link>
  );
}
