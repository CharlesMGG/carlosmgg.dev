import type { Locale } from "./config";
import type { Dictionary } from "./types";
import { es } from "./es";
import { en } from "./en";

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export { locales, defaultLocale, isLocale } from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./types";
