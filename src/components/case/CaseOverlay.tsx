"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import type { World } from "@/data/worlds";
import { CaseHeader } from "./CaseHeader";
import { CaseStudy } from "./CaseStudy";

/**
 * Overlay del case study (z-index 200) sobre el home, con entrada caseIn.
 * Lo monta la ruta interceptora: al hacer clic en un mundo la URL cambia a
 * /mundos/<slug> pero el home queda debajo; al recargar o entrar directo se
 * renderiza la página completa en su lugar. Cierra con ← VOLVER o Escape.
 */
export function CaseOverlay({
  world,
  index,
  locale,
  dict,
}: {
  world: World;
  index: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const router = useRouter();
  const close = () => router.back();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.back();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [router]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={world.title[locale]}
      className="case-in fixed inset-0 z-[200] overflow-y-auto overflow-x-hidden"
      style={{
        background:
          "radial-gradient(120% 90% at 50% -10%, #0E1633 0%, #060B1A 65%)",
      }}
    >
      <CaseHeader
        world={world}
        locale={locale}
        backLabel={dict.worlds.back}
        onClose={close}
      />
      <CaseStudy world={world} index={index} locale={locale} dict={dict} />
    </div>
  );
}
