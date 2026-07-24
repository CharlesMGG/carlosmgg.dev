import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { WorldMap } from "@/components/map/WorldMap";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-6">
      {/* Hero */}
      <section className="flex min-h-[62dvh] flex-col justify-center pt-24 md:pt-16">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          {dict.hero.eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl">
          {dict.hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">
          {dict.hero.sub}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href="#mundos"
            className="glass rounded-full px-6 py-3 text-sm font-medium text-gold transition-transform hover:scale-[1.03]"
          >
            {dict.hero.cta} ↓
          </a>
          <p className="flex items-center gap-2 text-sm text-mist">
            <span
              aria-hidden
              className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold"
            />
            {dict.hero.availability}
          </p>
        </div>
      </section>

      {/* La constelación de mundos */}
      <section id="mundos" className="scroll-mt-16 pb-24 pt-12">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {dict.worlds.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-mist">{dict.worlds.sub}</p>
        <div className="mt-10 md:mt-4">
          <WorldMap locale={locale} dict={dict.worlds} />
        </div>
      </section>
    </div>
  );
}
