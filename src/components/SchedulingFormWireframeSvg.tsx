/**
 * Experiment 03 — first variant (“Full scheduling form”) from Micro experiments.
 * Portrait scheduling modal wireframe only (same SVG as `scheduleForm` in WireframeWeb).
 */
export function SchedulingFormWireframeSvg({ className }: { className?: string }) {
  const stroke = "#2f2f33";
  const muted = "#1E1E20";
  const accent = "#3b82f6";
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

  const fieldLabel = (y: number, t: string, required?: boolean) => (
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
    <svg
      viewBox="0 0 360 380"
      className={className}
      aria-hidden
    >
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
          fill="rgba(255,255,255,0.4)"
          fontSize="13"
          fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          Schedule pickup
        </text>
        <rect x={ix} y={y0 + 40} width="210" height="5" rx="2" fill={muted} opacity="0.4" />
        {fieldLabel(y0 + 62, "Pickup date", true)}
        <TextInput y={y0 + 70} placeholderW={118} />
        {fieldLabel(y0 + 124, "Time window", true)}
        <TextInput y={y0 + 132} placeholderW={168} />
        {fieldLabel(y0 + 186, "Notes", false)}
        <TextArea y={y0 + 194} h={52} />
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
    </svg>
  );
}
