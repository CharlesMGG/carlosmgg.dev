import type { Locale } from "@/i18n/config";

type L<T> = Record<Locale, T>;

export type Jewel = "sapphire" | "tide" | "amethyst" | "rose" | "gold";

export type WorldStat = {
  value: L<string>;
  label: L<string>;
};

export type WorldDecision = {
  title: L<string>;
  choice: L<string>;
  alternative: L<string>;
  reason: L<string>;
};

export type WorldLesson = {
  title: L<string>;
  body: L<string>;
};

/** Capa 2 — el descenso: problema, decisiones con alternativa, y qué salió mal */
export type WorldStudy = {
  role: L<string>;
  period: L<string>;
  status: L<string>;
  stack: string[];
  problem: L<string[]>;
  decisions: WorldDecision[];
  wentWrong: WorldLesson[];
};

export type World = {
  slug: string;
  jewel: Jewel;
  /** Cliente u origen — dato secundario: el mundo se titula por capacidad */
  origin: string;
  title: L<string>;
  tagline: L<string>;
  stats: WorldStat[];
  study?: WorldStudy;
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
    study: {
      role: {
        es: "Diseño y desarrollo de punta a punta — único desarrollador",
        en: "End-to-end design and development — sole developer",
      },
      period: { es: "2025 — hoy", en: "2025 — present" },
      status: { es: "En producción", en: "In production" },
      stack: [
        "Next.js (App Router)",
        "TypeScript",
        "Supabase — PostgreSQL · RLS · PL/pgSQL",
        "Vercel",
        "Resend",
        "Upstash",
      ],
      problem: {
        es: [
          "Un operador logístico mexicano corría su operación sobre hojas de cálculo y mensajes: guías hechas a mano, cero visibilidad de cada envío y clientes corporativos pidiendo su propio portal. Necesitaba una plataforma completa — generación de guías con código de barras, rastreo por etapas, portales white-label por organización, operadores en campo con evidencia de entrega y reportes listos para facturar.",
          "La restricción real: un solo desarrollador, presupuesto de PyME y una operación que no se podía detener. Cada feature entró a producción mientras el negocio ya corría sobre la plataforma.",
        ],
        en: [
          "A Mexican logistics operator ran its business on spreadsheets and chat messages: hand-made waybills, zero visibility into shipments, and corporate clients asking for their own portal. It needed a full platform — barcode waybill generation, stage-based tracking, white-label portals per organization, field couriers with delivery evidence, and billing-ready reports.",
          "The real constraint: a single developer, an SMB budget, and an operation that could not stop. Every feature shipped to production while the business was already running on the platform.",
        ],
      },
      decisions: [
        {
          title: {
            es: "El aislamiento vive en la base de datos",
            en: "Isolation lives in the database",
          },
          choice: {
            es: "Row Level Security de PostgreSQL en cada tabla: la sesión de una organización físicamente no puede leer filas de otra.",
            en: "PostgreSQL Row Level Security on every table: one organization's session physically cannot read another's rows.",
          },
          alternative: {
            es: "Filtrar por organización en cada query desde la aplicación.",
            en: "Filtering by organization in every query from the application.",
          },
          reason: {
            es: "Un bug de mi código no debe poder filtrar datos entre clientes. La auditoría de seguridad y la prueba de carga cerraron con 0 hallazgos críticos.",
            en: "A bug in my code must not be able to leak data across clients. The security audit and load test closed with 0 critical findings.",
          },
        },
        {
          title: {
            es: "Los estados se mueven por RPCs transaccionales, guía por guía",
            en: "State moves through transactional RPCs, one waybill at a time",
          },
          choice: {
            es: "Funciones PL/pgSQL que procesan cada guía de forma independiente y reportan las que omiten.",
            en: "PL/pgSQL functions that process each waybill independently and report the ones they skip.",
          },
          alternative: {
            es: "Updates de estatus directos desde el cliente, en lote.",
            en: "Direct batch status updates from the client.",
          },
          reason: {
            es: "Aprendido en producción: una sola guía en estado inválido llegó a congelar la confirmación de una parada completa. El RPC por guía convierte un fallo total en un reporte parcial.",
            en: "Learned in production: a single waybill in an invalid state once froze the confirmation of an entire stop. Per-waybill RPCs turn a total failure into a partial report.",
          },
        },
        {
          title: {
            es: "Los dashboards agregan en SQL, no en el navegador",
            en: "Dashboards aggregate in SQL, not in the browser",
          },
          choice: {
            es: "RPCs con GROUP BY que devuelven ~20 filas ya agregadas en un solo viaje.",
            en: "GROUP BY RPCs that return ~20 pre-aggregated rows in a single round trip.",
          },
          alternative: {
            es: "Traer las filas al cliente y agregar en JavaScript.",
            en: "Fetching rows to the client and aggregating in JavaScript.",
          },
          reason: {
            es: "Medido, no supuesto: el dashboard más pesado paginaba ~23,000 filas por carga. La versión agregada lo resuelve en una llamada.",
            en: "Measured, not assumed: the heaviest dashboard paginated ~23,000 rows per load. The aggregated version resolves it in one call.",
          },
        },
      ],
      wentWrong: [
        {
          title: { es: "El correo murió en silencio", en: "Email died silently" },
          body: {
            es: "Una API key pegada por error en el campo FROM hizo que todo correo transaccional devolviera 422 — y el SDK no lanza excepciones, así que la plataforma siguió “funcionando” sin avisarle a nadie. El fix fue trivial; la lección no: cada envío revisa ahora el error explícito y falla ruidosamente. Un sistema que finge éxito es peor que uno que truena.",
            en: "An API key pasted by mistake into the FROM field made every transactional email return 422 — and the SDK doesn't throw, so the platform kept “working” without telling anyone. The fix was trivial; the lesson wasn't: every send now checks the explicit error and fails loudly. A system that fakes success is worse than one that crashes.",
          },
        },
        {
          title: {
            es: "Deslogueos aleatorios que nadie podía reproducir",
            en: "Random logouts nobody could reproduce",
          },
          body: {
            es: "Usuarios expulsados “al azar” al hacer clics rápidos. Antes de tocar código, lo reproduje con un test de navegador automatizado: era una condición de carrera en la rotación del refresh token bajo navegación concurrente. Sin la reproducción, cualquier fix habría sido superstición.",
            en: "Users kicked out “at random” when clicking fast. Before touching any code, I reproduced it with an automated browser test: a race condition in refresh-token rotation under concurrent navigation. Without the reproduction, any fix would have been superstition.",
          },
        },
        {
          title: {
            es: "Los escaneos vivían solo en memoria",
            en: "Scans lived only in memory",
          },
          body: {
            es: "Los operadores escaneaban decenas de paquetes y un deslogueo a media captura lo borraba todo: el borrador vivía únicamente en el estado de React. Hoy persiste en el dispositivo, se rehidrata al volver y el envío tolera quedarse sin conexión. El campo no perdona al software optimista.",
            en: "Couriers scanned dozens of packages and a logout mid-capture erased everything: the draft lived only in React state. It now persists on the device, rehydrates on return, and submission tolerates going offline. The field does not forgive optimistic software.",
          },
        },
      ],
    },
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
