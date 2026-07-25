import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { Footer } from "@/components/chrome/Footer";
import { notes } from "@/data/notes";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.notes.title, description: dict.notes.sub };
}

export default async function NotesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-28">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {dict.notes.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-mist">{dict.notes.sub}</p>

      <ul className="mt-12 space-y-5">
        {notes.map((note) => (
          <li key={note.slug}>
            <Link
              href={`/${locale}/notas/${note.slug}`}
              className="glass group block rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-mist">
                {note.date}
              </p>
              <h2 className="mt-2 font-display text-xl font-semibold text-ink transition-colors group-hover:text-gold-soft">
                {note.title[locale]}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mist">
                {note.summary[locale]}
              </p>
              <p className="mt-4 text-sm font-medium text-gold">
                {dict.notes.read} →
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <div className="pb-16 md:pb-0">
      <Footer footer={dict.footer} nav={dict.nav} locale={locale} />
    </div>
    </>
  );
}
