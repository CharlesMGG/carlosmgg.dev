import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { Footer } from "@/components/chrome/Footer";
import { Starfield } from "@/components/map/Starfield";
import { SITE } from "@/data/site";
import { ContactForm } from "./ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.contact.title, description: dict.contact.sub };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  // Sin llaves no hay form — jamás modo demo. Lección pagada cara:
  // una cotización real se perdió en una pantalla de éxito falsa.
  const formEnabled = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL,
  );

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
              {dict.contact.title}
            </h1>
            <p className="mt-5 max-w-[52ch] text-[clamp(15px,1.7vw,19px)] leading-[1.55] text-[#C8CFDE]">
              {dict.contact.sub}
            </p>

            {formEnabled && <ContactForm labels={dict.contact.form} />}

            <div
              className="mt-10 max-w-xl rounded-[18px] p-7"
              style={{
                background: "rgba(10,16,36,0.55)",
                border: "1px solid rgba(232,199,122,0.18)",
              }}
            >
              <p className="font-display text-[11px] tracking-[0.2em] text-mist">
                {dict.contact.emailLabel}
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-2.5 block break-all font-display text-[clamp(18px,2.4vw,24px)] font-bold italic text-gold transition-colors hover:text-gold-soft"
              >
                {SITE.email}
              </a>
              <p className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-1 font-display text-[13px] tracking-[0.08em]">
                <a
                  href="/cv/carlos-garcia-cv.pdf"
                  download
                  className="py-1 text-gold transition-colors hover:text-gold-soft"
                >
                  ↓ {dict.contact.cv}
                </a>
                <a
                  href={SITE.github}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="py-1 text-mist transition-colors hover:text-gold"
                >
                  GitHub
                </a>
                <a
                  href={SITE.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="py-1 text-mist transition-colors hover:text-gold"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>
        <Footer footer={dict.footer} nav={dict.nav} locale={locale} />
      </div>
    </>
  );
}
