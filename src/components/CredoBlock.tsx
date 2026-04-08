import { credoParagraphs } from "@/content/credo";

type CredoBlockProps = {
  /** `h2` on home (paired with section `aria-labelledby`); `h1` on /credo */
  as: "h1" | "h2";
  /** Pass when `as="h2"` — e.g. `credo-heading` */
  id?: string;
};

/**
 * Editorial credo layout: narrow column, eyebrow, lead line, ruled stanzas, serif closer.
 * Tuned for the same light surface as the hero (`bg-background-primary`).
 */
export function CredoBlock({ as, id }: CredoBlockProps) {
  const lead = credoParagraphs[0];
  const close = credoParagraphs[credoParagraphs.length - 1];
  const middle = credoParagraphs.slice(1, -1);

  const eyebrowClass =
    "mb-12 text-left text-[11px] font-medium uppercase tracking-[0.14em] text-[#999]";

  const Heading = as === "h1" ? "h1" : "h2";

  return (
    <div className="mx-auto w-full max-w-[540px] px-8 pt-12 pb-10 antialiased md:pt-16 md:pb-12">
      <Heading id={id} className={eyebrowClass}>
        Design credo
      </Heading>

      <p className="mb-10 text-left text-[22px] font-medium leading-[1.35] tracking-[-0.01em] text-[#111]">
        {lead}
      </p>

      {middle.map((text, i) => (
        <div key={i} className="group flex">
          <div
            className="mr-6 w-[2px] shrink-0 self-stretch rounded-sm bg-[#e0e0e0] transition-colors group-hover:bg-[#bbb]"
            aria-hidden
          />
          <div className="min-w-0 pb-7 pt-0.5">
            <p className="text-left text-[15px] leading-[1.8] text-[#555]">{text}</p>
          </div>
        </div>
      ))}

      <div className="mt-5 border-t border-[#e8e8e8] pt-7">
        <p className="font-serif text-left text-[13px] leading-[1.9] text-[#999]">
          {close}
        </p>
      </div>
    </div>
  );
}
