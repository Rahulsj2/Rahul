"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { A11yImageCallouts } from "@/components/A11yImageCallouts";

type CalloutId = "1" | "2" | "3";

const IMAGE_BY_CALLOUT: Record<CalloutId, string> = {
  "1": "/images/Focus%20indicator.png",
  "2": "/images/keyboard%20nav.png",
  "3": "/images/aria.png",
};

export function A11yIterationsCard() {
  // Default image matches the first pill (Focus Indicators).
  const [selectedId, setSelectedId] = useState<CalloutId>("1");

  const src = useMemo(() => IMAGE_BY_CALLOUT[selectedId], [selectedId]);

  return (
    <div className="w-full max-w-[96%] rounded-[28px] bg-[#1E1E20] p-8 md:p-10 min-h-[680px] md:min-h-[780px] flex">
      <div className="relative w-full flex-1">
        <A11yImageCallouts
          placement="overlay"
          onSelect={(id) => setSelectedId((id as CalloutId) ?? "1")}
        />
        {/* Reserve space for the pill stack on desktop while still allowing overlay */}
        <div className="flex min-w-0 flex-1 items-center h-full md:pl-[16rem] md:gap-6">
          <Image
            src={src}
            alt="Accessibility iteration — focus, keyboard navigation, and ARIA work"
            width={1400}
            height={875}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 1400px"
            priority
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}

