"use client";

import { useLayoutEffect, useRef, useState } from "react";

const CALLOUTS = [
  {
    id: "1",
    label: "Focus Indicators",
    body: "Visible focus rings and states so agents always know where they are in the flow — especially in bright or low-contrast field conditions.",
  },
  {
    id: "2",
    label: "Keyboard Nav",
    body: "Full keyboard paths for review, confirm, and exception flows so power users and assistive-tech setups never hit a dead end.",
  },
  {
    id: "3",
    label: "ARIA Labels",
    body: "Roles, names, and live regions wired for screen readers so grouping summaries and actions announce clearly on VoiceOver and TalkBack.",
  },
] as const;

const morphEase = "cubic-bezier(0.22, 1, 0.36, 1)";
const morphMs = 480;

type Item = (typeof CALLOUTS)[number];

function A11yCalloutButton({
  item,
  open,
  onToggle,
}: {
  item: Item;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pillMaxPx, setPillMaxPx] = useState<number | null>(null);

  // Measure only the pill strip (icon + label). Body is w-0 when closed so it cannot widen scrollWidth.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || open) return;

    const measure = () => {
      setPillMaxPx(Math.ceil(el.getBoundingClientRect().width));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open, item.label]);

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      onClick={onToggle}
      style={{
        maxWidth: open ? "100%" : pillMaxPx != null ? `${pillMaxPx}px` : undefined,
        transitionProperty: "max-width, min-height, border-radius, padding, background-color",
        transitionDuration: `${morphMs}ms`,
        transitionTimingFunction: morphEase,
      }}
      className={`pointer-events-auto flex flex-col overflow-hidden border-0 font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 ${
        open ? "text-left" : "text-center"
      } ${
        open
          ? "w-full min-h-[10.5rem] justify-start rounded-2xl bg-[#000000] p-4 pr-8 shadow-none sm:min-h-[11rem] sm:p-5 sm:pr-8 [background-image:none]"
          : "w-max max-w-full min-h-[3.25rem] shrink-0 justify-center rounded-[28px] bg-[#000000] pl-3 pr-8 py-3 shadow-none sm:min-h-14 sm:pl-4 sm:pr-8 [background-image:none]"
      }`}
    >
      {/* Row 1: only icon + label — this width drives pill size when closed */}
      <div
        className={`flex min-h-0 items-center gap-0.5 sm:gap-1 ${
          open ? "w-full min-w-0 justify-start" : "mx-auto w-max justify-center"
        }`}
      >
        <span
          style={{
            transition: `transform ${morphMs}ms ${morphEase}, background-color ${morphMs}ms ${morphEase}`,
          }}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg leading-none text-white [background-image:none] ${
            open ? "rotate-45 bg-[#000000]" : "bg-[#000000]"
          }`}
          aria-hidden
        >
          +
        </span>
        <p
          className={`min-w-0 text-[0.78rem] sm:text-[0.85rem] ${open ? "font-semibold text-white" : "whitespace-nowrap font-medium text-white/95"}`}
        >
          {item.label}
        </p>
      </div>

      {/* Row 2: body — zero horizontal footprint when closed so each pill width = label + icon + padding */}
      <div
        style={{
          transitionProperty: "max-height, opacity, margin-top, width",
          transitionDuration: `${morphMs}ms`,
          transitionTimingFunction: morphEase,
        }}
        className={
          open
            ? "mt-2 w-full min-w-0 max-h-[8rem] overflow-hidden opacity-100 sm:max-h-[9rem]"
            : "m-0 max-h-0 w-0 min-w-0 max-w-0 overflow-hidden opacity-0"
        }
      >
        <p
          className={`text-[0.78rem] leading-relaxed font-normal text-white/75 sm:text-[0.82rem] ${open ? "text-left" : "text-center"}`}
        >
          {item.body}
        </p>
      </div>
    </button>
  );
}

export function A11yImageCallouts({
  onSelect,
  placement = "overlay",
}: {
  onSelect?: (id: string | null) => void;
  placement?: "overlay" | "inline";
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div
      className={
        placement === "overlay"
          ? "pointer-events-none absolute inset-0 flex items-center justify-start p-0"
          : "flex items-start justify-start"
      }
    >
      <div
        className={
          placement === "overlay"
            ? "ml-0 flex w-full max-w-[min(24rem,90%)] flex-col items-start gap-2 sm:ml-0 sm:gap-3 md:max-w-[min(26rem,88%)] md:ml-0"
            : "flex w-full flex-col items-start gap-2 sm:gap-3"
        }
      >
        {CALLOUTS.map((item) => {
          const open = openId === item.id;
          return (
            <A11yCalloutButton
              key={item.id}
              item={item}
              open={open}
              onToggle={() => {
                const next = open ? null : item.id;
                setOpenId(next);
                onSelect?.(next);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
