"use client";

import { useMemo } from "react";
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

  const switchLocale = (nextLocale: Locale) => {
    router.replace({ pathname, params } as never, { locale: nextLocale });
  };

  const activeIndex = useMemo(() => Math.max(0, LOCALES.indexOf(locale)), [locale]);

  return (
    <div className="relative inline-flex items-center border border-cream/15 bg-charcoal/70 p-1 backdrop-blur-md">
      <motion.span
        className="pointer-events-none absolute top-1 bottom-1 w-[50px] bg-sage"
        initial={false}
        animate={{ x: activeIndex * 50 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />

      {LOCALES.map((item) => {
        const isActive = item === locale;
        return (
          <button
            key={item}
            onClick={() => switchLocale(item)}
            className={`relative z-10 inline-flex h-8 w-[50px] items-center justify-center font-mono text-[11px] font-semibold tracking-wider uppercase transition-colors ${
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
