import type { ReactNode } from "react";

export const metadata = {
  title: "Micro experiments",
  description: "Micro experiments — fast tests, evidence, and decisions shipped.",
};

const label = "text-base font-medium tracking-[0.12em] text-white/70";
const body = "text-[0.958rem] leading-relaxed text-white";
const bodyMuted = "text-[0.958rem] leading-relaxed text-white/80";
const h3 = "text-[1.5rem] font-medium tracking-[0.02em] text-white";

function WireframeWeb({
  title,
  variantLabel,
  pattern,
}: {
  title: string;
  variantLabel: string;
  pattern:
    | "queueList"
    | "queuePriority"
    | "queueGrouped"
    | "groupManual"
    | "groupSuggested"
    | "groupExplain"
    | "scheduleForm"
    | "scheduleQuick"
    | "scheduleInline"
    | "statusIcons"
    | "statusLabels"
    | "statusA11y"
    | "metricsDashboard"
    | "metricsExceptions"
    | "metricsHybrid";
}) {
  const stroke = "#2f2f33";
  const fill = "#0D0D0E";
  const surface = "#151518";
  const muted = "#1E1E20";
  const accent = "#3b82f6";
  const warn = "#f59e0b";
  const danger = "#ef4444";

  const TopBar = ({ fullWidth = false }: { fullWidth?: boolean }) => (
    <>
      <rect
        x={fullWidth ? 20 : 20}
        y="16"
        width={fullWidth ? 680 : 680}
        height="36"
        rx="10"
        fill={surface}
        stroke={stroke}
      />
      <rect x="32" y="28" width="140" height="8" rx="4" fill={muted} />
      <rect x="600" y="28" width="84" height="8" rx="4" fill={muted} />
    </>
  );

  const Sidebar = () => (
    <>
      <rect x="20" y="64" width="170" height="340" rx="14" fill={surface} stroke={stroke} />
      <rect x="34" y="84" width="120" height="10" rx="5" fill={muted} />
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} x="34" y={112 + i * 34} width="140" height="18" rx="9" fill={i === 1 ? "#1a1a1d" : muted} />
      ))}
    </>
  );

  /** Plain table — full width (no sidebar). */
  const FullWidthRows = ({ count = 8 }: { count?: number }) => (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const y = 118 + i * 30;
        return (
          <g key={i}>
            <rect x="28" y={y} width="664" height="24" rx="8" fill={surface} stroke={stroke} />
            <rect x="40" y={y + 8} width="120" height="6" rx="3" fill={muted} />
            <rect x="200" y={y + 8} width="200" height="6" rx="3" fill={muted} />
            <rect x="620" y={y + 8} width="56" height="6" rx="3" fill={muted} />
          </g>
        );
      })}
    </>
  );

  /** Standard main-area rows (with sidebar), optional status treatment. */
  const MainRows = ({
    startY = 128,
    count = 6,
    rowWidth = 494,
    status = "none" as "none" | "icons" | "labels" | "a11y",
    priorityFirst = false,
  }: {
    startY?: number;
    count?: number;
    rowWidth?: number;
    status?: "none" | "icons" | "labels" | "a11y";
    priorityFirst?: boolean;
  }) => {
    const gap = 8;
    const rows: ReactNode[] = [];
    let y = startY;
    const x0 = 206;
    const statusX = x0 + rowWidth - 24;

    for (let i = 0; i < count; i += 1) {
      const isFirst = priorityFirst && i === 0;
      const h = isFirst ? 42 : 26;
      const cy = isFirst ? y + 21 : y + 13;

      rows.push(
        <g key={i}>
          {isFirst ? (
            <rect
              x={x0}
              y={y}
              width={rowWidth}
              height={h}
              rx="12"
              fill="#121214"
              stroke={warn}
              strokeWidth="1.5"
            />
          ) : (
            <rect x={x0} y={y} width={rowWidth} height={h} rx="10" fill={surface} stroke={stroke} />
          )}
          <rect x={x0 + 16} y={y + (isFirst ? 16 : 9)} width="140" height="8" rx="4" fill={isFirst ? "#2a2418" : muted} />
          <rect x={x0 + 170} y={y + (isFirst ? 16 : 9)} width="100" height="8" rx="4" fill={muted} />
          {status === "icons" && (
            <g>
              <circle cx={statusX - 36} cy={cy} r="6" fill={muted} stroke={stroke} />
              <circle cx={statusX - 20} cy={cy} r="6" fill={muted} stroke={stroke} />
              <circle cx={statusX - 4} cy={cy} r="6" fill={muted} stroke={stroke} />
            </g>
          )}
          {status === "labels" && (
            <rect
              x={x0 + rowWidth - 112}
              y={y + (isFirst ? 12 : 7)}
              width="96"
              height="14"
              rx="7"
              fill="#252528"
              stroke={stroke}
            />
          )}
          {status === "none" && !isFirst && (
            <rect x={x0 + rowWidth - 76} y={y + 9} width="60" height="8" rx="4" fill={muted} />
          )}
          {status === "a11y" && (
            <rect
              x={x0 + rowWidth - 120}
              y={y + (isFirst ? 12 : 7)}
              width="104"
              height="14"
              rx="7"
              fill="#1e293b"
              stroke={accent}
              strokeWidth="0.8"
            />
          )}
        </g>
      );
      y += h + gap;
    }
    return <>{rows}</>;
  };

  const MapZones = () => (
    <g>
      <rect x="206" y="64" width="200" height="300" rx="14" fill={surface} stroke={stroke} />
      <rect x="216" y="78" width="52" height="8" rx="4" fill={muted} opacity="0.85" />
      <rect x="220" y="100" width="76" height="64" rx="8" fill={muted} stroke={stroke} />
      <rect x="308" y="100" width="84" height="48" rx="8" fill={muted} stroke={stroke} />
      <rect x="220" y="176" width="100" height="52" rx="8" fill={muted} stroke={stroke} />
      <rect x="332" y="168" width="60" height="88" rx="8" fill={muted} stroke={stroke} />
    </g>
  );

  const GroupedListPane = () => (
    <g>
      <rect x="418" y="64" width="282" height="38" rx="12" fill={surface} stroke={stroke} />
      <rect x="434" y="78" width="140" height="10" rx="5" fill={muted} />
      {[
        [112, 3],
        [214, 4],
        [330, 3],
      ].map(([baseY, n], gi) => (
        <g key={gi}>
          <rect x="418" y={baseY} width="100" height="8" rx="4" fill={warn} opacity="0.35" />
          {Array.from({ length: n }).map((_, ri) => (
            <rect
              key={ri}
              x="418"
              y={baseY + 16 + ri * 28}
              width="282"
              height="22"
              rx="8"
              fill={surface}
              stroke={stroke}
            />
          ))}
        </g>
      ))}
    </g>
  );

  const SuggestedBundleCards = () => (
    <g>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={206 + i * 168} y="64" width="156" height="72" rx="12" fill={surface} stroke={accent} strokeOpacity="0.5" />
          <rect x={218 + i * 168} y="78" width="80" height="8" rx="4" fill={muted} />
          <rect x={218 + i * 168} y="94" width="120" height="6" rx="3" fill={muted} />
          <rect x={218 + i * 168} y="108" width="100" height="6" rx="3" fill={muted} />
        </g>
      ))}
    </g>
  );

  const Modal = () => (
    <g>
      <rect x="18" y="52" width="684" height="332" fill="#000" opacity="0.55" />
      <rect x="330" y="112" width="300" height="210" rx="16" fill="#0b0b0c" stroke={stroke} strokeWidth="2" />
      <rect x="352" y="134" width="160" height="10" rx="5" fill={muted} />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x="352" y={160 + i * 28} width="256" height="18" rx="9" fill={surface} stroke={stroke} />
      ))}
      <rect x="352" y="302" width="256" height="18" rx="9" fill={surface} stroke={stroke} />
    </g>
  );

  const BottomQuickPickBar = () => (
    <g>
      <rect x="206" y="330" width="494" height="64" rx="14" fill="#121214" stroke={stroke} />
      <rect x="222" y="342" width="120" height="8" rx="4" fill={muted} />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x={222 + i * 88} y="358" width="76" height="28" rx="14" fill={surface} stroke={accent} strokeOpacity="0.4" />
      ))}
    </g>
  );

  const Pattern = () => {
    switch (pattern) {
      case "queueList":
        /* No sidebar: one wide scanning list */
        return (
          <>
            <TopBar fullWidth />
            <rect x="20" y="64" width="680" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="36" y="78" width="200" height="10" rx="5" fill={muted} />
            <FullWidthRows />
          </>
        );
      case "queuePriority":
        /* Sidebar + hero “next” card + signal chips + highlighted first row */
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="240" height="88" rx="14" fill="#121214" stroke={warn} strokeWidth="1.2" />
            <rect x="222" y="82" width="72" height="8" rx="4" fill={warn} opacity="0.35" />
            <rect x="222" y="98" width="180" height="10" rx="5" fill={muted} />
            <rect x="222" y="116" width="140" height="8" rx="4" fill={muted} />
            <rect x="460" y="64" width="240" height="88" rx="14" fill={surface} stroke={stroke} />
            <rect x="476" y="82" width="100" height="8" rx="4" fill={muted} />
            {Array.from({ length: 3 }).map((_, i) => (
              <rect key={i} x={476 + i * 68} y="102" width="56" height="18" rx="9" fill={muted} />
            ))}
            <MainRows startY={168} count={5} priorityFirst />
          </>
        );
      case "queueGrouped":
        /* Map + grouped list — structurally different from table-only */
        return (
          <>
            <TopBar />
            <Sidebar />
            <MapZones />
            <GroupedListPane />
          </>
        );
      case "groupManual":
        /* Canvas / scratch + pool list — not a standard table */
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="300" height="280" rx="14" fill={surface} stroke={stroke} strokeDasharray="6 6" />
            <rect x="230" y="92" width="72" height="72" rx="36" fill={muted} stroke={stroke} />
            <rect x="320" y="120" width="64" height="64" rx="32" fill={muted} stroke={stroke} />
            <rect x="260" y="200" width="80" height="80" rx="40" fill={muted} stroke={stroke} />
            <rect x="522" y="64" width="178" height="280" rx="14" fill={surface} stroke={stroke} />
            <rect x="538" y="84" width="100" height="8" rx="4" fill={muted} />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x="538" y={108 + i * 30} width="146" height="22" rx="8" fill={muted} opacity="0.6" />
            ))}
          </>
        );
      case "groupSuggested":
        /* Horizontal suggested bundles + table */
        return (
          <>
            <TopBar />
            <Sidebar />
            <SuggestedBundleCards />
            <MainRows startY={152} count={5} status="labels" />
          </>
        );
      case "groupExplain":
        /* Narrow table + fixed explain drawer */
        return (
          <>
            <TopBar />
            <Sidebar />
            <MainRows startY={64} count={6} status="labels" rowWidth={302} />
            <rect x="520" y="64" width="180" height="300" rx="14" fill="#121214" stroke={accent} strokeOpacity="0.45" />
            <rect x="536" y="84" width="100" height="8" rx="4" fill={muted} />
            {Array.from({ length: 6 }).map((_, i) => (
              <rect key={i} x="536" y={104 + i * 22} width="148" height="6" rx="3" fill={muted} />
            ))}
          </>
        );
      case "scheduleForm":
        return (
          <>
            <TopBar />
            <Sidebar />
            <Modal />
          </>
        );
      case "scheduleQuick":
        /* Table + bottom sticky time chips */
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="180" height="10" rx="5" fill={muted} />
            <MainRows startY={118} count={5} status="labels" />
            <BottomQuickPickBar />
          </>
        );
      case "scheduleInline":
        /* Row 2 expanded into inline editor block */
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="180" height="10" rx="5" fill={muted} />
            <MainRows startY={118} count={2} />
            <rect x="206" y="186" width="494" height="72" rx="12" fill="#121214" stroke={accent} strokeOpacity="0.5" />
            <rect x="222" y="202" width="160" height="8" rx="4" fill={muted} />
            <rect x="222" y="220" width="280" height="8" rx="4" fill={muted} />
            <rect x="222" y="238" width="200" height="8" rx="4" fill={muted} />
            <MainRows startY={274} count={4} />
          </>
        );
      case "statusIcons":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="200" height="10" rx="5" fill={muted} />
            <MainRows startY={118} count={7} status="icons" />
          </>
        );
      case "statusLabels":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="200" height="10" rx="5" fill={muted} />
            <MainRows startY={118} count={7} status="labels" />
          </>
        );
      case "statusA11y":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="28" rx="10" fill="#1e293b" stroke={accent} strokeOpacity="0.5" />
            <rect x="222" y="74" width="320" height="8" rx="4" fill={muted} />
            <rect x="206" y="100" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="114" width="220" height="10" rx="5" fill={muted} />
            <MainRows startY={154} count={5} status="a11y" />
            <rect x="204" y="188" width="498" height="34" rx="10" fill="none" stroke={accent} strokeWidth="1.5" strokeDasharray="4 3" />
          </>
        );
      case "metricsDashboard":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="88" rx="14" fill={surface} stroke={stroke} />
            <rect x="222" y="82" width="100" height="28" rx="12" fill={muted} />
            <rect x="332" y="82" width="100" height="28" rx="12" fill={muted} />
            <rect x="442" y="82" width="100" height="28" rx="12" fill={muted} />
            <rect x="552" y="82" width="132" height="28" rx="12" fill={muted} />
            <rect x="222" y="118" width="462" height="22" rx="8" fill={muted} opacity="0.5" />
            <polyline
              points="230,150 280,130 330,140 380,110 430,120 480,100 530,115 580,95 630,105"
              fill="none"
              stroke={muted}
              strokeWidth="2"
            />
            <MainRows startY={168} count={4} />
          </>
        );
      case "metricsExceptions":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="52" rx="12" fill="#2a1818" stroke={danger} strokeOpacity="0.45" />
            <rect x="222" y="80" width="260" height="10" rx="5" fill={muted} />
            <rect x="490" y="76" width="96" height="22" rx="11" fill={danger} opacity="0.25" />
            <rect x="206" y="126" width="494" height="56" rx="12" fill="#2a1818" stroke={danger} strokeOpacity="0.35" />
            <rect x="222" y="142" width="300" height="8" rx="4" fill={muted} />
            <rect x="222" y="158" width="360" height="8" rx="4" fill={muted} />
            <MainRows startY={198} count={5} status="labels" />
          </>
        );
      case "metricsHybrid":
      default:
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="56" rx="14" fill={surface} stroke={stroke} />
            <rect x="222" y="80" width="72" height="20" rx="10" fill={muted} />
            <rect x="302" y="80" width="72" height="20" rx="10" fill={muted} />
            <rect x="382" y="80" width="72" height="20" rx="10" fill={muted} />
            <rect x="470" y="78" width="120" height="24" rx="12" fill="#2a1818" stroke={danger} strokeOpacity="0.35" />
            <rect x="598" y="80" width="88" height="20" rx="10" fill={muted} />
            <rect x="222" y="108" width="200" height="6" rx="3" fill={muted} />
            <MainRows startY={132} count={6} status="labels" />
          </>
        );
    }
  };

  return (
    <div className="rounded-[22px] border border-white/10 bg-[#1E1E20] p-5">
      <p className="text-xs uppercase tracking-[0.16em] text-white/70">{variantLabel}</p>
      <p className="mt-2 text-[0.98rem] font-medium text-white/92">{title}</p>
      <div className="mt-4 flex w-full items-center justify-center">
        <svg viewBox="0 0 720 420" className="w-full" aria-hidden>
          <rect x="10" y="10" width="700" height="400" rx="22" fill={fill} stroke={stroke} strokeWidth="2" />
          <rect x="18" y="18" width="684" height="384" rx="18" fill="#0b0b0c" stroke={stroke} />
          <Pattern />
        </svg>
      </div>
    </div>
  );
}

function EvidenceChips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => (
        <span
          key={x}
          className="rounded-full border border-white/10 bg-[#1E1E20] px-3 py-1 text-[0.82rem] text-white/75"
        >
          {x}
        </span>
      ))}
    </div>
  );
}

type Experiment = {
  id: string;
  title: string;
  hypothesis: string;
  variants: { name: string; wire: Parameters<typeof WireframeWeb>[0]["pattern"] }[];
  decision: string;
  evidenceChips: string[];
};

const experiments: Experiment[] = [
  {
    id: "01",
    title: "Queue prioritization (decision-first vs list-first)",
    hypothesis:
      "If the pickup queue highlights the next best decision (not just all requests), agents commit faster with fewer conflicts.",
    variants: [
      {
        name: "Chronological list",
        wire: "queueList",
      },
      {
        name: "Priority queue (signals)",
        wire: "queuePriority",
      },
      {
        name: "Grouped by zone + recommendation",
        wire: "queueGrouped",
      },
    ],
    decision:
      "Shipped a prioritized queue with lightweight conflict cues and fast override to keep decisions legible.",
    evidenceChips: [
      "Quote: “[…] I don’t have to scan the whole list.”",
      "n=? task sessions",
      "Δ time: ?s faster to pick next",
      "Δ errors: ? fewer late conflicts",
    ],
  },
  {
    id: "02",
    title: "Grouping suggestions (agent-controlled vs system-suggested)",
    hypothesis:
      "Suggested groupings reduce planning time, but only if agents can understand and override them quickly.",
    variants: [
      { name: "Manual grouping", wire: "groupManual" },
      {
        name: "System-suggested groupings",
        wire: "groupSuggested",
      },
      {
        name: "Suggest + explain",
        wire: "groupExplain",
      },
    ],
    decision:
      "Shipped system-suggested groupings with feasibility/conflict visibility and an easy path to adjust.",
    evidenceChips: [
      "Quote: “[…] show me why it’s grouped.”",
      "Accept rate: ?%",
      "Δ time: ? min saved per route",
      "Δ collisions: ? fewer schedule conflicts",
    ],
  },
  {
    id: "03",
    title: "Scheduling interaction (single-step vs confirm step)",
    hypothesis:
      "Scheduling should support quick corrections first, then deeper edits—without forcing a long form upfront.",
    variants: [
      { name: "Full scheduling form", wire: "scheduleForm" },
      { name: "Quick picks + confirm", wire: "scheduleQuick" },
      { name: "Inline scheduling", wire: "scheduleInline" },
    ],
    decision:
      "Shipped quick scheduling with editable defaults to support “first-pass” decisions and later adjustments.",
    evidenceChips: [
      "Quote: “[…] I just pick a window and go.”",
      "Completion: ?% vs ?%",
      "Δ time: ?s faster to schedule",
      "Δ reschedules: ? fewer mistakes",
    ],
  },
  {
    id: "04",
    title: "Status updates (speed vs clarity vs accessibility)",
    hypothesis:
      "Status updates reduce coordination churn only if they’re fast, unambiguous, and accessible under real conditions.",
    variants: [
      { name: "Icon-only statuses", wire: "statusIcons" },
      { name: "Labeled statuses", wire: "statusLabels" },
      { name: "Labeled + announced states", wire: "statusA11y" },
    ],
    decision:
      "Shipped explicit labels with accessible focus order and screen-reader friendly state announcements.",
    evidenceChips: [
      "Quote: “[…] fewer ‘where is it?’ calls.”",
      "A11y: n=? keyboard + SR checks",
      "Δ time: ?s faster to update status",
      "Δ follow-ups: ? fewer clarifications",
    ],
  },
  {
    id: "05",
    title: "Metrics surface (dashboard vs exceptions-first)",
    hypothesis:
      "Agents don’t need more numbers—they need early warnings that let them correct the day before issues cascade.",
    variants: [
      { name: "Full dashboard", wire: "metricsDashboard" },
      { name: "Exceptions-first", wire: "metricsExceptions" },
      { name: "Hybrid", wire: "metricsHybrid" },
    ],
    decision:
      "Shipped a lightweight dashboard emphasizing exceptions, with supporting totals for end-of-day reflection.",
    evidenceChips: [
      "Quote: “[…] I see issues before they snowball.”",
      "Acted on exceptions: ?%",
      "Δ time: ?s faster to find next issue",
      "Δ misses: ? fewer missed windows",
    ],
  },
];

export default function MicroExperimentsPage() {
  return (
    <div className="relative w-full bg-black text-white">
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full">
          <div className="grid w-full grid-cols-12 gap-lg text-left mt-[160px]">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <h2 className={label}>Case study appendix</h2>
            </div>
            <div className="col-span-12 md:col-span-10 px-[10px]">
              <div className="pb-[24px]">
                <h1 className="text-[3.333rem] font-light tracking-[0.03em] text-white">
                  Micro experiments
                </h1>
              </div>
              <div className="pb-[34px]">
                <p className={bodyMuted}>
                  This page is designed to show decision-making under constraints: what we tested,
                  what we learned, and what shipped.
                </p>
              </div>
              <div className="rounded-[22px] border border-amber-200/15 bg-amber-300/10 p-5">
                <p className="text-sm font-medium text-white/90">Replace placeholders with your real evidence</p>
                <p className={`mt-2 ${bodyMuted}`}>
                  I didn’t invent quotes or metrics. Anything in brackets like{" "}
                  <span className="font-mono text-white/80">[n=?]</span> is a placeholder for your
                  notes, pilot data, or usability results.
                </p>
              </div>
            </div>
            <div className="hidden md:block md:col-span-0 px-[10px]" />
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full py-[90px]">
          <div className="grid w-full grid-cols-12 gap-lg">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <h2 className={label}>Experiments</h2>
            </div>
            <div className="col-span-12 md:col-span-10 px-[10px] space-y-8">
              {experiments.map((e) => (
                <article key={e.id} className="rounded-[28px] border border-white/10 bg-[#0D0D0E] p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.16em] text-white/60">Experiment {e.id}</p>
                      <h3 className={`${h3} mt-2`}>{e.title}</h3>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/60">Hypothesis</p>
                    <p className={`mt-2 ${body}`}>{e.hypothesis}</p>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/60">Wireframes (variants)</p>
                    <div className="mt-3 grid grid-cols-1 gap-4 xl:grid-cols-3">
                      {e.variants.map((v, i) => (
                        <WireframeWeb
                          key={v.name}
                          variantLabel={`${String.fromCharCode(65 + i)} variant`}
                          title={v.name}
                          pattern={v.wire}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/60">Decision shipped</p>
                    <p className={`mt-2 ${body}`}>{e.decision}</p>
                  </div>

                  <div className="mt-7">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/60">Evidence (placeholders)</p>
                    <div className="mt-3">
                      <EvidenceChips items={e.evidenceChips} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="hidden md:block md:col-span-0 px-[10px]" />
          </div>
        </div>
      </section>
    </div>
  );
}

