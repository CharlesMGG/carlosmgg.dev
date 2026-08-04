import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { Footer } from "@/components/chrome/Footer";
import { Starfield } from "@/components/map/Starfield";
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
      <Starfield className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />
      <div className="relative z-10 flex min-h-dvh flex-col">
        <div className="flex-1 px-[clamp(24px,7vw,120px)] pb-20 pt-[clamp(80px,12vh,120px)]">
          <div className="mx-auto max-w-[920px]">
            <Link
              href={`/${locale}`}
              className="inline-block py-1 font-display text-[12px] tracking-[0.18em] text-mist transition-colors hover:text-gold"
            >
              ← {dict.worlds.back}
            </Link>

            <h1 className="mt-8 font-display text-[clamp(34px,6vw,64px)] font-bold italic leading-[1] tracking-[-0.01em] text-ink">
              {dict.notes.title}
            </h1>
            <p className="mt-5 max-w-[52ch] text-[clamp(15px,1.7vw,19px)] leading-[1.55] text-[#C8CFDE]">
              {dict.notes.sub}
            </p>

            <ul className="mt-12 grid gap-4">
              {notes.map((note) => (
                <li key={note.slug}>
                  <Link
                    href={`/${locale}/notas/${note.slug}`}
                    className="group block rounded-[18px] p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-7"
                    style={{
                      background: "rgba(10,16,36,0.55)",
                      border: "1px solid rgba(232,199,122,0.18)",
                    }}
                  >
                    <p className="font-display text-[11px] tracking-[0.2em] text-mist">
                      {note.date}
                    </p>
                    <h2 className="mt-2.5 font-display text-[clamp(19px,2.4vw,26px)] font-bold italic leading-[1.15] text-ink transition-colors group-hover:text-gold">
                      {note.title[locale]}
                    </h2>
                    <p className="mt-3 max-w-[64ch] text-[15px] leading-[1.6] text-[#C8CFDE]">
                      {note.summary[locale]}
                    </p>
                    <p className="mt-4 font-display text-[13px] font-bold italic tracking-[0.14em] text-gold">
                      ▸ {dict.notes.read}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Footer footer={dict.footer} nav={dict.nav} locale={locale} />
      </div>
    </>
  );
}
