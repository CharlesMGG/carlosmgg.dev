"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { sfxSelect } from "@/lib/sfx";

type Props = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export function CommandMenu({ locale, nav }: Props) {
  const pathname = usePathname();
  const base = `/${locale}`;

  // El home del handoff no lleva menú de comandos — ahí navega el rail
  // lateral. En subpáginas sí, para poder volver y moverse entre ellas.
  if (pathname === base || pathname === `${base}/`) return null;

  const items = [
    { href: base, label: nav.map, exact: true },
    { href: `${base}/notas`, label: nav.notes, exact: false },
    { href: `${base}/contacto`, label: nav.contact, exact: false },
  ];

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Desktop: caja de comandos KH, abajo a la izquierda */}
      <nav
        aria-label={nav.menuTitle}
        className="glass fixed bottom-6 left-6 z-50 hidden w-44 rounded-2xl p-2 md:block"
      >
        <p className="px-3 pb-1 pt-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-gold/70">
          {nav.menuTitle}
        </p>
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => sfxSelect()}
                  aria-current={active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "border-l-2 border-gold bg-white/5 pl-2.5 text-ink"
                      : "text-mist hover:bg-white/5 hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile: barra inferior */}
      <nav
        aria-label={nav.menuTitle}
        className="glass fixed inset-x-0 bottom-0 z-50 rounded-none border-x-0 border-b-0 pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="flex items-stretch justify-around">
          {items.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  onClick={() => sfxSelect()}
                  aria-current={active ? "page" : undefined}
                  className={`block py-3 text-center font-mono text-[11px] uppercase tracking-widest transition-colors ${
                    active ? "text-gold" : "text-mist"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
