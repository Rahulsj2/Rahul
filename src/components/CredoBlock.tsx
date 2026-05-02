import { credoParagraphs } from "@/content/credo";

type CredoBlockProps = {
  /** `h2` on home (paired with section `aria-labelledby`); `h1` on /credo */
  as: "h1" | "h2";
  /** Pass when `as="h2"` — e.g. `credo-heading` */
  id?: string;
};

/**
 * Credo layout (matches provided HTML preview):
 * rule + eyebrow + italic headline + attribution (left),
 * body + italic callout w/ left rule (right).
 */
export function CredoBlock({ as, id }: CredoBlockProps) {
  const Heading = as === "h1" ? "h1" : "h2";
  const headline = credoParagraphs[0];
  const rest = credoParagraphs.slice(1);

  // Layout expects: body, body, callout, body (extras fall through as body).
  const body1 = rest[0];
  const body2 = rest[1];
  const callout = rest[2];
  const tail = rest.slice(3);

  return (
    <section
      className="mx-auto grid w-full max-w-[960px] grid-cols-1 items-start gap-y-10 px-8 py-12 antialiased md:grid-cols-2 md:gap-x-[3.5rem] md:py-16"
      aria-label="Design credo"
    >
      <div className="flex flex-col">
        <div className="mb-5 h-[2px] w-8 bg-[#1d1d1f]" aria-hidden />

        <span className="mb-5 block text-[10px] font-medium uppercase tracking-[0.18em] text-[#6e6e73]">
          Rahul's Design Credo
        </span>

        <Heading
          id={id}
          className="mb-8 text-left text-[26px] font-light leading-[1.1] tracking-tight text-[#2a2a2c] max-[680px]:text-[22px]"
        >
          {headline}
        </Heading>

        <p className="text-left text-[11px] font-normal leading-[1.6] tracking-[0.02em] text-[#aeaeb2] max-[680px]:hidden">
          Senior Product Designer
        </p>
      </div>

      <div className="flex flex-col gap-[1.1rem] pt-1">
        {body1 && (
          <p className="text-left text-[15px] font-light leading-[1.8] tracking-[-0.003em] text-[#6e6e73]">
            {body1}
          </p>
        )}
        {body2 && (
          <p className="text-left text-[15px] font-light leading-[1.8] tracking-[-0.003em] text-[#6e6e73]">
            {body2}
          </p>
        )}
        {callout && (
          <p className="border-l-2 border-[#1d1d1f] pl-4 text-left text-[15px] font-light italic leading-[1.8] tracking-[-0.003em] text-[#1d1d1f]">
            {callout}
          </p>
        )}
        {tail.map((t, i) => (
          <p
            key={i}
            className="text-left text-[15px] font-light leading-[1.8] tracking-[-0.003em] text-[#6e6e73]"
          >
            {t}
          </p>
        ))}
      </div>
    </section>
  );
}
