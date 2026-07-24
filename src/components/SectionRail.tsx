"use client";

import { useEffect, useState } from "react";

/**
 * Riel lateral de navegación entre slides (estilo fullpage):
 * una raya por sección, la activa se estira y se pinta de oro.
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
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = ids.indexOf(entry.target.id);
            if (index >= 0) setActive(index);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return (
    <nav
      aria-label="Secciones"
      className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <ul className="flex flex-col gap-3">
        {ids.map((id, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={labels[i]}
              aria-current={active === i ? "true" : undefined}
              className="group flex h-3 items-center"
            >
              <span
                aria-hidden
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  active === i
                    ? "w-8 bg-gold"
                    : "w-4 bg-mist/40 group-hover:bg-mist"
                }`}
              />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
