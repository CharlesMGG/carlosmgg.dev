import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";
import { JEWELS, type World } from "@/data/worlds";

/**
 * Cuerpo del case study — mismo markup para la ruta completa y el overlay.
 * Estructura y estilo del handoff: ficha (número contorneado + título +
 * filas) · CAPTURAS · EL DESCENSO (problema, decisiones ◆, lo que falló).
 */
export function CaseStudy({
  world,
  index,
  locale,
  dict,
}: {
  world: World;
  index: number;
  locale: Locale;
  dict: Dictionary;
}) {
  const jewel = JEWELS[world.jewel];
  const num = `0${index + 1}`;
  const study = world.study;

  return (
    <div className="mx-auto max-w-[920px] px-[clamp(24px,6vw,60px)] pb-[120px] pt-[clamp(20px,4vh,50px)]">
      {/* Ficha */}
      <div
        className="grid items-end gap-[clamp(28px,5vw,60px)] pb-11 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]"
        style={{ borderBottom: "1px solid rgba(150,161,188,0.18)" }}
      >
        <div>
          <div
            aria-hidden
            className="font-display text-[clamp(80px,14vw,150px)] font-bold italic leading-[0.8]"
            style={{
              color: "transparent",
              WebkitTextStroke: `2px ${jewel.from}`,
              opacity: 0.6,
            }}
          >
            {num}
          </div>
          <h1 className="mt-3.5 font-display text-[clamp(30px,5vw,52px)] font-bold italic leading-[1.02] text-ink">
            {world.title[locale]}
          </h1>
        </div>

        {study && (
          <dl className="grid gap-4">
            {(
              [
                [dict.study.role, study.role[locale]],
                [dict.study.period, study.period[locale]],
                [dict.study.status, study.status[locale]],
              ] as const
            ).map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 pb-2 font-display text-[13px]"
                style={{ borderBottom: "1px dashed rgba(150,161,188,0.2)" }}
              >
                <dt className="tracking-[0.1em] text-mist">{k}</dt>
                <dd className="text-right text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Chips de stack + enlace al sitio en vivo */}
      <div className="mt-8 flex flex-wrap items-center gap-2">
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
        {world.liveUrl && (
          <a
            href={world.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-display text-[12px] font-bold tracking-[0.08em] text-gold transition-colors hover:text-gold-soft"
            style={{
              background: "rgba(232,199,122,0.1)",
              border: "1px solid rgba(232,199,122,0.45)",
            }}
          >
            {dict.study.visit} ↗
          </a>
        )}
      </div>

      {/* CAPTURAS */}
      {study?.screens && study.screens.length > 0 && (
        <div className="mt-11">
          <div className="mb-5 font-display text-[12px] tracking-[0.24em] text-gold">
            {dict.study.screens}
          </div>
          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {study.screens.map((screen, i) => (
              <figure
                key={screen.src}
                className="relative overflow-hidden rounded-[14px]"
                style={
                  i === 0
                    ? {
                        border: `1px solid ${jewel.glow}`,
                        boxShadow: `0 0 50px -22px ${jewel.from}`,
                      }
                    : { border: "1px solid rgba(150,161,188,0.22)" }
                }
              >
                <Image
                  src={screen.src}
                  width={screen.width}
                  height={screen.height}
                  alt={screen.alt[locale]}
                  className="h-auto w-full"
                  sizes="(min-width: 920px) 440px, 100vw"
                />
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* EL DESCENSO */}
      {study && (
        <div className="mt-14">
          <div className="mb-[30px] font-display text-[12px] tracking-[0.24em] text-gold">
            {dict.study.descent}
          </div>
          <div className="grid gap-10">
            <div>
              <h2
                className="mb-3 font-display text-[clamp(20px,2.6vw,28px)] font-bold"
                style={{ color: jewel.from }}
              >
                {dict.study.problem}
              </h2>
              {study.problem[locale].map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="mb-4 max-w-[64ch] text-[clamp(15px,1.7vw,18px)] leading-[1.7] text-[#C8CFDE]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div>
              <h2
                className="mb-4 font-display text-[clamp(20px,2.6vw,28px)] font-bold"
                style={{ color: jewel.from }}
              >
                {dict.study.decisions}
              </h2>
              <div className="grid gap-3.5">
                {study.decisions.map((decision) => (
                  <article
                    key={decision.title[locale]}
                    className="flex items-start gap-3.5 rounded-[14px] px-5 py-[18px]"
                    style={{
                      background: "rgba(14,22,51,0.4)",
                      border: "1px solid rgba(150,161,188,0.14)",
                    }}
                  >
                    <span aria-hidden className="mt-0.5 font-display text-[13px] text-gold">
                      ◆
                    </span>
                    <div>
                      <h3 className="font-display text-[clamp(15px,1.7vw,18px)] font-bold text-ink">
                        {decision.title[locale]}
                      </h3>
                      <p className="mt-1.5 text-[clamp(14px,1.6vw,17px)] leading-[1.6] text-[#C8CFDE]">
                        {decision.choice[locale]}
                      </p>
                      <p className="mt-3 text-[13px] leading-[1.6] text-mist">
                        <span className="tracking-[0.1em]">
                          {dict.study.alternative}:
                        </span>{" "}
                        {decision.alternative[locale]}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-[1.6] text-[#C8CFDE]">
                        <span className="tracking-[0.1em] text-gold/80">
                          {dict.study.because}:
                        </span>{" "}
                        {decision.reason[locale]}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 font-display text-[clamp(20px,2.6vw,28px)] font-bold text-mist">
                {dict.study.wentWrong}
              </h2>
              <div className="grid gap-3.5">
                {study.wentWrong.map((lesson) => (
                  <div
                    key={lesson.title[locale]}
                    className="pl-5"
                    style={{ borderLeft: "2px solid rgba(150,161,188,0.3)" }}
                  >
                    <p className="font-display text-[15px] font-bold italic text-ink">
                      {lesson.title[locale]}
                    </p>
                    <p className="mt-1 text-[clamp(14px,1.6vw,17px)] italic leading-[1.6] text-mist">
                      {lesson.body[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
