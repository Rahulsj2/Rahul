"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(
  () =>
    import("@splinetool/react-spline").then((mod) => {
      const Comp = mod.default;
      if (!Comp) {
        return function SplineFallback() {
          return <div className="h-full w-full bg-black" aria-hidden />;
        };
      }
      return Comp;
    }),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-black" aria-hidden />,
  }
);

const SPLINE_SCENE =
  "https://prod.spline.design/i-O7O9EuhP31mi4n/scene.splinecode";

export function NasaHeroSpline() {
  return (
    <div className="h-full w-full" style={{ minHeight: "100%", minWidth: "100%" }}>
      <Spline scene={SPLINE_SCENE} className="h-full w-full" />
    </div>
  );
}
