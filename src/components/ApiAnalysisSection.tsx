"use client";

import { useState } from "react";

export function ApiAnalysisSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative z-10 w-full bg-black flex justify-center text-white pt-[0px]">
      <div className="mx-[9px] px-5 w-full pb-[50px] flex flex-col gap-10">
        <div className="relative flex min-h-[2.5rem] items-center">
          <h2 className="relative z-10 shrink-0 text-sm font-medium tracking-[0.12em] text-white/70">
            API Analysis & AI Integration
          </h2>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="pointer-events-auto flex gap-3">
              <button
                type="button"
                onClick={() => setActive(0)}
                aria-selected={active === 0}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  active === 0
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white"
                }`}
              >
                API Endpoint
              </button>
              <button
                type="button"
                onClick={() => setActive(1)}
                aria-selected={active === 1}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  active === 1
                    ? "bg-white text-black"
                    : "bg-white/10 text-white/90 hover:bg-white/20 hover:text-white"
                }`}
              >
                Enhancement Strategy
              </button>
            </div>
          </div>
        </div>

        <div className="flex min-h-[420px] w-full flex-col justify-start rounded-[28px] bg-white/5 p-6 pt-0 pb-10 pl-10 md:min-h-[460px] md:p-8 md:pb-12 md:pl-12">
          {active === 0 ? (
            <>
              <div className="w-full shrink-0 pb-8">
                <p className="text-[28px] font-normal tracking-[0.03em] text-left text-white w-full">
                  Understanding the NASA APoD API
                </p>
              </div>
              <div className="grid w-full grid-cols-1 items-center gap-8 pt-10 md:grid-cols-2 md:gap-10">
                <div className="min-h-0 w-full max-w-md overflow-hidden rounded-2xl bg-white/5 p-6 md:ml-8 md:p-8">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/60">
                    Response structure
                  </p>
                  <pre className="whitespace-pre-wrap font-mono text-[0.875rem] leading-relaxed text-white/90">
                    {`{
  "date": "YYYY-MM-DD",
  "title": "string",
  "explanation": "text",
  "url": "image URL",
  "copyright": "string"
}`}
                  </pre>
                </div>
                <div className="flex min-h-0 flex-col justify-center">
                  <p className="text-[0.958rem] leading-relaxed text-white/90">
                    The NASA Astronomy Picture of the Day API returns a single day&apos;s image and metadata.
                    Use the <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-white/95">date</code> parameter
                    to request a specific day.  While comprehensive, it lacks narrative structure, emotional context, and the editorial curation that transforms data into an engaging experience.
                  </p>
                  <ul className="mt-6 space-y-2 text-[0.958rem] leading-relaxed text-white/90" aria-label="API details">
                    <li className="flex gap-2">
                      <span className="text-white/50" aria-hidden>·</span>
                      <span>Returns JSON response with daily astronomy picture data</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-white/50" aria-hidden>·</span>
                      <span>Requires API key for authentication</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-white/50" aria-hidden>·</span>
                      <span>Rate limit: 1000 requests per hour</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full shrink-0 pb-8">
                <p className="text-[28px] font-normal tracking-[0.03em] text-left text-white w-full">
                  Enhancement Strategy
                </p>
                <p className="mt-2 max-w-4xl text-[0.958rem] leading-relaxed text-white/80">
                By mapping these NLP capabilities to specific design outcomes, I identified three 
                key enhancement opportunities that bridge the gap between raw data and meaningful 
                user experiences.
                </p>
              </div>
              <div className="flex w-full flex-wrap items-center justify-center gap-4 pt-10 md:gap-6">
                <div
                  className="w-full max-w-[300px] shrink-0 rounded-[20px] p-5 shadow-lg md:max-w-[320px] min-h-[220px]"
                  style={{
                    background: "linear-gradient(135deg, #52525b 0%, #3f3f46 100%)",
                    transform: "rotate(-2deg)",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.2), 0 2px 4px -2px rgba(0,0,0,0.15)",
                  }}
                >
                  <p className="text-sm font-semibold text-zinc-100">API provides</p>
                  <ul className="mt-2 space-y-1.5 text-[0.8125rem] leading-relaxed text-zinc-200">
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4em] h-2.5 w-2.5 rounded-full border border-zinc-300" aria-hidden />
                      <span>Daily image URL (HD quality)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4em] h-2.5 w-2.5 rounded-full border border-zinc-300" aria-hidden />
                      <span>Title and date metadata</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4em] h-2.5 w-2.5 rounded-full border border-zinc-300" aria-hidden />
                      <span>Technical description text</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4em] h-2.5 w-2.5 rounded-full border border-zinc-300" aria-hidden />
                      <span>Media type (video / image)</span>
                    </li>
                  </ul>
                </div>
                {/* Plus between stickies 1 and 2 */}
                <div className="flex shrink-0 items-center justify-center" aria-hidden>
                  <span className="flex items-center justify-center text-xl font-light text-white/70">+</span>
                </div>
                <div
                  className="w-full max-w-[300px] shrink-0 rounded-[20px] p-5 shadow-lg md:max-w-[320px] min-h-[220px]"
                  style={{
                    background: "linear-gradient(135deg, #52525b 0%, #3f3f46 100%)",
                    transform: "rotate(1.5deg)",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.2), 0 2px 4px -2px rgba(0,0,0,0.15)",
                  }}
                >
                  <p className="text-sm font-semibold text-zinc-100">AI capabilities</p>
                  <ul className="mt-2 space-y-1.5 text-[0.8125rem] leading-relaxed text-zinc-200">
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4em] h-2.5 w-2.5 rounded-full border border-zinc-300" aria-hidden />
                      <span>NLP processing for narrative structure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4em] h-2.5 w-2.5 rounded-full border border-zinc-300" aria-hidden />
                      <span>Content curation and themes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4em] h-2.5 w-2.5 rounded-full border border-zinc-300" aria-hidden />
                      <span>Context extraction and storytelling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4em] h-2.5 w-2.5 rounded-full border border-zinc-300" aria-hidden />
                      <span>Intelligent content organization</span>
                    </li>
                  </ul>
                </div>
                {/* Hand-drawn arrow 2 → 3 */}
                <div className="flex shrink-0 items-center justify-center" aria-hidden>
                  <svg width="48" height="24" viewBox="0 0 48 24" fill="none" className="text-white/60">
                    <path
                      d="M2 12 Q14 16 22 12 Q30 8 42 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path
                      d="M38 10 L44 12 L38 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                <div
                  className="w-full max-w-[300px] shrink-0 rounded-[28px] p-5 shadow-lg md:max-w-[320px] min-h-[220px]"
                  style={{
                    background: "linear-gradient(135deg,rgb(137, 194, 165) 0%,rgb(118, 175, 149) 100%)",
                    transform: "rotate(-1deg)",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.2), 0 2px 4px -2px rgba(0,0,0,0.15)",
                  }}
                >
                  <p className="text-sm font-semibold text-emerald-50/95">Design opportunities</p>
                  <ul className="mt-2 space-y-1.5 text-[0.8125rem] leading-relaxed text-emerald-50/85">
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.1em] text-[0.9rem] font-semibold text-emerald-700" aria-hidden>
                        ✓
                      </span>
                      <span>Transform data into editorial experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.1em] text-[0.9rem] font-semibold text-emerald-700" aria-hidden>
                        ✓
                      </span>
                      <span>Create immersive discovery journeys</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.1em] text-[0.9rem] font-semibold text-emerald-700" aria-hidden>
                        ✓
                      </span>
                      <span>Build emotional connections with content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.1em] text-[0.9rem] font-semibold text-emerald-700" aria-hidden>
                        ✓
                      </span>
                      <span>Enable thematic exploration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.1em] text-[0.9rem] font-semibold text-emerald-700" aria-hidden>
                        ✓
                      </span>
                      <span>Craft narrative-driven interactions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
