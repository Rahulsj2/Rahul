"use client";

const PLACEHOLDERS = [
  "Placeholder 1 content",
  "Placeholder 2 content",
  "Placeholder 3 content",
];

export function ApiAnalysisCardWithScroll() {
  return (
    <div
      className="work2-section-scroll flex h-full min-h-0 w-full flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ gap: 0 }}
      aria-label="Scrollable placeholder panels"
    >
      {PLACEHOLDERS.map((text, i) => (
        <div
          key={i}
          className="work2-group flex h-full min-h-full w-full min-w-full flex-shrink-0 snap-center snap-always items-center justify-center p-6"
        >
          <span className="text-white/50">{text}</span>
        </div>
      ))}
    </div>
  );
}
