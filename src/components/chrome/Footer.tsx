import Link from "next/link";
import { SITE } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/**
 * Footer del handoff. Trae su propio padding horizontal: sin él quedaba
 * pegado al borde y el nombre y los enlaces salían cortados en las
 * subpáginas. Contraste subido a mist — en dim (#5E6A85) era casi invisible.
 */
export function Footer({
  footer,
  nav,
  locale,
}: {
  footer: Dictionary["footer"];
  nav: Dictionary["nav"];
  locale: Locale;
}) {
  // Píldoras, no texto suelto: a 12px pegados al borde eran invisibles.
  const link =
    "rounded-full px-3.5 py-2 text-ink/85 transition-colors hover:bg-white/5 hover:text-gold focus-visible:text-gold";

  return (
    <footer className="border-t border-white/5 px-[clamp(24px,7vw,120px)] py-8">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 font-display text-[13px] tracking-[0.08em]">
        <span className="text-mist">
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <nav className="-mx-3.5 flex flex-wrap items-center gap-x-1 gap-y-1">
          <Link href={`/${locale}/notas`} className={link}>
            {nav.notes}
          </Link>
          <Link href={`/${locale}/contacto`} className={link}>
            {nav.contact}
          </Link>
          <a
            href={SITE.instagram}
            rel="noopener noreferrer"
            target="_blank"
            className={link}
          >
            Instagram
          </a>
          <a
            href={SITE.github}
            rel="noopener noreferrer"
            target="_blank"
            className={link}
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            rel="noopener noreferrer"
            target="_blank"
            className={link}
          >
            LinkedIn
          </a>
        </nav>
      </div>
      <span className="sr-only">{footer.tagline}</span>
    </footer>
  );
}
