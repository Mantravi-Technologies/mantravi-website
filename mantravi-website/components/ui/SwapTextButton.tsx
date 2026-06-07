"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SwapTextButtonProps = {
  children: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "light" | "dark";
  showIcon?: boolean;
};

export function SwapTextButton({
  children,
  onClick,
  href,
  className,
  variant = "light",
  showIcon = true,
}: SwapTextButtonProps) {
  const classes = cn(
    "swap-text-button group inline-flex items-center gap-2",
    variant === "light" ? "swap-text-button--light" : "swap-text-button--dark",
    className,
  );

  const inner = (
    <>
      <span className="swap-text-button__inner">
        <span className="swap-text-button__text swap-text-button__text--original">
          {children}
        </span>
        <span className="swap-text-button__text swap-text-button__text--hover">
          {children}
        </span>
      </span>
      {showIcon && (
        <span className="swap-text-button__icon">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}
