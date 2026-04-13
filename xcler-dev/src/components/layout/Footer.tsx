"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const footerLinks = {
  services: [
    { label: "Web Development", href: "/services/web-development" },
    { label: "App Development", href: "/services/app-development" },
    { label: "WordPress & Shopify", href: "/services/wordpress-shopify" },
    { label: "Workflow Automation", href: "/services/workflow-automation" },
    { label: "AI Chatbots & Agents", href: "/services/ai-chatbots-agents" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Impressum", href: "/impressum" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone/10 dark:border-stone-dark/10 bg-richblack text-cream">
      {/* CTA Band */}
      <AnimatedSection>
        <div className="section-padding text-center">
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Ready to build
            <br />
            <span className="text-terracotta">something real?</span>
          </h2>
          <p className="text-cream/60 text-lg max-w-xl mx-auto mb-10">
            No jargon. No fluff. Just a conversation about what you need
            and how we make it happen.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-terracotta px-10 py-4 font-heading font-medium text-white transition-all hover:bg-terracotta-light hover:scale-105"
          >
            Start a Project
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </AnimatedSection>

      {/* Links Grid */}
      <div className="container-custom border-t border-cream/10 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading text-2xl font-bold">
              XCL<span className="text-terracotta">ER</span>
              <span className="text-stone text-sm font-mono">.dev</span>
            </span>
            <p className="mt-4 text-sm text-cream/50 max-w-xs">
              We build what others prototype. Exceptional digital products
              for businesses that demand more.
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href="https://www.facebook.com/xclerdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 transition-colors hover:text-terracotta"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/xclerdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 transition-colors hover:text-terracotta"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-cream/30 mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-cream/30 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 transition-colors hover:text-terracotta"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-cream/30 mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-cream/60">
              <li>
                <a
                  href="mailto:hello@xcler.dev"
                  className="transition-colors hover:text-terracotta"
                >
                  hello@xcler.dev
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923154823517"
                  className="transition-colors hover:text-terracotta"
                >
                  +92 315 4823517
                </a>
              </li>
              <li className="text-cream/40">Serving Germany & EU</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 md:flex-row">
          <p className="text-xs text-cream/30">
            © {currentYear} XCLER. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-cream/30 transition-colors hover:text-cream/60"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}