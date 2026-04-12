"use client";

import { useEffect, useState } from "react";

const stroke = "#2f2f33";
const surface = "#151518";
const muted = "#1E1E20";
const accent = "#3b82f6";

const slotTransition = "fill 0.45s ease, stroke 0.45s ease, stroke-width 0.45s ease";
const checkTransition = "opacity 0.4s ease";

export function AnimatedPickupWindowModal() {
  const [selected, setSelected] = useState(0);
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
      setSelected((s) => (s + 1) % 3);
    }, 1900);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const mw = 320;
  const mh = 318;
  const vbW = 360;
  const vbH = 380;
  const mx = (vbW - mw) / 2;
  const my = (vbH - mh) / 2;
  const active = reduceMotion ? 1 : selected;

  return (
    <g>
      <rect x={mx} y={my} width={mw} height={mh} rx="18" fill="#141416" stroke={stroke} strokeWidth="1.5" />
      <rect x={mx + mw - 36} y={my + 14} width="18" height="18" rx="4" fill="none" stroke={muted} strokeWidth="1.2" />
      <path
        d={`M ${mx + mw - 30} ${my + 20} L ${mx + mw - 22} ${my + 28} M ${mx + mw - 22} ${my + 20} L ${mx + mw - 30} ${my + 28}`}
        stroke="#888"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <rect x={mx + 20} y={my + 18} width="200" height="11" rx="3" fill="#e5e5e5" opacity="0.9" />
      <rect x={mx + 20} y={my + 44} width="160" height="9" rx="3" fill={muted} />
      <rect x={mx + 20} y={my + 58} width="260" height="6" rx="3" fill={muted} opacity="0.65" />
      <rect x={mx + 20} y={my + 68} width="240" height="6" rx="3" fill={muted} opacity="0.5" />
      {[0, 1, 2].map((i) => {
        const cy = my + 78 + i * 52;
        const isSel = i === active;
        return (
          <g key={i}>
            <rect
              x={mx + 16}
              y={cy}
              width={mw - 32}
              height="46"
              rx="11"
              fill={isSel ? "rgba(59,130,246,0.12)" : surface}
              stroke={isSel ? accent : stroke}
              strokeWidth={isSel ? 2 : 1}
              style={{ transition: slotTransition }}
            />
            <rect x={mx + 28} y={cy + 12} width="120" height="8" rx="3" fill={muted} />
            <rect x={mx + 28} y={cy + 26} width="180" height="7" rx="3" fill={muted} opacity="0.8" />
            <g style={{ opacity: isSel ? 1 : 0, transition: checkTransition, pointerEvents: "none" }}>
              <circle cx={mx + mw - 36} cy={cy + 23} r="10" fill={accent} />
              <path
                d={`M ${mx + mw - 41} ${cy + 23} l 3 3 6 -8`}
                fill="none"
                stroke="#fff"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        );
      })}
      <rect x={mx + 20} y={my + 238} width="260" height="6" rx="3" fill={muted} opacity="0.55" />
      <text x={mx + 24} y={my + 278} fill="#a1a1aa" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">
        Cancel
      </text>
      <rect x={mx + mw - 148} y={my + 260} width="132" height="32" rx="10" fill={accent} />
      <text
        x={mx + mw - 82}
        y={my + 281}
        fill="#ffffff"
        fontSize="10"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
        textAnchor="middle"
      >
        Confirm &amp; claim
      </text>
    </g>
  );
}
