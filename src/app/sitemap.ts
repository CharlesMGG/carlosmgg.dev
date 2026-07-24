import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { locales } from "@/i18n/config";
import { worlds } from "@/data/worlds";
import { notes } from "@/data/notes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/notas",
    "/contacto",
    ...worlds.map((world) => `/mundos/${world.slug}`),
    ...notes.map((note) => `/notas/${note.slug}`),
  ];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE.domain}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${SITE.domain}/${alt}${path}`]),
        ),
      },
    })),
  );
}
