// src/app/admin/layout.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/projects", label: "Projects", icon: "🚀" },
  { href: "/admin/team", label: "Team", icon: "👥" },
  { href: "/admin/blogs", label: "Blog Posts", icon: "✍️" },
  { href: "/admin/leads", label: "Leads", icon: "📩" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const pathname = usePathname();

  // Simple password auth (for now — upgrade later)
  useEffect(() => {
    const auth = sessionStorage.getItem("xcler-admin-auth");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password — change this!
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "xcler2024!") {
      setIsAuthenticated(true);
      sessionStorage.setItem("xcler-admin-auth", "true");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-charcoal p-6">
        <div className="w-full max-w-sm">
          <h1 className="font-heading text-2xl font-bold mb-6 text-center">
            XCL<span className="text-terracotta">ER</span> Admin
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-stone/20 bg-transparent px-4 py-3 text-sm outline-none focus:border-terracotta"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-terracotta py-3 text-white font-heading font-medium hover:bg-terracotta-dark transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream dark:bg-charcoal pt-20">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-20 bottom-0 w-64 border-r border-stone/10 dark:border-stone-dark/10 p-6 overflow-y-auto hidden md:block">
          <nav className="space-y-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-terracotta/10 text-terracotta"
                    : "text-richblack/60 dark:text-cream/60 hover:bg-stone/10"
                )}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-4 border-t border-stone/10">
            <button
              onClick={() => {
                sessionStorage.removeItem("xcler-admin-auth");
                setIsAuthenticated(false);
              }}
              className="text-sm text-richblack/40 dark:text-cream/40 hover:text-terracotta transition-colors"
            >
              ← Back to site
            </button>
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden fixed top-20 left-0 right-0 z-40 bg-cream/90 dark:bg-charcoal/90 backdrop-blur-sm border-b border-stone/10 overflow-x-auto">
          <div className="flex gap-1 p-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                  pathname === link.href
                    ? "bg-terracotta/10 text-terracotta"
                    : "text-richblack/60 dark:text-cream/60"
                )}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 md:ml-64 p-6 md:p-10 mt-12 md:mt-0">
          {children}
        </main>
      </div>
    </div>
  );
}