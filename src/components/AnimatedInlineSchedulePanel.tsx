"use client";

import { useEffect, useState } from "react";

const stroke = "#2f2f33";
const surface = "#151518";
const muted = "#1E1E20";
const accent = "#3b82f6";
const inFill = "#0a0a0c";
const inStroke = "#3a3a42";
const labelFill = "#9ca3af";
const ph = "#4b5563";

const fieldTransition = "stroke 0.4s ease, stroke-width 0.4s ease, fill 0.4s ease";
const labelTransition = "fill 0.35s ease";

export function AnimatedInlineSchedulePanel() {
  const [focusField, setFocusField] = useState<0 | 1>(0);
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
      setFocusField((f) => (f === 0 ? 1 : 0));
    }, 1750);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const active = reduceMotion ? 0 : focusField;

  const vbH = 380;
  const x0 = 30;
  const w = 300;
  const totalH = 322;
  const listTop = (vbH - totalH) / 2;
  const row1H = 36;
  const row2H = 38;
  const rowGap = 8;
  const beforeExpand = 6;
  const expandH = totalH - row1H - rowGap - row2H - beforeExpand;

  const y1 = listTop;
  const y2 = y1 + row1H + rowGap;
  const expandY = y2 + row2H + beforeExpand;
  const expandX = x0 + 10;
  const expandW = w - 20;
  const ix = expandX + 14;
  const colW = 118;
  const colGap = 12;
  const col2 = ix + colW + colGap;
  const inputH = 36;
  const footerBtnY = expandY + expandH - 16 - 32;
  const dividerY = footerBtnY - 22;

  const dateFocused = active === 0;
  const windowFocused = active === 1;

  return (
    <g>
      <rect x={x0} y={y1} width={w} height={row1H} rx="10" fill={surface} stroke={stroke} strokeWidth="1" />
      <rect x={x0 + 14} y={y1 + 14} width="10" height="10" rx="2" fill="none" stroke={muted} strokeWidth="1" />
      <rect x={x0 + 32} y={y1 + 13} width="120" height="8" rx="3" fill={muted} />
      <rect x={x0 + 32} y={y1 + 24} width="180" height="5" rx="2" fill={muted} opacity="0.45" />

      <rect
        x={x0}
        y={y2}
        width={w}
        height={row2H}
        rx="10"
        fill="#16161a"
        stroke={accent}
        strokeWidth="1.5"
      />
      <rect x={x0 + 14} y={y2 + 14} width="10" height="10" rx="2" fill={accent} opacity="0.35" stroke={accent} strokeWidth="1" />
      <rect x={x0 + 32} y={y2 + 12} width="140" height="8" rx="3" fill="#e5e5e5" opacity="0.85" />
      <rect x={x0 + 32} y={y2 + 24} width="100" height="5" rx="2" fill={muted} opacity="0.5" />
      <path
        d={`M ${x0 + w - 22} ${y2 + 15} L ${x0 + w - 16} ${y2 + 21} L ${x0 + w - 22} ${y2 + 27}`}
        fill="none"
        stroke="#888"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <rect
        x={expandX}
        y={expandY}
        width={expandW}
        height={expandH}
        rx="14"
        fill="#121214"
        stroke="#2f2f38"
        strokeWidth="1"
      />
      <rect x={expandX} y={expandY} width="3" height={expandH} fill={accent} opacity="0.5" />

      <text
        x={ix}
        y={expandY + 20}
        fill="#71717a"
        fontSize="9"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="0.06em"
      >
        EDIT IN PLACE
      </text>

      <text
        x={ix}
        y={expandY + 46}
        fill={dateFocused ? "#d4d4d8" : labelFill}
        fontSize="10"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ transition: labelTransition }}
      >
        Date *
      </text>
      <text
        x={col2}
        y={expandY + 46}
        fill={windowFocused ? "#d4d4d8" : labelFill}
        fontSize="10"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{ transition: labelTransition }}
      >
        Window *
      </text>
      <rect
        x={ix}
        y={expandY + 54}
        width={colW}
        height={inputH}
        rx="9"
        fill={dateFocused ? "rgba(59,130,246,0.08)" : inFill}
        stroke={dateFocused ? accent : inStroke}
        strokeWidth={dateFocused ? 2 : 1}
        style={{ transition: fieldTransition }}
      />
      <rect x={ix + 10} y={expandY + 67} width="72" height="7" rx="2" fill={ph} opacity="0.85" />
      <rect
        x={col2}
        y={expandY + 54}
        width={colW}
        height={inputH}
        rx="9"
        fill={windowFocused ? "rgba(59,130,246,0.08)" : inFill}
        stroke={windowFocused ? accent : inStroke}
        strokeWidth={windowFocused ? 2 : 1}
        style={{ transition: fieldTransition }}
      />
      <rect x={col2 + 10} y={expandY + 67} width="88" height="7" rx="2" fill={ph} opacity="0.85" />

      <line
        x1={ix}
        y1={dividerY}
        x2={expandX + expandW - 14}
        y2={dividerY}
        stroke={stroke}
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <text
        x={ix}
        y={footerBtnY + 16}
        fill="#a1a1aa"
        fontSize="11"
        fontFamily="system-ui, -apple-system, sans-serif"
        dominantBaseline="middle"
      >
        Cancel
      </text>
      <rect x={expandX + expandW - 14 - 92 - 6} y={footerBtnY} width="92" height="32" rx="10" fill={accent} />
      <text
        x={expandX + expandW - 14 - 6 - 46}
        y={footerBtnY + 16}
        fill="#ffffff"
        fontSize="10"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        Apply
      </text>
    </g>
  );
}
