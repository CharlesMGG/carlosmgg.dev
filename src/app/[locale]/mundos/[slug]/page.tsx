import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { worlds, getWorld, JEWELS } from "@/data/worlds";

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
  const world = getWorld(slug);
  if (!world) return {};
  return {
    title: world.title[locale],
    description: world.tagline[locale],
  };
}

export default async function WorldPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const world = getWorld(slug);
  if (!world) notFound();
  const dict = getDictionary(locale);
  const jewel = JEWELS[world.jewel];

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-24">
      <Link
        href={`/${locale}#mundos`}
        className="font-mono text-xs uppercase tracking-widest text-mist transition-colors hover:text-gold"
      >
        ← {dict.worlds.back}
      </Link>

      <header className="relative mt-8 overflow-hidden rounded-3xl">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 120% at 80% -20%, ${jewel.glow}, transparent 60%), linear-gradient(135deg, ${jewel.from}22, transparent 55%)`,
          }}
        />
        <div className="glass relative rounded-3xl p-8 sm:p-12">
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
          <h1 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {world.title[locale]}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">
            {world.tagline[locale]}
          </p>
          <dl className="mt-8 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
            {world.stats.map((stat) => (
              <div key={stat.label[locale]}>
                <dt className="sr-only">{stat.label[locale]}</dt>
                <dd className="font-mono text-sm font-semibold text-ink">
                  {stat.value[locale]}
                </dd>
                <dd className="mt-1 text-xs text-mist">{stat.label[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <p className="mt-10 rounded-2xl border border-dashed border-white/10 p-6 text-sm text-mist">
        {dict.worlds.comingSoon}
      </p>
    </div>
  );
}
