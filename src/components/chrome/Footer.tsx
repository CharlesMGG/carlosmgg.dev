import { SITE } from "@/data/site";
import type { Dictionary } from "@/i18n/types";

export function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-10 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {SITE.name} · {footer.tagline}
        </p>
        <p className="flex gap-5">
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
          <a
            href={`mailto:${SITE.email}`}
            className="transition-colors hover:text-gold"
          >
            Email
          </a>
        </p>
      </div>
    </footer>
  );
}
