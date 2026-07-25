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

/**
 * Starfield del handoff: 130 estrellas que titilan en su sitio, ~22% doradas.
 * Con prefers-reduced-motion se pinta un solo frame estático.
 */
export function Starfield({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;
    let t = 0;

    const stars: Star[] = Array.from({ length: 130 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.3,
      speed: Math.random() * 0.9 + 0.2,
      phase: Math.random() * Math.PI * 2,
      gold: Math.random() < 0.22,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const paintStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = star.gold ? "#E8C77A" : "#C8CFDE";
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resizeAndPaint = () => {
      resize();
      if (reduced) paintStatic();
    };
    resizeAndPaint();
    const observer = new ResizeObserver(resizeAndPaint);
    observer.observe(canvas);

    if (reduced) {
      return () => observer.disconnect();
    }

    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        const alpha = 0.35 + 0.45 * Math.sin(t * star.speed + star.phase);
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = star.gold ? "#E8C77A" : "#C8CFDE";
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
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
