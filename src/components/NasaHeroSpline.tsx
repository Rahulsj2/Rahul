"use client";

import Spline from '@splinetool/react-spline';

const SPLINE_SCENE =
  "https://prod.spline.design/i-O7O9EuhP31mi4n/scene.splinecode";

export function NasaHeroSpline() {
  return (
    <div className="h-full w-full" style={{ minHeight: "100%", minWidth: "100%" }}>
      <Spline scene={SPLINE_SCENE} className="h-full w-full" />
    </div>
  );
}
