import type { ReactNode } from "react";

import { AnimatedInlineSchedulePanel } from "@/components/AnimatedInlineSchedulePanel";
import { AnimatedPickupWindowModal } from "@/components/AnimatedPickupWindowModal";
import { AnimatedShippingGroupedQueue } from "@/components/AnimatedShippingGroupedQueue";

export const metadata = {
  title: "Micro experiments",
  description: "Micro experiments —cfddvr fast tests, evidence, and decisions shipped.",
};

const label = "text-base font-medium tracking-[0.12em] text-white/70";
const body = "text-[0.958rem] leading-relaxed text-white";
const bodyMuted = "text-[0.958rem] leading-relaxed text-white/80";
const h3 = "text-[1.5rem] font-medium tracking-[0.02em] text-white";

type WireframePattern =
  | "queueList"
  | "queuePriority"
  | "queueGrouped"
  | "groupManual"
  | "groupSuggested"
  | "groupExplain"
  | "scheduleForm"
  | "scheduleQuick"
  | "schedulePickupWindowModal"
  | "scheduleInline"
  | "statusIcons"
  | "statusLabels"
  | "statusA11y"
  | "metricsDashboard"
  | "metricsExceptions"
  | "metricsHybrid"
  | "shippingNewQueueTable"
  | "shippingNewQueueGrid"
  | "shippingNewQueueSplit";

const wireframePillBase =
  "inline-flex max-w-full rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em]";

function WireframeWeb({
  title,
  pattern,
  variantIndex,
  chosenAfterTesting = false,
}: {
  title: string;
  pattern: WireframePattern;
  /** 0-based; first and third columns use a disabled look unless this variant is `chosenAfterTesting`. */
  variantIndex: number;
  chosenAfterTesting?: boolean;
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

  /** Agents app chrome — breadcrumbs, search, user (full width). */
  const ShippingAgentsTopBar = () => (
    <g>
      <rect x="20" y="16" width="680" height="36" rx="10" fill={surface} stroke={stroke} />
      <rect x="32" y="28" width="64" height="6" rx="3" fill={muted} />
      <rect x="100" y="28" width="40" height="6" rx="3" fill={muted} opacity="0.45" />
      <rect x="144" y="28" width="32" height="6" rx="3" fill={muted} opacity="0.35" />
      <rect x="268" y="22" width="244" height="24" rx="12" fill="#0b0b0c" stroke={stroke} />
      <rect x="280" y="31" width="160" height="6" rx="3" fill={muted} opacity="0.55" />
      <rect x="604" y="27" width="12" height="14" rx="3" fill={muted} />
      <rect x="626" y="26" width="62" height="16" rx="8" fill={muted} />
    </g>
  );

  /** Sidebar with grouped nav; “New Shipments” highlighted under Operations. */
  const ShippingAgentsSidebar = () => (
    <g>
      <rect x="20" y="64" width="170" height="340" rx="14" fill={surface} stroke={stroke} />
      <rect x="34" y="78" width="72" height="10" rx="4" fill={muted} />
      <text x="34" y="108" fill="#71717a" fontSize="7.5" fontFamily="system-ui, sans-serif" letterSpacing="0.1em">
        MAIN
      </text>
      <rect x="34" y="114" width="142" height="15" rx="7" fill={muted} />
      <rect x="34" y="133" width="142" height="15" rx="7" fill={muted} />
      <text x="34" y="162" fill="#71717a" fontSize="7.5" fontFamily="system-ui, sans-serif" letterSpacing="0.1em">
        OPERATIONS
      </text>
      <rect x="34" y="168" width="142" height="15" rx="7" fill="#152535" stroke={accent} strokeWidth="1" />
      <rect x="34" y="187" width="142" height="15" rx="7" fill={muted} />
      <rect x="34" y="206" width="142" height="15" rx="7" fill={muted} />
      <rect x="34" y="225" width="142" height="15" rx="7" fill={muted} />
      <text x="34" y="254" fill="#71717a" fontSize="7.5" fontFamily="system-ui, sans-serif" letterSpacing="0.1em">
        FINANCIAL
      </text>
      <rect x="34" y="260" width="142" height="15" rx="7" fill={muted} />
      <text x="34" y="289" fill="#71717a" fontSize="7.5" fontFamily="system-ui, sans-serif" letterSpacing="0.1em">
        ACCOUNT
      </text>
      <rect x="34" y="295" width="142" height="15" rx="7" fill={muted} />
      <rect x="34" y="314" width="142" height="15" rx="7" fill={muted} />
    </g>
  );

  /** New Shipment Queue — filter panel + dense table (matches first shipping reference). */
  const ShippingNewQueueTable = () => {
    const rowYs = [222, 246, 270, 294, 318];
    const expedited = [true, false, true, false, true];
    return (
      <g>
        <ShippingAgentsTopBar />
        <ShippingAgentsSidebar />
        <rect x="206" y="64" width="494" height="340" rx="14" fill="#131316" stroke={stroke} />
        <text x="218" y="86" fill="#f4f4f5" fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif">
          New Shipment Queue
        </text>
        <rect x="218" y="92" width="260" height="5" rx="2" fill={muted} opacity="0.4" />
        <rect x="612" y="68" width="24" height="22" rx="6" fill={accent} opacity="0.35" />
        <rect x="638" y="68" width="24" height="22" rx="6" fill={muted} />
        <rect x="218" y="108" width="462" height="78" rx="12" fill="#101012" stroke={stroke} />
        <text x="230" y="124" fill="#71717a" fontSize="7" fontFamily="system-ui, sans-serif" letterSpacing="0.12em">
          PLAN YOUR SHIPMENTS
        </text>
        <rect x="230" y="130" width="188" height="8" rx="2" fill="#d4d4d8" opacity="0.35" />
        <rect x="230" y="144" width="428" height="22" rx="11" fill="#0a0a0c" stroke={stroke} />
        <rect x="242" y="152" width="200" height="6" rx="2" fill={muted} opacity="0.65" />
        <rect x="230" y="172" width="70" height="18" rx="9" fill={muted} />
        <rect x="306" y="172" width="82" height="18" rx="9" fill={muted} />
        <rect x="394" y="172" width="88" height="18" rx="9" fill={muted} />
        <text x="618" y="184" fill={accent} fontSize="8" fontFamily="system-ui, sans-serif">
          Reset
        </text>
        {[
          [218, 38],
          [258, 52],
          [318, 56],
          [382, 52],
          [444, 44],
          [498, 32],
          [542, 36],
        ].map(([cx, cw], hi) => (
          <rect key={hi} x={cx} y="200" width={cw} height="5" rx="2" fill={muted} opacity="0.5" />
        ))}
        {rowYs.map((y, ri) => (
          <g key={ri}>
            <rect x="216" y={y - 14} width="466" height="22" rx="8" fill={surface} stroke={stroke} strokeOpacity="0.65" />
            <rect x="224" y={y - 8} width="14" height="10" rx="2" fill={muted} />
            <rect x="242" y={y - 6} width="28" height="5" rx="2" fill={muted} />
            <rect x="274" y={y - 8} width="56" height="6" rx="2" fill={muted} />
            <rect x="274" y={y - 2} width="44" height="4" rx="2" fill={muted} opacity="0.5" />
            <rect x="338" y={y - 8} width="56" height="6" rx="2" fill={muted} />
            <rect x="338" y={y - 2} width="48" height="4" rx="2" fill={muted} opacity="0.5" />
            <rect
              x="404"
              y={y - 9}
              width="52"
              height="12"
              rx="6"
              fill={expedited[ri] ? "rgba(239,68,68,0.18)" : "rgba(59,130,246,0.15)"}
              stroke={expedited[ri] ? danger : accent}
              strokeOpacity="0.45"
              strokeWidth="0.8"
            />
            <rect x="468" y={y - 6} width="40" height="5" rx="2" fill={muted} />
            <rect x="520" y={y - 6} width="28" height="5" rx="2" fill={muted} />
            <rect x="562" y={y - 8} width="44" height="14" rx="7" fill="none" stroke={accent} strokeWidth="1" />
            <text x="584" y={y - 1} fill={accent} fontSize="7" fontFamily="system-ui, sans-serif" textAnchor="middle">
              Claim
            </text>
          </g>
        ))}
      </g>
    );
  };

  /** Table + right preview column — filter + row styling matches first card. */
  const ShippingNewQueueSplit = () => {
    const expedited = [true, false, true, false];
    const rowBaseY = 222;
    const rowGap = 24;
    return (
      <g>
        <ShippingAgentsTopBar />
        <ShippingAgentsSidebar />
        <rect x="206" y="64" width="494" height="340" rx="14" fill="#131316" stroke={stroke} />
        <text x="218" y="86" fill="#f4f4f5" fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif">
          New Shipment Queue
        </text>
        <rect x="218" y="92" width="260" height="5" rx="2" fill={muted} opacity="0.4" />
        <rect x="612" y="68" width="24" height="22" rx="6" fill={accent} opacity="0.35" />
        <rect x="638" y="68" width="24" height="22" rx="6" fill={muted} />
        <rect x="218" y="108" width="462" height="78" rx="12" fill="#101012" stroke={stroke} />
        <text x="230" y="124" fill="#71717a" fontSize="7" fontFamily="system-ui, sans-serif" letterSpacing="0.12em">
          PLAN YOUR SHIPMENTS
        </text>
        <rect x="230" y="130" width="188" height="8" rx="2" fill="#d4d4d8" opacity="0.35" />
        <rect x="230" y="144" width="428" height="22" rx="11" fill="#0a0a0c" stroke={stroke} />
        <rect x="242" y="152" width="200" height="6" rx="2" fill={muted} opacity="0.65" />
        <rect x="230" y="172" width="70" height="18" rx="9" fill={muted} />
        <rect x="306" y="172" width="82" height="18" rx="9" fill={muted} />
        <rect x="394" y="172" width="88" height="18" rx="9" fill={muted} />
        <text x="618" y="184" fill={accent} fontSize="8" fontFamily="system-ui, sans-serif">
          Reset
        </text>
        <rect x="532" y="196" width="148" height="200" rx="12" fill="#101012" stroke={stroke} />
        <rect x="544" y="210" width="80" height="7" rx="3" fill={muted} />
        <rect x="544" y="224" width="124" height="72" rx="8" fill={muted} opacity="0.4" stroke={stroke} />
        <rect x="544" y="306" width="124" height="6" rx="2" fill={muted} />
        <rect x="544" y="318" width="108" height="5" rx="2" fill={muted} opacity="0.55" />
        <rect x="544" y="330" width="92" height="5" rx="2" fill={muted} opacity="0.45" />
        {[
          [218, 28],
          [254, 40],
          [302, 44],
          [354, 40],
          [404, 36],
          [448, 32],
          [488, 28],
        ].map(([cx, cw], hi) => (
          <rect key={hi} x={cx} y="200" width={cw} height="5" rx="2" fill={muted} opacity="0.5" />
        ))}
        {[0, 1, 2, 3].map((i) => {
          const y = rowBaseY + i * rowGap;
          return (
            <g key={i}>
              <rect
                x="218"
                y={y - 14}
                width="306"
                height="22"
                rx="8"
                fill={surface}
                stroke={stroke}
                strokeOpacity="0.65"
              />
              <rect x="226" y={y - 8} width="14" height="10" rx="2" fill={muted} />
              <rect x="244" y={y - 6} width="28" height="5" rx="2" fill={muted} />
              <rect x="278" y={y - 8} width="52" height="6" rx="2" fill={muted} />
              <rect x="278" y={y - 2} width="40" height="4" rx="2" fill={muted} opacity="0.5" />
              <rect x="338" y={y - 8} width="52" height="6" rx="2" fill={muted} />
              <rect x="338" y={y - 2} width="42" height="4" rx="2" fill={muted} opacity="0.5" />
              <rect
                x="392"
                y={y - 9}
                width="52"
                height="12"
                rx="6"
                fill={expedited[i] ? "rgba(239,68,68,0.18)" : "rgba(59,130,246,0.15)"}
                stroke={expedited[i] ? danger : accent}
                strokeOpacity="0.45"
                strokeWidth="0.8"
              />
              <rect x="452" y={y - 6} width="32" height="5" rx="2" fill={muted} />
              <rect x="490" y={y - 6} width="22" height="5" rx="2" fill={muted} />
              <rect x="498" y={y - 8} width="26" height="14" rx="7" fill="none" stroke={accent} strokeWidth="1" />
              <text x="511" y={y - 1} fill={accent} fontSize="6.5" fontFamily="system-ui, sans-serif" textAnchor="middle">
                Claim
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  /** Portrait scheduling form — reads as label + input fields (viewBox 360×380). */
  const Modal = () => {
    const vbH = 380;
    const x0 = 30;
    const w = 300;
    const h = 322;
    const y0 = (vbH - h) / 2;
    const pad = 20;
    const ix = x0 + pad;
    const iw = w - pad * 2;
    const inH = 36;
    const inRx = 9;
    const inFill = "#0a0a0c";
    const inStroke = "#3a3a42";
    const labelFill = "#9ca3af";
    const ph = "#4b5563";

    const TextInput = ({ y, placeholderW }: { y: number; placeholderW: number }) => (
      <>
        <rect x={ix} y={y} width={iw} height={inH} rx={inRx} fill={inFill} stroke={inStroke} strokeWidth="1" />
        <rect x={ix + 12} y={y + 14} width={placeholderW} height="7" rx="2" fill={ph} opacity="0.85" />
      </>
    );

    const TextArea = ({ y, h: th }: { y: number; h: number }) => (
      <>
        <rect x={ix} y={y} width={iw} height={th} rx={inRx} fill={inFill} stroke={inStroke} strokeWidth="1" />
        <rect x={ix + 12} y={y + 12} width={iw - 36} height="6" rx="2" fill={ph} opacity="0.7" />
        <rect x={ix + 12} y={y + 24} width={iw - 72} height="6" rx="2" fill={ph} opacity="0.45" />
      </>
    );

    const label = (y: number, t: string, required?: boolean) => (
      <text x={ix} y={y} fill={labelFill} fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">
        {t}
        {required ? (
          <tspan fill={accent} fontSize="12">
            {" "}
            *
          </tspan>
        ) : null}
      </text>
    );

    return (
      <g>
        <rect x={x0} y={y0} width={w} height={h} rx="18" fill="#141416" stroke={stroke} strokeWidth="1.5" />
        <rect x={x0 + w - 36} y={y0 + 14} width="18" height="18" rx="4" fill="none" stroke={muted} strokeWidth="1.2" />
        <path
          d={`M ${x0 + w - 30} ${y0 + 20} L ${x0 + w - 22} ${y0 + 28} M ${x0 + w - 22} ${y0 + 20} L ${x0 + w - 30} ${y0 + 28}`}
          stroke="#888"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <text
          x={ix}
          y={y0 + 30}
          fill="#f4f4f5"
          fontSize="13"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Schedule pickup
        </text>
        <rect x={ix} y={y0 + 40} width="210" height="5" rx="2" fill={muted} opacity="0.4" />
        {/* Field 1 */}
        {label(y0 + 62, "Pickup date", true)}
        <TextInput y={y0 + 70} placeholderW={118} />
        {/* Field 2 */}
        {label(y0 + 124, "Time window", true)}
        <TextInput y={y0 + 132} placeholderW={168} />
        {/* Field 3 */}
        {label(y0 + 186, "Notes", false)}
        <TextArea y={y0 + 194} h={52} />
        {/* Footer — extra space above divider; aligned action row; inset primary + bottom padding */}
        <line x1={ix} y1={y0 + 262} x2={x0 + w - pad} y2={y0 + 262} stroke={stroke} strokeOpacity="0.55" strokeWidth="1" />
        <text
          x={ix}
          y={y0 + 294}
          fill="#a1a1aa"
          fontSize="11"
          fontFamily="system-ui, -apple-system, sans-serif"
          dominantBaseline="middle"
        >
          Cancel
        </text>
        <rect
          x={x0 + w - pad - 112 - 6}
          y={y0 + 278}
          width="112"
          height="32"
          rx="10"
          fill={accent}
        />
        <text
          x={x0 + w - pad - 6 - 56}
          y={y0 + 294}
          fill="#ffffff"
          fontSize="10"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          Save schedule
        </text>
      </g>
    );
  };

  /** Portrait bottom sheet: time chips only. viewBox 360×280 (short). */
  const BottomQuickPickBar = () => (
    <g>
      <rect x="16" y="96" width="328" height="148" rx="20" fill="#141416" stroke={stroke} strokeWidth="1.5" />
      <rect x="36" y="118" width="140" height="8" rx="4" fill={muted} />
      {[
        [36, 138],
        [124, 138],
        [212, 138],
        [36, 182],
        [124, 182],
      ].map(([cx, cy], i) => (
        <rect key={i} x={cx} y={cy} width="84" height="30" rx="15" fill={surface} stroke={accent} strokeOpacity="0.45" />
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
        /* Modal only */
        return <Modal />;
      case "scheduleQuick":
        /* Bottom sheet with time chips only */
        return <BottomQuickPickBar />;
      case "schedulePickupWindowModal":
        /* Pickup window cards modal only — selection cycles 1 → 2 → 3 */
        return <AnimatedPickupWindowModal />;
      case "scheduleInline":
        /* Inline editor — focus alternates Date ↔ Window */
        return <AnimatedInlineSchedulePanel />;
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
      case "shippingNewQueueTable":
        return <ShippingNewQueueTable />;
      case "shippingNewQueueGrid":
        return <AnimatedShippingGroupedQueue />;
      case "shippingNewQueueSplit":
        return <ShippingNewQueueSplit />;
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

  const portraitScheduling =
    pattern === "scheduleForm" ||
    pattern === "scheduleQuick" ||
    pattern === "schedulePickupWindowModal" ||
    pattern === "scheduleInline";

  const portraitViewBox = pattern === "scheduleQuick" ? "0 0 360 280" : "0 0 360 380";
  const portraitAspectClass =
    pattern === "scheduleQuick" ? "aspect-[360/280]" : "aspect-[360/380]";

  const isSideSlot = variantIndex === 0 || variantIndex === 2;
  const looksDisabled = isSideSlot && !chosenAfterTesting;

  const cardClass = chosenAfterTesting
    ? "rounded-[22px] border-2 border-emerald-400/45 bg-[#0c1411] p-5 shadow-[0_0_0_1px_rgba(52,211,153,0.12)]"
    : looksDisabled
      ? "rounded-[22px] border border-white/[0.06] bg-[#121213] p-5 opacity-[0.58]"
      : "rounded-[22px] border border-white/10 bg-[#1E1E20] p-5";

  const pillClass = chosenAfterTesting
    ? `${wireframePillBase} border-emerald-400/40 bg-emerald-400/10 text-emerald-200/95`
    : looksDisabled
      ? `${wireframePillBase} border-white/[0.07] bg-transparent text-white/32`
      : `${wireframePillBase} border-white/18 bg-white/[0.06] text-white/88`;

  return (
    <div className={cardClass}>
      <span className={pillClass}>{title}</span>
      <div className="mt-4 flex w-full items-center justify-center">
        <svg
          viewBox={portraitScheduling ? portraitViewBox : "0 0 720 420"}
          className={
            portraitScheduling
              ? `w-full max-w-[260px] h-auto ${portraitAspectClass}`
              : "w-full"
          }
          aria-hidden
        >
          {!portraitScheduling ? (
            <>
              <rect x="10" y="10" width="700" height="400" rx="22" fill={fill} stroke={stroke} strokeWidth="2" />
              <rect x="18" y="18" width="684" height="384" rx="18" fill="#0b0b0c" stroke={stroke} />
            </>
          ) : null}
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
  variants: { name: string; wire: WireframePattern }[];
  /** When set, that variant’s wireframe is highlighted as the tested winner. */
  chosenWire?: WireframePattern;
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
    title: "Pickup windows (form vs cards vs inline)",
    hypothesis:
      "Agents should see several concrete pickup windows that match how they already think about the day (slots they recognize), then pick the window they want for that date and time—without wading through a generic form first.",
    variants: [
      { name: "Full scheduling form", wire: "scheduleForm" },
      { name: "Pickup window cards + confirm", wire: "schedulePickupWindowModal" },
      { name: "Inline scheduling", wire: "scheduleInline" },
    ],
    chosenWire: "schedulePickupWindowModal",
    decision:
      "We shipped the second option—pickup window cards with a confirm step. Agents saw several real windows at once, which matched how they already thought about the day, and could pick the window they wanted for that date and time in one scannable pass. The full form delivered the same data but felt like homework before they saw options; inline scheduling sat on top of the queue and made comparing windows awkward. Cards + confirm stayed fast like a quick pick, with a clear commit—lighter than the form, easier to compare than inline.",
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
  {
    id: "06",
    title: "New shipments surface (flat table vs split vs grouped pickups)",
    hypothesis:
      "Automatic pickup groupings help agents decide what to claim next more efficiently and with less effort, while improving accuracy and confidence compared to scanning a flat queue or juggling a split layout.",
    variants: [
      { name: "Table + plan-your-shipments filters", wire: "shippingNewQueueTable" },
      { name: "Table + route preview column", wire: "shippingNewQueueSplit" },
      { name: "Grouped tables — date vs pickup zones", wire: "shippingNewQueueGrid" },
    ],
    chosenWire: "shippingNewQueueGrid",
    decision:
      "We shipped automatic pickup groupings: grouped tables with a toggle between assigned-date and pickup-zone views. Related shipments sit together, so agents decide what to claim next more efficiently and easily than scanning a flat table or a split-with-preview layout—and with stronger accuracy and confidence in each pick.",
    evidenceChips: [
      "Quote: “[…]”",
      "Claim time: ?s vs ?s",
      "Mis-picks: ? vs ?",
      "n=? sessions",
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
                          title={v.name}
                          pattern={v.wire}
                          variantIndex={i}
                          chosenAfterTesting={e.chosenWire === v.wire}
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

