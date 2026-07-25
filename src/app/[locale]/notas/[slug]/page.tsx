import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { Footer } from "@/components/chrome/Footer";
import { Starfield } from "@/components/map/Starfield";
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
    <>
      <Starfield className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />
      <div className="relative z-10 flex min-h-dvh flex-col">
        <div className="flex-1 px-[clamp(24px,7vw,120px)] pb-20 pt-[clamp(80px,12vh,120px)]">
          <article className="mx-auto max-w-[760px]">
            <Link
              href={`/${locale}/notas`}
              className="font-display text-[12px] tracking-[0.18em] text-mist transition-colors hover:text-gold"
            >
              ← {dict.notes.title}
            </Link>

            <header className="mt-8">
              <p className="font-display text-[11px] tracking-[0.2em] text-mist">
                {note.date}
              </p>
              <h1 className="mt-3 font-display text-[clamp(30px,5vw,52px)] font-bold italic leading-[1.05] tracking-[-0.01em] text-ink">
                {note.title[locale]}
              </h1>
              <p
                className="mt-5 pl-5 text-[clamp(16px,1.9vw,20px)] italic leading-[1.55] text-[#C8CFDE]"
                style={{ borderLeft: "2px solid rgba(232,199,122,0.5)" }}
              >
                {note.summary[locale]}
              </p>
            </header>

            <div className="mt-12">
              <Body />
            </div>
          </article>
        </div>
        <Footer footer={dict.footer} nav={dict.nav} locale={locale} />
      </div>
    </>
  );
}
