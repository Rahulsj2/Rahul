"use client";

import { useEffect, useRef } from "react";

const W = 640;
const H = 360;
// 2x display size, same quality (backing buffer scales with this)
const DISPLAY_SCALE = 2;

const easeOut3 = (t: number) => 1 - Math.pow(1 - t, 3);
const easeIn3 = (t: number) => t * t * t;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

const GROUND_Y = 265;
const ICON_SCALE = 1.15;
const WHEEL_LOCAL_X = 31;
const WHEEL_LOCAL_Y = 72;
const WHEEL_LOCAL_R = 27;
const EXHAUST_LOCAL_X = 4;
const EXHAUST_LOCAL_Y = 68;

// Head turn during idle (match About section: glance left/right)
const HEAD_GLANCE_RAD = (12 * Math.PI) / 180; // ~12 deg in rad
const HEAD_GLANCE_SPEED = 3.2; // rad/s

const SEQ = {
  ENTER: { s: 0, e: 2.5 },
  BRAKE: { s: 2.5, e: 3.3 },
  IDLE: { s: 3.3, e: 5.8 },
  LURCH: { s: 5.8, e: 6.4 },
  EXIT: { s: 6.4, e: 9.0 },
};

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    life: number,
    size: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
    this.size = size;
    this.color = color;
  }
  update(dt: number) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += 20 * dt;
    this.vx *= 0.97;
    this.life -= dt;
  }
  draw(ctx: CanvasRenderingContext2D) {
    const a = clamp(this.life / this.maxLife, 0, 1);
    ctx.save();
    ctx.globalAlpha = a * 0.55;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * a, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class ExhaustPuff {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  r: number;
  vx: number;
  vy: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.life = 0.8;
    this.maxLife = 0.8;
    this.r = 3 + Math.random() * 3;
    this.vx = -18 - Math.random() * 10;
    this.vy = -5 - Math.random() * 8;
  }
  update(dt: number) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy *= 0.93;
    this.vx *= 0.92;
    this.r += 4 * dt;
    this.life -= dt;
  }
  draw(ctx: CanvasRenderingContext2D) {
    const a = clamp(this.life / this.maxLife, 0, 1) * 0.25;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = "#aaa";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function getState(t: number) {
  const STOP_X = W * 0.48;
  const START_X = -130;
  const EXIT_X = W + 150;
  let x = START_X,
    bobY = 0,
    speed = 0,
    alpha = 1;
  let wheelAngle = 0,
    tilt = 0,
    headTurn = 0;
  let phase = "enter";

  if (t < SEQ.ENTER.e) {
    const raw = clamp((t - SEQ.ENTER.s) / (SEQ.ENTER.e - SEQ.ENTER.s), 0, 1);
    const eased = easeOut3(raw);
    x = lerp(START_X, STOP_X, eased);
    speed = (STOP_X - START_X) * (1 - raw) * 0.6 + 80;
    alpha = clamp(t / 0.3, 0, 1);
    bobY = Math.sin(t * 18) * 1.8 * clamp(raw * 4, 0, 1);
    tilt = lerp(-0.05, 0, easeOut3(raw));
    wheelAngle = (x - START_X) / (WHEEL_LOCAL_R * ICON_SCALE) * -1;
    phase = "enter";
  } else if (t < SEQ.BRAKE.e) {
    const raw = clamp((t - SEQ.BRAKE.s) / (SEQ.BRAKE.e - SEQ.BRAKE.s), 0, 1);
    const overshoot = Math.sin(raw * Math.PI) * 10 * (1 - raw);
    const decel = easeOut3(raw);
    x = STOP_X + overshoot * (1 - decel);
    bobY = lerp(1.8, 0, decel) * Math.sin(t * 18 * (1 - raw));
    speed = lerp(200, 0, decel);
    tilt = lerp(0.18, 0, easeOut3(raw));
    const enterDist = STOP_X - START_X;
    wheelAngle = (enterDist / (WHEEL_LOCAL_R * ICON_SCALE)) * -1;
    wheelAngle += ((speed * (t - SEQ.BRAKE.s)) / (WHEEL_LOCAL_R * ICON_SCALE)) * -0.5;
    phase = "brake";
  } else if (t < SEQ.IDLE.e) {
    const idleT = t - SEQ.IDLE.s;
    x = STOP_X;
    bobY = Math.sin(idleT * 3.5) * 1.0;
    speed = 0;
    tilt = 0;
    headTurn = HEAD_GLANCE_RAD * Math.sin(idleT * HEAD_GLANCE_SPEED);
    const enterDist = STOP_X - START_X;
    wheelAngle = (enterDist / (WHEEL_LOCAL_R * ICON_SCALE)) * -1;
    phase = "idle";
  } else if (t < SEQ.LURCH.e) {
    const raw = clamp((t - SEQ.LURCH.s) / (SEQ.LURCH.e - SEQ.LURCH.s), 0, 1);
    const lurch = easeIn3(raw) * 0.4 + raw * 0.6;
    x = STOP_X + lurch * 60;
    bobY = Math.sin(raw * 25) * 2.5 * (1 - raw * 0.5);
    speed = lerp(0, 280, easeIn3(raw));
    tilt = lerp(-0.18, 0, easeOut3(raw));
    const enterDist = STOP_X - START_X;
    wheelAngle = (enterDist + (x - STOP_X)) / (WHEEL_LOCAL_R * ICON_SCALE) * -1;
    phase = "lurch";
  } else if (t < SEQ.EXIT.e) {
    const raw = clamp((t - SEQ.EXIT.s) / (SEQ.EXIT.e - SEQ.EXIT.s), 0, 1);
    const eased = easeIn3(raw);
    x = lerp(STOP_X + 60, EXIT_X, eased);
    speed = lerp(280, 420, raw);
    bobY = Math.sin(t * 20) * 2.2;
    tilt = 0;
    wheelAngle = (x - START_X) / (WHEEL_LOCAL_R * ICON_SCALE) * -1;
    alpha = clamp((SEQ.EXIT.e - t) / 0.5, 0, 1);
    phase = "exit";
  } else {
    alpha = 0;
    phase = "done";
  }
  return { x, bobY, speed, wheelAngle, tilt, alpha, phase, headTurn };
}

function drawGround(ctx: CanvasRenderingContext2D) {
  const grad = ctx.createLinearGradient(0, GROUND_Y, 0, H);
  grad.addColorStop(0, "rgba(255,255,255,0.06)");
  grad.addColorStop(0.3, "rgba(255,255,255,0.02)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y);
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(W, GROUND_Y);
  ctx.stroke();
  ctx.restore();
}

function drawShadow(
  ctx: CanvasRenderingContext2D,
  cx: number,
  speed: number,
  alpha: number
) {
  const scaleX = lerp(1.0, 1.3, clamp(speed / 300, 0, 1));
  ctx.save();
  ctx.globalAlpha = lerp(0.18, 0.08, clamp(speed / 300, 0, 1)) * alpha;
  const grad = ctx.createRadialGradient(
    cx,
    GROUND_Y + 2,
    2,
    cx,
    GROUND_Y + 4,
    50 * scaleX
  );
  grad.addColorStop(0, "#000");
  grad.addColorStop(1, "transparent");
  ctx.fillStyle = grad;
  ctx.scale(scaleX, 0.35);
  ctx.beginPath();
  ctx.arc(cx / scaleX, (GROUND_Y + 4) / 0.35, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawIconPaths(
  ctx: CanvasRenderingContext2D,
  ox: number,
  oy: number,
  sc: number
) {
  ctx.strokeStyle = "#4a4a4a";
  ctx.lineWidth = 2 * sc;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.fillStyle = "none";
  ctx.beginPath();
  ctx.moveTo(ox + 76.7163 * sc, oy + 87.6667 * sc);
  ctx.lineTo(ox + 82.133 * sc, oy + 49.75 * sc);
  ctx.lineTo(ox + 49.633 * sc, oy + 55.1667 * sc);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ox + 6.29963 * sc, oy + 28.0833 * sc);
  ctx.lineTo(ox + 22.5496 * sc, oy + 11.8333 * sc);
  ctx.lineTo(ox + 52.3413 * sc, oy + 28.0833 * sc);
  ctx.lineTo(ox + 39.558 * sc, oy + 47.0417 * sc);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ox + 2.18306 * sc, oy + 63.2917 * sc);
  ctx.bezierCurveTo(
    ox + 0.654674 * sc, oy + 68.2916 * sc,
    ox + 0.606165 * sc, oy + 73.627 * sc,
    ox + 2.04338 * sc, oy + 78.6539 * sc
  );
  ctx.bezierCurveTo(
    ox + 3.4806 * sc, oy + 83.6808 * sc,
    ox + 6.3421 * sc, oy + 88.1842 * sc,
    ox + 10.2825 * sc, oy + 91.6206 * sc
  );
  ctx.bezierCurveTo(
    ox + 14.2228 * sc, oy + 95.0569 * sc,
    ox + 19.0736 * sc, oy + 97.2793 * sc,
    ox + 24.2493 * sc, oy + 98.0195 * sc
  );
  ctx.bezierCurveTo(
    ox + 29.4249 * sc, oy + 98.7596 * sc,
    ox + 34.7041 * sc, oy + 97.9859 * sc,
    ox + 39.4497 * sc, oy + 95.7917 * sc
  );
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ox + 53.7497 * sc, oy + 79.5415 * sc);
  ctx.bezierCurveTo(
    ox + 55.278 * sc, oy + 74.5416 * sc,
    ox + 55.3265 * sc, oy + 69.2062 * sc,
    ox + 53.8893 * sc, oy + 64.1793 * sc
  );
  ctx.bezierCurveTo(
    ox + 52.4521 * sc, oy + 59.1524 * sc,
    ox + 49.5906 * sc, oy + 54.649 * sc,
    ox + 45.6502 * sc, oy + 51.2126 * sc
  );
  ctx.bezierCurveTo(
    ox + 41.7099 * sc, oy + 47.7763 * sc,
    ox + 36.8591 * sc, oy + 45.5539 * sc,
    ox + 31.6835 * sc, oy + 44.8137 * sc
  );
  ctx.bezierCurveTo(
    ox + 26.5078 * sc, oy + 44.0736 * sc,
    ox + 21.2286 * sc, oy + 44.8473 * sc,
    ox + 16.483 * sc, oy + 47.0415 * sc
  );
  ctx.stroke();
  // Head is drawn separately in drawIcon with headTurn rotation
}

const HEAD_CX = 65.883;
const HEAD_CY = 6.41667;
const HEAD_R = 5.4165;

function drawIcon(
  ctx: CanvasRenderingContext2D,
  x: number,
  bobY: number,
  wheelAngle: number,
  tilt: number,
  alpha: number,
  speed: number,
  headTurn: number
) {
  const sc = ICON_SCALE;
  const wheelBottomLocal = (WHEEL_LOCAL_Y + WHEEL_LOCAL_R) * sc;
  const ox = x - 42 * sc;
  const oy = GROUND_Y - wheelBottomLocal + bobY;
  const pivotX = ox + WHEEL_LOCAL_X * sc;
  const pivotY = oy + WHEEL_LOCAL_Y * sc;
  const headX = ox + HEAD_CX * sc;
  const headY = oy + HEAD_CY * sc;
  ctx.save();
  ctx.globalAlpha = alpha;
  const blur = clamp(speed / 250, 0, 1);
  if (blur > 0.05) {
    ctx.save();
    ctx.globalAlpha = alpha * 0.18 * blur;
    ctx.translate(pivotX, pivotY);
    ctx.rotate(tilt);
    ctx.translate(-pivotX - speed * 0.025, -pivotY);
    drawIconPaths(ctx, ox - speed * 0.025, oy, sc);
    ctx.restore();
  }
  ctx.translate(pivotX, pivotY);
  ctx.rotate(tilt);
  ctx.translate(-pivotX, -pivotY);
  drawIconPaths(ctx, ox, oy, sc);
  // Head with look-around rotation (same as About section)
  ctx.save();
  ctx.translate(headX, headY);
  ctx.rotate(headTurn);
  ctx.strokeStyle = "#4a4a4a";
  ctx.lineWidth = 2 * sc;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.arc(0, 0, HEAD_R * sc, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  ctx.restore();
}

let dustTimer = 0;
let exhaustTimer = 0;

function spawnDust(
  x: number,
  bobY: number,
  speed: number,
  phase: string,
  dt: number,
  particles: Particle[],
  exhausts: ExhaustPuff[]
) {
  const sc = ICON_SCALE;
  const oy = GROUND_Y - (WHEEL_LOCAL_Y + WHEEL_LOCAL_R) * sc + bobY;
  const ox = x - 42 * sc;
  const wcx = ox + WHEEL_LOCAL_X * sc;
  const wcy = oy + WHEEL_LOCAL_Y * sc + WHEEL_LOCAL_R * sc;
  if ((phase === "enter" || phase === "exit") && speed > 30) {
    dustTimer += dt;
    const rate = lerp(0.04, 0.015, clamp(speed / 300, 0, 1));
    while (dustTimer > rate) {
      dustTimer -= rate;
      const spread = clamp(speed / 80, 0.5, 3);
      for (let i = 0; i < 2; i++) {
        particles.push(
          new Particle(
            wcx - 8 + Math.random() * 6,
            wcy - 2 + Math.random() * 4,
            -speed * 0.15 - Math.random() * 30,
            -20 - Math.random() * 40,
            0.6 + Math.random() * 0.5,
            3 + Math.random() * spread,
            `hsl(0,0%,${55 + Math.random() * 20}%)`
          )
        );
      }
    }
  }
  if (phase === "brake") {
    for (let i = 0; i < 3; i++) {
      particles.push(
        new Particle(
          wcx + Math.random() * 12 - 4,
          wcy - Math.random() * 8,
          -80 - Math.random() * 60,
          -60 - Math.random() * 60,
          0.9 + Math.random() * 0.4,
          5 + Math.random() * 4,
          `hsl(0,0%,${70 + Math.random() * 20}%)`
        )
      );
    }
  }
  if (phase === "lurch") {
    for (let i = 0; i < 4; i++) {
      particles.push(
        new Particle(
          wcx - 4 + Math.random() * 8,
          wcy + Math.random() * 4,
          -40 - Math.random() * 80,
          -30 - Math.random() * 60,
          0.7 + Math.random() * 0.5,
          4 + Math.random() * 4,
          `hsl(0,0%,${60 + Math.random() * 25}%)`
        )
      );
    }
  }
  if (phase === "idle") {
    exhaustTimer += dt;
    if (exhaustTimer > 0.22) {
      exhaustTimer = 0;
      exhausts.push(
        new ExhaustPuff(ox + EXHAUST_LOCAL_X * sc, oy + EXHAUST_LOCAL_Y * sc)
      );
    }
  }
}

export function A11yDriveCardAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Backing store: DISPLAY_SCALE for bigger size + dpr for sharp rendering
    const dpr = Math.min(
      typeof window !== "undefined" ? window.devicePixelRatio : 1,
      3
    );
    const scale = DISPLAY_SCALE * dpr;
    canvas.width = W * scale;
    canvas.height = H * scale;
    ctx.scale(scale, scale);

    let startTime: number | null = null;
    let lastTs = 0;
    let particles: Particle[] = [];
    let exhausts: ExhaustPuff[] = [];
    dustTimer = 0;
    exhaustTimer = 0;

    function render(ts: number) {
      if (!startTime) {
        startTime = ts;
        lastTs = ts;
      }
      const t = (ts - startTime) / 1000;
      const dt = clamp((ts - lastTs) / 1000, 0, 0.05);
      lastTs = ts;

      ctx.clearRect(0, 0, W, H);
      drawGround(ctx);
      const { x, bobY, speed, wheelAngle, tilt, alpha, phase, headTurn } =
        getState(t);
      spawnDust(x, bobY, speed, phase, dt, particles, exhausts);

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update(dt);
        particles[i].draw(ctx);
        if (particles[i].life <= 0) particles.splice(i, 1);
      }
      for (let i = exhausts.length - 1; i >= 0; i--) {
        exhausts[i].update(dt);
        exhausts[i].draw(ctx);
        if (exhausts[i].life <= 0) exhausts.splice(i, 1);
      }

      const sc = ICON_SCALE;
      const iconCX = x - 42 * sc + WHEEL_LOCAL_X * sc;
      drawShadow(ctx, iconCX, speed, alpha);
      if (alpha > 0) {
        drawIcon(ctx, x, bobY, wheelAngle, tilt, alpha, speed, headTurn);
      }
      if (t > SEQ.EXIT.e + 0.5) {
        startTime = null;
        particles = [];
        exhausts = [];
      }
      rafId = requestAnimationFrame(render);
    }

    let rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#141414]">
      <canvas
        ref={canvasRef}
        className="h-full w-full object-contain"
        style={{
          width: W * DISPLAY_SCALE,
          height: H * DISPLAY_SCALE,
          maxHeight: "100%",
          maxWidth: "100%",
        }}
        aria-hidden
      />
    </div>
  );
}
