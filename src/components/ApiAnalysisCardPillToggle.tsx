"use client";

import { useState } from "react";

const PLACEHOLDERS = [
  `Response Structure

{
  "date": "YYYY-MM-DD",
  "title": "string",
  "explanation": "text",
  "url": "image URL",
  "copyright": "string"
}`,
  "Enhancement Strategy",
  "Integration Architecture",
];

const PILL_LABELS = ["API Endpoint", "Enhancement Strategy", "Integration Architecture"];

export function ApiAnalysisCardPillToggle() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-h-full w-full flex-col">
      {/* Placeholder content — full width, fills height above buttons */}
      <div className="flex min-h-[520px] min-w-0 w-full flex-1 flex-shrink items-center justify-center p-6">
        <span className="w-full text-center text-white/50">{PLACEHOLDERS[active]}</span>
      </div>

      {/* Three individual pill buttons — bottom of card */}
      <div className="flex shrink-0 justify-center gap-3 pt-8" role="tablist" aria-label="Switch view">
        {PILL_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              active === i
                ? "bg-white text-black"
                : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
