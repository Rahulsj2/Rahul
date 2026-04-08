export const metadata = {
  title: "Findings visuals",
  description: "Different ways to present a Findings section (non-placeholder).",
};

const label = "text-base font-medium tracking-[0.12em] text-white/70";
const body = "text-[0.958rem] leading-relaxed text-white";
const bodyMuted = "text-[0.958rem] leading-relaxed text-white/80";
const h3 = "text-[1.5rem] font-medium tracking-[0.02em] text-white";

function Frame({
  ariaLabel,
  className = "",
  children,
}: {
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`relative overflow-hidden rounded-[18px] border border-white/10 bg-white/5 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_320px_at_20%_0%,rgba(255,255,255,0.10),transparent_60%),radial-gradient(800px_260px_at_80%_40%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

function SectionShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative z-10 w-full bg-black flex justify-center">
      <div className="mx-[9px] px-5 w-full py-20">
        <div className="grid w-full grid-cols-12 gap-lg text-left">
          <div className="col-span-12 md:col-span-4 px-[10px]">
            <h2 className={label}>{eyebrow}</h2>
          </div>
          <div className="col-span-12 md:col-span-6 px-[10px]">
            <h3 className={`${h3} mb-3`}>{title}</h3>
            <p className={bodyMuted}>{description}</p>
            <div className="mt-10">{children}</div>
          </div>
          <div className="col-span-12 md:col-span-2 px-[10px]" />
        </div>
      </div>
    </section>
  );
}

const findings = [
  {
    title: "Decision overload",
    detail: "High-impact routing calls without enough context.",
    tag: "Cognitive load",
    severity: 5,
    frequency: 4,
  },
  {
    title: "Capacity blindness",
    detail: "No reliable view of load and schedule at a glance.",
    tag: "Visibility",
    severity: 4,
    frequency: 4,
  },
  {
    title: "Communication gap",
    detail: "Reactive updates and missed calls eroded trust.",
    tag: "Trust",
    severity: 4,
    frequency: 3,
  },
  {
    title: "Field constraints",
    detail: "Fast, low-friction, minimal training—on the move.",
    tag: "Environment",
    severity: 3,
    frequency: 5,
  },
] as const;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[999px] border border-white/10 bg-white/5 px-3 py-1 text-[0.78rem] text-white/75">
      {children}
    </span>
  );
}

function ScoreDots({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i < value ? "bg-white/60" : "bg-white/15"}`}
        />
      ))}
    </div>
  );
}

function FindingsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {findings.map((f) => (
        <div key={f.title} className="rounded-[20px] border border-white/10 bg-white/5 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[1.05rem] font-medium text-white">{f.title}</p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-white/70">{f.detail}</p>
            </div>
            <Pill>{f.tag}</Pill>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-[0.78rem] text-white/60">
            <div className="rounded-[14px] border border-white/10 bg-black/10 p-3">
              <p className="font-medium tracking-[0.14em] text-white/55">SEVERITY</p>
              <div className="mt-2">
                <ScoreDots value={f.severity} />
              </div>
            </div>
            <div className="rounded-[14px] border border-white/10 bg-black/10 p-3">
              <p className="font-medium tracking-[0.14em] text-white/55">FREQUENCY</p>
              <div className="mt-2">
                <ScoreDots value={f.frequency} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function FindingsTable() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-white/10 bg-white/5">
      <div className="grid grid-cols-12 gap-0 border-b border-white/10 bg-black/10 px-4 py-3 text-[0.78rem] font-medium tracking-[0.16em] text-white/60">
        <div className="col-span-5">FINDING</div>
        <div className="col-span-3">THEME</div>
        <div className="col-span-2">SEV.</div>
        <div className="col-span-2">FREQ.</div>
      </div>
      {findings.map((f) => (
        <div
          key={f.title}
          className="grid grid-cols-12 items-center gap-0 border-b border-white/5 px-4 py-4 last:border-b-0"
        >
          <div className="col-span-5">
            <p className="text-[0.95rem] font-medium text-white/90">{f.title}</p>
            <p className="mt-1 text-[0.85rem] text-white/60">{f.detail}</p>
          </div>
          <div className="col-span-3">
            <Pill>{f.tag}</Pill>
          </div>
          <div className="col-span-2">
            <ScoreDots value={f.severity} />
          </div>
          <div className="col-span-2">
            <ScoreDots value={f.frequency} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Svg2x2Matrix() {
  // map severity (y) and frequency (x) to 2x2 area (0..1)
  const pts = findings.map((f) => ({
    ...f,
    x: (f.frequency - 1) / 4,
    y: 1 - (f.severity - 1) / 4,
  }));

  return (
    <svg viewBox="0 0 900 560" className="h-full w-full">
      <defs>
        <linearGradient id="m" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.01)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="900" height="560" fill="transparent" />
      <g transform="translate(120 90)">
        <rect x="0" y="0" width="640" height="380" rx="22" fill="url(#m)" stroke="rgba(255,255,255,0.18)" />
        <path d="M320 0 V380" stroke="rgba(255,255,255,0.14)" />
        <path d="M0 190 H640" stroke="rgba(255,255,255,0.14)" />

        <text x="-10" y="190" textAnchor="end" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          Severity ↑
        </text>
        <text x="320" y="410" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          Frequency →
        </text>

        {pts.map((p) => {
          const cx = p.x * 640;
          const cy = p.y * 380;
          return (
            <g key={p.title}>
              <circle cx={cx} cy={cy} r="9" fill="rgba(255,255,255,0.75)" />
              <circle cx={cx} cy={cy} r="18" fill="rgba(255,255,255,0.18)" />
              <text
                x={cx + 16}
                y={cy + 5}
                fontSize="14"
                fill="rgba(255,255,255,0.78)"
                fontFamily="ui-sans-serif, system-ui"
              >
                {p.title}
              </text>
            </g>
          );
        })}

        <text x="18" y="26" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          low
        </text>
        <text x="602" y="26" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          high
        </text>
      </g>
      <text x="36" y="46" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
        Option: a 2×2 that shows which findings are both frequent and severe
      </text>
    </svg>
  );
}

function RankedList() {
  const ranked = [...findings].sort((a, b) => b.severity * 10 + b.frequency - (a.severity * 10 + a.frequency));
  return (
    <div className="space-y-3">
      {ranked.map((f, idx) => (
        <div key={f.title} className="flex items-start gap-4 rounded-[18px] border border-white/10 bg-white/5 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-white/10 bg-black/10 text-[0.95rem] font-semibold text-white/80">
            {idx + 1}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[0.98rem] font-medium text-white/90">{f.title}</p>
              <Pill>{f.tag}</Pill>
            </div>
            <p className="mt-1 text-[0.9rem] text-white/65">{f.detail}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-[0.78rem] text-white/60">
              <div className="flex items-center justify-between rounded-[14px] border border-white/10 bg-black/10 px-3 py-2">
                <span className="font-medium tracking-[0.14em] text-white/55">SEV</span>
                <ScoreDots value={f.severity} />
              </div>
              <div className="flex items-center justify-between rounded-[14px] border border-white/10 bg-black/10 px-3 py-2">
                <span className="font-medium tracking-[0.14em] text-white/55">FREQ</span>
                <ScoreDots value={f.frequency} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function InsightRail() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      <div className="md:col-span-5">
        <div className="rounded-[20px] border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-medium tracking-[0.16em] text-white/55">KEY INSIGHT</p>
          <p className="mt-3 text-[1.05rem] font-medium text-white/90">
            The bottleneck wasn’t task completion — it was confidence at the decision point.
          </p>
          <p className="mt-3 text-[0.9rem] text-white/65">
            Findings can be framed as “what breaks confidence” rather than a checklist of issues.
          </p>
        </div>
      </div>
      <div className="md:col-span-7">
        <div className="space-y-3">
          {findings.map((f) => (
            <div key={f.title} className="rounded-[18px] border border-white/10 bg-white/5 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.95rem] font-medium text-white/90">{f.title}</p>
                  <p className="mt-1 text-[0.88rem] text-white/65">{f.detail}</p>
                </div>
                <div className="shrink-0">
                  <ScoreDots value={f.severity} />
                  <p className="mt-2 text-[0.75rem] text-white/50">severity</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppleEditorialFindings() {
  return (
    <div className="space-y-6">
      <div className="rounded-[22px] border border-white/10 bg-white/5 p-6 md:p-7">
        <p className="text-xs font-medium tracking-[0.18em] text-white/55">FINDINGS</p>
        <p className="mt-3 text-[1.55rem] md:text-[1.8rem] font-medium leading-tight tracking-[0.01em] text-white">
          Confidence broke at the moment of choice.
        </p>
        <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-white/70">
          The system didn’t fail because people couldn’t do the work. It failed because the work
          demanded fast decisions without enough context—so agents improvised.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {findings.map((f) => (
          <div key={f.title} className="rounded-[20px] border border-white/10 bg-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[1.05rem] font-medium text-white/90">{f.title}</p>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-white/65">{f.detail}</p>
              </div>
              <Pill>{f.tag}</Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppleIconTiles() {
  const tiles = [
    { t: "Decision overload", d: "Too many high-stakes choices, too little context." },
    { t: "Capacity blindness", d: "No glanceable view of load and schedule." },
    { t: "Communication gap", d: "Updates arrived late and inconsistently." },
    { t: "Field constraints", d: "Glare, motion, interruptions, low bandwidth." },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {tiles.map((x) => (
        <div key={x.t} className="rounded-[22px] border border-white/10 bg-white/5 p-6">
          <div className="flex items-start gap-4">
            <div className="h-11 w-11 shrink-0 rounded-[14px] border border-white/10 bg-white/10" />
            <div className="min-w-0">
              <p className="text-[1.05rem] font-medium text-white/90">{x.t}</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-white/65">{x.d}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AppleIconTilesColored() {
  const tiles = [
    {
      t: "Decision overload",
      d: "Too many high-stakes choices, too little context.",
      tint: "bg-amber-300/12 border-amber-200/15",
      icon: "bg-amber-300/25 border-amber-200/25",
      n: "01",
    },
    {
      t: "Capacity blindness",
      d: "No glanceable view of load and schedule.",
      tint: "bg-lime-200/10 border-lime-200/15",
      icon: "bg-lime-200/22 border-lime-200/25",
      n: "02",
    },
    {
      t: "Communication gap",
      d: "Updates arrived late and inconsistently.",
      tint: "bg-sky-300/10 border-sky-200/15",
      icon: "bg-sky-300/20 border-sky-200/25",
      n: "03",
    },
    {
      t: "Field constraints",
      d: "Glare, motion, interruptions, low bandwidth.",
      tint: "bg-fuchsia-300/10 border-fuchsia-200/15",
      icon: "bg-fuchsia-300/20 border-fuchsia-200/25",
      n: "04",
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {tiles.map((x) => (
        <div
          key={x.t}
          className={`rounded-[22px] border p-6 ${x.tint} shadow-[0_18px_70px_rgba(0,0,0,0.35)]`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`h-11 w-11 shrink-0 rounded-[14px] border ${x.icon} flex items-center justify-center`}
              aria-hidden
            >
              <span className="text-[0.78rem] font-semibold tracking-[0.12em] text-white/80">
                {x.n}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[1.05rem] font-medium text-white/92">{x.t}</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">{x.d}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AppleStackedRows() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/10 bg-white/5">
      {findings.map((f, idx) => (
        <div
          key={f.title}
          className={`px-5 py-5 md:px-6 ${idx !== 0 ? "border-t border-white/10" : ""}`}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <p className="text-[1.05rem] font-medium text-white/90">{f.title}</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-white/65">{f.detail}</p>
            </div>
            <div className="flex items-center gap-2 md:shrink-0">
              <Pill>{f.tag}</Pill>
              <span className="text-[0.78rem] text-white/50">sev</span>
              <ScoreDots value={f.severity} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AppleCarousel() {
  return (
    <div className="-mx-2">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {findings.map((f) => (
          <div
            key={f.title}
            className="snap-start shrink-0 w-[86%] md:w-[420px] rounded-[26px] border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="h-11 w-11 rounded-[14px] border border-white/10 bg-white/10" />
              <Pill>{f.tag}</Pill>
            </div>
            <p className="mt-5 text-[1.25rem] font-medium leading-snug text-white/92">{f.title}</p>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-white/65">{f.detail}</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-[16px] border border-white/10 bg-black/10 p-3">
                <p className="text-[0.72rem] font-medium tracking-[0.16em] text-white/55">SEVERITY</p>
                <div className="mt-2">
                  <ScoreDots value={f.severity} />
                </div>
              </div>
              <div className="rounded-[16px] border border-white/10 bg-black/10 p-3">
                <p className="text-[0.72rem] font-medium tracking-[0.16em] text-white/55">FREQUENCY</p>
                <div className="mt-2">
                  <ScoreDots value={f.frequency} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="shrink-0 w-6" aria-hidden />
      </div>
      <p className="mt-3 text-[0.85rem] text-white/55">
        Swipe to scan each finding. (Apple-style “card story” presentation.)
      </p>
    </div>
  );
}

function StickyNoteFindings() {
  const notes = [
    {
      title: "Decision overload",
      detail: "High-impact routing calls without enough context.",
      accent: "from-amber-300/70 to-amber-200/20",
      tape: "bg-amber-200/40 border-amber-200/40",
      rot: "-rotate-1",
    },
    {
      title: "Capacity blindness",
      detail: "No glanceable view of load and schedule.",
      accent: "from-lime-200/60 to-lime-100/15",
      tape: "bg-lime-200/35 border-lime-200/35",
      rot: "rotate-1",
    },
    {
      title: "Communication gap",
      detail: "Reactive updates and missed calls eroded trust.",
      accent: "from-sky-200/60 to-sky-100/15",
      tape: "bg-sky-200/35 border-sky-200/35",
      rot: "-rotate-[0.5deg]",
    },
    {
      title: "Field constraints",
      detail: "Fast, low-friction, minimal training—on the move.",
      accent: "from-fuchsia-200/55 to-fuchsia-100/15",
      tape: "bg-fuchsia-200/30 border-fuchsia-200/30",
      rot: "rotate-[0.75deg]",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="rounded-[22px] border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-medium tracking-[0.18em] text-white/55">DARK MODE STICKY NOTES</p>
        <p className="mt-3 text-[0.98rem] leading-relaxed text-white/70">
          A “research wall” vibe on a dark page: warm paper notes, subtle tape, and a soft shadow.
        </p>
      </div>

      <div className="relative">
        {/* subtle square-grid + color accents backdrop (no container panel) */}
        <div
          className="pointer-events-none absolute -inset-6 opacity-[0.22]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0",
          }}
        />
        <div
          className="pointer-events-none absolute -inset-6 bg-[radial-gradient(700px_260px_at_15%_0%,rgba(245,158,11,0.18),transparent_60%),radial-gradient(720px_260px_at_85%_10%,rgba(56,189,248,0.14),transparent_60%),radial-gradient(760px_280px_at_70%_95%,rgba(217,70,239,0.12),transparent_62%)]"
          aria-hidden
        />

        {[
          { left: "6%", top: "10%", c: "bg-amber-300/25" },
          { left: "82%", top: "6%", c: "bg-sky-300/20" },
          { left: "90%", top: "70%", c: "bg-fuchsia-300/20" },
          { left: "14%", top: "76%", c: "bg-lime-200/20" },
        ].map((s, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute h-10 w-10 rounded-[10px] border border-white/10 ${s.c} shadow-[0_18px_60px_rgba(0,0,0,0.55)]`}
            style={{ left: s.left, top: s.top }}
            aria-hidden
          />
        ))}

        <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2">
          {notes.map((n) => (
            <div key={n.title} className={`relative ${n.rot}`}>
            <div className="absolute -top-3 left-6 h-6 w-16 rounded-[10px] border backdrop-blur-sm opacity-90 shadow-[0_10px_30px_rgba(0,0,0,0.35)] rotate-[-3deg] bg-white/10 border-white/15" />
            <div
              className={`absolute -top-4 right-10 h-7 w-20 rounded-[12px] border backdrop-blur-sm opacity-85 shadow-[0_10px_30px_rgba(0,0,0,0.35)] rotate-[4deg] ${n.tape}`}
            />

            <div className="relative overflow-hidden rounded-[26px] shadow-[0_28px_80px_rgba(0,0,0,0.60)]">
              <div className="absolute inset-0 rounded-[26px] bg-[#F4E7A3]" />
              <div className={`absolute inset-0 bg-gradient-to-b ${n.accent}`} />
              <div className="absolute inset-0 opacity-[0.10] [background-image:radial-gradient(rgba(0,0,0,0.55)_0.6px,transparent_0.6px)] [background-size:7px_7px]" />
              <div className="absolute inset-0 rounded-[26px] ring-1 ring-black/10" />

              {/* tiny corner curl */}
              <div className="absolute right-0 top-0 h-20 w-20">
                <div className="absolute right-0 top-0 h-20 w-20 bg-black/10 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
                <div className="absolute right-0 top-0 h-16 w-16 bg-white/25 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
              </div>

              <div className="relative p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[1.15rem] font-semibold text-black/85">{n.title}</p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-black/70">{n.detail}</p>
                  </div>
                  <div className="shrink-0">
                    <div className="h-10 w-10 rounded-[14px] border border-black/10 bg-black/5" />
                    <p className="mt-2 text-[0.72rem] text-black/45 tracking-[0.14em] text-center">NOTE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FourColorSquares() {
  const squares = [
    { name: "Amber", cls: "bg-amber-300/30", glow: "shadow-[0_24px_80px_rgba(245,158,11,0.16)]" },
    { name: "Sky", cls: "bg-sky-300/25", glow: "shadow-[0_24px_80px_rgba(56,189,248,0.14)]" },
    { name: "Lime", cls: "bg-lime-200/25", glow: "shadow-[0_24px_80px_rgba(163,230,53,0.12)]" },
    { name: "Fuchsia", cls: "bg-fuchsia-300/25", glow: "shadow-[0_24px_80px_rgba(217,70,239,0.12)]" },
  ] as const;

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
      {squares.map((s) => (
        <div key={s.name} className="relative aspect-[16/9] w-full">
          <div
            className={`absolute inset-0 overflow-hidden rounded-[22px] border border-white/10 ${s.cls} ${s.glow}`}
            role="img"
            aria-label={`${s.name} accent card`}
          >
            {/* matte finish: no gloss, minimal depth */}
            <div className="absolute inset-0 bg-black/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function FindingsVisualsPage() {
  return (
    <div className="relative w-full bg-black text-white">
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full pt-24 pb-10">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <h2 className={label}>Toolkit</h2>
            </div>
            <div className="col-span-12 md:col-span-7 px-[10px]">
              <h1 className="text-[3.0rem] md:text-[3.333rem] font-light tracking-[0.03em] text-white">
                Findings layouts
              </h1>
              <p className={`mt-4 ${body}`}>
                Here are multiple ways to present the same Findings content with different visual
                emphasis (scanability, credibility, narrative).
              </p>
              <p className={`mt-3 ${bodyMuted}`}>
                Route: <span className="font-medium text-white/85">/findings-visuals</span>
              </p>
            </div>
            <div className="col-span-12 md:col-span-1 px-[10px]" />
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="Findings option"
        title="A. Insight rail + list"
        description="Best when you want one strong ‘so what’ statement, then supporting findings underneath."
      >
        <InsightRail />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="A2. Editorial (Apple-style headline)"
        description="A big statement first, then a calm grid of supporting findings. Best for a ‘product page’ feel."
      >
        <AppleEditorialFindings />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="B. Cards grid (fast scan)"
        description="A clean 2×2 card grid. Works well when you have 3–6 findings and want them to feel ‘equally important’."
      >
        <FindingsCards />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="B2. Icon tiles (Apple-style modules)"
        description="Each finding as a ‘feature tile’: icon, label, and one sentence. Very Apple."
      >
        <AppleIconTiles />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="B2 (variant). Icon tiles (tinted)"
        description="Same layout as B2, but with soft colored tints to help each finding feel distinct."
      >
        <AppleIconTilesColored />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="C. Ranked list (prioritization)"
        description="Great for stakeholder clarity: what mattered most, and why it rose to the top."
      >
        <RankedList />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="C2. Stacked rows (minimal, premium)"
        description="Clean, single-column, separated rows—reads like an Apple spec/feature list, but for insights."
      >
        <AppleStackedRows />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="C3. Horizontal carousel (story cards)"
        description="Best for a portfolio scroll: one finding per card, swipe/scroll through them like an Apple product story."
      >
        <AppleCarousel />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="C4. Sticky notes (dark mode vibe)"
        description="A research-wall look that still feels intentional and premium on a dark page."
      >
        <StickyNoteFindings />
      </SectionShell>

      <SectionShell
        eyebrow="Motif"
        title="M1. Four color squares"
        description="A reusable 2×2 accent block (same palette as the sticky-note background)."
      >
        <FourColorSquares />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="D. Table (credibility / audit vibe)"
        description="Reads like a research artifact. Useful when you want to convey rigor and structure."
      >
        <FindingsTable />
      </SectionShell>

      <SectionShell
        eyebrow="Findings option"
        title="E. 2×2 matrix (severity × frequency)"
        description="A single graphic that communicates what’s both frequent and severe. Pairs nicely with an Impact section right after."
      >
        <div className="relative aspect-video w-full">
          <Frame ariaLabel="2x2 findings matrix" className="absolute inset-0">
            <Svg2x2Matrix />
          </Frame>
        </div>
      </SectionShell>

      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full pt-8 pb-24">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]" />
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <p className={bodyMuted}>
                Tell me which option (A–E) you want for Flux and I’ll port that exact layout into
                `src/app/flux/page.tsx` and tune spacing/typography to match your Summary flow.
              </p>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

