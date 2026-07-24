import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { worlds, JEWELS } from "@/data/worlds";
import { PortalLink } from "@/components/portal/PortalLink";
import { Starfield } from "./Starfield";

/**
 * Posiciones de la constelación (coordenadas % sobre el lienzo desktop).
 * `tip` decide si el panel de detalle abre hacia abajo o hacia arriba.
 */
const POSITIONS: Record<string, { x: number; y: number; tip: "down" | "up" }> = {
  "saas-multi-tenant": { x: 16, y: 26, tip: "down" },
  "operacion-en-campo": { x: 47, y: 12, tip: "down" },
  "precios-y-wallet": { x: 80, y: 28, tip: "down" },
  "producto-de-venta": { x: 28, y: 68, tip: "up" },
  taller: { x: 65, y: 70, tip: "up" },
};

/** Orden del trazo que une la constelación (cerrada) */
const TRAIL = [
  "saas-multi-tenant",
  "operacion-en-campo",
  "precios-y-wallet",
  "taller",
  "producto-de-venta",
];

export function WorldMap({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["worlds"];
}) {
  const points = TRAIL.map((slug) => POSITIONS[slug]);
  const polygon = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative md:h-[560px]">
      {/* Polvo de estrellas + líneas: solo decoración, solo desktop */}
      <Starfield className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" />
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
      >
        <polygon
          points={polygon}
          fill="none"
          stroke="rgb(232 199 122 / 0.14)"
          strokeWidth="0.18"
          strokeDasharray="1.4 1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* La lista es semántica; la constelación es solo pintura */}
      <ul className="relative flex flex-col gap-5 md:block md:h-full">
        {worlds.map((world) => {
          const jewel = JEWELS[world.jewel];
          const pos = POSITIONS[world.slug];
          return (
            <li
              key={world.slug}
              className="md:absolute md:-translate-x-1/2 md:-translate-y-1/2"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            >
              <PortalLink
                href={`/${locale}/mundos/${world.slug}`}
                from={jewel.from}
                to={jewel.to}
                className="group relative block rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-0.5 max-md:glass md:w-44 md:p-0 md:hover:translate-y-0"
              >
                {/* Orbe */}
                <span className="flex items-center gap-3 md:flex-col md:gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-6 w-6 shrink-0 rounded-full md:h-16 md:w-16 md:transition-transform md:duration-300 md:group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at 35% 30%, ${jewel.to}, ${jewel.from} 75%)`,
                      boxShadow: `0 0 18px ${jewel.glow}, 0 0 46px ${jewel.glow}`,
                    }}
                  />
                  <span className="md:text-center">
                    <span className="block font-display text-lg font-semibold text-ink md:text-base">
                      {world.title[locale]}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-mist">
                      {world.origin}
                    </span>
                  </span>
                </span>

                {/* Detalle: en móvil fluye en la tarjeta; en desktop es panel al hover/focus */}
                <span
                  className={`mt-4 block md:pointer-events-none md:absolute md:left-1/2 md:z-20 md:mt-0 md:w-72 md:-translate-x-1/2 md:glass md:rounded-2xl md:p-5 md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100 md:group-focus-within:opacity-100 ${
                    pos.tip === "down" ? "md:top-full md:mt-3" : "md:bottom-full md:mb-3"
                  }`}
                >
                  <span className="block text-sm leading-relaxed text-mist">
                    {world.tagline[locale]}
                  </span>
                  <span className="mt-4 grid grid-cols-3 gap-2 border-t border-white/5 pt-3">
                    {world.stats.map((stat) => (
                      <span key={stat.label[locale]} className="block">
                        <span className="block font-mono text-[11px] font-medium leading-snug text-ink">
                          {stat.value[locale]}
                        </span>
                        <span className="mt-0.5 block text-[10px] leading-snug text-mist">
                          {stat.label[locale]}
                        </span>
                      </span>
                    ))}
                  </span>
                  <span className="mt-3 block text-sm font-medium text-gold">
                    {dict.enter} →
                  </span>
                </span>
              </PortalLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
