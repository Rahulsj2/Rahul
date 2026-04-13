import type { MicroExperimentArticleData } from "@/components/MicroExperimentArticle";

/** Experiment 03 + 06 from micro-experiments appendix, embedded on Flux case study. */
export const fluxDesignExperiments: MicroExperimentArticleData[] = [
  {
    id: "03",
    title: "Scheduling interaction (single-step vs confirm step)",
    hypothesis:
      "Scheduling should support quick corrections first, then deeper edits—without forcing a long form upfront.",
    variants: [
      { name: "Full scheduling form", wire: "scheduleForm" },
      { name: "Pickup window cards + confirm", wire: "schedulePickupWindowModal" },
      { name: "Inline scheduling", wire: "scheduleInline" },
    ],
    chosenWire: "schedulePickupWindowModal",
    decision:
      "After usability testing, we shipped pickup window cards with a confirm step—fast enough for first-pass scheduling without opening the full form or inline expansion.",
    evidenceChips: [
      "Quote: “[…] I just pick a window and go.”",
      "Completion: ?% vs ?%",
      "Δ time: ?s faster to schedule",
      "Δ reschedules: ? fewer mistakes",
    ],
  },
  {
    id: "06",
    title: "New shipments surface (table vs cards vs split)",
    hypothesis:
      "Agents claim faster when scan density matches how they compare routes—table for bulk triage, cards for quick pattern-matching, split when context needs a map or detail pane.",
    variants: [
      { name: "Table + plan-your-shipments filters", wire: "shippingNewQueueTable" },
      { name: "Table + route preview column", wire: "shippingNewQueueSplit" },
      { name: "Grouped tables — date vs pickup zones", wire: "shippingNewQueueGrid" },
    ],
    chosenWire: "shippingNewQueueGrid",
    decision:
      "Shipped grouped shipment tables with a toggle between assigned-date and pickup-zone groupings, so agents could match the view to how they were planning routes.",
    evidenceChips: ["Quote: “[…]”", "Claim time: ?s vs ?s", "Mis-picks: ? vs ?", "n=? sessions"],
  },
];
