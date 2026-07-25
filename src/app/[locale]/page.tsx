import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { worlds, JEWELS } from "@/data/worlds";
import { SITE } from "@/data/site";
import { Vitral } from "@/components/vitral/Vitral";
import { Medallion } from "@/components/vitral/Medallion";
import { Starfield } from "@/components/map/Starfield";
import { Planet } from "@/components/map/Planet";
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

  // El rail lleva solo las secciones [data-section] — Instagram queda fuera
  const railIds = ["hero", ...worlds.map((w) => w.slug), "about", "contact"];
  const railLabels = [
    dict.rail.hero,
    ...worlds.map((_, i) => `0${i + 1}`),
    dict.rail.about,
    dict.rail.contact,
  ];

  return (
    <>
      <Starfield className="pointer-events-none fixed inset-0 z-[1] h-full w-full" />
      <SectionRail ids={railIds} labels={railLabels} />

      <div
        id="snap-container"
        className="relative z-10 h-dvh snap-y snap-mandatory overflow-y-auto overflow-x-hidden [scrollbar-width:none]"
      >
        {/* ——— HERO ——— */}
        <section
          id="hero"
          data-section
          className="relative grid h-dvh snap-start place-items-center overflow-hidden p-6 text-center"
        >
          {/* Estrella fugaz → destello */}
          <div
            aria-hidden
            className="star-fall absolute h-1 w-1 rounded-full bg-white"
            style={{
              boxShadow:
                "0 0 24px 8px rgba(232,199,122,0.9), 0 0 60px 20px rgba(124,58,237,0.4)",
            }}
          />
          <div
            aria-hidden
            className="hero-flash pointer-events-none absolute inset-0 z-[5]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(232,199,122,0.5), transparent 40%)",
            }}
          />

          {/* Vitral: despierta, gira 240s; el medallón NO gira */}
          <div
            aria-hidden
            className="vitral-wake absolute"
            style={{ width: "min(78vh,88vw)", height: "min(78vh,88vw)" }}
          >
            <div
              className="pointer-events-none absolute rounded-full"
              style={{
                inset: "-4%",
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.35), transparent 62%)",
                filter: "blur(34px)",
              }}
            />
            <div className="vitral-spin h-full w-full">
              <Vitral className="h-full w-full" />
            </div>
            <Medallion />
          </div>

          {/* Nombre + tagline */}
          <div className="relative z-[6] px-6">
            <SplitReveal
              as="h1"
              text={dict.hero.name}
              delay={1.9}
              className="mx-auto max-w-[15ch] font-display text-[clamp(38px,7.5vw,104px)] font-bold italic leading-[0.95] tracking-[-0.01em] text-ink"
              style={{
                textShadow:
                  "0 4px 40px rgba(6,11,26,0.95), 0 0 60px rgba(30,58,138,0.6)",
                perspective: "600px",
              }}
            />
            <p
              className="mx-auto mt-[clamp(16px,3vh,28px)] max-w-[32ch] text-[clamp(14px,1.8vw,20px)] font-medium text-ink"
              style={{
                textShadow:
                  "0 2px 20px rgba(6,11,26,0.98), 0 0 34px rgba(6,11,26,0.95)",
              }}
            >
              {dict.hero.tagline}
            </p>
          </div>
        </section>

        {/* ——— MUNDOS 01–05 ——— */}
        {worlds.map((world, i) => {
          const jewel = JEWELS[world.jewel];
          const num = `0${i + 1}`;
          return (
            <section
              key={world.slug}
              id={world.slug}
              data-section
              className="relative grid min-h-dvh snap-start items-center gap-[clamp(28px,5vw,80px)] px-[clamp(24px,7vw,120px)] py-[clamp(90px,12vh,140px)] [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]"
            >
              {i === 0 && <span id="mundos" className="absolute top-0" aria-hidden />}

              {/* Izquierda: número, kicker, título, impacto, chips */}
              <Reveal className="relative">
                <div
                  aria-hidden
                  className="font-display text-[clamp(110px,18vw,240px)] font-bold italic leading-[0.78] tracking-[-0.04em]"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `2px ${jewel.from}`,
                    opacity: 0.55,
                  }}
                >
                  {num}
                </div>
                <div className="my-[6px] mb-3.5 flex items-center gap-2.5 font-display text-[12px] tracking-[0.18em] text-mist">
                  <span aria-hidden className="h-px w-[22px]" style={{ background: jewel.from }} />
                  {world.origin}
                </div>
                <h2 className="mb-4 font-display text-[clamp(30px,4.4vw,56px)] font-bold italic leading-[1.02] tracking-[-0.01em] text-ink">
                  {world.title[locale]}
                </h2>
                <p className="mb-6 max-w-[44ch] text-[clamp(15px,1.7vw,19px)] leading-[1.55] text-[#C8CFDE]">
                  {world.tagline[locale]}
                </p>
                <div className="mb-8 flex flex-wrap gap-2">
                  {world.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full px-3 py-1.5 font-display text-[12px] tracking-[0.04em] text-[#C8CFDE]"
                      style={{
                        background: "rgba(14,22,51,0.6)",
                        border: "1px solid rgba(150,161,188,0.22)",
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </Reveal>

              {/* Derecha: el orbe ES el botón del mundo */}
              <Reveal delay={0.12} className="grid min-h-[340px] place-items-center">
                <PortalLink
                  href={`/${locale}/mundos/${world.slug}`}
                  from={jewel.from}
                  to={jewel.to}
                  aria-label={world.title[locale]}
                  className="group flex flex-col items-center transition-transform duration-[400ms] ease-[cubic-bezier(.2,.7,.3,1)] hover:scale-[1.06]"
                >
                  <Planet jewel={world.jewel} />
                  <span
                    className="bob mt-7 inline-flex items-center gap-2.5 font-display text-[14px] font-bold italic tracking-[0.16em] text-gold"
                    style={{ textShadow: "0 0 16px rgba(232,199,122,0.5)" }}
                  >
                    ▸ {dict.worlds.enter}
                  </span>
                </PortalLink>
              </Reveal>
            </section>
          );
        })}

        {/* ——— INSTAGRAM (sin punto en el rail, a propósito) ——— */}
        <section
          id="social"
          className="relative grid min-h-[70vh] snap-start place-items-center px-[clamp(24px,7vw,120px)] py-[clamp(80px,10vh,120px)] text-center"
        >
          <Reveal className="flex flex-col items-center gap-[clamp(12px,2.4vh,22px)]">
            <div className="font-display text-[12px] tracking-[0.3em] text-mist">
              {dict.social.kicker}
            </div>
            <a
              href={dict.social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-word font-display text-[clamp(46px,11vw,150px)] font-bold italic leading-[0.82] tracking-[-0.02em]"
            >
              INSTAGRAM
            </a>
            <a
              href={dict.social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-[clamp(13px,1.6vw,16px)] tracking-[0.16em] text-gold"
            >
              {dict.social.handle}
            </a>
          </Reveal>
        </section>

        {/* ——— BITÁCORA ——— */}
        <section
          id="about"
          data-section
          className="relative grid min-h-dvh snap-start place-items-center px-[clamp(24px,7vw,120px)] py-[clamp(90px,12vh,140px)]"
        >
          <Reveal
            className="w-full max-w-[760px] rounded-[22px] p-[clamp(28px,5vw,56px)]"
            style={{
              background: "rgba(10,16,36,0.55)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(232,199,122,0.18)",
              boxShadow: "0 40px 100px -30px rgba(6,11,26,0.9)",
            }}
          >
            <div className="mb-[22px] flex items-center gap-3 font-display text-[12px] tracking-[0.2em] text-gold">
              <span
                aria-hidden
                className="h-[9px] w-[9px] rounded-full"
                style={{ border: "1px solid #E8C77A" }}
              />
              {dict.about.kicker}
            </div>
            <h2 className="mb-6 font-display text-[clamp(26px,3.6vw,44px)] font-bold leading-[1.08] text-ink">
              {dict.about.title}
            </h2>
            {dict.about.body.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="mb-[18px] text-[clamp(15px,1.7vw,18px)] leading-[1.7] text-[#C8CFDE]"
              >
                {paragraph}
              </p>
            ))}
            <div
              className="mt-[30px] flex flex-wrap gap-6 pt-[26px]"
              style={{ borderTop: "1px solid rgba(150,161,188,0.18)" }}
            >
              {dict.about.facts.map((fact) => (
                <div key={fact.k} className="min-w-[120px]">
                  <div className="mb-1.5 font-display text-[11px] tracking-[0.14em] text-mist">
                    {fact.k}
                  </div>
                  <div className="font-display text-[16px] font-medium text-ink">
                    {fact.v}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ——— CONTACTO + footer ——— */}
        <section
          id="contact"
          data-section
          className="relative flex min-h-dvh snap-start flex-col items-center justify-center px-[clamp(24px,7vw,120px)] py-[clamp(80px,10vh,140px)] text-center"
        >
          <Reveal className="max-w-[640px]">
            <div className="mb-5 font-display text-[12px] tracking-[0.4em] text-gold">
              {dict.contact.kicker}
            </div>
            <h2 className="mb-5 font-display text-[clamp(34px,6vw,76px)] font-bold italic leading-[0.98] tracking-[-0.01em] text-ink">
              {dict.contact.bigTitle}
            </h2>
            <p className="mx-auto mb-[34px] max-w-[44ch] text-[clamp(15px,1.8vw,19px)] leading-[1.6] text-mist">
              {dict.contact.body}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="relative inline-flex items-center gap-3.5 rounded-full px-[34px] py-4 font-display text-[clamp(15px,1.8vw,18px)] font-bold text-abyss"
              style={{
                background: "#E8C77A",
                boxShadow: "0 0 50px -6px rgba(232,199,122,0.6)",
              }}
            >
              ✦ {SITE.email}
            </a>
            <p className="mt-6">
              <a
                href="/cv/carlos-garcia-cv.pdf"
                download
                className="font-display text-[13px] tracking-[0.1em] text-mist underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
              >
                ↓ {dict.contact.cv}
              </a>
            </p>
          </Reveal>

          <div className="absolute inset-x-0 bottom-[clamp(20px,4vh,36px)] px-[clamp(24px,7vw,120px)]">
            <Footer footer={dict.footer} />
          </div>
        </section>
      </div>
    </>
  );
}
