"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type RotatingServiceKeywordProps = {
  words: string[];
  intervalMs?: number;
};

export function RotatingServiceKeyword({
  words,
  intervalMs = 2200,
}: RotatingServiceKeywordProps) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeWords.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeWords.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, safeWords.length]);

  if (safeWords.length === 0) {
    return <span>Web Development</span>;
  }

  return (
    <span className="relative inline-flex min-h-[1.1em] min-w-[11ch] items-center justify-center overflow-hidden text-center align-middle">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${safeWords[index]}-${index}`}
          initial={{ opacity: 0, y: "0.45em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.45em" }}
          transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {safeWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
