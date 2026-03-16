"use client";

import { useEffect, useRef } from "react";

export function NasaConvergingDots() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const CHIP_COUNT = 1400;
    const chipBaseColor = "rgba(210, 218, 228, ";
    let magnetX = width * 0.5;
    let magnetY = height * 0.5;
    let maxRadius = Math.min(width, height) * 0.68;
    let ringRadius = Math.min(width, height) * 0.56;
    const blankDuration = 1.0;
    const formDuration = 1.4;
    const startTime = performance.now();

    type Chip = {
      angle: number;
      radius: number;
      targetRadius: number;
      angularVelocity: number;
      inwardSpeed: number;
      size: number;
      jitter: number;
      alphaBase: number;
    };

    const chips: Chip[] = [];

    function spawnChip(fromRing = false): Chip {
      const baseRadius = fromRing ? ringRadius + (Math.random() - 0.5) * 10 : maxRadius * (0.2 + Math.random() * 0.8);
      return {
        angle: Math.random() * Math.PI * 2,
        radius: baseRadius,
        targetRadius: ringRadius + (Math.random() - 0.5) * 16,
        angularVelocity: (Math.random() - 0.5) * 0.02 + (Math.random() > 0.5 ? 1 : -1) * 0.004,
        inwardSpeed: 0.18 + Math.random() * 0.45,
        size: 0.35 + Math.random() * 1.1,
        jitter: 0.2 + Math.random() * 0.45,
        alphaBase: 0.18 + Math.random() * 0.4,
      };
    }

    for (let i = 0; i < CHIP_COUNT; i += 1) {
      chips.push(spawnChip(true));
    }

    function resize() {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      magnetX = width * 0.5;
      magnetY = height * 0.5;
      maxRadius = Math.min(width, height) * 0.68;
      ringRadius = Math.min(width, height) * 0.56;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    window.addEventListener("resize", resize);

    function render() {
      ctx.clearRect(0, 0, width, height);
      const elapsed = (performance.now() - startTime) / 1000;
      const introDone = elapsed >= blankDuration + formDuration;
      const formProgress =
        elapsed <= blankDuration
          ? 0
          : Math.min(1, (elapsed - blankDuration) / formDuration);
      const convergenceBoost = introDone ? Math.min(1, (elapsed - blankDuration - formDuration) / 1.2) : 0;

      if (elapsed < blankDuration) {
        animationFrameId = window.requestAnimationFrame(render);
        return;
      }

      const magnetGlow = ctx.createRadialGradient(
        magnetX,
        magnetY,
        0,
        magnetX,
        magnetY,
        Math.min(width, height) * 0.24
      );
      magnetGlow.addColorStop(0, "rgba(245, 248, 255, 0.18)");
      magnetGlow.addColorStop(0.35, "rgba(170, 185, 220, 0.08)");
      magnetGlow.addColorStop(1, "rgba(12, 12, 12, 0)");
      ctx.fillStyle = magnetGlow;
      ctx.beginPath();
      ctx.arc(magnetX, magnetY, Math.min(width, height) * 0.24, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < chips.length; i += 1) {
        const chip = chips[i];
        const inwardFactor = 1 + (1 - chip.radius / maxRadius) * 2.4;
        chip.angle += chip.angularVelocity * (0.45 + 0.55 * formProgress);

        if (!introDone) {
          chip.radius += (chip.targetRadius - chip.radius) * 0.08;
        } else {
          chip.radius -= chip.inwardSpeed * inwardFactor * (0.35 + 0.65 * convergenceBoost);
        }

        const swirlX = Math.cos(chip.angle * 9 + chip.radius * 0.02) * chip.jitter;
        const swirlY = Math.sin(chip.angle * 8 + chip.radius * 0.02) * chip.jitter;

        const chipX = magnetX + Math.cos(chip.angle) * chip.radius + swirlX;
        const chipY = magnetY + Math.sin(chip.angle) * chip.radius * 0.86 + swirlY;

        if (chip.radius < 8) {
          chips[i] = spawnChip(true);
          continue;
        }

        const alpha = Math.min(
          0.95,
          (chip.alphaBase + (1 - chip.radius / maxRadius) * 0.55) * formProgress
        );
        ctx.fillStyle = `${chipBaseColor}${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(chipX, chipY, chip.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(magnetX, magnetY, 5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(220, 225, 235, 0.75)";
      ctx.fill();

      animationFrameId = window.requestAnimationFrame(render);
    }

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
