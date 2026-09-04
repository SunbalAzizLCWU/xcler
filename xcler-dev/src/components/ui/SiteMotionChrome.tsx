"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** Desktop glow cursor + top scroll progress — decorative only. */
export function SiteMotionChrome() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setActive(true);
    };
    const onLeave = () => setActive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduceMotion]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-sage via-cream to-terracotta"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {!reduceMotion ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed z-[90] hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,255,154,0.16),rgba(255,77,28,0.08)_45%,transparent_70%)] mix-blend-screen md:block"
          animate={{
            x: pos.x,
            y: pos.y,
            opacity: active ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.35 }}
        />
      ) : null}
    </>
  );
}
