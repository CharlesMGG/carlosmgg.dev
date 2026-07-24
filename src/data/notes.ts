import type { ComponentType } from "react";
import type { Locale } from "@/i18n/config";

type L<T> = Record<Locale, T>;

export type FieldNote = {
  slug: string;
  /** Fecha de publicación, yyyy-mm — se muestra tal cual */
  date: string;
  title: L<string>;
  summary: L<string>;
  /** Import perezoso del MDX por locale — el vault nunca entra al build */
  body: L<() => Promise<{ default: ComponentType }>>;
};

export const notes: FieldNote[] = [
  {
    slug: "el-correo-que-fallaba-en-silencio",
    date: "2026-07",
    title: {
      es: "El correo que fallaba en silencio",
      en: "The email that failed silently",
    },
    summary: {
      es: "Una API key pegada donde no era, un SDK que no lanza excepciones, y días de correos perdidos sin una sola alarma. Por qué un sistema que finge éxito es peor que uno que truena.",
      en: "An API key pasted in the wrong field, an SDK that doesn't throw, and days of lost email without a single alarm. Why a system that fakes success is worse than one that crashes.",
    },
    body: {
      es: () => import("@/content/notas/es/el-correo-que-fallaba-en-silencio.mdx"),
      en: () => import("@/content/notas/en/el-correo-que-fallaba-en-silencio.mdx"),
    },
  },
  {
    slug: "el-aislamiento-vive-en-la-base",
    date: "2026-07",
    title: {
      es: "El aislamiento se prueba, no se promete",
      en: "Isolation is proven, not promised",
    },
    summary: {
      es: "La policy de UPDATE que dejaba a cualquier usuario ascenderse a dueño de la cuenta — y por qué la atrapó un test de aislamiento y no un review. Los ojos leen intención; los tests leen permisos.",
      en: "The UPDATE policy that let any user promote themselves to account owner — and why an isolation test caught it instead of a review. Eyes read intent; tests read permissions.",
    },
    body: {
      es: () => import("@/content/notas/es/el-aislamiento-vive-en-la-base.mdx"),
      en: () => import("@/content/notas/en/el-aislamiento-vive-en-la-base.mdx"),
    },
  },
  {
    slug: "reproducir-antes-de-arreglar",
    date: "2026-07",
    title: {
      es: "Reproducir antes de arreglar",
      en: "Reproduce before fixing",
    },
    summary: {
      es: "Deslogueos “aleatorios” que resultaron ser una condición de carrera en la rotación del refresh token — cazada con un test de navegador antes de tocar una sola línea. Un fix sin reproducción es una apuesta.",
      en: "“Random” logouts that turned out to be a race condition in refresh-token rotation — hunted down with a browser test before touching a single line. A fix without a reproduction is a bet.",
    },
    body: {
      es: () => import("@/content/notas/es/reproducir-antes-de-arreglar.mdx"),
      en: () => import("@/content/notas/en/reproducir-antes-de-arreglar.mdx"),
    },
  },
];

export function getNote(slug: string): FieldNote | undefined {
  return notes.find((note) => note.slug === slug);
}
