"use client";

import Image from "next/image";
import { useState } from "react";

import { AnimatedInlineSchedulePanel } from "@/components/AnimatedInlineSchedulePanel";
import { AnimatedPickupWindowModal } from "@/components/AnimatedPickupWindowModal";
import { AnimatedShippingGroupedQueue } from "@/components/AnimatedShippingGroupedQueue";
import { SchedulingFormWireframeSvg } from "@/components/SchedulingFormWireframeSvg";
import { ShippingNewQueueSplitWireframeSvg } from "@/components/ShippingNewQueueSplitWireframeSvg";
import { ShippingNewQueueTableWireframeSvg } from "@/components/ShippingNewQueueTableWireframeSvg";

const IMG_W = 5119;
const IMG_H = 2845;

/** First accessibility block only — short placeholder strip, no bitmap or caption. */
const COMPACT_PLACEHOLDER_ASPECT = "aspect-[12/5]";

const TABS = [
  {
    label: "Focus Indicators",
    src: "/images/Focus-indicator.png",
    alt: "Accessibility iteration — focus indicators in agent flows",
    body: "Visible focus rings and states so agents always know where they are in the flow — especially in bright or low-contrast field conditions.",
  },
  {
    label: "Keyboard Nav",
    src: "/images/keyboard-nav.png",
    alt: "Accessibility iteration — keyboard navigation in agent flows",
    body: "Full keyboard paths for review, confirm, and exception flows so power users and assistive-tech setups never hit a dead end.",
  },
  {
    label: "ARIA Labels",
    src: "/images/aria-l.png",
    alt: "Accessibility iteration — ARIA labels and screen reader patterns in agent flows",
    body: "Roles, names, and live regions wired for screen readers so grouping summaries and actions announce clearly on VoiceOver and TalkBack.",
  },
] as const;

const pill =
  "pointer-events-none absolute left-2 top-2 z-10 select-none rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.06em] text-white/35 shadow-none backdrop-blur-[6px] md:left-5 md:top-5 md:px-3.5 md:py-2 md:text-[0.68rem]";

const compactPillDimmed =
  "pointer-events-none absolute left-2 top-2 z-10 select-none rounded-full border border-white/[0.07] bg-transparent px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.06em] text-white/32 shadow-none backdrop-blur-[6px] md:left-5 md:top-5 md:px-3.5 md:py-2 md:text-[0.68rem]";

const compactPillChosen =
  "pointer-events-none absolute left-2 top-2 z-10 select-none rounded-full border border-emerald-800/50 bg-emerald-950/45 px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.06em] text-emerald-400/95 shadow-none backdrop-blur-[6px] md:left-5 md:top-5 md:px-3.5 md:py-2 md:text-[0.68rem]";

const btnBase =
  "inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border px-4 py-2.5 text-center text-[0.8125rem] font-medium tracking-[0.02em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:min-w-[9.5rem] sm:px-5";

/** Experiment 03 wireframes — same frame + scale as Micro experiments portrait (360×380). */
const compactSchedulingWireWrap =
  "pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden px-1 pb-3 pt-9 md:px-2 md:pt-11";
const compactSchedulingWireSize =
  "aspect-[360/380] h-auto w-full max-w-[min(100%,320px)]";
/** Experiment 06 first card — landscape 720×420; wider cap than portrait scheduling wireframes. */
const compactClaimShipmentsWireSize =
  "aspect-[720/420] h-auto w-full max-w-[min(100%,420px)]";

export function FluxA11yAccessibilityTabs({
  idPrefix = "flux-a11y",
  hideTabList = false,
  compactCard = false,
  bodyClassName,
  fullWidth = false,
  compactPillLabels,
  compactChosenIndex,
  compactStripVariant = "scheduling",
  compactRegionLabel,
}: {
  idPrefix?: string;
  hideTabList?: boolean;
  /** When true (first Flux accessibility block only): no image, no bottom caption, shorter frame. */
  compactCard?: boolean;
  /** Caption under the image; used when `compactCard` is false. */
  bodyClassName?: string;
  /** When true, span the parent column (no max-w-[96%] / horizontal centering). */
  fullWidth?: boolean;
  /** When set with `compactCard` + `hideTabList`, overrides the three card pill captions. */
  compactPillLabels?: readonly [string, string, string];
  /** With `compactPillLabels`, highlights one card as chosen (e.g. experiment 03 shipped variant). */
  compactChosenIndex?: 0 | 1 | 2;
  /** `claimShipments`: experiment 06 wireframes — table, split + preview column, grouped queue (animated). */
  compactStripVariant?: "scheduling" | "claimShipments";
  /** Overrides default region label when using `compactPillLabels`. */
  compactRegionLabel?: string;
}) {
  const [active, setActive] = useState(0);

  const tab = TABS[hideTabList ? 0 : active]!;

  const panelId = `${idPrefix}-panel`;

  /** Match `experimentMediaGap` (mt-8) between copy and cards on Flux case study */
  const rootClass = fullWidth
    ? "flex w-full flex-col gap-8"
    : "flex w-full max-w-[96%] flex-col items-center gap-8";

  return (
    <div className={rootClass}>
      {compactCard && hideTabList ? (
        <div
          role="region"
          id={panelId}
          aria-label={
            compactPillLabels
              ? (compactRegionLabel ?? "Pickup scheduling iterations")
              : "Accessibility design experiments"
          }
          className="flex w-full flex-col gap-3 md:flex-row md:gap-4 md:aspect-[12/3.5]"
        >
          {TABS.map((t, i) => {
            const pillText = compactPillLabels?.[i] ?? t.label;
            const claimShipmentsFirst =
              Boolean(compactPillLabels && i === 0 && compactStripVariant === "claimShipments");
            const claimShipmentsSecond =
              Boolean(compactPillLabels && i === 1 && compactStripVariant === "claimShipments");
            const claimShipmentsThird =
              Boolean(compactPillLabels && i === 2 && compactStripVariant === "claimShipments");
            const schedulingFormWire = Boolean(
              compactPillLabels && i === 0 && compactStripVariant === "scheduling",
            );
            const pickupWindowWire = Boolean(
              compactPillLabels && i === 1 && compactStripVariant === "scheduling",
            );
            const inlineScheduleWire = Boolean(
              compactPillLabels && i === 2 && compactStripVariant === "scheduling",
            );
            const hasPick = compactPillLabels && compactChosenIndex !== undefined;
            const isChosen = hasPick && i === compactChosenIndex;
            const isDimmed = hasPick && i !== compactChosenIndex;
            const cardShell =
              isChosen
                ? "relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[28px] border-2 border-emerald-800/55 bg-[#0a1411] shadow-[0_0_0_1px_rgba(6,95,70,0.35)] max-md:w-full max-md:h-[460px] max-md:max-w-[420px] max-md:mx-auto"
                : isDimmed
                  ? "relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#121213] opacity-[0.58] max-md:w-full max-md:h-[460px] max-md:max-w-[420px] max-md:mx-auto"
                  : "relative min-h-0 min-w-0 flex-1 overflow-hidden rounded-[28px] border border-white/10 max-md:w-full max-md:h-[460px] max-md:max-w-[420px] max-md:mx-auto";
            const pillClass = isChosen ? compactPillChosen : isDimmed ? compactPillDimmed : pill;
            return (
              <div key={pillText} className={cardShell}>
                <div className="absolute inset-0 bg-white/[0.03]" aria-hidden />
                {claimShipmentsFirst ? (
                  <div className={compactSchedulingWireWrap}>
                    <ShippingNewQueueTableWireframeSvg className={compactClaimShipmentsWireSize} />
                  </div>
                ) : claimShipmentsSecond ? (
                  <div className={compactSchedulingWireWrap}>
                    <ShippingNewQueueSplitWireframeSvg className={compactClaimShipmentsWireSize} />
                  </div>
                ) : claimShipmentsThird ? (
                  <div className={compactSchedulingWireWrap}>
                    <svg
                      viewBox="0 0 720 420"
                      className={compactClaimShipmentsWireSize}
                      aria-hidden
                    >
                      <rect
                        x="10"
                        y="10"
                        width="700"
                        height="400"
                        rx="22"
                        fill="#0D0D0E"
                        stroke="#2f2f33"
                        strokeWidth="2"
                      />
                      <rect
                        x="18"
                        y="18"
                        width="684"
                        height="384"
                        rx="18"
                        fill="#0b0b0c"
                        stroke="#2f2f33"
                      />
                      <AnimatedShippingGroupedQueue />
                    </svg>
                  </div>
                ) : schedulingFormWire ? (
                  <div className={compactSchedulingWireWrap}>
                    <SchedulingFormWireframeSvg className={compactSchedulingWireSize} />
                  </div>
                ) : pickupWindowWire ? (
                  <div className={compactSchedulingWireWrap}>
                    <svg
                      viewBox="0 0 360 380"
                      className={compactSchedulingWireSize}
                      aria-hidden
                    >
                      <AnimatedPickupWindowModal />
                    </svg>
                  </div>
                ) : inlineScheduleWire ? (
                  <div className={compactSchedulingWireWrap}>
                    <svg
                      viewBox="0 0 360 380"
                      className={compactSchedulingWireSize}
                      aria-hidden
                    >
                      <AnimatedInlineSchedulePanel />
                    </svg>
                  </div>
                ) : null}
                <span className="sr-only">
                  {compactPillLabels
                    ? `${claimShipmentsFirst
                        ? `${pillText}. New Shipment Queue wireframe with plan-your-shipments filters and claim rows.`
                        : claimShipmentsSecond
                          ? `${pillText}. New Shipment Queue with table and route preview column.`
                          : claimShipmentsThird
                            ? `${pillText}. Grouped shipment queue wireframe: toggle between assigned date and pickup zones.`
                            : schedulingFormWire
                              ? `${pillText}. Full scheduling form wireframe: Schedule pickup modal with pickup date, time window, notes, and save schedule.`
                              : pickupWindowWire
                                ? `${pillText}. Pickup window cards wireframe: modal with selectable windows, confirm and claim.`
                                : inlineScheduleWire
                                  ? `${pillText}. Inline scheduling wireframe: edit-in-place panel with date and window fields, apply and cancel.`
                                  : pillText}${isChosen ? " Shipped after testing." : ""}`
                    : `${t.alt} ${t.body}`}
                </span>
                <span className={pillClass} aria-hidden>
                  {pillText}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
      <div
        role={hideTabList ? "region" : "tabpanel"}
        id={panelId}
        aria-label={hideTabList ? tab.label : undefined}
        aria-labelledby={hideTabList ? undefined : `${idPrefix}-tab-${active}`}
        className="relative w-full overflow-hidden rounded-[28px] border border-white/10"
      >
        {compactCard ? (
          <>
            <div
              className={`relative w-full ${COMPACT_PLACEHOLDER_ASPECT} bg-white/[0.03]`}
              aria-hidden
            />
            <span className="sr-only">
              {tab.alt} {tab.body}
            </span>
          </>
        ) : (
          <>
            <Image
              key={tab.src}
              src={tab.src}
              alt={tab.alt}
              width={IMG_W}
              height={IMG_H}
              className="h-auto w-full"
              sizes="(max-width: 768px) 96vw, min(96vw, 1400px)"
              unoptimized
            />
            <div className="absolute inset-x-0 bottom-6 z-[11] px-5 pb-5 pt-8 md:bottom-8 md:px-8 md:pb-7 md:pt-10">
              <p className={`${bodyClassName ?? "text-[0.958rem] leading-relaxed text-white/75"} mx-auto max-w-2xl text-center`}>
                {tab.body}
              </p>
            </div>
          </>
        )}
        <span className={pill} aria-hidden>
          {tab.label}
        </span>
      </div>
      )}

      {!hideTabList ? (
        <div
          role="tablist"
          aria-label="Accessibility topics"
          className="flex w-full flex-wrap items-center justify-center gap-3"
        >
          {TABS.map((t, i) => {
            const isOn = i === active;
            return (
              <button
                key={t.label}
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${i}`}
                aria-selected={isOn}
                aria-controls={panelId}
                tabIndex={0}
                className={
                  isOn
                    ? `${btnBase} border-white/30 bg-white/[0.12] text-white/90`
                    : `${btnBase} border-white/15 bg-white/[0.05] text-white/70 hover:bg-white/10 hover:text-white/90`
                }
                onClick={() => setActive(i)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
