import Image from "next/image";

import { AnimatedGoalsList } from "@/components/AnimatedGoalsList";
import { FluxA11yAccessibilityTabs } from "@/components/FluxA11yAccessibilityTabs";

export const metadata = {
  title: "Flux Agents",
  description: "Case study: designing confident decisions under uncertainty.",
};

function DashStyleMediaCard({
  alt,
  src = "/gifs/dash.gif",
}: {
  alt: string;
  src?: string;
}) {
  return (
    <div className="w-full flex-shrink-0 rounded-[28px] bg-[#1E1E20] border border-white/10 px-3 py-6 md:px-4 md:py-10 min-h-[720px] md:min-h-[820px] flex flex-col justify-center">
      <div className="flex w-full justify-center">
        <div
          role="img"
          aria-label={alt}
          className="h-[640px] w-[min(100%,1076px)] shrink-0 overflow-hidden rounded-[16px] bg-black bg-contain bg-center bg-no-repeat sm:w-[1076px]"
          style={{ backgroundImage: `url(${JSON.stringify(src)})` }}
        />
      </div>
    </div>
  );
}

/** Light-theme tokens matching NASA layout rhythm, inverted from dark NASA page */
const label = "text-base font-medium tracking-[0.12em] text-white/75";
const body = "text-[0.958rem] leading-relaxed text-white/75";
const bodyMuted = "text-[0.958rem] leading-relaxed text-white/75";
const card = "w-full rounded-[28px] bg-[#1E1E20] p-6 md:p-8 border border-white/10";
const h3 = "text-[1.5rem] font-medium tracking-[0.02em] text-white/75";
/** Design Experiments + Advocating — shared section rhythm (Goals / Challenge alignment) */
const experimentSectionTitle =
  "text-left mb-8 text-[32px] font-normal leading-tight tracking-[0.03em] text-white/40 md:mb-10";
const experimentContentWidth = "mx-auto w-full max-w-[96%] text-left";
const experimentTextStack = "flex flex-col gap-4";
const experimentSubtitle =
  "text-left text-[1.25rem] font-medium tracking-[0.02em] text-white/75";
const experimentBody =
  "max-w-2xl text-left text-[0.958rem] leading-relaxed text-white/40";
const experimentMediaGap = "mt-8 w-full";
const experimentBlockGap = "mt-16 w-full md:mt-24";

/** Scheduling pickups / Update shipment — equal-height card shells; GIF stays 528px, copy lives inside */
const twinShipCardShell =
  "relative flex w-full min-h-[760px] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#1E1E20] p-3 md:p-4";
/** GIF + caption stacked; `justify-center` centers the pair; caption offset uses `experimentMediaGap` like WCAG block */
const twinShipCardBody =
  "flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-0 self-stretch";
/** Same `mt-8` as copy → card under “Designed to meet WCAG 2.1 AA standards” */
const twinShipCaptionRail = `${experimentMediaGap} max-w-[min(100%,398px)] shrink-0 sm:max-w-[398px]`;
const twinShipCaptionRailWide = `${experimentMediaGap} max-w-[min(100%,515px)] shrink-0 sm:max-w-[515px]`;
const twinShipCaptionCopy = "w-full text-left";

/** Matches `FluxA11yAccessibilityTabs` image panel pill (WCAG card) */
const twinShipMediaPill =
  "pointer-events-none absolute left-3 top-3 z-10 select-none rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.06em] text-white/35 shadow-none backdrop-blur-[6px] md:left-5 md:top-5 md:px-3.5 md:py-2 md:text-[0.68rem]";

export default function FluxPage() {
  return (
    <div data-flux-page className="relative w-full bg-black text-white/75">
      {/* Hero — full-viewport placeholder (matches NASA height less fixed header) */}
      <section className="relative w-full h-[calc(100dvh-7rem)] max-h-[calc(100dvh-7rem)] overflow-hidden bg-black">
        <div className="mx-[9px] px-5 h-full">
          <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-black">
            <Image
              src="/images/Dash2.png"
              alt="Flux Agents — hero interface"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* Case study — NASA grid */}
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full">
          <div className="grid w-full grid-cols-12 gap-lg text-left mt-[56px]">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <div className="pb-[40px]">
                    <h2 className="text-[2rem] font-medium tracking-[0.02em] leading-tight text-white/75">
                      Flux Agents
                    </h2>
                    <p className="mt-3 text-white/40">Logistics agent product</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <div className="mt-2 md:mt-0 pb-[60px]">
                    <p className="max-w-2xl text-white/75">
                      Flux Logistics is a small but growing company offering alternative door-to-door shipping
                      from the U.S. to Ghana. The work focused on helping field agents plan pickups and
                      commitments with less cognitive load and fewer coordination mistakes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-1 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role & meta — NASA grid; column width follows content (max-content) */}
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]" />
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <div className="flex flex-col gap-lg md:flex-row md:flex-wrap md:gap-x-2xl md:gap-y-lg">
                <div className="w-full md:w-max md:max-w-full md:flex-none md:shrink-0">
                  <div className="pb-[20px]">
                    <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white/40">
                      Responsibilities
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className={body}>UX Research</p>
                    <p className={body}>UI Design</p>
                    <p className={body}>Iterative Prototyping </p>
                  </div>
                </div>
                <div className="w-full md:w-max md:max-w-full md:flex-none md:shrink-0">
                  <div className="pb-[20px]">
                    <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white/40">
                      Tools
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className={body}>Figma</p>
                    <p className={body}>Miro</p>
                    <p className={body}>Lighthouse</p>
                  </div>
                </div>
                <div className="w-full md:w-max md:max-w-full md:flex-none md:shrink-0">
                  <div className="pb-[20px]">
                    <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white/40">
                      Teams
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className={body}>3 UX Designers</p>
                    <p className={body}>2 Engineers</p>
                    <p className={body}>1 Product Manager</p>
                  </div>
                </div>
                <div className="w-full md:w-max md:max-w-full md:flex-none md:shrink-0">
                  <div className="pb-[20px]">
                    <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white/40">
                      Platforms
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className={`${bodyMuted} font-medium`}>Web · Mobile</p>
                    <p className={`${body} font-medium`}>Jan 2026</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section>

      {/* Context / overview — Challenge (left offset matches Findings grid) */}
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full pb-16 pt-16 md:pb-20 md:pt-20">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]" />
            <div className="col-span-12 border-t border-white/10 px-[10px] pb-8 pt-16 md:col-span-6 md:pb-10 md:pt-20">
              <div className="flex flex-col gap-4">
                <h4 className="text-[1.25rem] font-medium tracking-[0.02em] text-white/40">
                  The Challenge
                </h4>
                <p className={body}>
                  The core issue wasn&apos;t digitizing pickups it was supporting high stakes
                  decisions with incomplete context. Agents were committing to routes while
                  juggling WhatsApp threads, phone calls, and mental maps of distance, capacity,
                  and timing leading to avoidable conflicts and coordination churn.
                </p>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section>


      {/* Findings — NASA pain points grid */}
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="w-full" />
            </div>
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <div className="flex flex-col gap-4">
                <h4 className="text-[1.25rem] font-medium tracking-[0.02em] text-white/40">Findings</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  {
                    n: "01",
                    h6: "Decision overload",
                    d: "Agents accepted routes without a reliable view of distance, time windows, and conflicts.",
                  },
                  {
                    n: "02",
                    h6: "Capacity blindness",
                    d: "No quick way to see workload across the day, causing missed or overbooked commitments.",
                  },
                  {
                    n: "03",
                    h6: "Communication gap",
                    d: "Updates were reactive; missed calls and unclear ownership reduced trust with customers.",
                  },
                  {
                    n: "04",
                    h6: "Constraints",
                    d: "The solution had to be low-friction, fast on mobile, and usable with minimal training.",
                  },
                ].map((x) => (
                  <div
                    key={x.h6}
                    className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.35)]"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/15 bg-white/10"
                        aria-hidden
                      >
                        <span className="text-[0.78rem] font-semibold tracking-[0.12em] text-white/75">
                          {x.n}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h6 className="text-[1rem] font-medium tracking-[0.02em] text-white/75">
                          {x.h6}
                        </h6>
                        <p className="mt-2 text-[0.92rem] leading-relaxed text-white/40">{x.d}</p>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </div>

              <div className="mt-24 flex flex-col gap-4 pb-8 md:mt-[7.5rem] md:pb-10">
                <h4 className="text-[1.25rem] font-medium tracking-[0.02em] text-white/40">
                  Goals
                </h4>
                <AnimatedGoalsList
                  bodyClassName={body}
                  goals={[
                    "Reduce cognitive load at the moment of decision.",
                    "Help agents assess feasibility without relying on memory.",
                    "Improve coordination and transparency from agents.",
                  ]}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section>

      {/* Gradient blend: black → #0D0D0E (after Goals, matches NASA case study) */}
      <div
        className="h-32 w-full shrink-0"
        style={{ background: "linear-gradient(to bottom, #000000, #0D0D0E)" }}
        aria-hidden
      />

      {/* Accessibility — two landmark sections, one continuous charcoal field */}
      <div className="relative z-10 w-full bg-[#0D0D0E]">
        <section
          className="w-full flex justify-center text-white/75"
          aria-label="Accessibility — standards and iteration focus"
        >
          <div className="mx-[9px] px-5 w-full pt-12">
            {/* Same horizontal band as Findings / Goals: 4 + 6 + 2 */}
            <div className="grid w-full grid-cols-12 gap-lg text-left">
              <div className="col-span-12 md:col-span-4 px-[10px]" />
              <div className="col-span-12 md:col-span-6 px-[10px]">
                <h2 className={experimentSectionTitle}>Design Experiments</h2>
              </div>
              <div className="col-span-12 md:col-span-2 px-[10px]" />
            </div>
            {/* Same max width as the tab card (96%): copy and card share one column, text left-aligned */}
            <div className={experimentContentWidth}>
              <div className={experimentTextStack}>
                <h4 className={experimentSubtitle}>Pickup Scheduling Iterations</h4>
                <p className={experimentBody}>
                We went with the card layout where agents could see multiple pickup windows at once and 
                confirm in one pass. The form front-loaded too much and inline made comparing awkward. 
                </p>
              </div>
              {/* <ul className="mt-6 list-[circle] list-outside pl-6 space-y-3 text-[0.958rem] leading-relaxed text-white/75 [&_li]:marker:text-[0.4em]">
                <li>
                  <span className="font-medium">Iteration 1 — Baseline:</span> semantic structure,
                  headings, and touch targets aligned with WCAG 2.1 AA before visual polish.
                </li>
                <li>
                  <span className="font-medium">Iteration 2 — Motion &amp; state:</span> reduced
                  reliance on color alone for status; clearer loading and error announcements.
                </li>
                <li>
                  <span className="font-medium">Iteration 3 — Field validation:</span> VoiceOver /
                  TalkBack runs on real tasks with agents; fixes to grouping summaries and action
                  order.
                </li>
              </ul> */}
              {/* <p className={`mt-8 ${bodyMuted}`}>
                Outcome: a product that stayed shippable for engineering while remaining legible and
                operable for agents in high-noise environments — not a retrofit at the end.
              </p> */}
              <div className={experimentMediaGap}>
                <FluxA11yAccessibilityTabs
                  hideTabList
                  compactCard
                  fullWidth
                  compactChosenIndex={1}
                  compactPillLabels={[
                    "SCHEDULING FORM",
                    "PICKUP WINDOW CARDS",
                    "INLINE SCHEDULING",
                  ]}
                />
              </div>

              <div className={`${experimentBlockGap} flex flex-col`}>
                <div className={experimentTextStack}>
                  <h4 className={experimentSubtitle}>Claim Shipments iterations</h4>
                  <p className={experimentBody}>
                  The grouped table passed usability testing with a toggle between date and zone views. 
                  Related shipments sit together, so agents can decide what to claim next without scanning
                   a flat list or juggling a split view resulting in faster decisions, more confident picks.
                  </p>
                </div>
                <div className={experimentMediaGap}>
                  <FluxA11yAccessibilityTabs
                    idPrefix="flux-pickup-scheduling-2"
                    hideTabList
                    compactCard
                    fullWidth
                    compactStripVariant="claimShipments"
                    compactChosenIndex={2}
                    compactRegionLabel="Claim shipments iterations"
                    compactPillLabels={[
                      "SHIPMENTS FILTERS",
                      "ROUTE PREVIEW COLUMN",
                      "GROUPED by DATE & PICKUP ZONES",
                    ]}
                  />
                </div>
              </div>
            </div>
            {/* Same vertical rhythm as Goals → Design Experiments: pb-8 md:pb-10 + h-32 + next section pt-12 */}
            <div className="w-full pb-8 md:pb-10" aria-hidden />
            <div className="h-32 w-full shrink-0 bg-[#0D0D0E]" aria-hidden />
          </div>
        </section>

        <section
          className="w-full flex justify-center text-white/75"
          aria-label="Accessibility — focus, keyboard, and ARIA patterns"
        >
          <div className="mx-[9px] px-5 w-full pt-12 pb-24 text-left md:pb-32">
            {/* Same horizontal band as Design Experiments: 4 + 6 + 2 */}
            <div className="grid w-full grid-cols-12 gap-lg text-left">
              <div className="col-span-12 md:col-span-4 px-[10px]" />
              <div className="col-span-12 md:col-span-6 px-[10px]">
                <h2 className={experimentSectionTitle}>Advocating for Accessibility</h2>
              </div>
              <div className="col-span-12 md:col-span-2 px-[10px]" />
            </div>
            {/* Same layout as Design Experiments: 96% column, subtitle + body + media */}
            <div className={experimentContentWidth}>
              <div className={experimentTextStack}>
                <h4 className={experimentSubtitle}>Designed to meet WCAG 2.1 AA standards</h4>
                <p className={experimentBody}>
                  Accessibility was a recurring bar for every iteration. Each prototype cycle included
                  keyboard paths, focus order, and screen-reader labels for the core agent flows.
                </p>
              </div>
              <div className={`${experimentMediaGap} mb-8 md:mb-10`}>
                <FluxA11yAccessibilityTabs idPrefix="flux-a11y-2" bodyClassName={body} fullWidth />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Design story — same section structure as Advocating for Accessibility */}
      <section
        className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white/75"
        aria-label="Design — shipments overview"
      >
        <div className="mx-[9px] px-5 w-full pt-12 pb-24 text-left md:pb-32">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]" />
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <h2 className={experimentSectionTitle}>Final Designs Shipped</h2>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
          <div className={experimentContentWidth}>
            <div className={experimentTextStack}>
              <h4 className={experimentSubtitle}>All shipments in one place.</h4>
              <p className={experimentBody}>
                A single place to review shipments before committing so agents don’t rely on memory
                or scattered messages.
              </p>
            </div>
            <div className={experimentMediaGap}>
              <DashStyleMediaCard
                src="/gifs/overview.gif"
                alt="Iterations and groupings — overview in the product"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white/75"
        aria-label="Design — groupings and schedules"
      >
        <div className="mx-[9px] px-5 w-full pt-12 pb-24 text-left md:pb-32">
          <div className={experimentContentWidth}>
            <div className={experimentTextStack}>
              <h4 className={experimentSubtitle}>Smarter groupings and schedules.</h4>
              <p className={experimentBody}>
                System suggested pickup groupings surface route feasibility and conflicts upfront,
                helping agents commit faster with fewer scheduling collisions.
              </p>
            </div>
            <div className={experimentMediaGap}>
              <DashStyleMediaCard
                src="/gifs/zones.gif"
                alt="Product overview — zones in the product"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pickup queue — full-width dash card */}
      <section
        className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white/75"
        aria-label="Design — pickup queue"
      >
        <div className="mx-[9px] px-5 w-full pt-12 pb-24 text-left md:pb-32">
          <div className={experimentContentWidth}>
            <div className={experimentTextStack}>
              <h4 className={experimentSubtitle}>The pickup queue, at a glance.</h4>
              <p className={experimentBody}>
                A prioritized pickup queue makes the next best decision obvious: what to take, what
                to defer, and why.
              </p>
            </div>
            <div className={experimentMediaGap}>
              <DashStyleMediaCard
                src="/images/pickup%20dash.png"
                alt="Design exploration — pickup dash in the product"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Design implementation — NASA twin cards (same #0D0D0E field as Performance) */}
      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex flex-col text-white/75">
        <div className="mx-[9px] px-5 w-full pt-12 pb-24 flex flex-1 flex-col gap-10 text-left">
          <div className={experimentContentWidth}>
            <div className="w-full">
              <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:gap-5">
                <div className="flex w-full flex-col items-stretch md:col-span-5">
                  <div className={twinShipCardShell}>
                    <span className={twinShipMediaPill} aria-hidden>
                      SCHEDULING PICKUPS
                    </span>
                    <div className={twinShipCardBody}>
                      <div className="relative h-[528px] w-[min(100%,398px)] shrink-0 overflow-hidden rounded-[16px] bg-black sm:w-[398px] md:mt-7">
                        <Image
                          src="/gifs/claim.gif"
                          alt="Claim flow — motion and layout in the product"
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, 398px"
                          unoptimized
                        />
                      </div>
                      <div className={twinShipCaptionRail}>
                        <p className={`${twinShipCaptionCopy} ${body}`}>
                          Agents claim and schedule pickups in seconds, balancing time windows and personal
                          capacity without back-and-forth coordination.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col items-stretch md:col-span-7">
                  <div className={twinShipCardShell}>
                    <span className={twinShipMediaPill} aria-hidden>
                      UPDATE SHIPMENT STATUS
                    </span>
                    <div className={twinShipCardBody}>
                      <div className="relative h-[528px] w-[min(100%,515px)] shrink-0 overflow-hidden rounded-[16px] bg-black sm:w-[515px]">
                        <Image
                          src="/gifs/pickup.gif"
                          alt="Pickup flow — motion and layout in the product"
                          fill
                          className="object-contain object-center"
                          sizes="(max-width: 768px) 100vw, 515px"
                          unoptimized
                        />
                      </div>
                      <div className={twinShipCaptionRailWide}>
                        <p className={`${twinShipCaptionCopy} ${body}`}>
                          Fast status updates keep customers and ops aligned, reducing “where is it?”
                          follow-ups and missed handoffs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wide proof image */}
      <section
        className="relative z-10 w-full min-h-[640px] bg-[#0D0D0E] flex justify-center text-white/75"
        aria-label="Design — performance"
      >
        <div className="mx-[9px] px-5 w-full pt-12 pb-12 text-left md:pb-16">
          <div className={experimentContentWidth}>
            <div className={experimentTextStack}>
              <h4 className={experimentSubtitle}>Performance at a glance.</h4>
              <p className={experimentBody}>
                A lightweight dashboard highlights activity and exceptions so agents can correct the
                day early, not after problems cascade.
              </p>
            </div>
            <div className={experimentMediaGap}>
              <DashStyleMediaCard alt="Case study wide composition — dash flow in the product" />
            </div>
          </div>
        </div>
      </section>

      {/* Gradient blend: #0D0D0E → black into Impact */}
      <div
        className="h-16 w-full shrink-0 md:h-20"
        style={{ background: "linear-gradient(to bottom, #0D0D0E, #000000)" }}
        aria-hidden
      />

      {/* Impact + accessibility callouts */}
      <section className="relative z-10 w-full bg-black flex justify-center text-white/75">
        <div className="mx-[9px] px-5 w-full pt-12 pb-24 md:pt-16 md:pb-32">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-3 px-[10px]">
              <h2 className={label}>Impact</h2>
            </div>
            <div className="col-span-12 md:col-span-7 px-[10px]">
              <h3 className={`${h3} mb-6`}>Outcomes that moved operations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {[
                  ["30%", "Reduction in daily route planning time per agent"],
                  ["34%", "Increase in shipments handled per agent"],
                  ["60%", "Reduction in missed or double-booked pickups"],
                  ["40%", "Reduction in pickup cancellations"],
                  ["90%", "Of cases required zero manual planning"],
                  ["70%", "Reduction in time spent clarifying assignments"],
                ].map(([a, b]) => (
                  <div key={b} className="rounded-[20px] bg-[#1E1E20] border border-white/10 p-4">
                    <p className="text-[1.5rem] font-semibold text-white/75">{a}</p>
                    <p className="mt-1 text-[0.9rem] text-white/75 leading-snug">{b}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="rounded-[16px] bg-[#1E1E20] border border-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/75">Accessibility</p>
                  <p className="text-lg font-medium text-white/75">WCAG 2.1 AA</p>
                </div>
                <div className="rounded-[16px] bg-[#1E1E20] border border-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/75">Quality bar</p>
                  <p className="text-lg font-medium text-white/75">Keyboard &amp; screen reader checks</p>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
