"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/demos/ssr", label: "SSR" },
  { href: "/demos/ssg", label: "SSG" },
  { href: "/demos/isr", label: "ISR" },
  { href: "/demos/csr", label: "CSR" },
  { href: "/demos/api", label: "API" },
  { href: "/demos/lazy", label: "Lazy" },
  { href: "/docs", label: "Docs" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="section-container">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="font-display text-xl font-bold gradient-text">
            DevPlayground
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-white/10 text-white"
                    : "text-midnight-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={clsx(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "bg-white/10 text-white"
                    : "text-midnight-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

