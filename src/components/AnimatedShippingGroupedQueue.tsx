"use client";

import { useEffect, useState } from "react";

const stroke = "#2f2f33";
const surface = "#151518";
const muted = "#1E1E20";
const accent = "#3b82f6";
const danger = "#ef4444";

const tabTransition = "fill 0.35s ease, opacity 0.35s ease";
const underlineTransition = "opacity 0.35s ease";

function ShippingAgentsTopBar() {
  return (
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
}

function ShippingAgentsSidebar() {
  return (
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
}

type PriorityKind = "low" | "standard" | "expedited";

function TableRow({
  y,
  priority,
}: {
  y: number;
  priority: PriorityKind;
}) {
  const pill =
    priority === "low" ? (
      <rect x="392" y={y - 9} width="36" height="12" rx="6" fill="none" stroke="#6b7280" strokeWidth="0.9" opacity="0.9" />
    ) : priority === "standard" ? (
      <rect
        x="392"
        y={y - 9}
        width="48"
        height="12"
        rx="6"
        fill="rgba(59,130,246,0.2)"
        stroke={accent}
        strokeOpacity="0.5"
        strokeWidth="0.8"
      />
    ) : (
      <rect
        x="392"
        y={y - 9}
        width="52"
        height="12"
        rx="6"
        fill="rgba(239,68,68,0.15)"
        stroke={danger}
        strokeOpacity="0.45"
        strokeWidth="0.8"
      />
    );

  return (
    <g>
      <rect x="224" y={y - 14} width="452" height="22" rx="8" fill={surface} stroke={stroke} strokeOpacity="0.55" />
      <rect x="232" y={y - 8} width="12" height="10" rx="2" fill={muted} />
      <rect x="248" y={y - 6} width="26" height="5" rx="2" fill={muted} />
      <rect x="282" y={y - 8} width="52" height="5" rx="2" fill={muted} />
      <rect x="282" y={y - 2} width="40" height="4" rx="2" fill={muted} opacity="0.5" />
      <rect x="342" y={y - 8} width="52" height="5" rx="2" fill={muted} />
      <rect x="342" y={y - 2} width="44" height="4" rx="2" fill={muted} opacity="0.5" />
      {pill}
      <rect x="452" y={y - 6} width="36" height="5" rx="2" fill={muted} />
      <rect x="498" y={y - 6} width="26" height="5" rx="2" fill={muted} />
      <rect x="538" y={y - 8} width="40" height="14" rx="7" fill="none" stroke={accent} strokeWidth="1" />
      <text x="558" y={y - 1} fill={accent} fontSize="6.5" fontFamily="system-ui, sans-serif" textAnchor="middle">
        Claim
      </text>
    </g>
  );
}

function GroupedSectionCard({
  cardY,
  title,
  p0,
  p1,
}: {
  cardY: number;
  title: string;
  p0: PriorityKind;
  p1: PriorityKind;
}) {
  return (
    <g>
      <rect x="218" y={cardY} width="458" height="86" rx="11" fill="#101012" stroke={stroke} strokeOpacity="0.9" />
      <text x="230" y={cardY + 14} fill="#e4e4e7" fontSize="8" fontWeight="600" fontFamily="system-ui, sans-serif">
        {title}
      </text>
      {[
        [228, 32],
        [268, 44],
        [320, 48],
        [376, 44],
        [432, 36],
        [476, 32],
        [514, 28],
        [552, 32],
      ].map(([cx, cw], i) => (
        <rect key={i} x={cx} y={cardY + 22} width={cw} height="4" rx="2" fill={muted} opacity="0.45" />
      ))}
      <TableRow y={cardY + 48} priority={p0} />
      <TableRow y={cardY + 72} priority={p1} />
    </g>
  );
}

export function AnimatedShippingGroupedQueue() {
  const [groupByDate, setGroupByDate] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(Boolean(mq.matches));
    onChange();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setGroupByDate((d) => !d);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const byDate = reduceMotion ? true : groupByDate;
  const dateTabActive = byDate;

  return (
    <g>
      <ShippingAgentsTopBar />
      <ShippingAgentsSidebar />
      <rect x="206" y="64" width="494" height="340" rx="14" fill="#131316" stroke={stroke} />

      <text x="218" y="86" fill="#f4f4f5" fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif">
        New Shipment Queue
      </text>
      <rect x="218" y="90" width="300" height="4" rx="2" fill={muted} opacity="0.35" />
      <rect x="218" y="97" width="240" height="4" rx="2" fill={muted} opacity="0.28" />

      <rect x="612" y="72" width="22" height="20" rx="5" fill={accent} opacity="0.32" />
      <rect x="638" y="72" width="22" height="20" rx="5" fill={muted} />

      <text
        x="218"
        y="118"
        fill={dateTabActive ? accent : "#71717a"}
        fontSize="7.5"
        fontWeight={dateTabActive ? "600" : "400"}
        fontFamily="system-ui, sans-serif"
        style={{ transition: tabTransition }}
      >
        Group by Assigned Date
      </text>
      <rect x="338" y="110" width="1" height="12" fill={muted} opacity="0.5" />
      <text
        x="346"
        y="118"
        fill={!dateTabActive ? accent : "#71717a"}
        fontSize="7.5"
        fontWeight={!dateTabActive ? "600" : "400"}
        fontFamily="system-ui, sans-serif"
        style={{ transition: tabTransition }}
      >
        Group by Pickup Zones
      </text>
      <rect
        x="218"
        y="122"
        width="118"
        height="2"
        rx="1"
        fill={accent}
        opacity={dateTabActive ? 0.85 : 0}
        style={{ transition: underlineTransition }}
      />
      <rect
        x="346"
        y="122"
        width="112"
        height="2"
        rx="1"
        fill={accent}
        opacity={!dateTabActive ? 0.85 : 0}
        style={{ transition: underlineTransition }}
      />

      <text x="218" y="136" fill="#71717a" fontSize="6" fontFamily="system-ui, sans-serif">
        Requests stay in queue order—the oldest in each group is offered first.
      </text>

      {byDate ? (
        <>
          <GroupedSectionCard cardY={146} title="Posted on November 2, 2025" p0="low" p1="standard" />
          <GroupedSectionCard cardY={244} title="Posted on November 3, 2025" p0="standard" p1="low" />
        </>
      ) : (
        <>
          <GroupedSectionCard cardY={146} title="Zone: Northeast corridor" p0="standard" p1="low" />
          <GroupedSectionCard cardY={244} title="Zone: Great Lakes" p0="low" p1="standard" />
        </>
      )}
    </g>
  );
}
