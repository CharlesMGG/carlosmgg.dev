import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { JEWELS, type World } from "@/data/worlds";

/**
 * Tarjeta del sitio en vivo: la captura dentro de un marco de navegador, con
 * el dominio a la vista. Es la prueba de que el mundo existe fuera del
 * portafolio — se abre en pestaña nueva.
 */
export function LiveSiteCard({
  world,
  locale,
  cta,
}: {
  world: World;
  locale: Locale;
  cta: string;
}) {
  if (!world.liveUrl || !world.livePreview) return null;

  const jewel = JEWELS[world.jewel];
  const shot = world.livePreview;
  const host = new URL(world.liveUrl).host;

  return (
    <a
      href={world.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-[16px] transition-[transform,box-shadow] duration-[400ms] ease-[cubic-bezier(.2,.7,.3,1)] hover:-translate-y-1"
      style={{
        background: "rgba(10,16,36,0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${jewel.glow}`,
        boxShadow: `0 30px 70px -42px ${jewel.from}`,
      }}
    >
      {/* Barra de navegador — los puntos y el dominio real */}
      <div
        className="flex items-center gap-[7px] px-3.5 py-2.5"
        style={{ borderBottom: "1px solid rgba(150,161,188,0.18)" }}
      >
        {["rgba(150,161,188,0.35)", "rgba(150,161,188,0.25)", "rgba(150,161,188,0.18)"].map(
          (bg) => (
            <span
              key={bg}
              aria-hidden
              className="h-[9px] w-[9px] rounded-full"
              style={{ background: bg }}
            />
          ),
        )}
        <span
          className="ml-1.5 min-w-0 truncate rounded-full px-2.5 py-1 font-display text-[11px] tracking-[0.04em] text-mist"
          style={{
            background: "rgba(6,11,26,0.6)",
            border: "1px solid rgba(150,161,188,0.18)",
          }}
        >
          {host}
        </span>
      </div>

      <Image
        src={shot.src}
        width={shot.width}
        height={shot.height}
        alt={shot.alt[locale]}
        sizes="(min-width: 920px) 860px, 100vw"
        className="h-auto w-full transition-transform duration-[600ms] ease-[cubic-bezier(.2,.7,.3,1)] group-hover:scale-[1.02]"
      />

      <div
        className="flex items-center justify-between gap-3 px-4 py-3"
        style={{ borderTop: "1px solid rgba(150,161,188,0.18)" }}
      >
        <span className="truncate font-display text-[12px] tracking-[0.14em] text-mist">
          {world.origin}
        </span>
        <span className="shrink-0 font-display text-[12px] font-bold tracking-[0.08em] text-gold">
          {cta} ↗
        </span>
      </div>
    </a>
  );
}
