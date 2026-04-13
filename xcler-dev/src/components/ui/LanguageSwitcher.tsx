"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
// IMPORTANT: Notice we import from '@/navigation', NOT 'next/navigation'
import { usePathname, useRouter } from "@/navigation";

type Locale = "en" | "de";
const LOCALES: Locale[] = ["de", "en"];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = useMemo(() => LOCALES.indexOf(locale), [locale]);

  const switchLocale = (targetLocale: Locale) => {
    if (targetLocale === locale) return;

    // The 'router.replace' from @/navigation handles the URL logic for us!
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <div className="relative inline-flex items-center rounded-full border border-stone/30 bg-white/70 p-1 backdrop-blur-md dark:border-stone-dark/40 dark:bg-richblack/60">
      <motion.span
        className="absolute top-1 bottom-1 w-[46px] rounded-full bg-terracotta/90"
        initial={false}
        animate={{ x: activeIndex * 46 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      />

      {LOCALES.map((item) => {
        const isActive = item === locale;

        return (
          <button
            key={item}
            type="button"
            onClick={() => switchLocale(item)}
            className={`relative z-10 h-8 w-[46px] rounded-full font-mono text-[11px] tracking-wider uppercase transition-colors ${
              isActive
                ? "text-white"
                : "text-richblack/70 hover:text-richblack dark:text-cream/80 dark:hover:text-cream"
            }`}
            aria-pressed={isActive}
            aria-label={`Switch language to ${item.toUpperCase()}`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}