"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";

type Locale = "en" | "de";
const LOCALES: Locale[] = ["de", "en"];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const switchLocale = (nextLocale: Locale) => {
    router.replace({ pathname, params } as never, { locale: nextLocale });
  };

  const activeIndex = useMemo(() => Math.max(0, LOCALES.indexOf(locale)), [locale]);
  const pillWidth = compact ? 40 : 50;

  return (
    <div className="relative inline-flex max-w-full shrink-0 items-center border border-cream/15 bg-charcoal/70 p-0.5 backdrop-blur-md sm:p-1">
      <motion.span
        className="pointer-events-none absolute top-0.5 bottom-0.5 bg-sage sm:top-1 sm:bottom-1"
        style={{ width: pillWidth }}
        initial={false}
        animate={{ x: activeIndex * pillWidth }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />

      {LOCALES.map((item) => {
        const isActive = item === locale;
        return (
          <button
            key={item}
            onClick={() => switchLocale(item)}
            className={`relative z-10 inline-flex h-8 w-10 items-center justify-center font-mono text-[10px] font-semibold tracking-wider uppercase transition-colors sm:w-[50px] sm:text-[11px] ${
              isActive ? "text-richblack" : "text-cream/70 hover:text-cream"
            }`}
            aria-current={isActive ? "true" : undefined}
            aria-label={`Switch language to ${item.toUpperCase()}`}
            type="button"
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
