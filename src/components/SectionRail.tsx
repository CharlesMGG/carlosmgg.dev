"use client";

import { useEffect, useState } from "react";

/**
 * Rail derecho del handoff: punto + label por sección. El activo se pone
 * dorado con glow y su label aparece; clic hace scroll suave dentro del
 * scroller. Solo las secciones con [data-section] cuentan (Instagram queda
 * fuera del rail a propósito).
 */
export function SectionRail({
  ids,
  labels,
}: {
  ids: string[];
  labels: string[];
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = document.getElementById("snap-container");
    if (!container) return;
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target as HTMLElement);
            if (index >= 0) setActive(index);
          }
        }
      },
      { root: container, threshold: 0.55 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const container = document.getElementById("snap-container");
    const el = document.getElementById(id);
    if (!container || !el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    container.scrollTo({ top: el.offsetTop, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <nav
      aria-label="Secciones"
      className="fixed right-[clamp(16px,3vw,40px)] top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-end gap-2 md:flex"
    >
      {ids.map((id, i) => {
        const isActive = active === i;
        return (
          <button
            key={id}
            type="button"
            onClick={() => scrollTo(id)}
            aria-current={isActive ? "true" : undefined}
            // py-[5px] lleva el área de clic de 15px a 25px (mínimo 24 de WCAG
            // 2.5.8) sin mover nada: el gap del nav baja de 18px a 8px, así que
            // el ritmo visual entre puntos sigue siendo el mismo de 33px.
            className="flex items-center gap-2.5 py-[5px] font-display text-[10px] tracking-[0.2em]"
          >
            <span
              className={`transition-all duration-300 ${
                isActive
                  ? "translate-x-0 text-gold opacity-100"
                  : "translate-x-2 text-mist opacity-0"
              }`}
            >
              {labels[i]}
            </span>
            <span
              aria-hidden
              className={`rounded-full transition-all duration-300 ${
                isActive ? "h-2.5 w-2.5" : "h-[7px] w-[7px]"
              }`}
              style={
                isActive
                  ? { background: "#E8C77A", boxShadow: "0 0 12px #E8C77A" }
                  : { background: "rgba(150,161,188,0.5)" }
              }
            />
          </button>
        );
      })}
    </nav>
  );
}
