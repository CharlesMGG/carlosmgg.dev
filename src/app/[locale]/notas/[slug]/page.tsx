import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { notes, getNote } from "@/data/notes";

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const note = getNote(slug);
  if (!note) return {};
  return {
    title: note.title[locale],
    description: note.summary[locale],
  };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const note = getNote(slug);
  if (!note) notFound();
  const dict = getDictionary(locale);
  const { default: Body } = await note.body[locale]();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-24">
      <Link
        href={`/${locale}/notas`}
        className="font-mono text-xs uppercase tracking-widest text-mist transition-colors hover:text-gold"
      >
        ← {dict.notes.title}
      </Link>
      <header className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-widest text-mist">
          {note.date}
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {note.title[locale]}
        </h1>
        <p className="mt-4 border-l-2 border-gold/50 pl-4 text-lg italic leading-relaxed text-mist">
          {note.summary[locale]}
        </p>
      </header>
      <div className="mt-10">
        <Body />
      </div>
    </article>
  );
}
