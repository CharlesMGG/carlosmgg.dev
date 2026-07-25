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
  const link =
    "text-mist transition-colors hover:text-gold focus-visible:text-gold";

  return (
    <footer className="border-t border-white/5 px-[clamp(24px,7vw,120px)] py-7">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 font-display text-[12px] tracking-[0.08em]">
        <span className="text-mist">
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href={`/${locale}/notas`} className={link}>
            {nav.notes}
          </Link>
          <Link href={`/${locale}/contacto`} className={link}>
            {nav.contact}
          </Link>
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
