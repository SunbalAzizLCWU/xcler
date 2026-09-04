"use client";

import type { ComponentProps } from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    setPosition({
      x: (clientX - left - width / 2) * 0.18,
      y: (clientY - top - height / 2) * 0.18,
    });
  };

  const variants = {
    primary: "bg-terracotta text-white border-terracotta hover:bg-terracotta-dark",
    secondary: "bg-cream text-richblack border-cream",
    outline: "bg-transparent text-cream border-cream/25 hover:border-sage hover:text-sage",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const classes = cn(
    "relative inline-flex items-center justify-center gap-2 border font-heading font-semibold tracking-wide transition-colors duration-300",
    variants[variant],
    sizes[size],
    className
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 160, damping: 14, mass: 0.1 }}
      className="inline-block"
    >
      {href ? (
        <Link href={href} onClick={onClick} className={classes}>
          {children}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={classes}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
