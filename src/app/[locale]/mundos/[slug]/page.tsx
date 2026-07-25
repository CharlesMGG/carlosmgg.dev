import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { worlds } from "@/data/worlds";
import { CaseHeader } from "@/components/case/CaseHeader";
import { CaseStudy } from "@/components/case/CaseStudy";
import { Starfield } from "@/components/map/Starfield";
import { Footer } from "@/components/chrome/Footer";

export function generateStaticParams() {
  return worlds.map((world) => ({ slug: world.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const world = worlds.find((w) => w.slug === slug);
  if (!world) return {};
  return {
    title: world.title[locale],
    description: world.tagline[locale],
  };
}

/**
 * Ruta completa del case study — la que se abre al entrar por URL directa,
 * recargar o compartir el link (de ahí su OG propia). Al navegar desde el
 * home, la ruta interceptora de @modal muestra el overlay en su lugar.
 */
export default async function WorldPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const index = worlds.findIndex((world) => world.slug === slug);
  if (index < 0) notFound();
  const world = worlds[index];
  const dict = getDictionary(locale);

  return (
    <>
      <Starfield className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />
      <div className="relative z-10">
        <CaseHeader world={world} locale={locale} backLabel={dict.worlds.back} />
        <CaseStudy world={world} index={index} locale={locale} dict={dict} />
        <Footer footer={dict.footer} nav={dict.nav} locale={locale} />
      </div>
    </>
  );
}
