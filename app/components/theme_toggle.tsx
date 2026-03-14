"use client";

import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

function isDarkNow(theme: Theme): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
  if (isDarkNow(theme)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function getStored(): Theme {
  const v = localStorage.getItem("theme");
  if (v === "dark" || v === "light") return v;
  return "system";
}

const CYCLE: Theme[] = ["system", "light", "dark"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getStored());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function onChange() {
      if (getStored() === "system") applyTheme("system");
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [mounted]);

  function cycle() {
    const idx = CYCLE.indexOf(theme);
    const next = CYCLE[(idx + 1) % CYCLE.length];
    setTheme(next);
    if (next === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", next);
    }
    applyTheme(next);
  }

  if (!mounted) return <div className="w-8 h-8" />;

  const dark = isDarkNow(theme);
  const isSystem = theme === "system";

  const label =
    theme === "system"
      ? "using system theme"
      : theme === "light"
        ? "using light theme"
        : "using dark theme";

  return (
    <button
      onClick={cycle}
      aria-label={label}
      title={label}
      className="relative w-8 h-8 flex items-center justify-center rounded text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
    >
      {dark ? (
        /* sun — shown in dark mode, meaning "click to go toward light" */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* moon — shown in light mode */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}

      {/* auto indicator — subtle ring when in system mode */}
      {isSystem && (
        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 text-[8px] leading-none font-medium tracking-wide text-[var(--text-faint)] select-none">
          auto
        </span>
      )}
    </button>
  );
}
