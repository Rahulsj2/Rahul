"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "portfolio-theme";

type Theme = "light" | "dark";

function getTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initial = getTheme();
    setTheme(initial);
    applyTheme(initial);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (localStorage.getItem(STORAGE_KEY)) return;
      const next = media.matches ? "dark" : "light";
      setTheme(next);
      applyTheme(next);
    };
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [mounted]);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  if (!mounted) {
    return (
      <div
        className="glass-pill min-h-touch min-w-touch rounded-full p-2"
        aria-hidden
      >
        <span className="size-5 block" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="glass-pill min-h-touch min-w-touch inline-flex items-center justify-center rounded-full p-2 text-foreground-secondary hover:text-foreground-primary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <Moon className="size-5" aria-hidden />
      ) : (
        <Sun className="size-5" aria-hidden />
      )}
    </button>
  );
}
