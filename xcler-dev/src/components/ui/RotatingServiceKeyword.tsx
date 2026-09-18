"use client";

import { useEffect, useMemo, useState } from "react";

type RotatingServiceKeywordProps = {
  words: string[];
  intervalMs?: number;
};

/** Lightweight keyword rotator — no Framer Motion (keeps TBT low). */
export function RotatingServiceKeyword({
  words,
  intervalMs = 3200,
}: RotatingServiceKeywordProps) {
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeWords.length <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % safeWords.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, safeWords.length]);

  if (safeWords.length === 0) {
    return <span>AI Automation</span>;
  }

  return (
    <span className="relative inline-flex min-h-[1.1em] w-full max-w-full items-center overflow-hidden text-left align-middle sm:justify-center sm:text-center">
      <span
        key={`${safeWords[index]}-${index}`}
        className="inline-block max-w-full break-words text-balance transition-opacity duration-300"
      >
        {safeWords[index]}
      </span>
    </span>
  );
}
