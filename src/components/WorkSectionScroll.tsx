"use client";

import { useLayoutEffect, useRef } from "react";

function resetScroll(el: HTMLElement | null) {
  if (el) el.scrollLeft = 0;
}

export function WorkSectionScroll({
  children,
  className,
  style,
  scrollClassName,
  ...props
}: React.ComponentProps<"div"> & { scrollClassName?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    resetScroll(el);
    const raf = requestAnimationFrame(() => {
      resetScroll(el);
    });
    const t = setTimeout(() => resetScroll(el), 0);
    const t2 = setTimeout(() => resetScroll(el), 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`${scrollClassName ?? "work-section-scroll"} ${className ?? ""}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}
