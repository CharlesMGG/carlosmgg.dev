"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
  gold: boolean;
};

/** Polvo de estrellas en canvas 2D. Se apaga con prefers-reduced-motion. */
export function Starfield({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let t = 0;

    const stars: Star[] = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.3,
      speed: 0.002 + Math.random() * 0.006,
      phase: Math.random() * Math.PI * 2,
      gold: Math.random() < 0.35,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const tick = () => {
      t += 1 / 60;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const y = (star.y - t * star.speed + 1) % 1;
        const alpha = 0.2 + 0.45 * Math.abs(Math.sin(t * 0.7 + star.phase));
        ctx.beginPath();
        ctx.arc(star.x * width, y * height, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.gold
          ? `rgb(232 199 122 / ${alpha})`
          : `rgb(242 244 248 / ${alpha * 0.7})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
