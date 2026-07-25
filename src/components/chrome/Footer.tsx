import Link from "next/link";
import { SITE } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

/**
 * Footer del handoff: © a la izquierda, enlaces a la derecha, 11px dim.
 * Los enlaces a Notas y Contacto viven aquí — el home no lleva menú.
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
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 font-display text-[11px] tracking-[0.1em] text-[#5E6A85]">
      <span>
        © {new Date().getFullYear()} {SITE.name}
      </span>
      <span className="flex gap-[18px]">
        <Link href={`/${locale}/notas`} className="transition-colors hover:text-gold">
          {nav.notes}
        </Link>
        <Link href={`/${locale}/contacto`} className="transition-colors hover:text-gold">
          {nav.contact}
        </Link>
        <a
          href={SITE.github}
          rel="noopener noreferrer"
          target="_blank"
          className="transition-colors hover:text-gold"
        >
          GitHub
        </a>
        <a
          href={SITE.linkedin}
          rel="noopener noreferrer"
          target="_blank"
          className="transition-colors hover:text-gold"
        >
          LinkedIn
        </a>
      </span>
      <span className="sr-only">{footer.tagline}</span>
    </footer>
  );
}
