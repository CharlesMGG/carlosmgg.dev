"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { locales, type Locale } from "@/i18n/config";
import {
  subscribeSound,
  getSoundEnabled,
  getSoundEnabledServer,
  toggleSound,
} from "@/lib/sfx";

/**
 * Barra superior derecha del handoff: botón circular de sonido (♪) +
 * pill glass con el toggle ES/EN. Sin nombre de la web.
 */
export function TopBar({
  current,
  soundLabel,
}: {
  current: Locale;
  soundLabel: string;
}) {
  const pathname = usePathname();
  const on = useSyncExternalStore(
    subscribeSound,
    getSoundEnabled,
    getSoundEnabledServer,
  );

  const pathFor = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-center justify-end px-[clamp(18px,5vw,54px)] py-[clamp(16px,3vw,28px)]">
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={on}
          aria-label={soundLabel}
          title={soundLabel}
          className="grid h-[38px] w-[38px] place-items-center rounded-full text-[15px] transition-all duration-300"
          style={
            on
              ? {
                  background: "rgba(232,199,122,0.16)",
                  border: "1px solid #E8C77A",
                  color: "#E8C77A",
                  boxShadow: "0 0 16px rgba(232,199,122,0.45)",
                }
              : {
                  background: "rgba(14,22,51,0.6)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: "1px solid rgba(232,199,122,0.25)",
                  color: "#96A1BC",
                }
          }
        >
          ♪
        </button>

        <div
          className="flex items-center rounded-full p-1 font-display text-[12px] tracking-[0.1em]"
          style={{
            background: "rgba(14,22,51,0.6)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(232,199,122,0.2)",
          }}
        >
          {locales.map((locale) => {
            const active = locale === current;
            return (
              <Link
                key={locale}
                href={pathFor(locale)}
                aria-current={active ? "true" : undefined}
                className="rounded-full px-3.5 py-1.5 transition-colors"
                style={
                  active
                    ? { background: "#E8C77A", color: "#060B1A", fontWeight: 500 }
                    : { color: "#96A1BC" }
                }
              >
                {locale.toUpperCase()}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
