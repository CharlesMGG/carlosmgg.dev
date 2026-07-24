import type { Metadata, Viewport } from "next";
import { Sora, Inter, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { locales, isLocale, getDictionary, type Locale } from "@/i18n";
import { CommandMenu } from "@/components/chrome/CommandMenu";
import { LocaleSwitch } from "@/components/chrome/LocaleSwitch";
import { SoundToggle } from "@/components/chrome/SoundToggle";
import { Footer } from "@/components/chrome/Footer";
import { SITE } from "@/data/site";
import "../globals.css";

/* Sora: sí, como el protagonista. El que abre devtools, lo cacha. */
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(SITE.domain),
    title: {
      default: dict.meta.title,
      template: `%s · ${SITE.name}`,
    },
    description: dict.meta.description,
    alternates: {
      languages: { es: "/es", en: "/en" },
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: locale === "es" ? "es_MX" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#060b1a",
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale as Locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: locale === "es" ? "Desarrollador Full-Stack" : "Full-Stack Developer",
    url: SITE.domain,
    email: `mailto:${SITE.email}`,
    sameAs: [SITE.github, SITE.linkedin],
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "Swift",
      "SaaS multi-tenant",
    ],
  };

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${inter.variable} ${plex.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:text-abyss"
        >
          {dict.common.skip}
        </a>
        <LocaleSwitch current={locale} />
        <SoundToggle label={dict.common.sound} />
        <main id="main" className="pb-20 md:pb-0">
          {children}
        </main>
        <div className="pb-16 md:pb-0">
          <Footer footer={dict.footer} />
        </div>
        <CommandMenu locale={locale} nav={dict.nav} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
