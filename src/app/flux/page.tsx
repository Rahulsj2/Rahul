import Image from "next/image";

import { A11yImageCallouts } from "@/components/A11yImageCallouts";
import { A11yIterationsCard } from "@/components/A11yIterationsCard";
import { AnimatedGoalsList } from "@/components/AnimatedGoalsList";

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
    <div className="w-full max-w-[96%] flex-shrink-0 rounded-[28px] bg-[#1E1E20] border border-white/10 px-3 py-6 md:px-4 md:py-10 min-h-[720px] md:min-h-[820px] flex flex-col justify-center">
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
const label = "text-base font-medium tracking-[0.12em] text-white/70";
const body = "text-[0.958rem] leading-relaxed text-white";
const bodyMuted = "text-[0.958rem] leading-relaxed text-white/80";
const card = "w-full rounded-[28px] bg-[#1E1E20] p-6 md:p-8 border border-white/10";
const h3 = "text-[1.5rem] font-medium tracking-[0.02em] text-white";
const display = "text-[32px] font-normal tracking-[0.03em] text-white leading-tight";

/** Two-line display titles before media — same rhythm as NASA design sections */
function DesignSectionHeadline({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <div className="w-full text-left">
      <p className={`-mt-4 ${display} w-full`}>{line1}</p>
      <p className={`-mt-2 ${display} w-full`}>{line2}</p>
    </div>
  );
}

/** Twin-column blocks: two lines × two words each, scaled for narrower columns */
const columnDisplay =
  "text-[28px] md:text-[32px] font-normal tracking-[0.03em] text-white leading-[1.12]";
function ColumnTwoWordHeadline({
  line1,
  line2,
  align = "left",
}: {
  line1: string;
  line2: string;
  align?: "left" | "right";
}) {
  const alignClass = align === "right" ? "text-right" : "text-left";
  return (
    <div className={`mb-5 w-full ${alignClass}`}>
      <p className={`${columnDisplay} w-full`}>{line1}</p>
      <p className={`-mt-1 ${columnDisplay} w-full`}>{line2}</p>
    </div>
  );
}

export default function FluxPage() {
  return (
    <div className="relative w-full bg-black text-white">
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
          <div className="grid w-full grid-cols-12 gap-lg text-left mt-[160px]">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className={label}>Case study</h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <div className="pb-[40px]">
                    <h1 className="text-[3.333rem] font-light tracking-[0.03em] text-white">
                      Flux Agents
                    </h1>
                  </div>
                  <div className="mt-2 md:mt-3 pb-[60px]">
                    <h3 className="text-[1.125rem] font-medium tracking-[0.04em] text-white/70">
                    Flux Logistics is a small but growing company offering alternative door-to-door shipping 
                    from the U.S. to Ghana. The work focused on helping field agents plan pickups and 
                    commitments with less cognitive load and fewer coordination mistakes.
                    </h3>
                  </div>
                  <div className="mt-4 pb-[60px]">
                    <p className={`${body} font-medium`}>
                      Web · Mobile
                      <br />
                      <span className="font-medium text-white/70">Jan 2026</span>
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

      {/* Role & meta — NASA 3-column grid */}
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full pb-[100px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]" />
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <div className="grid grid-cols-12 gap-md">
                <div className="col-span-12 md:col-span-4">
                  <div className="pb-[20px]">
                    <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white">
                      Responsibilities
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className={bodyMuted}>Research &amp; Strategy</p>
                    <p className={bodyMuted}>Iterative prototyping </p>
                    <p className={bodyMuted}>Usability testing</p>
                    <p className={bodyMuted}>Accessibility auditing (WCAG 2.1 AA)</p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="pb-[20px]">
                    <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white">
                      Tools
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className={bodyMuted}>Figma</p>
                    <p className={bodyMuted}>Miro</p>
                    <p className={bodyMuted}>Lighthouse</p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="pb-[20px]">
                    <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white">
                      Teams
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    <p className={bodyMuted}>3 UX Designers</p>
                    <p className={bodyMuted}>2 Engineers</p>
                    <p className={bodyMuted}>1 Product Manager</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section>

      {/* Context / overview */}
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full py-[100px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className={label}>Summary</h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <h3 className={`${h3} mb-4`}>Challenge</h3>
              <div className="mt-4 pb-[40px]">
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

      {/* Challenge — NASA “Current situation” style: two columns */}
      {/* <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full pb-[40px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="w-full" />
            </div>
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <h3 className={`${h3} mb-4`}>Challenge</h3>
              <p className={body}>
                The real problem wasn&apos;t digitization. Agents were making high-stakes routing
                decisions every day without enough context — juggling WhatsApp, calls, and mental
                maps of distance and timing.
              </p>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section> */}

      {/* Findings — NASA pain points grid */}
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full pb-[120px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="w-full" />
            </div>
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <h3 className={`${h3} mb-4`}>Findings</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  {
                    n: "01",
                    t: "Decision overload",
                    d: "Agents accepted routes without a reliable view of distance, time windows, and conflicts.",
                    tint: "bg-amber-300/12 border-amber-200/15",
                    icon: "bg-amber-300/25 border-amber-200/25",
                  },
                  {
                    n: "02",
                    t: "Capacity blindness",
                    d: "No quick way to see workload across the day, causing missed or overbooked commitments.",
                    tint: "bg-lime-200/10 border-lime-200/15",
                    icon: "bg-lime-200/22 border-lime-200/25",
                  },
                  {
                    n: "03",
                    t: "Communication gap",
                    d: "Updates were reactive; missed calls and unclear ownership reduced trust with customers.",
                    tint: "bg-sky-300/10 border-sky-200/15",
                    icon: "bg-sky-300/20 border-sky-200/25",
                  },
                  {
                    n: "04",
                    t: "Constraints",
                    d: "The solution had to be low-friction, fast on mobile, and usable with minimal training.",
                    tint: "bg-fuchsia-300/10 border-fuchsia-200/15",
                    icon: "bg-fuchsia-300/20 border-fuchsia-200/25",
                  },
                ].map((x) => (
                  <div
                    key={x.t}
                    className={`rounded-[22px] border p-6 ${x.tint} shadow-[0_18px_70px_rgba(0,0,0,0.35)]`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-11 w-11 shrink-0 rounded-[14px] border ${x.icon} flex items-center justify-center`}
                        aria-hidden
                      >
                        <span className="text-[0.78rem] font-semibold tracking-[0.12em] text-white/80">
                          {x.n}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[1.05rem] font-medium text-white/92">{x.t}</p>
                        <p className="mt-2 text-[0.92rem] leading-relaxed text-white/70">{x.d}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className={`${h3} mt-16 mb-4 md:mt-20`}>Goals</h3>
              <AnimatedGoalsList
                bodyClassName={body}
                goals={[
                  "Reduce cognitive load at the moment of decision.",
                  "Help agents assess feasibility without relying on memory.",
                  "Improve coordination and transparency from agents.",
                ]}
              />
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
        </div>
      </section>

      {/* Accessibility iterations */}
      <section className="relative z-10 w-full bg-black flex justify-center">
        <div className="mx-[9px] px-5 w-full pt-[40px] pb-[100px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <h2 className={label}>Accessibility Considerations</h2>
            </div>
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <h3 className={`${display} mb-4`}>Designed to meet WCAG 2.1 AA standards</h3>
              <p className={body}>
                Accessibility was a recurring bar for every iteration. Each prototype cycle included 
                keyboard paths, focus order, and screen-reader labels for the core agent flows.
              </p>
              {/* <ul className="mt-6 list-[circle] list-outside pl-6 space-y-3 text-[0.958rem] leading-relaxed text-white [&_li]:marker:text-[0.4em]">
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
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>

          <div className="mt-20 flex w-full flex-col items-center gap-8">
            <A11yIterationsCard />
            <div className="max-w-2xl text-center space-y-3">
              <p className={body}>
                Three principles grounded the system: clarity and focus when agents decide, accessible
                patterns (WCAG 2.1 AA), and iteration with real tasks — nothing untested.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle divider — like NASA gradient but light */}
      <div
        className="h-24 w-full shrink-0 bg-gradient-to-b from-black to-[#0D0D0E]"
        aria-hidden
      />

      {/* Design story blocks — NASA #0D0D0E sections → white + neutral */}
      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          {/* Group 1: label + intro headline (2 / 8 / 2) */}
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className="text-sm font-medium tracking-[0.12em] text-white/70">Design</h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full pl-0 md:pl-40">
                  <DesignSectionHeadline
                    line1="All shipments in one place."
                    line2=" "
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>
          {/* Group 2: overview headline + media (same rhythm as following design blocks) */}
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <DashStyleMediaCard
              src="/gifs/overview.gif"
              alt="Iterations and groupings — overview in the product"
            />
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/80">
              A single place to review shipments before committing so agents don’t rely on memory
              or scattered messages.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full md:pl-28 mb-6">
                  <DesignSectionHeadline
                    line1="Smarter groupings and schedules."
                    line2=""
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <DashStyleMediaCard
              src="/gifs/zones.gif"
              alt="Product overview — zones in the product"
            />
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/80">
              System suggested pickup groupings surface route feasibility and conflicts upfront,
              helping agents commit faster with fewer scheduling collisions.
            </p>
          </div>
        </div>
      </section>

      {/* Pickup queue — full-width dash card (same spacing rhythm as other design blocks) */}
      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full md:pl-28 mb-6">
                  <DesignSectionHeadline
                    line1="The pickup queue, at a glance."
                    line2=""
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <DashStyleMediaCard
              src="/images/pickup%20dash.png"
              alt="Design exploration — pickup dash in the product"
            />
            <div className="max-w-2xl text-center space-y-3">
              <p className={body}>
                A prioritized pickup queue makes the next best decision obvious: what to take, what
                to defer, and why.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design implementation — NASA twin cards */}
      <section className="relative z-10 w-full min-h-[720px] bg-black flex flex-col text-white">
        <div className="h-8 w-full shrink-0 bg-gradient-to-b from-[#0D0D0E] to-black" aria-hidden />
        <div className="mx-[9px] px-5 w-full pt-12 pb-24 flex flex-1 flex-col gap-10">
          <div className="flex w-full flex-col items-center gap-8">
            <div className="grid w-full max-w-[96%] grid-cols-1 gap-10 md:grid-cols-12 md:gap-5">
              <div className="flex w-full flex-col items-stretch md:col-span-5">
                <div className="w-full pl-0 md:pl-6 mb-6">
                  <ColumnTwoWordHeadline line1="Scheduling pickups" line2="" />
                </div>
                <div className="flex min-h-[620px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-[#1E1E20] p-3 md:p-4 border border-white/10">
                  <div className="relative h-[528px] w-[min(100%,398px)] shrink-0 overflow-hidden rounded-[16px] bg-black sm:w-[398px]">
                    <Image
                      src="/gifs/claim.gif"
                      alt="Claim flow — motion and layout in the product"
                      fill
                      className="object-contain object-center"
                      sizes="(max-width: 768px) 100vw, 398px"
                      unoptimized
                    />
                  </div>
                </div>
                <p className={`mt-4 w-full ${body}`}>
                  Agents claim and schedule pickups in seconds, balancing time windows and personal
                  capacity without back-and-forth coordination.
                </p>
              </div>
              <div className="flex w-full flex-col items-stretch md:col-span-7">
                <div className="w-full mb-6">
                  <ColumnTwoWordHeadline
                    line1="Update shipment status"
                    line2=""
                    align="right"
                  />
                </div>
                <div className="flex min-h-[620px] w-full items-center justify-center overflow-hidden rounded-[28px] bg-[#1E1E20] p-3 md:p-4 border border-white/10">
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
                </div>
                <p className={`mt-4 w-full text-center ${body}`}>
                  Fast status updates keep customers and ops aligned, reducing “where is it?”
                  follow-ups and missed handoffs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wide proof image */}
      <section className="relative z-10 w-full min-h-[640px] bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full md:pl-28 mb-6">
                  <DesignSectionHeadline
                    line1="Performance at a glance."
                    line2=""
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <DashStyleMediaCard alt="Case study wide composition — dash flow in the product" />
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/80">
              A lightweight dashboard highlights activity and exceptions so agents can correct the
              day early, not after problems cascade.
            </p>
          </div>
        </div>
      </section>

      {/* Impact + accessibility callouts */}
      <section className="relative z-10 w-full bg-[#0D0D0E] flex justify-center">
        <div className="mx-[9px] px-5 w-full py-[100px]">
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
                    <p className="text-[1.5rem] font-semibold text-white">{a}</p>
                    <p className="mt-1 text-[0.9rem] text-white/70 leading-snug">{b}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="rounded-[16px] bg-[#1E1E20] border border-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/70">Accessibility</p>
                  <p className="text-lg font-medium text-white">WCAG 2.1 AA</p>
                </div>
                <div className="rounded-[16px] bg-[#1E1E20] border border-white/10 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/70">Quality bar</p>
                  <p className="text-lg font-medium text-white">Keyboard &amp; screen reader checks</p>
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
