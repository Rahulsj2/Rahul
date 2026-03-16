"use client";

import { useEffect, useRef, useState } from "react";

const CAR_WIDTH = 84;
const CAR_HEIGHT = 100;
const GROUND_Y = 0;
const GRAVITY = 420;
const DRAG = 3.2;
const DUST_SPAWN_INTERVAL_MS = 35;
const DUST_LIFETIME_MS = 900;
const DUST_INITIAL_VX_MIN = -200;
const DUST_INITIAL_VX_MAX = -80;
const DUST_INITIAL_VY_MIN = -100;
const DUST_INITIAL_VY_MAX = 30;
const DUST_SIZE_MIN = 4;
const DUST_SIZE_MAX = 14;
const DUST_VELOCITY_THRESHOLD = 100; // only spawn dust when car v > this

// Phase physics — loop: start at center → drive out right → drive in from left → center → repeat
const ACCEL = 180; // px/s² — constant acceleration when speeding off
const DRIVE_IN_V = 220; // px/s — speed when driving in from left toward center
const PAUSE_DURATION_S = 1.4; // single stop in the middle, leaned back
const TILT_BACK_DEG = 6; // lean back when stopped / during pause (before speed off)
const TILT_FORWARD_DEG = -10; // lean forward when first setting off
const TILT_NORMAL_AFTER_V = 160; // once speed exceeds this (px/s), return to 0° (normal)
const WHEELS_IN_SCALE = 0.94; // when stopped / paused
const WHEELS_OUT_SCALE = 1;
const OFF_LEFT_MARGIN = 80; // extra px left of frame when starting drive-in

// Head turn — forward while driving; glance left/right while paused (curious/impatient)
const HEAD_GLANCE_DEG = 12; // max glance angle (degrees)
const HEAD_GLANCE_SPEED = 3.2; // radians per second during pause

// Leg pedaling — subtle bob while moving (SVG is single path, so we suggest motion with rhythm)
const PEDAL_CADENCE = 2 * Math.PI * 1.15; // rad/s (~1.15 Hz)
const PEDAL_BOB_PX = 3; // vertical bob amplitude (px)

type Phase = "paused" | "speeding_off" | "driving_in";

interface DustParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

interface CarState {
  x: number;
  v: number;
  phase: Phase;
  tiltDeg: number;
  scale: number;
  pauseRemaining: number;
  headTurnDeg: number; // positive = glance right, negative = glance left (rotateY)
  pedalPhase: number; // 0..2π, drives pedaling bob while moving
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function DriveOffAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CarState>({
    x: 0,
    v: 0,
    phase: "paused",
    tiltDeg: TILT_BACK_DEG,
    scale: WHEELS_IN_SCALE,
    pauseRemaining: PAUSE_DURATION_S,
    headTurnDeg: 0,
    pedalPhase: 0,
  });
  const [particles, setParticles] = useState<DustParticle[]>([]);
  const lastTimeRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);
  const particleIdRef = useRef(0);
  const rafRef = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    let width = container.offsetWidth;
    const resizeObserver = new ResizeObserver(() => {
      width = containerRef.current?.offsetWidth ?? width;
    });
    resizeObserver.observe(container);

    function spawnDust(x: number) {
      const id = particleIdRef.current++;
      setParticles((prev) => [
        ...prev,
        {
          id,
          x,
          y: GROUND_Y + (Math.random() - 0.3) * 20,
          vx: DUST_INITIAL_VX_MIN + Math.random() * (DUST_INITIAL_VX_MAX - DUST_INITIAL_VX_MIN),
          vy: DUST_INITIAL_VY_MIN + Math.random() * (DUST_INITIAL_VY_MAX - DUST_INITIAL_VY_MIN),
          life: DUST_LIFETIME_MS / 1000,
          maxLife: DUST_LIFETIME_MS / 1000,
          size: DUST_SIZE_MIN + Math.random() * (DUST_SIZE_MAX - DUST_SIZE_MIN),
          opacity: 0.4 + Math.random() * 0.4,
        },
      ]);
    }

    function tick(now: number) {
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.08);
      lastTimeRef.current = now;

      const containerEl = containerRef.current;
      const viewportCenter = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
      const containerLeft = containerEl ? containerEl.getBoundingClientRect().left : 0;
      const xCenterInContainer = viewportCenter - containerLeft - CAR_WIDTH / 2;

      setState((s) => {
        let { x, v, phase, tiltDeg, scale, pauseRemaining, headTurnDeg, pedalPhase } = s;

        // Paused: stop in the middle; glance around
        if (phase === "paused") {
          x = xCenterInContainer;
          v = 0;
          pauseRemaining -= dt;
          tiltDeg += (TILT_BACK_DEG - tiltDeg) * Math.min(1, dt * 6);
          scale += (WHEELS_IN_SCALE - scale) * Math.min(1, dt * 6);
          const pauseElapsed = PAUSE_DURATION_S - pauseRemaining;
          headTurnDeg = HEAD_GLANCE_DEG * Math.sin(pauseElapsed * HEAD_GLANCE_SPEED);
          if (pauseRemaining <= 0) {
            phase = "speeding_off";
            v = 0;
          }
        }

        // Speeding off: look forward, pedaling, lean forward, accelerate, dust
        if (phase === "speeding_off") {
          v += ACCEL * dt;
          x += v * dt;
          pedalPhase = (pedalPhase + dt * PEDAL_CADENCE) % (2 * Math.PI);
          headTurnDeg += (0 - headTurnDeg) * Math.min(1, dt * 8);
          const targetTilt = v >= TILT_NORMAL_AFTER_V ? 0 : TILT_FORWARD_DEG;
          tiltDeg += (targetTilt - tiltDeg) * Math.min(1, dt * 6);
          scale += (WHEELS_OUT_SCALE - scale) * Math.min(1, dt * 6);
          if (now - lastSpawnRef.current >= DUST_SPAWN_INTERVAL_MS && v >= DUST_VELOCITY_THRESHOLD) {
            lastSpawnRef.current = now;
            spawnDust(x + CAR_WIDTH * 0.25);
          }
          // When car has fully left the viewport (off to the right), start driving in from the left
          const carLeftInViewport = containerEl ? containerEl.getBoundingClientRect().left + x : 0;
          if (carLeftInViewport >= (typeof window !== "undefined" ? window.innerWidth : 0)) {
            x = -CAR_WIDTH - OFF_LEFT_MARGIN; // off-screen left in container coords
            v = DRIVE_IN_V;
            phase = "driving_in";
          }
        }

        // Driving in: look forward, pedaling, enter from left, move right toward center
        if (phase === "driving_in") {
          x += v * dt;
          pedalPhase = (pedalPhase + dt * PEDAL_CADENCE) % (2 * Math.PI);
          headTurnDeg += (0 - headTurnDeg) * Math.min(1, dt * 8);
          tiltDeg += (0 - tiltDeg) * Math.min(1, dt * 4); // level out while entering
          scale += (WHEELS_OUT_SCALE - scale) * Math.min(1, dt * 6);
          if (x >= xCenterInContainer) {
            x = xCenterInContainer;
            v = 0;
            phase = "paused";
            pauseRemaining = PAUSE_DURATION_S;
            tiltDeg = TILT_BACK_DEG;
            scale = WHEELS_IN_SCALE;
          }
        }

        return { x, v, phase, tiltDeg, scale, pauseRemaining, headTurnDeg, pedalPhase };
      });

      setParticles((prev) => {
        const next = prev
          .map((p) => {
            const life = p.life - dt;
            if (life <= 0) return null;
            const vx = p.vx * Math.exp(-DRAG * dt);
            const vy = p.vy + GRAVITY * dt;
            return {
              ...p,
              x: p.x + vx * dt,
              y: p.y + vy * dt,
              vx,
              vy,
              life,
              opacity: (life / p.maxLife) * p.opacity,
            };
          })
          .filter((p): p is DustParticle => p !== null);
        return next;
      });

      rafRef.current = requestAnimationFrame(tick);
    }

    lastTimeRef.current = performance.now();
    lastSpawnRef.current = lastTimeRef.current;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="relative h-32 w-full flex items-end justify-center overflow-hidden" aria-hidden>
        <img
          src="/images/a11y.svg"
          alt=""
          className="h-[100px] w-[84px] object-contain opacity-90"
        />
      </div>
    );
  }

  const transform = `scale(${state.scale}) rotate(${state.tiltDeg}deg)`;
  const transformOrigin = "50% 100%";

  return (
    <div
      ref={containerRef}
      className="relative h-40 w-full overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gray-400/80 pointer-events-none"
          style={{
            left: p.x,
            bottom: -p.y,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            transform: `translate(-50%, 50%)`,
          }}
        />
      ))}
      <div
        className="absolute bottom-0 will-change-transform"
        style={{
          left: state.x,
          width: CAR_WIDTH,
          height: CAR_HEIGHT,
          transform,
          transformOrigin,
        }}
      >
        {/* Head turn + pedaling bob: forward when driving; glance when paused; bob when moving */}
        <div
          className="w-full h-full"
          style={{
            transform: `translateY(${(state.phase === "speeding_off" || state.phase === "driving_in") ? PEDAL_BOB_PX * Math.sin(state.pedalPhase) : 0}px) perspective(140px) rotateY(${state.headTurnDeg}deg)`,
            transformOrigin: "50% 35%", // pivot near head area
          }}
        >
          <img
            src="/images/a11y.svg"
            alt=""
            className="w-full h-full object-contain object-bottom"
          />
        </div>
      </div>
    </div>
  );
}
