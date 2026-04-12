/**
 * Experiment 06 — first variant (“Table + plan-your-shipments filters”) from Micro experiments.
 * Same SVG as `shippingNewQueueTable` in WireframeWeb (720×420 + app chrome).
 */
export function ShippingNewQueueTableWireframeSvg({ className }: { className?: string }) {
  const stroke = "#2f2f33";
  const fill = "#0D0D0E";
  const surface = "#151518";
  const muted = "#1E1E20";
  const accent = "#3b82f6";
  const danger = "#ef4444";

  const rowYs = [222, 246, 270, 294, 318];
  const expedited = [true, false, true, false, true];

  return (
    <svg viewBox="0 0 720 420" className={className} aria-hidden>
      <rect x="10" y="10" width="700" height="400" rx="22" fill={fill} stroke={stroke} strokeWidth="2" />
      <rect x="18" y="18" width="684" height="384" rx="18" fill="#0b0b0c" stroke={stroke} />
      <g>
        <rect x="20" y="16" width="680" height="36" rx="10" fill={surface} stroke={stroke} />
        <rect x="32" y="28" width="64" height="6" rx="3" fill={muted} />
        <rect x="100" y="28" width="40" height="6" rx="3" fill={muted} opacity="0.45" />
        <rect x="144" y="28" width="32" height="6" rx="3" fill={muted} opacity="0.35" />
        <rect x="268" y="22" width="244" height="24" rx="12" fill="#0b0b0c" stroke={stroke} />
        <rect x="280" y="31" width="160" height="6" rx="3" fill={muted} opacity="0.55" />
        <rect x="604" y="27" width="12" height="14" rx="3" fill={muted} />
        <rect x="626" y="26" width="62" height="16" rx="8" fill={muted} />

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
    </svg>
  );
}
