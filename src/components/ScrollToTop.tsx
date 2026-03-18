"use client";
import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    const container = document.getElementById("scroll-container");
    // Reset on mount (handles forward navigation)
    if (container) container.scrollTop = 0;

    // Reset before the browser saves page state so that on refresh
    // it restores to 0 instead of the last scroll position
    const handleBeforeUnload = () => {
      const el = document.getElementById("scroll-container");
      if (el) el.scrollTop = 0;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
  return null;
}
