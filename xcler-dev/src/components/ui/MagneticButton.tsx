"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";

type LocalizedHref = ComponentProps<typeof Link>["href"];

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: LocalizedHref;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  size = "md",
}: MagneticButtonProps) {
  const variants = {
    // richblack on terracotta passes WCAG AA (~6:1); white fails (~3.3:1)
    primary: "bg-terracotta text-richblack border-terracotta hover:bg-terracotta-dark hover:border-terracotta-dark",
    secondary: "bg-cream text-richblack border-cream",
    outline: "bg-transparent text-cream border-cream/40 hover:border-sage hover:text-sage",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 border font-heading font-semibold tracking-wide transition-[transform,colors,box-shadow] duration-300 hover:-translate-y-0.5",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
