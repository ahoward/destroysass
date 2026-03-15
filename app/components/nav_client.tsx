"use client";

import { useState } from "react";

type NavLink = {
  href: string;
  label: string;
  className?: string;
};

type NavClientProps = {
  currentPath: string;
  publicLinks: NavLink[];
  lobbyLink: NavLink | null;
  authLink: NavLink;
  cabalLink: NavLink | null;
};

function isActive(currentPath: string, href: string): boolean {
  if (href === "/") return currentPath === "/";
  return currentPath === href || currentPath.startsWith(href + "/");
}

export default function NavClient({
  currentPath,
  publicLinks,
  lobbyLink,
  authLink,
  cabalLink,
}: NavClientProps) {
  const [open, setOpen] = useState(false);

  function linkClass(href: string, base?: string): string {
    if (base) return base;
    return isActive(currentPath, href)
      ? "text-[var(--text-primary)] font-medium"
      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors";
  }

  function cabalClass(href: string): string {
    return isActive(currentPath, href)
      ? "text-red-600 font-bold"
      : "text-red-600 hover:text-red-500 transition-colors";
  }

  const allLinks: NavLink[] = [
    ...publicLinks,
    ...(lobbyLink ? [lobbyLink] : []),
  ];

  return (
    <nav className="max-w-2xl mx-auto px-6 py-6 relative">
      <div className="flex justify-between items-center">
        {/* logo */}
        <a
          href="/"
          className="text-red-600 font-bold text-lg tracking-tight hover:text-red-500 transition-colors"
        >
          destroysaas
        </a>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          {allLinks.map((link) => (
            <a key={link.href} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </a>
          ))}
          <a
            href={authLink.href}
            className={
              isActive(currentPath, authLink.href)
                ? "text-[var(--text-primary)] font-medium"
                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            }
          >
            {authLink.label}
          </a>
          {cabalLink && (
            <a href={cabalLink.href} className={cabalClass(cabalLink.href)}>
              {cabalLink.label}
            </a>
          )}
        </div>

        {/* mobile hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "close menu" : "open menu"}
            className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* mobile dropdown */}
      {open && (
        <div className="md:hidden absolute left-0 right-0 top-full z-50 bg-[var(--bg-primary)] border-b border-[var(--border-primary)] px-6 pb-4">
          <div className="flex flex-col gap-1 text-sm">
            {allLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 ${linkClass(link.href)}`}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t border-[var(--border-primary)] my-1" />
            <a
              href={authLink.href}
              onClick={() => setOpen(false)}
              className={`py-2.5 ${
                isActive(currentPath, authLink.href)
                  ? "text-[var(--text-primary)] font-medium"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              }`}
            >
              {authLink.label}
            </a>
            {cabalLink && (
              <a
                href={cabalLink.href}
                onClick={() => setOpen(false)}
                className={`py-2.5 ${cabalClass(cabalLink.href)}`}
              >
                {cabalLink.label}
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
