"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";

export function LocaleSwitch({ current }: { current: Locale }) {
  const pathname = usePathname();

  const pathFor = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  return (
    <div className="glass fixed right-5 top-5 z-50 flex overflow-hidden rounded-full text-xs">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={pathFor(locale)}
          aria-current={locale === current ? "true" : undefined}
          className={`px-3 py-1.5 font-mono uppercase tracking-widest transition-colors ${
            locale === current
              ? "bg-gold/15 text-gold"
              : "text-mist hover:text-ink"
          }`}
        >
          {locale}
        </Link>
      ))}
    </div>
  );
}
