"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TOGGLE_LABELS = ["API Endpoint", "Enhancement Strategy", "Integration Architecture"];

const PLACEHOLDERS = [
  "Placeholder 1 content",
  "Placeholder 2 content",
  "Placeholder 3 content",
];

const SCROLL_END_MS = 150;

export function ApiAnalysisCard() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToPanel = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const panelWidth = el.clientWidth;
    const targetLeft = index * panelWidth;
    el.scrollTo({ left: targetLeft, behavior: "smooth" });
    setActive(index);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

    function updateActiveFromScroll() {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;
      const scrollLeft = scrollEl.scrollLeft;
      const panelWidth = scrollEl.clientWidth;
      const index = Math.round(scrollLeft / panelWidth);
      const clamped = Math.max(0, Math.min(2, index));
      setActive(clamped);
    }

    function onScroll() {
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      scrollEndTimer = setTimeout(() => {
        scrollEndTimer = null;
        if (scrollRef.current) updateActiveFromScroll();
      }, SCROLL_END_MS);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };
  }, []);

  return (
    <div className="flex min-h-full flex-col gap-8">
      {/* Horizontal scroll — same full width/height as second card */}
      <div
        ref={scrollRef}
        className="api-analysis-card-scroll flex h-full min-h-0 w-full flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap: 0 }}
        aria-label="Scrollable panels"
      >
        {PLACEHOLDERS.map((text, i) => (
          <div
            key={i}
            className="api-analysis-card-group flex h-full min-h-full w-full min-w-full flex-shrink-0 snap-center snap-always items-center justify-center p-6"
          >
            <span className="text-white/50">{text}</span>
          </div>
        ))}
      </div>

      {/* Pill-shaped toggle — bottom, centered */}
      <div className="flex justify-center">
        <div
          className="inline-flex w-fit rounded-full bg-white/10 p-1"
          role="tablist"
          aria-label="Switch view"
        >
          {TOGGLE_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => scrollToPanel(i)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active === i
                  ? "bg-white text-black"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
