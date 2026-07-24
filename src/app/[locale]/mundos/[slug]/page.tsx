import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { worlds, getWorld, JEWELS } from "@/data/worlds";
import { Reveal } from "@/components/Reveal";

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
  const study = world.study;

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-24">
      <Reveal>
        <Link
          href={`/${locale}#mundos`}
          className="font-mono text-xs uppercase tracking-widest text-mist transition-colors hover:text-gold"
        >
          ← {dict.worlds.back}
        </Link>
      </Reveal>

      {/* Capa 1 — la ficha */}
      <Reveal delay={0.06}>
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
      </Reveal>

      {!study ? (
        <p className="mt-10 rounded-2xl border border-dashed border-white/10 p-6 text-sm text-mist">
          {dict.worlds.comingSoon}
        </p>
      ) : (
        <>
          {/* Ficha técnica: rol · periodo · estado · stack */}
          <Reveal delay={0.12}>
            <dl className="mt-6 grid gap-6 rounded-2xl border border-white/5 p-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-mist">
                  {dict.study.role}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink">
                  {study.role[locale]}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-mist">
                  {dict.study.period}
                </dt>
                <dd className="mt-1.5 text-sm text-ink">{study.period[locale]}</dd>
                <dt className="mt-4 font-mono text-[10px] uppercase tracking-widest text-mist">
                  {dict.study.status}
                </dt>
                <dd className="mt-1.5 inline-flex items-center gap-2 text-sm text-ink">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
                  />
                  {study.status[locale]}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-widest text-mist">
                  {dict.study.stack}
                </dt>
                <dd className="mt-1.5 flex flex-wrap gap-1.5">
                  {study.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/10 px-2 py-0.5 font-mono text-[11px] text-mist"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Capa 2 — el descenso */}
          <Reveal delay={0.18}>
            <section className="mt-14">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                01 · {dict.study.problem}
              </h2>
              <div className="mt-5 space-y-4">
                {study.problem[locale].map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="max-w-3xl leading-relaxed text-mist">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.22}>
            <section className="mt-14">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                02 · {dict.study.decisions}
              </h2>
              <div className="mt-6 space-y-5">
                {study.decisions.map((decision) => (
                  <article
                    key={decision.title[locale]}
                    className="glass rounded-2xl p-6 sm:p-7"
                  >
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {decision.title[locale]}
                    </h3>
                    <p className="mt-3 leading-relaxed text-mist">
                      {decision.choice[locale]}
                    </p>
                    <div className="mt-5 grid gap-4 border-t border-white/5 pt-5 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-mist">
                          {dict.study.alternative}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-mist">
                          {decision.alternative[locale]}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-gold/80">
                          {dict.study.because}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink">
                          {decision.reason[locale]}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.26}>
            <section className="mt-14">
              <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                03 · {dict.study.wentWrong}
              </h2>
              <div className="mt-6 space-y-5">
                {study.wentWrong.map((lesson) => (
                  <article
                    key={lesson.title[locale]}
                    className="rounded-2xl border-l-2 border-gold/50 bg-white/[0.02] p-6 sm:p-7"
                  >
                    <h3 className="font-display text-base font-semibold text-ink">
                      {lesson.title[locale]}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist">
                      {lesson.body[locale]}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-14 rounded-2xl border border-dashed border-white/10 p-6 text-center font-mono text-xs text-mist">
              {dict.study.screenshotsSoon}
            </p>
          </Reveal>
        </>
      )}
    </div>
  );
}
