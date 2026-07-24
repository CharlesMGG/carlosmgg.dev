import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { SITE } from "@/data/site";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.contact.title, description: dict.contact.sub };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // Sin llaves no hay form — jamás modo demo. Lección pagada cara:
  // una cotización real se perdió en una pantalla de éxito falsa.
  const formEnabled = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
  );

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-28">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {dict.contact.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-mist">{dict.contact.sub}</p>

      {formEnabled && <ContactForm labels={dict.contact.form} />}

      <div className="glass mt-10 max-w-xl rounded-2xl p-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-mist">
          {dict.contact.emailLabel}
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="mt-2 block break-all font-display text-lg font-medium text-gold transition-colors hover:text-gold-soft"
        >
          {SITE.email}
        </a>
        <p className="mt-6 flex flex-wrap gap-5 text-sm">
          <a
            href="/cv/carlos-garcia-cv.pdf"
            download
            className="text-gold transition-colors hover:text-gold-soft"
          >
            ↓ {dict.contact.cv}
          </a>
          <a
            href={SITE.github}
            rel="noopener noreferrer"
            target="_blank"
            className="text-mist transition-colors hover:text-gold"
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            rel="noopener noreferrer"
            target="_blank"
            className="text-mist transition-colors hover:text-gold"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </div>
  );
}
