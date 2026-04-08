export function AppleCaseStudyContent() {
  return (
    <div className="relative w-full bg-background-primary" style={{ color: "#1a1a18" }}>
      <section className="relative w-full h-[calc(100dvh-7rem)] max-h-[calc(100dvh-7rem)] overflow-hidden bg-background-primary">
        <div className="mx-[9px] px-5 h-full">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[22px] bg-[#f5f4f0] shadow-[0_20px_80px_rgba(0,0,0,0.06)]">
            <img
              src="https://cdn.simpleicons.org/apple/737373"
              alt="Apple"
              className="h-[36%] w-auto max-w-[70%] object-contain opacity-90"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <div className="min-h-[calc(100vh-4.5rem)] px-[40px] pt-[64px] pb-[96px] max-[600px]:px-[24px] max-[600px]:pt-[40px] max-[600px]:pb-[72px]">
        <div className="mx-auto w-full max-w-[780px]">
          <div className="mb-[64px] grid grid-cols-2 items-start gap-[56px] max-[600px]:grid-cols-1 max-[600px]:gap-[36px]">
            <div>
              <p className="mb-[20px] text-[10px] uppercase tracking-[0.14em] text-[#9a9992]">
                Service Design &nbsp;·&nbsp; Ongoing
              </p>
              <h1 className="mb-[18px] text-[42px] font-normal leading-[1.12] tracking-[-0.6px] max-[600px]:text-[34px]">
                Retail
                <br />
                Support
              </h1>
              <p className="text-[13px] italic leading-[1.85] text-[#9a9992]">
                Designing internal tools & systems for retail performance, and talent development.
              </p>
            </div>

            <div className="pt-[4px]">
              {[
                ["Timeline", "Ongoing"],
                ["Role", "Lead"],
                ["Tools", "Figma, AI Assisted Workflows, Keynote, Tableau"],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className="flex justify-between items-baseline border-b border-black/10 border-b-[0.5px] py-[13px]"
                  style={i === 0 ? { borderTop: "0.5px solid rgba(0,0,0,0.10)" } : undefined}
                >
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[#9a9992]">{k}</span>
                  <span className="text-right text-[12.5px] text-[#4a4a46]">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mb-[60px] flex items-center gap-[10px] py-[15px] text-[12.5px] text-[#9a9992]"
            style={{
              borderTop: "0.5px solid rgba(0,0,0,0.10)",
              borderBottom: "0.5px solid rgba(0,0,0,0.10)",
            }}
            role="note"
            aria-label="Confidentiality note"
          >
            <span aria-hidden>🔐</span>
            <span>
              Details of this work are internal to Apple. Reach out if you&apos;d like to learn more.
            </span>
          </div>

          <div className="mb-[56px]">
            <p className="mb-[16px] text-[10px] uppercase tracking-[0.14em] text-[#9a9992]">
              Long story short
            </p>
            <p className="mb-[18px] max-w-[540px] text-[28px] font-normal leading-[1.4] text-[#1a1a18]">
              Designing for people, inside one of the world&apos;s most demanding service environments.
            </p>
            <p className="max-w-[500px] text-[13px] leading-[1.9] text-[#9a9992]">
              Managing a large cross-functional team gave me direct access to a complex service system
              and the responsibility to improve it. I approached it the way a designer would:
              observing behavior, uncovering gaps, and designing structures that remove uncertainty.
            </p>
          </div>

          <div
            className="grid grid-cols-3 gap-[1px] overflow-hidden rounded-[12px] max-[600px]:grid-cols-1"
            style={{
              background: "rgba(0,0,0,0.10)",
              border: "0.5px solid rgba(0,0,0,0.10)",
            }}
            aria-label="Selected outcomes"
          >
            {[
              [
                "01",
                "Designed a performance systems for a 152-person team built around visibility, incentive structure, and feedback loops leadership could act on.",
              ],
              [
                "02",
                "Designed reporting system that turned complex store data into clear, actionable leadership insights.",
              ],
              [
                "03",
                "Used AI as a core part of the process to synthesize data, test ideas, and build faster. Consistently.",
              ],
            ].map(([n, t]) => (
              <div key={n} className="bg-[#f5f4f0] px-[22px] py-[26px]">
                <p className="mb-[16px] text-[10px] uppercase tracking-[0.1em] text-[#9a9992]">{n}</p>
                <p className="text-[13px] leading-[1.72] text-[#4a4a46]">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
