export const metadata = {
  title: "Challenge visuals",
  description: "Non-text visual representations for the Challenge section.",
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

function SvgTriangleDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full">
      <defs>
        <linearGradient id="triStroke" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.25)" />
        </linearGradient>
        <radialGradient id="triCenter" cx="50%" cy="45%" r="60%">
          <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="600" fill="transparent" />
      <circle cx="400" cy="300" r="220" fill="url(#triCenter)" />

      <path
        d="M400 105 L155 490 L645 490 Z"
        fill="rgba(255,255,255,0.02)"
        stroke="url(#triStroke)"
        strokeWidth="2"
      />

      {[
        { x: 400, y: 105, t: compact ? "Time" : "Time pressure", c: "rgba(59,130,246,0.35)" },
        { x: 155, y: 490, t: compact ? "Field" : "Field conditions", c: "rgba(34,197,94,0.30)" },
        { x: 645, y: 490, t: compact ? "Risk" : "Error cost", c: "rgba(244,63,94,0.30)" },
      ].map((n) => (
        <g key={n.t}>
          <circle cx={n.x} cy={n.y} r="18" fill={n.c} stroke="rgba(255,255,255,0.28)" />
          {!compact ? (
            <text
              x={n.x}
              y={n.y + (n.y < 200 ? -28 : 44)}
              textAnchor="middle"
              fontSize="18"
              fill="rgba(255,255,255,0.78)"
              fontFamily="ui-sans-serif, system-ui"
            >
              {n.t}
            </text>
          ) : null}
        </g>
      ))}

      <g>
        <circle cx="400" cy="300" r="64" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" />
        <text
          x="400"
          y="292"
          textAnchor="middle"
          fontSize="18"
          fill="rgba(255,255,255,0.86)"
          fontFamily="ui-sans-serif, system-ui"
        >
          Decision
        </text>
        <text
          x="400"
          y="316"
          textAnchor="middle"
          fontSize="18"
          fill="rgba(255,255,255,0.86)"
          fontFamily="ui-sans-serif, system-ui"
        >
          clarity
        </text>
      </g>

      <g stroke="rgba(255,255,255,0.22)" strokeDasharray="6 8" strokeWidth="2">
        <path d="M400 300 L400 105" />
        <path d="M400 300 L155 490" />
        <path d="M400 300 L645 490" />
      </g>
    </svg>
  );
}

function SvgWorkflowStrip() {
  const stepsBefore = ["Receive", "Locate", "Confirm", "Exception", "Call", "Re-confirm"];
  const stepsAfter = ["Receive", "Locate", "Confirm", "Resolve", "Complete"];

  const Lane = ({
    title,
    steps,
    variant,
  }: {
    title: string;
    steps: string[];
    variant: "before" | "after";
  }) => (
    <div className="flex items-center gap-3">
      <div className="w-[86px] shrink-0 text-[0.75rem] font-medium tracking-[0.18em] text-white/60">
        {title.toUpperCase()}
      </div>
      <div className="flex w-full items-center gap-2 overflow-hidden">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`rounded-[999px] border px-3 py-1 text-[0.78rem] ${
                variant === "before"
                  ? "border-white/10 bg-white/5 text-white/70"
                  : "border-white/15 bg-white/10 text-white/85"
              }`}
            >
              {s}
            </div>
            {i < steps.length - 1 ? (
              <div className="h-[2px] w-6 bg-white/10">
                <div className="h-full w-1/2 bg-white/25" />
              </div>
            ) : null}
          </div>
        ))}
        {variant === "before" ? (
          <div className="ml-2 rounded-[999px] border border-rose-500/25 bg-rose-500/10 px-3 py-1 text-[0.78rem] text-rose-100/90">
            loops
          </div>
        ) : (
          <div className="ml-2 rounded-[999px] border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[0.78rem] text-emerald-100/90">
            clear next action
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full flex-col justify-center gap-6 p-6">
      <Lane title="Before" steps={stepsBefore} variant="before" />
      <div className="h-px w-full bg-white/10" />
      <Lane title="After" steps={stepsAfter} variant="after" />
    </div>
  );
}

function SvgSignalNoiseHero() {
  return (
    <svg viewBox="0 0 900 600" className="h-full w-full">
      <defs>
        <filter id="blur6">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <linearGradient id="haze" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.00)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="900" height="600" fill="transparent" />
      <g filter="url(#blur6)" opacity="0.95">
        {Array.from({ length: 18 }).map((_, i) => (
          <rect
            key={i}
            x={40 + (i % 6) * 140}
            y={60 + Math.floor(i / 6) * 150}
            rx="18"
            ry="18"
            width="110"
            height="90"
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.10)"
          />
        ))}
      </g>

      <rect x="0" y="0" width="900" height="600" fill="url(#haze)" />

      {[
        { x: 165, y: 130, w: 240, h: 150, t1: "Next action", t2: "Confirm pickup" },
        { x: 470, y: 210, w: 260, h: 170, t1: "Exception", t2: "Missing item" },
        { x: 260, y: 360, w: 420, h: 170, t1: "Grouping", t2: "3 packages" },
      ].map((c) => (
        <g key={c.t2}>
          <rect
            x={c.x}
            y={c.y}
            width={c.w}
            height={c.h}
            rx="22"
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.18)"
          />
          <rect x={c.x + 18} y={c.y + 18} width="110" height="10" rx="5" fill="rgba(255,255,255,0.22)" />
          <rect x={c.x + 18} y={c.y + 40} width="160" height="10" rx="5" fill="rgba(255,255,255,0.14)" />
          <text
            x={c.x + 18}
            y={c.y + c.h - 42}
            fontSize="16"
            fill="rgba(255,255,255,0.70)"
            fontFamily="ui-sans-serif, system-ui"
          >
            {c.t1}
          </text>
          <text
            x={c.x + 18}
            y={c.y + c.h - 20}
            fontSize="20"
            fill="rgba(255,255,255,0.90)"
            fontFamily="ui-sans-serif, system-ui"
          >
            {c.t2}
          </text>
        </g>
      ))}

      <text
        x="36"
        y="44"
        fontSize="14"
        fill="rgba(255,255,255,0.55)"
        fontFamily="ui-sans-serif, system-ui"
      >
        Signal (sharp decisions) vs noise (ambient information)
      </text>
    </svg>
  );
}

function NoiseIconSet() {
  const items = [
    { k: "Glare", color: "rgba(59,130,246,0.45)" },
    { k: "Motion", color: "rgba(34,197,94,0.40)" },
    { k: "Low signal", color: "rgba(245,158,11,0.40)" },
    { k: "Interruptions", color: "rgba(244,63,94,0.40)" },
    { k: "Gloves", color: "rgba(168,85,247,0.40)" },
    { k: "Noise", color: "rgba(255,255,255,0.22)" },
  ];
  return (
    <div className="grid h-full w-full grid-cols-2 gap-4 p-5">
      {items.map((it) => (
        <div key={it.k} className="rounded-[14px] border border-white/10 bg-black/10 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-[12px]" style={{ background: it.color }} />
            <div className="text-[0.9rem] font-medium text-white/85">{it.k}</div>
          </div>
          <div className="mt-3 h-2 w-4/5 rounded bg-white/10" />
          <div className="mt-2 h-2 w-3/5 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function ConstraintsScoreboard() {
  const tiles = [
    { top: "1‑hand", bottom: "use", tint: "bg-white/10" },
    { top: "gloves", bottom: "on", tint: "bg-white/5" },
    { top: "sun", bottom: "glare", tint: "bg-white/10" },
    { top: "low", bottom: "bandwidth", tint: "bg-white/5" },
    { top: "shared", bottom: "device", tint: "bg-white/10" },
    { top: "high", bottom: "noise", tint: "bg-white/5" },
    { top: "fast", bottom: "handoff", tint: "bg-white/10" },
    { top: "error", bottom: "cost", tint: "bg-white/5" },
  ];

  return (
    <div className="grid h-full w-full grid-cols-2 gap-4 p-5 md:grid-cols-4">
      {tiles.map((t) => (
        <div key={`${t.top}-${t.bottom}`} className={`rounded-[18px] border border-white/10 ${t.tint} p-4`}>
          <div className="flex items-start justify-between">
            <div className="h-10 w-10 rounded-[14px] bg-white/10" />
            <div className="h-2 w-10 rounded bg-white/10" />
          </div>
          <div className="mt-5 text-[1.2rem] font-semibold tracking-[0.02em] text-white/90">
            {t.top}
          </div>
          <div className="text-[0.9rem] text-white/65">{t.bottom}</div>
          <div className="mt-4 h-2 w-4/5 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}

function SvgEnvironmentPanel({ split = false }: { split?: boolean }) {
  return (
    <svg viewBox="0 0 800 600" className="h-full w-full">
      <defs>
        <linearGradient id="screen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
        <linearGradient id="glare" x1="0" x2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.24)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="800" height="600" fill="transparent" />

      {split ? (
        <>
          <rect x="0" y="0" width="400" height="600" fill="rgba(255,255,255,0.02)" />
          <rect x="400" y="0" width="400" height="600" fill="rgba(255,255,255,0.00)" />
          <text x="40" y="56" fontSize="16" fill="rgba(255,255,255,0.70)" fontFamily="ui-sans-serif, system-ui">
            Outdoor glare
          </text>
          <text x="440" y="56" fontSize="16" fill="rgba(255,255,255,0.70)" fontFamily="ui-sans-serif, system-ui">
            Indoor low-signal
          </text>
        </>
      ) : null}

      {[split ? 200 : 400, split ? 600 : 400].map((cx, idx) => (
        <g key={idx} transform={`translate(${cx - 135} 70)`}>
          <rect x="0" y="0" width="270" height="460" rx="44" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" />
          <rect x="22" y="48" width="226" height="360" rx="28" fill="url(#screen)" stroke="rgba(255,255,255,0.12)" />

          <rect x="40" y="76" width="120" height="12" rx="6" fill="rgba(255,255,255,0.22)" />
          <rect x="40" y="100" width="180" height="12" rx="6" fill="rgba(255,255,255,0.12)" />
          <rect x="40" y="140" width="200" height="56" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
          <rect x="40" y="214" width="200" height="56" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
          <rect x="40" y="288" width="200" height="56" rx="18" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />

          {idx === 0 && (split ? true : !split) ? (
            <path d="M22 58 C70 90, 140 60, 248 120 L248 48 L22 48 Z" fill="url(#glare)" opacity="0.9" />
          ) : null}
          {split && idx === 1 ? (
            <>
              <rect x="22" y="408" width="226" height="12" rx="6" fill="rgba(255,255,255,0.06)" />
              <rect x="22" y="426" width="160" height="12" rx="6" fill="rgba(255,255,255,0.04)" />
            </>
          ) : null}

          <path
            d="M22 330 C65 355, 110 380, 248 406"
            fill="none"
            stroke="rgba(34,197,94,0.35)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.75"
          />
          <text x="24" y="448" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
            reach zone / overlays
          </text>
        </g>
      ))}
    </svg>
  );
}

function SvgRiskHeatmap() {
  const dots = [
    { x: 560, y: 150, t: "missed pickup", c: "rgba(244,63,94,0.75)" },
    { x: 520, y: 300, t: "wrong grouping", c: "rgba(245,158,11,0.75)" },
    { x: 350, y: 220, t: "failed scan", c: "rgba(59,130,246,0.75)" },
    { x: 280, y: 360, t: "stuck state", c: "rgba(168,85,247,0.75)" },
  ];
  return (
    <svg viewBox="0 0 900 540" className="h-full w-full">
      <defs>
        <linearGradient id="quad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.01)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="900" height="540" fill="transparent" />
      <g transform="translate(120 70)">
        <rect x="0" y="0" width="640" height="380" rx="22" fill="url(#quad)" stroke="rgba(255,255,255,0.18)" />
        <path d="M320 0 V380" stroke="rgba(255,255,255,0.14)" />
        <path d="M0 190 H640" stroke="rgba(255,255,255,0.14)" />

        <text x="-10" y="190" textAnchor="end" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          Impact →
        </text>
        <text x="320" y="410" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          Likelihood →
        </text>

        {dots.map((d) => (
          <g key={d.t}>
            <circle cx={d.x - 120} cy={d.y - 70} r="8" fill={d.c} />
            <circle cx={d.x - 120} cy={d.y - 70} r="16" fill={d.c} opacity="0.18" />
            <text
              x={d.x - 120 + 14}
              y={d.y - 70 + 5}
              fontSize="14"
              fill="rgba(255,255,255,0.78)"
              fontFamily="ui-sans-serif, system-ui"
            >
              {d.t}
            </text>
          </g>
        ))}

        <text x="18" y="26" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          low impact
        </text>
        <text x="540" y="26" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          high impact
        </text>
        <text x="18" y="362" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          low likelihood
        </text>
        <text x="516" y="362" fontSize="14" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif, system-ui">
          high likelihood
        </text>
      </g>
    </svg>
  );
}

function LegendStrip() {
  const items = [
    { k: "Red", v: "High-stakes mistakes", c: "bg-rose-500/25 border-rose-500/25" },
    { k: "Amber", v: "Frequent frictions", c: "bg-amber-500/25 border-amber-500/25" },
    { k: "Blue", v: "Scan / device failures", c: "bg-blue-500/25 border-blue-500/25" },
    { k: "Purple", v: "State & recovery", c: "bg-purple-500/25 border-purple-500/25" },
  ];
  return (
    <div className="flex h-full w-full items-center justify-between gap-4 p-5">
      {items.map((it) => (
        <div key={it.k} className="flex min-w-0 flex-1 items-center gap-3 rounded-[16px] border border-white/10 bg-black/10 p-4">
          <div className={`h-9 w-9 shrink-0 rounded-[12px] border ${it.c}`} />
          <div className="min-w-0">
            <div className="text-[0.85rem] font-medium text-white/85">{it.k}</div>
            <div className="truncate text-[0.85rem] text-white/60">{it.v}</div>
          </div>
        </div>
      ))}
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

export default function ChallengeVisualsPage() {
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
                Challenge visuals
              </h1>
              <p className={`mt-4 ${body}`}>
                A set of non-text representations you can drop into a “Challenge” section. Each idea
                is shown as its own section using the same grid rhythm as Flux.
              </p>
            </div>
            <div className="col-span-12 md:col-span-1 px-[10px]" />
          </div>
        </div>
      </section>

      <SectionShell
        eyebrow="Challenge representation"
        title="Problem triangle (three forces)"
        description="A single, iconic diagram: three forces pushing toward the same core problem (decision clarity). Great when you want ‘instant comprehension’ without reading."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Triangle diagram showing three forces leading to decision clarity" className="absolute inset-0">
              <SvgTriangleDiagram />
            </Frame>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Compact triangle diagram variant" className="absolute inset-0">
              <SvgTriangleDiagram compact />
            </Frame>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Challenge representation"
        title="Before/after workflow strip"
        description="Two lanes, same task. ‘Before’ shows loops, handoffs, and ambiguity; ‘After’ shows a shorter path with clearer decisions. Works well as a wide band under the Challenge heading."
      >
        <div className="space-y-6">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Before and after workflow strip" className="absolute inset-0">
              <SvgWorkflowStrip />
            </Frame>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="relative aspect-video w-full overflow-hidden rounded-[18px]">
              <Frame ariaLabel="Before lane detail" className="absolute inset-0">
                <div className="flex h-full w-full items-center justify-center p-6">
                  <div className="w-full max-w-[520px] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-medium tracking-[0.16em] text-white/60">BEFORE</div>
                      <div className="rounded-[999px] border border-rose-500/25 bg-rose-500/10 px-3 py-1 text-xs text-rose-100/90">
                        ambiguity + loops
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Multiple handoffs",
                        "Color-only status",
                        "Hidden exceptions",
                        "Unclear next step",
                      ].map((t) => (
                        <div key={t} className="rounded-[16px] border border-white/10 bg-white/5 p-4">
                          <div className="h-2 w-10 rounded bg-white/20" />
                          <div className="mt-3 text-[0.9rem] font-medium text-white/80">{t}</div>
                          <div className="mt-3 h-2 w-4/5 rounded bg-white/10" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Frame>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-[18px]">
              <Frame ariaLabel="After lane detail" className="absolute inset-0">
                <div className="flex h-full w-full items-center justify-center p-6">
                  <div className="w-full max-w-[520px] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-medium tracking-[0.16em] text-white/60">AFTER</div>
                      <div className="rounded-[999px] border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100/90">
                        explicit next action
                      </div>
                    </div>
                    <div className="rounded-[22px] border border-white/12 bg-white/6 p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-[0.95rem] font-medium text-white/85">Next action</div>
                        <div className="h-2 w-10 rounded bg-white/15" />
                      </div>
                      <div className="mt-3 text-[1.35rem] font-semibold tracking-[0.02em] text-white">
                        Confirm pickup
                      </div>
                      <div className="mt-4 flex gap-3">
                        <div className="flex-1 rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 text-[0.9rem] text-white/75">
                          Details
                        </div>
                        <div className="flex-1 rounded-[16px] border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-[0.9rem] text-emerald-100/90">
                          Confirm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Challenge representation"
        title="Signal vs noise"
        description="A visual metaphor: everything is noisy/blurred except the handful of decisions that must be crisp. Good when the challenge is ‘finding the right action fast.’"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px] md:col-span-2">
            <Frame ariaLabel="Signal versus noise metaphor frame" className="absolute inset-0">
              <SvgSignalNoiseHero />
            </Frame>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Noise source icon set" className="absolute inset-0">
              <NoiseIconSet />
            </Frame>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Challenge representation"
        title="Constraints scoreboard"
        description="A grid of ‘constraint tiles’ with big numerals/labels: one-hand use, gloves, sun glare, low bandwidth, shared devices. Reads like a dashboard rather than prose."
      >
        <div className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Constraints scoreboard grid" className="absolute inset-0">
              <ConstraintsScoreboard />
            </Frame>
          </div>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${bodyMuted}`}>
            <div className="rounded-[18px] border border-white/10 bg-white/5 p-5">
              <p className="text-white font-medium">Tile style A</p>
              <p className="mt-2">
                Large number/metric placeholder (e.g., “1-hand”), icon, and a 2–3 word label.
              </p>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-white/5 p-5">
              <p className="text-white font-medium">Tile style B</p>
              <p className="mt-2">Icon-forward tiles with minimal text (better for slide decks).</p>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Challenge representation"
        title="Environment panel"
        description="A stylized device silhouette with overlays: glare, motion, reach zones, audio cues off. Communicates ‘real world constraints’ even without a single sentence."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Environment panel with device silhouette and overlays" className="absolute inset-0">
              <SvgEnvironmentPanel />
            </Frame>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Split environment panel showing outdoor glare versus indoor low-signal" className="absolute inset-0">
              <SvgEnvironmentPanel split />
            </Frame>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Challenge representation"
        title="Risk heatmap (impact × likelihood)"
        description="A 2×2 that shows why mistakes matter. Plot 3–5 risks (missed pickup, wrong grouping, stuck state, failed scan) as dots. Great for stakeholders."
      >
        <div className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Risk heatmap showing impact by likelihood" className="absolute inset-0">
              <SvgRiskHeatmap />
            </Frame>
          </div>
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[18px]">
            <Frame ariaLabel="Legend strip for heatmap" className="absolute inset-0">
              <LegendStrip />
            </Frame>
          </div>
        </div>
      </SectionShell>

      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full pt-8 pb-24">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]" />
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <p className={bodyMuted}>
                These are real inline visuals (mostly SVG) meant to look like final “Challenge”
                representations. If you want them to match Flux even tighter, tell me your exact
                challenge copy and I’ll tune labels/risks/steps to your story.
              </p>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

