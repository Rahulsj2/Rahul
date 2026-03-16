import Image from "next/image";
import { ApiAnalysisCard } from "@/components/ApiAnalysisCard";
import { ApiAnalysisCardWithScroll } from "@/components/ApiAnalysisCardWithScroll";
import { ApiAnalysisSection } from "@/components/ApiAnalysisSection";
import { NasaHeroSpline } from "@/components/NasaHeroSpline";
import { WorkScrollIndicator } from "@/components/WorkScrollIndicator";

export const metadata = {
  title: "NASA Project",
  description: "NASA project case study",
};

export default function NasaPage() {
  return (
    <div className="relative w-full bg-black">
      {/* Hero section — Spline background only here, ends at hero */}
      <section className="relative flex w-full items-center justify-center overflow-hidden px-xs lg:px-sm text-white h-[calc(100dvh-5rem)] max-h-[calc(100dvh-5rem)] md:h-[calc(100dvh-5rem)] md:max-h-[calc(100dvh-5rem)]">
        <div className="absolute inset-0 z-0">
          <NasaHeroSpline />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-end">
          <div className="relative w-full max-w-[1440px] aspect-[16/9] translate-x-18 md:translate-x-40 translate-y-8 md:translate-y-16">
            <Image
              src="/images/nasahero.png"
              alt="NASA mission planning interface preview"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
        {/* Bottom fade only — blend hero into case study, no blur/shadow in the middle */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 md:h-32">
          <div className="h-full w-full bg-gradient-to-b from-transparent from-[40%] to-black" />
        </div>
      </section>

      {/* Case study section — solid black, text below hero */}
      <section className="relative z-10 w-full bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full">
          <div className="grid w-full grid-cols-12 gap-lg text-left mt-[160px]">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className="text-base font-medium tracking-[0.12em] text-white/70">
                    Case study
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <div className="pb-[40px]">
                    <h1 className="text-[3.333rem] font-light tracking-[0.03em] text-white">
                      Redesign of NASA APoD
                    </h1>
                  </div>
                  <div className="mt-2 md:mt-3 pb-[60px]">
                    <h3 className="text-[1.125rem] font-medium tracking-[0.04em] text-white/70">
                      Using NLP to redesign and build a new NASA&apos;s Astronomy Picture of the Day app increasing engagement and reducing churn by 60%
                    </h3>
                  </div>
                  <div className="mt-4 pb-[60px]">
                    <p className="text-[0.958rem] leading-relaxed text-white/90">
                      <span className="font-medium">Digital Design, Mobile Design</span>
                      <br />
                      <span className="font-medium text-white/70">Ongoing</span>
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

      {/* Role & Responsibilities section */}
      <section className="relative z-10 w-full bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full pb-[100px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left ">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <div className="grid grid-cols-12 gap-md">
                    {/* Responsibilities */}
                    <div className="col-span-12 md:col-span-4">
                      <div className="pb-[20px]">
                        <h3 className="text-[0.958rem] font-medium tracking-[0.12em]  text-white">
                          Responsibilities
                        </h3>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[0.958rem] leading-relaxed text-white/70">
                          Interaction design
                        </p>
                        <p className="text-[0.958rem] leading-relaxed text-white/70">
                          UI Design
                        </p>
                        <p className="text-[0.958rem] leading-relaxed text-white/70">
                          Prototyping
                        </p>
                      </div>
                    </div>

                    {/* Platform */}
                    <div className="col-span-12 md:col-span-4">
                      <div className="pb-[20px]">
                        <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white">
                          Tools
                        </h3>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[0.958rem] leading-relaxed text-white/70">
                          Figma
                        </p>
                        <p className="text-[0.958rem] leading-relaxed text-white/70">
                          Xcode
                        </p>
                        <p className="text-[0.958rem] leading-relaxed text-white/70">
                          Google Cloud Platform
                        </p>
                      </div>
                    </div>

                    {/* Teams */}
                    <div className="col-span-12 md:col-span-4">
                      <div className="pb-[20px]">
                        <h3 className="text-[0.958rem] font-medium tracking-[0.12em] text-white">
                          Teams
                        </h3>
                      </div>
                      <div className="space-y-1.5">
                        <p className="text-[0.958rem] leading-relaxed text-white/70">
                          3 UX Designers
                        </p>
                        <p className="text-[0.958rem] leading-relaxed text-white/70">
                          2 Engineers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative z-10 w-full bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-[100px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-4 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className="text-base font-medium tracking-[0.12em]  text-white/70">
                    Context
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  {/* <div className="pb-[40px]">
                    <h1 className="text-[3.333rem] font-light tracking-[0.03em] text-white">
                      Redesigning how people explore NASA&apos;s universe
                    </h1>
                  </div> */}
                  <h3 className="text-[1.5rem] font-medium tracking-[0.02em] text-white mb-4">
                    Project overview
                  </h3>
                  <div className="mt-2 md:mt-3 pb-[16px]">
                    <p className="text-[0.958rem] leading-relaxed text-white/90">
                      NASA's Astronomy Picture of the Day website lacks thoughtful design, and
                      third-party mobile apps fail to truly help people appreciate the cosmos. 
                      This project is a complete redesign of the APoD experience by designing 
                      and building an app that transforms how people engage with astronomy. 
                    </p>
                  </div>
                  <div className="mt-4 pb-[60px]">
                    <p className="text-[0.958rem] leading-relaxed text-white/90">
                      By reimagining the interface and user journey around the NASA APoD API, 
                      the goal is to inspire curiosity, make the cosmos more accessible, and help 
                      people develop a deeper appreciation for astronomy through thoughtful design 
                      and interaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current situation */}
      <section className="relative z-10 w-full bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full pb-[40px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className="text-base font-medium tracking-[0.12em]  text-white/70">
                    Current situation
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 px-[10px]">
              <div className="flex h-full items-stretch">
                <div className="w-full">
                  <p className="mb-8 text-[1.5rem] font-medium tracking-[0.02em] text-white text-center">
                    NASA APoD website
                  </p>
                  <div className="w-full rounded-[28px] bg-white/5 p-6 md:p-8">
                    <div className="">
                      <div className="mx-auto aspect-[1290/2796] w-full max-w-[200px] overflow-hidden rounded-lg bg-white/10">
                        <video
                          src="/gifs/nasa%20apod.mov"
                          className="h-full w-full object-cover"
                          playsInline
                          muted
                          loop
                          autoPlay
                          aria-label="NASA APoD website"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        {/* <h3 className="text-[0.958rem] leading-[1.2105263158] tracking-[0.012em] text-white/90">
                          NASA astronomy picture of the day website
                        </h3> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 px-[10px]">
              <div className="flex h-full items-stretch">
                <div className="w-full">
                  <p className="mb-8 text-[1.5rem] font-medium tracking-[0.02em] text-white text-center">
                    Third-party APoD apps
                  </p>
                  <div className="w-full rounded-[28px] bg-white/5 p-6 md:p-8">
                    <div className="">
                      <div className="mx-auto aspect-[1290/2796] w-full max-w-[200px] overflow-hidden rounded-lg bg-white/10">
                        <video
                          src="/gifs/third%20party.mov"
                          className="h-full w-full object-cover"
                          playsInline
                          muted
                          loop
                          autoPlay
                          aria-label="Third party APoD app"
                        />
                      </div>
                      <div className="mt-4 text-center" aria-hidden>
                        {/* spacer to match NASA APoD website card height */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain points*/}
      <section className="relative z-10 w-full bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full pb-[100px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  {/* <h2 className="text-sm font-medium tracking-[0.12em] uppercase text-white/70">
                    Exploration & interaction model
                  </h2> */}
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <ul className="list-[circle] list-outside pl-6 space-y-2 pb-[60px] text-[0.958rem] leading-relaxed text-white/90 [&_li]:marker:text-[0.4em]">
                    <li>Presents raw data without an engaging experience</li>
                    <li>Low incentive for casual users to return, limiting its appeal to non-enthusiasts</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <ul className="list-[circle] list-outside pl-6 space-y-2 pb-[60px] text-[0.958rem] leading-relaxed text-white/90 [&_li]:marker:text-[0.4em]">
                    <li>An Instagram-like feed on endless scroll with a date picker</li>
                    <li>Doesn&apos;t tell any story or take you on a journey, however it has a comment section</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Analysis & AI Integration */}
      {/* <section className="relative z-10 w-full bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full pb-[100px]">
          <div className="flex min-h-[720px] w-full flex-col rounded-[28px] bg-white/5 p-6 md:p-8">
            <div className="flex flex-1 flex-col pt-8 pb-8 px-10 min-h-0">
              <ApiAnalysisCard />
            </div>
          </div>
        </div>
      </section> */}

      {/* API Analysis & AI Integration (duplicate) */}
      {/* <section className="relative z-10 w-full bg-white/5 flex justify-center text-white pt-[160px]">
        <div className="mx-[9px] px-5 w-full pb-[100px]">
          <div className="flex min-h-[720px] w-full flex-col rounded-[28px] bg-black p-6 md:p-8">
            <div className="flex flex-1 flex-col pt-8 pb-8 px-10 min-h-0">
              <ApiAnalysisCardWithScroll />
            </div>
          </div>
          <WorkScrollIndicator variant="work2" hidePlayButton darkTheme />
        </div>
      </section> */}

      <ApiAnalysisSection />

      {/* Gradient blend: black → #0D0D0E */}
      <div
        className="h-32 w-full shrink-0"
        style={{ background: "linear-gradient(to bottom, #000000, #0D0D0E)" }}
        aria-hidden
      />

      {/* Shared image size: 760×608 — same in all 5 sections */}
      {/* Section 1 — centered */}
      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          {/* Group 1: label + heading (2 / 8 / 2) */}
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className="text-sm font-medium tracking-[0.12em] text-white/70">
                    All astronomy
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full pl-24">
                  <span>
                    <p className="-mt-6 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      Discover the cosmos.
                    </p>
                  </span>
                  <span>
                    <p className="-mt-4 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      Experience space. 
                    </p>
                  </span>   
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>

          {/* Group 2: image + description, centered — landscape, full width */}
          <div className="flex w-full flex-col items-center gap-8">
            <div className="relative w-full max-w-[96%] max-h-[680px] aspect-video flex-shrink-0">
              <Image
                src="/images/nasa5.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/90">
              The universe is vast, ancient, and endlessly beautiful. Each day brings a new image, 
              a new story, and a new reason to look up. Explore NASA's Astronomy Picture of 
              the Day and see the cosmos like never before.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — same layout as Section 1, no All astronomy */}
      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]" />
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start justify-center">
                <div className="w-full text-center">
                  <span>
                    <p className="-mt-6 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-center w-full">
                      Smart themes that 
                    </p>
                  </span>
                  <span>
                    <p className="-mt-4 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-center w-full">
                      change overtime.
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <div className="relative w-full max-w-[96%] max-h-[780px] aspect-video flex-shrink-0">
              <Image
                src="/images/nasa1.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/90">
            Users can explore astronomy through curated themes that evolve with the cosmos itself. 
            Its actively curated by a natural language processing (NLP) algorithm that these make 
            the themes intelligently adapt over time, reflecting recent discoveries, trending events, 
            and the ever changing narrative of space exploration.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — same layout as Section 1, no All astronomy */}
      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]" />
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start justify-center">
                <div className="w-full">
                  <span>
                    <p className="-mt-6 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      Follow space missions
                    </p>
                  </span>
                  <span>
                    <p className="-mt-4 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                       and events.
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <div className="relative w-full max-w-[96%] max-h-[780px] aspect-video flex-shrink-0 overflow-hidden">
              <Image
                src="/images/nasahand.png"
                alt=""
                fill
                className="object-contain"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-[58%] h-32 w-[26%] -translate-x-1/2 bg-[linear-gradient(to_top,rgba(13,13,14,0.5)_0%,rgba(13,13,14,0.2)_40%,transparent_100%)]"
                aria-hidden
              />
            </div>
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/90">
              Designed to leverage the NLP's ability to understand context and meaning, it 
              automatically groups space mission updates from astronomy images into curated 
              collections. This AI-powered curation transforms how users discover and follow 
              ongoing space explorations, presenting mission progress as a cohesive narrative 
              rather than scattered updates.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — same layout as Section 1, no All astronomy */}
      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]" />
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full pl-44">
                  <span>
                    <p className="-mt-6 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      Discover rare events
                    </p>
                  </span>
                  <span>
                    <p className="-mt-4 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      and recent discoveries.
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <div className="relative w-full max-w-[96%] max-h-[780px] aspect-video flex-shrink-0">
              <Image
                src="/images/nasa2.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/90">
              Rare cosmic events and groundbreaking discoveries are intelligently organized through
              semantic categorization. The natural language processing system understands meaning 
              and context, grouping related phenomena in ways that reveal deeper connections. 
              This approach transforms how users explore the cosmos, rather than just browsing 
              images, they uncover the stories that connect them.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — same layout as Section 1, no All astronomy */}
      <section className="relative z-10 w-full min-h-[720px] bg-[#0D0D0E] flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]" />
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full pl-24">
                  <span>
                    <p className="-mt-6 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      A new way to look up and appreciate 
                    </p>
                  </span>
                  <span>
                    <p className="-mt-4 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      NASA's Image of the Day.
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <div className="relative w-full max-w-[96%] max-h-[780px] aspect-video flex-shrink-0">
              <Image
                src="/images/nasa3.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/90">
              The NASA Astronomy Picture of the Day view was designed to let the image stand alone first, 
              allowing users to appreciate the details without distraction. Only when they slide / swipe 
              up do they discover the story behind the image such as its name, description, and the wonder 
              it represents. This intentional moment of pause transforms viewing into an experience of discovery 
              unlike the alternative apps.
            </p>
          </div>
        </div>
      </section>

      {/* Design implementation */}
      <section className="relative z-10 w-full min-h-[720px] bg-black flex flex-col text-white">
        {/* Gradient blend: #0D0D0E → black at top */}
        <div
          className="h-8 w-full shrink-0"
          style={{ background: "linear-gradient(to bottom, #0D0D0E, #000000)" }}
          aria-hidden
        />
        <div className="mx-[9px] px-5 w-full pt-12 pb-24 flex flex-1 flex-col gap-10">
          {/* Group 1: label + heading (2 / 8 / 2) */}
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className="text-sm font-medium tracking-[0.12em] text-white/70">
                    Design Implementation
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full pl-24">
                  {/* <span>
                    <p className="-mt-6 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      Discover the cosmos.
                    </p>
                  </span>
                  <span>
                    <p className="-mt-4 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      Experience space.
                    </p>
                  </span> */}
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full" />
              </div>
            </div>
          </div>

          {/* Group 2: two cards with image placeholders + description */}
          <div className="flex w-full flex-col items-center gap-8">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex w-[588px] shrink-0 flex-col items-center">
                <div className="flex h-[465px] w-[588px] items-center justify-center overflow-hidden rounded-[28px] bg-white/5 p-6 md:p-8">
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="relative h-[417px] w-[192px] shrink-0 overflow-hidden rounded-[16px] bg-white/10">
                      <video
                        src="/images/swipe1.mp4"
                        className="h-full w-full rounded-[16px] object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-4 w-full text-[0.958rem] leading-relaxed text-white/90">
                When the user taps on the image, the aniamted caret serves as a signifier 
                for the swipe affordance
                </p>
              </div>
              <div className="flex w-[588px] shrink-0 flex-col items-center">
                <div className="flex h-[465px] w-[588px] items-center justify-center overflow-hidden rounded-[28px] bg-white/5 p-6 md:p-8">
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="relative h-[417px] w-[192px] shrink-0 overflow-hidden rounded-[16px] bg-white/10">
                      <video
                        src="/images/swipe2.mp4"
                        className="h-full w-full rounded-[16px] object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-4 w-full text-[0.958rem] leading-relaxed text-white/90">
                  The swipe animation only minimizes the image to reveal some information 
                  about the image to reduce cognitice load and enhace the experiecne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 duplicate — after Design Implementation */}
      <section className="relative z-10 w-full min-h-[720px] bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-24 flex flex-col gap-10">
          {/* <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-2 px-[10px]" />
            <div className="col-span-12 md:col-span-8 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full pl-24">
                  {/* <span>
                    <p className="-mt-6 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      A new way to look up and appreciate
                    </p>
                  </span>
                  <span>
                    <p className="-mt-4 bg-gradient-to-r from-[#006C48] to-[#A13462] bg-clip-text text-[48px] font-normal tracking-[0.03em] text-transparent text-left w-full">
                      NASA&apos;s Image of the Day.
                    </p>
                  </span> 
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 px-[10px]" />
          </div> */}
          <div className="flex w-full flex-col items-center gap-8">
            <div className="relative w-full max-w-[96%] max-h-[780px] aspect-video flex-shrink-0">
              <Image
                src="/images/xcodeapp.png"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <p className="max-w-2xl text-center text-[0.958rem] leading-relaxed text-white/90">
              Process of building all-astronomy app on xcode
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility & motion */}
      {/* <section className="relative z-10 w-full bg-black px-xs lg:px-sm flex items-center justify-center text-white">
        <div className="mx-auto pb-[100px] flex w-full max-w-[960px] flex-col gap-md text-left">
          <h2 className="text-sm font-medium tracking-[0.12em] uppercase text-white/70">
            Accessibility & motion
          </h2>
          <p className="max-w-2xl text-body leading-relaxed text-white/95">
            Although the work is visually rich, the interaction model is built to feel
            calm and readable: large type, predictable focus order, and motion that
            respects system settings. For people who prefer reduced motion, the hero
            treatment softens into a static composition and transitions rely on opacity
            and scale instead of long camera moves.
          </p>
        </div>
      </section> */}

      {/* Outcomes & next steps */}
      <section className="relative z-10 w-full bg-black flex justify-center text-white">
        <div className="mx-[9px] px-5 w-full py-[100px]">
          <div className="grid w-full grid-cols-12 gap-lg text-left">
            <div className="col-span-12 md:col-span-3 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h2 className="text-base font-medium tracking-[0.12em] text-white/70">
                    Coming Soon
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-7 px-[10px]">
              <div className="flex h-full items-start">
                <div className="w-full">
                  <h3 className="mb-4 text-[1.5rem] font-medium tracking-[0.02em] text-white">
                    Where this exploration leads
                  </h3>
                  <div className="mt-8 flex flex-col gap-6 text-[0.85rem] text-white/85">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                          01 · Immersive depth for APOD images
                        </p>
                        <p className="mt-1 leading-relaxed">
                        Subtle 3D parallax and scroll‑driven zoom will make each image feel like a window into space, not just a flat photo.
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                          02 · Interactive story layers:
                        </p>
                        <p className="mt-1 leading-relaxed">
                          Tap‑to‑reveal annotations and staged “zoom into the cosmos” views will turn technical APOD descriptions into approachable, guided stories.
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                          03 · Guided journeys
                        </p>
                        <p className="mt-1 leading-relaxed">
                        Short, curated sequences (onboarding, theme selection, guided pathways) will lead people through the cosmos step‑by‑step instead of one image at a time.
                        </p>
                      </div>
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
    </div>
  );
}

