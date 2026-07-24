"use client";

import { useEffect, useRef } from "react";

/**
 * Aura dorada que sigue al cursor con retraso (lerp). No sustituye al
 * cursor nativo; solo lo acompaña. Se apaga en touch y reduced-motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;

    let x = -100;
    let y = -100;
    let tx = -100;
    let ty = -100;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      tx = event.clientX;
      ty = event.clientY;
      const interactive = (event.target as Element | null)?.closest?.(
        "a, button, [role=button]",
      );
      targetScale = interactive ? 2.2 : 1;
    };

    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      scale += (targetScale - scale) * 0.15;
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[65] hidden h-8 w-8 rounded-full border border-gold/50 md:block"
      style={{
        transform: "translate(-100px, -100px)",
        boxShadow: "0 0 18px rgb(232 199 122 / 0.25)",
        transition: "opacity 0.3s",
      }}
    />
  );
}
