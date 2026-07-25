import { SITE } from "@/data/site";
import type { Dictionary } from "@/i18n/types";

/** Footer del handoff: © a la izquierda, enlaces a la derecha, 11px dim. */
export function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="flex items-center justify-between font-display text-[11px] tracking-[0.1em] text-[#5E6A85]">
      <span>
        © {new Date().getFullYear()} {SITE.name}
      </span>
      <span className="flex gap-[18px]">
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
