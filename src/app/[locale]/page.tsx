import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { worlds, JEWELS } from "@/data/worlds";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-5xl px-6">
      {/* Hero */}
      <section className="flex min-h-[70dvh] flex-col justify-center pt-24 md:pt-16">
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

      {/* Mundos — placeholder de la constelación (Corte 1) */}
      <section id="mundos" className="scroll-mt-16 pb-24 pt-12">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {dict.worlds.heading}
        </h2>
        <p className="mt-3 max-w-2xl text-mist">{dict.worlds.sub}</p>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {worlds.map((world) => {
            const jewel = JEWELS[world.jewel];
            return (
              <li key={world.slug} className="group relative">
                <Link
                  href={`/${locale}/mundos/${world.slug}`}
                  className="glass relative block overflow-hidden rounded-2xl p-6 transition-transform duration-300 group-hover:-translate-y-1"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-45"
                    style={{
                      background: `radial-gradient(circle, ${jewel.to}, ${jewel.from} 70%)`,
                    }}
                  />
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mist">
                    <span
                      aria-hidden
                      className="inline-block h-2.5 w-2.5 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${jewel.to}, ${jewel.from})`,
                        boxShadow: `0 0 12px ${jewel.glow}`,
                      }}
                    />
                    {world.origin}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {world.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {world.tagline[locale]}
                  </p>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-white/5 pt-4">
                    {world.stats.map((stat) => (
                      <div key={stat.label[locale]}>
                        <dt className="sr-only">{stat.label[locale]}</dt>
                        <dd className="font-mono text-xs font-medium text-ink">
                          {stat.value[locale]}
                        </dd>
                        <dd className="mt-1 text-[11px] leading-snug text-mist">
                          {stat.label[locale]}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-5 text-sm font-medium text-gold">
                    {dict.worlds.enter} →
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
