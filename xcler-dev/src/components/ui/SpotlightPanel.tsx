"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotlightPanelProps = {
  children: React.ReactNode;
  className?: string;
};

/** Panel with cursor-follow spotlight — agency-site interaction pattern. */
export function SpotlightPanel({ children, className }: SpotlightPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [spot, setSpot] = useState({ x: 50, y: 40, on: false });

  const onMove = (e: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      on: true,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
      className={cn(
        "panel relative overflow-hidden transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-sage/40",
        className
      )}
    >
      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: spot.on ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, rgba(45,255,154,0.16), rgba(255,77,28,0.06) 40%, transparent 65%)`,
          }}
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
