import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { worlds, JEWELS } from "@/data/worlds";
import { SITE } from "@/data/site";
import { DiveIntro } from "@/components/vitral/DiveIntro";
import { Vitral } from "@/components/vitral/Vitral";
import { Starfield } from "@/components/map/Starfield";
import { PortalLink } from "@/components/portal/PortalLink";
import { SplitReveal } from "@/components/SplitReveal";
import { SectionRail } from "@/components/SectionRail";
import { Reveal } from "@/components/Reveal";
import { Footer } from "@/components/chrome/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const sectionIds = [
    "inicio",
    ...worlds.map((world) => world.slug),
    "contacto",
  ];
  const sectionLabels = [
    dict.nav.map,
    ...worlds.map((world) => world.title[locale]),
    dict.contact.title,
  ];

  return (
    <>
      <DiveIntro eyebrow={dict.hero.eyebrow} skipLabel={dict.common.skipIntro} />
      <SectionRail ids={sectionIds} labels={sectionLabels} />

      <div
        id="snap-container"
        className="h-dvh snap-y snap-mandatory overflow-y-auto scroll-smooth"
      >
        {/* ——— Slide 1 · Hero ——— */}
        <section
          id="inicio"
          className="relative flex h-dvh snap-start items-center overflow-hidden"
        >
          <Starfield className="pointer-events-none absolute inset-0 h-full w-full" />

          {/* El vitral es la luna */}
          <div
            aria-hidden
            className="absolute -right-[12vmin] top-1/2 w-[78vmin] -translate-y-1/2 opacity-90 max-md:-right-[30vmin] max-md:w-[95vmin] max-md:opacity-40"
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 140px rgb(232 199 122 / 0.22)" }}
            />
            <div className="vitral-spin">
              <Vitral className="h-auto w-full" />
            </div>
          </div>

          {/* PORTAFOLIO en oro, cruzando el vitral */}
          <Reveal
            delay={0.9}
            className="absolute bottom-[12%] right-[4vw] z-10 hidden md:block"
          >
            <p
              aria-hidden
              className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold tracking-[0.12em] text-gold"
              style={{ textShadow: "0 0 40px rgb(232 199 122 / 0.45)" }}
            >
              {dict.hero.portfolioWord}
            </p>
          </Reveal>

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-16">
            <Reveal delay={0.15}>
              <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                {dict.hero.role}
              </p>
            </Reveal>
            <SplitReveal
              as="h1"
              text={dict.hero.firstName}
              delay={0.25}
              className="mt-4 font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.95] tracking-[0.08em] text-ink"
            />
            <SplitReveal
              as="span"
              text={dict.hero.lastName}
              delay={0.45}
              className="block font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.95] tracking-[0.08em] text-ink"
            />
            <Reveal delay={0.8}>
              <span
                aria-hidden
                className="mt-6 block h-0.5 w-24 bg-gold"
                style={{ boxShadow: "0 0 12px rgb(232 199 122 / 0.6)" }}
              />
              <p className="mt-5 max-w-md text-lg leading-relaxed text-mist">
                {dict.hero.headline}
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm text-mist">
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 animate-pulse rounded-full bg-gold"
                />
                {dict.hero.availability}
              </p>
            </Reveal>
          </div>

          {/* scroll hint vertical */}
          <p
            aria-hidden
            className="absolute bottom-8 left-8 hidden font-mono text-[10px] uppercase tracking-[0.4em] text-mist [writing-mode:vertical-rl] md:block"
          >
            {dict.hero.scroll}
            <span className="mt-3 inline-block h-10 w-px animate-pulse bg-gold/60 align-middle" />
          </p>
        </section>

        {/* ——— Slides 2-6 · Un mundo por pantalla ——— */}
        {worlds.map((world, i) => {
          const jewel = JEWELS[world.jewel];
          const screen = world.study?.screens?.[0];
          return (
            <section
              key={world.slug}
              id={world.slug}
              className="relative flex h-dvh snap-start items-center overflow-hidden"
            >
              {i === 0 && <span id="mundos" className="absolute top-0" aria-hidden />}

              {/* Visual derecho: captura duotono o joya gigante */}
              <div
                aria-hidden
                className="absolute right-[-6%] top-1/2 w-[58%] -translate-y-1/2 max-md:right-[-25%] max-md:w-[85%] max-md:opacity-[0.22]"
              >
                {screen ? (
                  <div className="relative overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={screen.src}
                      width={screen.width}
                      height={screen.height}
                      alt=""
                      className="h-auto w-full grayscale"
                      sizes="(min-width: 768px) 58vw, 85vw"
                    />
                    <div
                      className="absolute inset-0 mix-blend-color"
                      style={{
                        background: `linear-gradient(135deg, ${jewel.from}, ${jewel.to})`,
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(90deg, #060b1a 0%, transparent 45%)`,
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative mx-auto aspect-square w-[52vmin]">
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${jewel.to}, ${jewel.from} 72%)`,
                        boxShadow: `0 0 120px ${jewel.glow}, 0 0 240px ${jewel.glow}`,
                      }}
                    />
                    <div
                      className="absolute -inset-8 rounded-full border"
                      style={{ borderColor: "rgb(232 199 122 / 0.25)" }}
                    />
                    <div
                      className="absolute -inset-16 rounded-full border border-dashed"
                      style={{ borderColor: "rgb(232 199 122 / 0.12)" }}
                    />
                  </div>
                )}
              </div>

              {/* Número gigante */}
              <span
                aria-hidden
                className="big-num absolute bottom-2 right-4 z-10 max-md:bottom-auto max-md:top-6"
              >
                0{i + 1}
              </span>

              {/* Contenido izquierdo */}
              <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-16">
                <div className="max-w-xl">
                  <Reveal>
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-mist">
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
                  </Reveal>
                  <SplitReveal
                    text={world.title[locale]}
                    delay={0.1}
                    className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-wide text-ink"
                  />
                  <Reveal delay={0.35}>
                    <span
                      aria-hidden
                      className="mt-5 block h-0.5 w-16"
                      style={{
                        background: `linear-gradient(90deg, ${jewel.to}, ${jewel.from})`,
                        boxShadow: `0 0 10px ${jewel.glow}`,
                      }}
                    />
                    <p className="mt-5 max-w-md leading-relaxed text-mist">
                      {world.tagline[locale]}
                    </p>
                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                      {world.stats.map((stat) => (
                        <div key={stat.label[locale]}>
                          <dt className="sr-only">{stat.label[locale]}</dt>
                          <dd className="font-mono text-sm font-semibold text-ink">
                            {stat.value[locale]}
                          </dd>
                          <dd className="text-[11px] text-mist">
                            {stat.label[locale]}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <PortalLink
                      href={`/${locale}/mundos/${world.slug}`}
                      from={jewel.from}
                      to={jewel.to}
                      className="glass mt-8 inline-block rounded-full px-7 py-3 font-display text-sm font-bold uppercase tracking-[0.18em] text-gold transition-transform hover:scale-[1.04]"
                    >
                      {dict.worlds.enter} →
                    </PortalLink>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}

        {/* ——— Slide final · Contacto ——— */}
        <section
          id="contacto"
          className="relative flex h-dvh snap-start flex-col overflow-hidden"
        >
          <div className="flex flex-1 items-center">
            <div className="mx-auto w-full max-w-6xl px-6 md:px-16">
              <Reveal>
                <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
                  {dict.contact.title}
                </p>
              </Reveal>
              <SplitReveal
                text={dict.contact.sub}
                delay={0.1}
                className="mt-4 max-w-3xl font-display text-[clamp(1.8rem,4.5vw,3.4rem)] font-extrabold leading-[1.15] tracking-wide text-ink"
              />
              <Reveal delay={0.4}>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="glass rounded-full px-7 py-3.5 font-display text-sm font-bold uppercase tracking-[0.18em] text-gold transition-transform hover:scale-[1.04]"
                  >
                    {dict.contact.emailLabel} →
                  </a>
                  <a
                    href="/cv/carlos-garcia-cv.pdf"
                    download
                    className="font-mono text-sm text-mist underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
                  >
                    ↓ {dict.contact.cv}
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="pb-16 md:pb-0">
            <Footer footer={dict.footer} />
          </div>
        </section>
      </div>
    </>
  );
}
