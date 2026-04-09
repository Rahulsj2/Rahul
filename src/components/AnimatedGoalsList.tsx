"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedGoalsList({
  goals,
  bodyClassName,
}: {
  goals: string[];
  bodyClassName: string;
}) {
  const ref = useRef<HTMLUListElement | null>(null);
  const [inView, setInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { root: null, threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = () => setReduceMotion(Boolean(mq.matches));
    onChange();

    // Safari supports addListener/removeListener
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
    // eslint-disable-next-line deprecation/deprecation
    mq.addListener(onChange);
    // eslint-disable-next-line deprecation/deprecation
    return () => mq.removeListener(onChange);
  }, []);

  const shouldAnimate = inView && !reduceMotion;

  return (
    <ul ref={ref} className="m-0 list-none space-y-4 p-0">
      {goals.map((text, idx) => (
        <li key={text} className="flex gap-3">
          <span
            className={[
              "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center",
              "transition-[transform,opacity] duration-500 ease-out",
              shouldAnimate ? "opacity-100 scale-100" : "opacity-100 scale-100",
            ].join(" ")}
            style={{ transitionDelay: `${idx * 90}ms` }}
            aria-hidden
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-white/55"
              fill="none"
              aria-hidden
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                pathLength={100}
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: shouldAnimate ? 0 : 100,
                  transitionProperty: "stroke-dashoffset",
                  transitionDuration: "700ms",
                  transitionTimingFunction: "ease-out",
                  transitionDelay: `${idx * 90}ms`,
                }}
              />
              <path
                d="M8.2 12.3l2.4 2.4L16.5 9.3"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={100}
                style={{
                  strokeDasharray: 100,
                  strokeDashoffset: shouldAnimate ? 0 : 100,
                  transitionProperty: "stroke-dashoffset",
                  transitionDuration: "520ms",
                  transitionTimingFunction: "ease-out",
                  transitionDelay: `${idx * 90 + 120}ms`,
                }}
              />
            </svg>
          </span>
          <p className={`m-0 ${bodyClassName}`}>{text}</p>
        </li>
      ))}
    </ul>
  );
}

