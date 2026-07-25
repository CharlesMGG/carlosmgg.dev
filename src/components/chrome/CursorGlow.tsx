"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor de KH: punto dorado que va pegado al mouse + anillo que lo
 * persigue con lerp y crece sobre elementos interactivos. Oculta el
 * cursor nativo (clase .kh-cursor en <body>). Off en touch/reduced-motion.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.body.classList.add("kh-cursor");
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const el = event.target as Element | null;
      const interactive = el?.closest?.("a, button, [role=button]");
      ring.style.width = interactive ? "52px" : "34px";
      ring.style.height = interactive ? "52px" : "34px";
      ring.style.margin = interactive ? "-26px 0 0 -26px" : "-17px 0 0 -17px";
      ring.style.borderColor = interactive
        ? "rgb(232 199 122 / 1)"
        : "rgb(232 199 122 / 0.7)";
    };

    const follow = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(follow);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(follow);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("kh-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-[34px] w-[34px] rounded-full border opacity-0 mix-blend-screen md:block"
        style={{
          margin: "-17px 0 0 -17px",
          borderColor: "rgb(232 199 122 / 0.7)",
          transition: "width .18s, height .18s, margin .18s, border-color .18s",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 rounded-full bg-gold opacity-0 md:block"
        style={{ margin: "-3px 0 0 -3px", boxShadow: "0 0 12px 2px rgb(232 199 122 / 0.8)" }}
      />
    </>
  );
}
