import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";

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
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-28">
      <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
        {dict.notes.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-mist">{dict.notes.sub}</p>
      <p className="mt-10 rounded-2xl border border-dashed border-white/10 p-6 text-sm text-mist">
        {dict.notes.comingSoon}
      </p>
    </div>
  );
}
