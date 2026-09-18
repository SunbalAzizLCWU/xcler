"use client";

import type { ComponentProps } from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

type LocalizedHref = ComponentProps<typeof Link>["href"];

export function Navbar() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks: { href: LocalizedHref; label: string }[] = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/work", label: t("work") },
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/pricing", label: t("pricing") },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-[100] w-full max-w-[100vw] overflow-x-clip transition-all duration-500",
          scrolled
            ? "border-b border-cream/10 bg-richblack/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
        style={{
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div className="container-custom flex h-[4.5rem] min-w-0 w-full items-center justify-between gap-2">
          <Link
            href="/"
            className="relative z-[101] min-w-0 shrink group"
            aria-label="XCLER home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-nav.webp"
              alt="XCLER AI automation agency logo"
              width={152}
              height={40}
              decoding="async"
              className="h-7 w-auto max-w-[7.5rem] transition-opacity group-hover:opacity-90 sm:h-8 sm:max-w-none md:h-9"
            />
          </Link>

          <div className="hidden min-w-0 items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-3 py-2 font-heading text-[13px] font-medium tracking-wide transition-colors",
                  pathname === link.href ? "text-sage" : "text-cream/70 hover:text-cream"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <MagneticButton href="/contact" variant="primary" size="sm">
              {t("contactBtn")}
            </MagneticButton>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="relative z-[101] flex h-11 w-11 shrink-0 items-center justify-center touch-manipulation"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-6 bg-cream"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-[1.5px] w-6 bg-cream"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-[1.5px] w-6 bg-cream"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] overflow-y-auto overflow-x-hidden bg-richblack lg:hidden"
            style={{
              paddingTop: "calc(4.5rem + env(safe-area-inset-top))",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div className="flex min-h-full flex-col items-start justify-center gap-4 px-6 py-10 sm:gap-5 sm:px-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="w-full max-w-full"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block break-words font-heading text-3xl font-bold text-cream transition-colors hover:text-sage sm:text-4xl"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full pt-4"
              >
                <MagneticButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => setIsOpen(false)}
                >
                  {t("contactBtn")}
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
