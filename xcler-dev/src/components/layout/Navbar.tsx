"use client";

import type { ComponentProps } from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { cn } from "@/lib/utils";
// IMPORTANT: Use the localized Link and hooks from your navigation file
import { Link, usePathname } from '@/navigation'; 
import { useTranslations } from 'next-intl';

type LocalizedHref = ComponentProps<typeof Link>["href"];

export function Navbar() {
  const t = useTranslations('Navigation'); // This looks for the "Navigation" section in your JSON files
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // These hrefs will now automatically be prefixed with /en or /de by the localized Link
  const navLinks: { href: LocalizedHref; label: string }[] = [
    { href: "/", label: t('home') },
    { href: "/services", label: t('services') },
    { href: "/work", label: t('work') },
    { href: "/about", label: t('about') },
    { href: "/blog", label: t('blog') },
    { href: "/pricing", label: t('pricing') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed left-0 right-0 top-0 z-[100] transition-all duration-500",
          scrolled
            ? "bg-cream/90 dark:bg-richblack/90 backdrop-blur-xl border-b border-stone/10 dark:border-white/10"
            : "bg-cream/95 dark:bg-richblack/85 backdrop-blur-md border-b border-stone/10 dark:border-white/10"
        )}
      >
        <div className="container-custom flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative z-[101]">
            <motion.span
              className="font-heading text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-richblack dark:text-cream">XCL</span>
              <span className="text-terracotta">ER</span>
              <span className="text-stone text-sm font-mono dark:text-stone-light">.dev</span>
            </motion.span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "group relative font-heading text-sm font-medium tracking-wide transition-colors",
                  pathname === link.href 
                    ? "text-terracotta" 
                    : "text-richblack dark:text-cream hover:text-terracotta"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-terracotta transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <MagneticButton href="/contact" variant="primary" size="sm">
              {t('contactBtn')}
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[101] flex h-10 w-10 items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block h-[2px] w-6 bg-richblack dark:bg-cream"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block h-[2px] w-6 bg-richblack dark:bg-cream"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block h-[2px] w-6 bg-richblack dark:bg-cream"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-cream dark:bg-charcoal lg:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-heading text-4xl font-bold text-richblack transition-colors hover:text-terracotta dark:text-cream dark:hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <MagneticButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                  onClick={() => setIsOpen(false)}
                >
                  {t('contactBtn')}
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}