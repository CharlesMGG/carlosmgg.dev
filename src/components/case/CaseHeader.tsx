import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { JEWELS, type World } from "@/data/worlds";

/** Header sticky del case study: /mundos/slug + botón "← VOLVER". */
export function CaseHeader({
  world,
  locale,
  backLabel,
  onClose,
}: {
  world: World;
  locale: Locale;
  backLabel: string;
  /** Overlay: cierra con router.back(). Ruta completa: Link al home. */
  onClose?: () => void;
}) {
  const jewel = JEWELS[world.jewel];

  const backClasses =
    "inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 font-display text-[12px] tracking-[0.12em] text-ink";
  const backStyle = {
    background: "rgba(14,22,51,0.7)",
    border: "1px solid rgba(232,199,122,0.25)",
  };

  return (
    <div
      className="sticky top-0 z-[5] flex items-center justify-between px-[clamp(20px,6vw,80px)] py-[clamp(16px,3vw,26px)]"
      style={{
        background:
          "linear-gradient(#060B1A, rgba(6,11,26,0.6), transparent)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div className="flex items-center gap-3 font-display text-[12px] tracking-[0.18em] text-mist">
        <span
          aria-hidden
          className="h-[9px] w-[9px] rounded-full"
          style={{ background: jewel.from, boxShadow: `0 0 12px ${jewel.from}` }}
        />
        /mundos/{world.slug}
      </div>
      {onClose ? (
        <button type="button" onClick={onClose} className={backClasses} style={backStyle}>
          ← {backLabel}
        </button>
      ) : (
        <Link href={`/${locale}#${world.slug}`} className={backClasses} style={backStyle}>
          ← {backLabel}
        </Link>
      )}
    </div>
  );
}
