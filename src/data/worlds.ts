import type { Locale } from "@/i18n/config";

type L<T> = Record<Locale, T>;

export type Jewel = "sapphire" | "tide" | "amethyst" | "rose" | "gold";

export type WorldStat = {
  value: L<string>;
  label: L<string>;
};

export type World = {
  slug: string;
  jewel: Jewel;
  /** Cliente u origen — dato secundario: el mundo se titula por capacidad */
  origin: string;
  title: L<string>;
  tagline: L<string>;
  stats: WorldStat[];
};

/** Gradientes por joya — "un mundo, una paleta" (KH III) */
export const JEWELS: Record<Jewel, { from: string; to: string; glow: string }> = {
  sapphire: { from: "#1e3a8a", to: "#3b6fd4", glow: "rgb(59 111 212 / 0.35)" },
  tide: { from: "#0ea5a4", to: "#22d3ee", glow: "rgb(14 165 164 / 0.35)" },
  amethyst: { from: "#7c3aed", to: "#a78bfa", glow: "rgb(124 58 237 / 0.35)" },
  rose: { from: "#c026d3", to: "#f472b6", glow: "rgb(192 38 211 / 0.32)" },
  gold: { from: "#b98a2f", to: "#e8c77a", glow: "rgb(232 199 122 / 0.32)" },
};

export const worlds: World[] = [
  {
    slug: "saas-multi-tenant",
    jewel: "sapphire",
    origin: "EFA Solutions",
    title: {
      es: "SaaS multi-tenant white-label",
      en: "White-label multi-tenant SaaS",
    },
    tagline: {
      es: "Una plataforma logística donde cada organización ve solo lo suyo — aislamiento garantizado por la base de datos, no por confianza.",
      en: "A logistics platform where every organization sees only its own data — isolation guaranteed by the database, not by trust.",
    },
    stats: [
      {
        value: { es: "0 hallazgos críticos", en: "0 critical findings" },
        label: { es: "auditoría + prueba de carga", en: "security audit + load test" },
      },
      {
        value: { es: "15,000+ guías", en: "15,000+ waybills" },
        label: { es: "en operación real", en: "in live operation" },
      },
      {
        value: { es: "23k filas → 1 llamada", en: "23k rows → 1 call" },
        label: { es: "dashboards agregados en SQL", en: "SQL-aggregated dashboards" },
      },
    ],
  },
  {
    slug: "operacion-en-campo",
    jewel: "tide",
    origin: "EFA Solutions · App Store",
    title: {
      es: "Operación en campo",
      en: "Field operations",
    },
    tagline: {
      es: "Escaneo, firma, GPS y evidencia fotográfica en manos de operadores reales — web móvil e iOS nativo.",
      en: "Scanning, signatures, GPS and photo evidence in the hands of real couriers — mobile web and native iOS.",
    },
    stats: [
      {
        value: { es: "App Store", en: "App Store" },
        label: { es: "iOS en Swift/SwiftUI", en: "iOS in Swift/SwiftUI" },
      },
      {
        value: { es: "QR + CODE128", en: "QR + CODE128" },
        label: { es: "escáner multiformato", en: "multi-format scanner" },
      },
      {
        value: { es: "Firma · GPS · foto", en: "Signature · GPS · photo" },
        label: { es: "evidencia de entrega", en: "delivery evidence" },
      },
    ],
  },
  {
    slug: "precios-y-wallet",
    jewel: "amethyst",
    origin: "EFA Guías",
    title: {
      es: "Motor de precios y wallet",
      en: "Pricing engine & wallet",
    },
    tagline: {
      es: "Dinero que cuadra: ledger append-only, operaciones idempotentes y precios híbridos por tenant.",
      en: "Money that balances: append-only ledger, idempotent operations and hybrid per-tenant pricing.",
    },
    stats: [
      {
        value: { es: "157k códigos postales", en: "157k postal codes" },
        label: { es: "autocompletado SEPOMEX", en: "SEPOMEX autocomplete" },
      },
      {
        value: { es: "Ledger append-only", en: "Append-only ledger" },
        label: { es: "wallet MXN de 2 niveles", en: "2-level MXN wallet" },
      },
      {
        value: { es: "8 paqueterías", en: "8 carriers" },
        label: { es: "precios cost-plus + overrides", en: "cost-plus pricing + overrides" },
      },
    ],
  },
  {
    slug: "producto-de-venta",
    jewel: "rose",
    origin: "Comercial Alvin",
    title: {
      es: "Producto de cara a venta",
      en: "Sales-facing product",
    },
    tagline: {
      es: "Una landing con cotizador que convierte visitantes en solicitudes reales — construida para cerrar una venta.",
      en: "A landing page with a quote builder that turns visitors into real requests — built to close a sale.",
    },
    stats: [
      {
        value: { es: "En producción", en: "In production" },
        label: { es: "Vercel + Cloudflare", en: "Vercel + Cloudflare" },
      },
      {
        value: { es: "Cotizador end-to-end", en: "End-to-end quoting" },
        label: { es: "carrito + correo automático", en: "cart + automated email" },
      },
      {
        value: { es: "21 productos", en: "21 products" },
        label: { es: "catálogo ilustrado a mano", en: "hand-illustrated catalog" },
      },
    ],
  },
  {
    slug: "taller",
    jewel: "gold",
    origin: "Propio",
    title: {
      es: "El Taller",
      en: "The Workshop",
    },
    tagline: {
      es: "Cómo trabajo: sistema de identidad visual, decisiones documentadas y lecciones con causa raíz.",
      en: "How I work: a visual identity system, documented decisions and root-cause lessons.",
    },
    stats: [
      {
        value: { es: "7 activos SVG", en: "7 SVG assets" },
        label: { es: "sistema de marca en Figma", en: "brand system in Figma" },
      },
      {
        value: { es: "53 lecciones", en: "53 lessons" },
        label: { es: "errores con causa raíz", en: "errors with root cause" },
      },
      {
        value: { es: "Bitácora viva", en: "Living log" },
        label: { es: "decisiones por escrito", en: "decisions in writing" },
      },
    ],
  },
];

export function getWorld(slug: string): World | undefined {
  return worlds.find((w) => w.slug === slug);
}
