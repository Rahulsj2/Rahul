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

  const TopBar = () => (
    <>
      <rect x="20" y="16" width="680" height="36" rx="10" fill={surface} stroke={stroke} />
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

  const TableRows = ({ withBadges = false, grouped = false }: { withBadges?: boolean; grouped?: boolean }) => (
    <>
      {Array.from({ length: 7 }).map((_, i) => {
        const y = 128 + i * 34 + (grouped && i >= 3 ? 18 : 0);
        return (
          <g key={i}>
            <rect x="206" y={y} width="494" height="26" rx="10" fill={surface} stroke={stroke} />
            <rect x="222" y={y + 9} width="150" height="8" rx="4" fill={muted} />
            <rect x="382" y={y + 9} width="92" height="8" rx="4" fill={muted} />
            {withBadges ? (
              <rect x="608" y={y + 7} width="72" height="12" rx="6" fill={muted} />
            ) : (
              <rect x="620" y={y + 9} width="60" height="8" rx="4" fill={muted} />
            )}
          </g>
        );
      })}
      {grouped ? (
        <>
          <rect x="206" y="112" width="120" height="10" rx="5" fill={muted} />
          <rect x="206" y="246" width="120" height="10" rx="5" fill={muted} />
        </>
      ) : null}
    </>
  );

  const Chips = ({ count = 4 }: { count?: number }) => (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <rect key={i} x={206 + i * 96} y={64} width={84} height={22} rx={11} fill={surface} stroke={stroke} />
      ))}
    </>
  );

  const Modal = () => (
    <g>
      <rect x="330" y="112" width="300" height="210" rx="16" fill="#0b0b0c" stroke={stroke} />
      <rect x="352" y="134" width="160" height="10" rx="5" fill={muted} />
      {Array.from({ length: 5 }).map((_, i) => (
        <rect key={i} x="352" y={160 + i * 28} width="256" height="18" rx="9" fill={surface} stroke={stroke} />
      ))}
      <rect x="352" y="302" width="256" height="18" rx="9" fill={surface} stroke={stroke} />
    </g>
  );

  const Pattern = () => {
    switch (pattern) {
      case "queueList":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="180" height="10" rx="5" fill={muted} />
            <TableRows />
          </>
        );
      case "queuePriority":
        return (
          <>
            <TopBar />
            <Sidebar />
            <Chips count={3} />
            <rect x="206" y="96" width="494" height="22" rx="10" fill={surface} stroke={stroke} />
            <rect x="222" y="104" width="220" height="6" rx="3" fill={muted} />
            <TableRows withBadges />
          </>
        );
      case "queueGrouped":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="250" height="10" rx="5" fill={muted} />
            <TableRows grouped />
          </>
        );
      case "groupManual":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="86" rx="14" fill={surface} stroke={stroke} />
            <rect x="222" y="84" width="220" height="10" rx="5" fill={muted} />
            <rect x="222" y="106" width="320" height="10" rx="5" fill={muted} />
            <TableRows />
          </>
        );
      case "groupSuggested":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="58" rx="14" fill={surface} stroke={stroke} />
            <rect x="222" y="84" width="210" height="10" rx="5" fill={muted} />
            <rect x="564" y="78" width="120" height="22" rx="11" fill={muted} />
            <TableRows withBadges />
          </>
        );
      case "groupExplain":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="72" rx="14" fill={surface} stroke={stroke} />
            <rect x="222" y="84" width="210" height="10" rx="5" fill={muted} />
            <rect x="222" y="106" width="360" height="10" rx="5" fill={muted} />
            <rect x="600" y="100" width="84" height="22" rx="11" fill={muted} />
            <TableRows withBadges />
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
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="170" height="10" rx="5" fill={muted} />
            <Chips count={4} />
            <rect x="206" y="96" width="494" height="26" rx="10" fill={surface} stroke={stroke} />
            <rect x="222" y="105" width="200" height="8" rx="4" fill={muted} />
            <TableRows withBadges />
          </>
        );
      case "scheduleInline":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="180" height="10" rx="5" fill={muted} />
            <TableRows />
            <rect x="382" y="264" width="126" height="18" rx="9" fill={muted} />
          </>
        );
      case "statusIcons":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="180" height="10" rx="5" fill={muted} />
            <TableRows />
          </>
        );
      case "statusLabels":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="180" height="10" rx="5" fill={muted} />
            <TableRows withBadges />
          </>
        );
      case "statusA11y":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="220" height="10" rx="5" fill={muted} />
            <rect x="540" y="76" width="160" height="14" rx="7" fill={muted} />
            <TableRows withBadges />
          </>
        );
      case "metricsDashboard":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="90" rx="14" fill={surface} stroke={stroke} />
            <rect x="222" y="84" width="110" height="28" rx="12" fill={muted} />
            <rect x="342" y="84" width="110" height="28" rx="12" fill={muted} />
            <rect x="462" y="84" width="110" height="28" rx="12" fill={muted} />
            <rect x="582" y="84" width="102" height="28" rx="12" fill={muted} />
            <rect x="222" y="124" width="240" height="10" rx="5" fill={muted} />
            <TableRows />
          </>
        );
      case "metricsExceptions":
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="38" rx="12" fill={surface} stroke={stroke} />
            <rect x="222" y="78" width="160" height="10" rx="5" fill={muted} />
            <rect x="392" y="72" width="140" height="22" rx="11" fill={muted} />
            <rect x="206" y="110" width="494" height="66" rx="14" fill={surface} stroke={stroke} />
            <rect x="222" y="132" width="290" height="10" rx="5" fill={muted} />
            <rect x="222" y="152" width="380" height="10" rx="5" fill={muted} />
            <TableRows withBadges />
          </>
        );
      case "metricsHybrid":
      default:
        return (
          <>
            <TopBar />
            <Sidebar />
            <rect x="206" y="64" width="494" height="60" rx="14" fill={surface} stroke={stroke} />
            <rect x="222" y="84" width="120" height="10" rx="5" fill={muted} />
            <rect x="352" y="78" width="120" height="22" rx="11" fill={muted} />
            <rect x="482" y="78" width="120" height="22" rx="11" fill={muted} />
            <rect x="612" y="78" width="88" height="22" rx="11" fill={muted} />
            <TableRows withBadges />
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

