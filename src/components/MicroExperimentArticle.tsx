import {
  WireframeWeb,
  type WireframePattern,
} from "@/components/MicroExperimentWireframeWeb";

export type MicroExperimentArticleData = {
  id: string;
  title: string;
  hypothesis: string;
  variants: { name: string; wire: WireframePattern }[];
  chosenWire?: WireframePattern;
  decision: string;
  evidenceChips: string[];
};

function EvidenceChips({ items, chipClassName }: { items: string[]; chipClassName: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => (
        <span key={x} className={chipClassName}>
          {x}
        </span>
      ))}
    </div>
  );
}

export function MicroExperimentArticle({
  experiment: e,
  metaClassName,
  sectionLabelClassName,
  h3ClassName,
  bodyClassName,
  articleClassName,
  chipClassName,
}: {
  experiment: MicroExperimentArticleData;
  metaClassName: string;
  sectionLabelClassName: string;
  h3ClassName: string;
  bodyClassName: string;
  articleClassName: string;
  chipClassName: string;
}) {
  return (
    <article className={articleClassName}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={metaClassName}>Experiment {e.id}</p>
          <h3 className={`${h3ClassName} mt-2`}>{e.title}</h3>
        </div>
      </div>

      <div className="mt-5">
        <p className={sectionLabelClassName}>Hypothesis</p>
        <p className={`mt-2 ${bodyClassName}`}>{e.hypothesis}</p>
      </div>

      <div className="mt-6">
        <p className={sectionLabelClassName}>Wireframes (variants)</p>
        <div className="mt-3 grid grid-cols-1 gap-4 xl:grid-cols-3">
          {e.variants.map((v, i) => (
            <WireframeWeb
              key={v.name}
              title={v.name}
              pattern={v.wire}
              variantIndex={i}
              chosenAfterTesting={e.chosenWire === v.wire}
            />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className={sectionLabelClassName}>Decision shipped</p>
        <p className={`mt-2 ${bodyClassName}`}>{e.decision}</p>
      </div>

      <div className="mt-7">
        <p className={sectionLabelClassName}>Evidence (placeholders)</p>
        <div className="mt-3">
          <EvidenceChips items={e.evidenceChips} chipClassName={chipClassName} />
        </div>
      </div>
    </article>
  );
}
