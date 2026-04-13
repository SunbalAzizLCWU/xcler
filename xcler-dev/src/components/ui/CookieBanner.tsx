"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type ConsentChoice = "accepted" | "declined";

const STORAGE_KEY = "xcler-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("CookieBanner");
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const storedChoice = localStorage.getItem(STORAGE_KEY) as ConsentChoice | null;
      if (storedChoice === "accepted" || storedChoice === "declined") {
        setIsVisible(false);
        return;
      }
    } catch {
      // If localStorage is unavailable, keep banner visible for consent.
    }

    setIsVisible(true);
  }, []);

  const handleChoice = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore storage write errors and still hide the banner after user action.
    }

    window.dispatchEvent(
      new CustomEvent("cookie-consent-changed", {
        detail: { choice },
      })
    );

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-4xl rounded-2xl border border-stone-dark/35 bg-richblack/95 p-4 shadow-2xl backdrop-blur md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-cream/55">
              {t("eyebrow")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-cream/85">
              {t("message")} {" "}
              <Link
                href={`/${locale}/cookies`}
                className="text-terracotta underline underline-offset-2 hover:text-terracotta-dark"
              >
                {t("policyLink")}
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleChoice("declined")}
              className="rounded-full border border-stone-dark/40 px-4 py-2 text-xs font-medium text-cream/85 transition-colors hover:border-cream/40 hover:text-white"
            >
              {t("decline")}
            </button>
            <button
              type="button"
              onClick={() => handleChoice("accepted")}
              className="rounded-full bg-terracotta px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-terracotta-dark"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
