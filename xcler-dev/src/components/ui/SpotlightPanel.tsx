"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightPanelProps = {
  children: React.ReactNode;
  className?: string;
};

/** Panel with CSS-variable spotlight — no Framer Motion state thrash. */
export function SpotlightPanel({ children, className }: SpotlightPanelProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    el.dataset.spot = "on";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={(e) => {
        e.currentTarget.dataset.spot = "off";
      }}
      data-spot="off"
      className={cn(
        "panel relative overflow-hidden transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-sage/40",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300 before:content-['']",
        "before:bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,40%),rgba(45,255,154,0.16),rgba(255,77,28,0.06)_40%,transparent_65%)]",
        "data-[spot=on]:before:opacity-100",
        className
      )}
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
