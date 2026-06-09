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
    src: "/images/logo/mantravi-logo-dark.png",
    width: 516,
    height: 120,
  },
} as const;

export function MantraviLogo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const logo = LOGO[variant];

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
        src={logo.src}
        alt="Mantravi"
        width={logo.width}
        height={logo.height}
        className="h-7 w-auto sm:h-8"
        sizes="(max-width: 640px) 140px, 180px"
        unoptimized
        priority
      />
    </Link>
  );
}
