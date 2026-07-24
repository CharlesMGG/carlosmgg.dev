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
    study: {
      role: {
        es: "Portal operador web móvil + app iOS nativa — único desarrollador",
        en: "Mobile-web courier portal + native iOS app — sole developer",
      },
      period: { es: "2025 — hoy", en: "2025 — present" },
      status: { es: "En producción · App Store", en: "In production · App Store" },
      stack: [
        "Swift / SwiftUI",
        "Xcode · TestFlight",
        "Next.js (portal móvil)",
        "Supabase",
        "Web APIs — cámara · GPS · canvas",
      ],
      problem: {
        es: [
          "La entrega real sucede en la calle: operadores con prisa, sol directo en la pantalla, camiones con cientos de paquetes y cobertura de red intermitente. Cada entrega tenía que quedar probada — quién recibió, dónde y a qué hora, con firma, GPS y foto — sin frenar el ritmo del operador.",
          "Se construyó dos veces a propósito: un portal web móvil y una app iOS nativa en Swift/SwiftUI, porque la operación no podía esperar la revisión del App Store para cada ajuste de flujo.",
        ],
        en: [
          "Real delivery happens on the street: couriers in a hurry, direct sun on the screen, trucks with hundreds of packages and spotty network coverage. Every delivery had to be proven — who received it, where and when, with signature, GPS and photo — without slowing the courier down.",
          "It was deliberately built twice: a mobile-web portal and a native iOS app in Swift/SwiftUI, because the operation couldn't wait for App Store review on every flow adjustment.",
        ],
      },
      decisions: [
        {
          title: {
            es: "Una firma por parada, no por paquete",
            en: "One signature per stop, not per package",
          },
          choice: {
            es: "Escaneo continuo de todos los paquetes de una parada y una sola firma al final, confirmada en una transacción.",
            en: "Continuous scanning of every package at a stop and a single signature at the end, confirmed in one transaction.",
          },
          alternative: {
            es: "Capturar firma paquete por paquete.",
            en: "Capturing a signature package by package.",
          },
          reason: {
            es: "Una parada real baja decenas de paquetes. Firmar cada uno convertía 2 minutos en 20; el grupo con firma única conserva la evidencia y respeta el ritmo de la calle.",
            en: "A real stop unloads dozens of packages. Signing each one turned 2 minutes into 20; the group with a single signature keeps the evidence and respects the street's pace.",
          },
        },
        {
          title: {
            es: "Web móvil primero, iOS en paralelo",
            en: "Mobile web first, iOS in parallel",
          },
          choice: {
            es: "El portal del operador vive en el navegador del teléfono; la app nativa suma lo que el navegador no da.",
            en: "The courier portal lives in the phone's browser; the native app adds what the browser can't.",
          },
          alternative: {
            es: "Solo app nativa.",
            en: "Native app only.",
          },
          reason: {
            es: "Cada iteración vía App Store tarda días; el portal web despliega en minutos. La operación estrena flujos en web y la app los consolida.",
            en: "Each App Store iteration takes days; the web portal deploys in minutes. The operation pilots flows on web and the app consolidates them.",
          },
        },
        {
          title: {
            es: "El escáner tolera el mundo real",
            en: "The scanner tolerates the real world",
          },
          choice: {
            es: "Lector multiformato (QR + CODE128) con normalización de todo lo escaneado antes de buscar.",
            en: "Multi-format reader (QR + CODE128) that normalizes everything scanned before looking it up.",
          },
          alternative: {
            es: "Aceptar un solo formato “correcto”.",
            en: "Accepting a single “correct” format.",
          },
          reason: {
            es: "En campo aparecieron pistolas de escaneo con layout de teclado latino que convertían guiones en apóstrofes, y códigos de caja que no eran el de la guía. El software absorbe el ruido y guía al operador — no al revés.",
            en: "The field produced scan guns with Latin keyboard layouts that turned hyphens into apostrophes, and box barcodes that weren't the waybill's. The software absorbs the noise and guides the courier — not the other way around.",
          },
        },
      ],
      wentWrong: [
        {
          title: {
            es: "El código equivocado también escanea",
            en: "The wrong barcode also scans",
          },
          body: {
            es: "Los operadores reportaban “la guía no existe”. El backend estaba sano: escaneaban el código de barras grande de la caja de empaque, no el de la etiqueta. El fix no fue técnico sino de mensajes — el error ahora explica exactamente qué código buscar. A veces el bug solo se ve en la foto que nadie había pedido.",
            en: "Couriers kept reporting “this waybill doesn't exist”. The backend was healthy: they were scanning the big barcode on the packing box, not the label's. The fix wasn't technical but message design — the error now explains exactly which code to look for. Sometimes the bug is only visible in the photo nobody had asked for.",
          },
        },
        {
          title: {
            es: "La carga desaparecía al cruzar la medianoche",
            en: "The load vanished at midnight",
          },
          body: {
            es: "Aceptar carga un día y entregar al siguiente vaciaba la lista del operador: el filtro amarraba la carga al calendario, no al camión. La data nunca se perdió, pero el operador no la veía. Hoy la carga sigue al camión hasta entregarse, sin importar la fecha.",
            en: "Accepting a load one day and delivering the next emptied the courier's list: the filter tied the load to the calendar, not the truck. No data was ever lost, but the courier couldn't see it. The load now follows the truck until delivered, regardless of the date.",
          },
        },
        {
          title: {
            es: "El escáner “lento” que no era el escáner",
            en: "The “slow” scanner that wasn't the scanner",
          },
          body: {
            es: "El escaneo se sentía lento y la cámara leía al instante: el costo real estaba en round-trips en serie al servidor y en una UI que bloqueaba el siguiente escaneo. Instrumenté cada segmento antes de optimizar nada. La cámara era inocente.",
            en: "Scanning felt slow while the camera read instantly: the real cost was serial server round-trips and a UI that blocked the next scan. I instrumented every segment before optimizing anything. The camera was innocent.",
          },
        },
      ],
    },
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
    study: {
      role: {
        es: "Diseño y desarrollo del SaaS desde cero — único desarrollador",
        en: "SaaS design and development from scratch — sole developer",
      },
      period: { es: "2026 — en curso", en: "2026 — ongoing" },
      status: {
        es: "En construcción — fundaciones listas",
        en: "In progress — foundations built",
      },
      stack: [
        "Next.js (App Router)",
        "TypeScript",
        "Supabase — PostgreSQL · RLS · PL/pgSQL",
        "Vitest",
      ],
      problem: {
        es: [
          "Un revendedor de guías de envío opera con saldo: el cliente recarga dinero, genera guías de varias paqueterías y cada guía descuenta según su lista de precios. Todo el negocio es, en el fondo, un libro contable — y un libro contable no puede estar “casi” bien.",
          "El sistema es multi-tenant por subdominio con marca propia por revendedor, precios en cascada por nivel y un catálogo de 157 mil códigos postales para cotizar sin fricción.",
        ],
        en: [
          "A shipping-label reseller runs on balance: clients top up money, generate labels across multiple carriers, and each label deducts according to their price list. The whole business is, at its core, a ledger — and a ledger can't be “almost” right.",
          "The system is multi-tenant by subdomain with per-reseller branding, cascading tiered pricing, and a 157k postal-code catalog for frictionless quoting.",
        ],
      },
      decisions: [
        {
          title: {
            es: "El dinero es un ledger, no un campo",
            en: "Money is a ledger, not a column",
          },
          choice: {
            es: "El saldo es la suma de un ledger append-only; nada actualiza “balance” directamente y toda operación de dinero es un RPC idempotente.",
            en: "Balance is the sum of an append-only ledger; nothing updates a “balance” column directly and every money operation is an idempotent RPC.",
          },
          alternative: {
            es: "Una columna de saldo que se incrementa y decrementa.",
            en: "A balance column that gets incremented and decremented.",
          },
          reason: {
            es: "Un doble clic o un reintento de red no pueden cobrar dos veces: la idempotencia por llave de operación lo garantiza en la base. Y el historial es la fuente de la verdad — auditable por construcción.",
            en: "A double click or a network retry must not charge twice: idempotency by operation key guarantees it at the database. And the history is the source of truth — auditable by construction.",
          },
        },
        {
          title: {
            es: "Los precios se resuelven en cascada",
            en: "Prices resolve as a cascade",
          },
          choice: {
            es: "Precio base por paquetería → margen del tenant → overrides puntuales, resuelto en una sola función.",
            en: "Base carrier price → tenant markup → targeted overrides, resolved in a single function.",
          },
          alternative: {
            es: "Una lista plana de precios por cliente.",
            en: "A flat price list per client.",
          },
          reason: {
            es: "Las listas reales de los revendedores son excepciones sobre excepciones. La cascada modela cómo piensan: “todo al 20%, menos este cliente, menos esta ruta”.",
            en: "Resellers' real price lists are exceptions on top of exceptions. The cascade models how they think: “everything at 20%, except this client, except this route”.",
          },
        },
        {
          title: {
            es: "Aislamiento probado, no prometido",
            en: "Isolation proven, not promised",
          },
          choice: {
            es: "Una suite de tests que intenta cruzar datos entre tenants, corrida en cada cambio.",
            en: "A test suite that actively tries to cross data between tenants, run on every change.",
          },
          alternative: {
            es: "Confiar en el review manual de las policies.",
            en: "Trusting manual review of the policies.",
          },
          reason: {
            es: "En multi-tenant el bug catastrófico es silencioso. El test que intenta romper el aislamiento convierte “debería estar bien” en verde o rojo — y esa suite atrapó una escalación de privilegios real antes de producción.",
            en: "In multi-tenant, the catastrophic bug is silent. A test that tries to break isolation turns “it should be fine” into green or red — and that suite caught a real privilege escalation before production.",
          },
        },
      ],
      wentWrong: [
        {
          title: {
            es: "El perfil que podía ascenderse a sí mismo",
            en: "The profile that could promote itself",
          },
          body: {
            es: "Una policy de UPDATE permitía a un usuario editar su propio perfil — incluyendo su rol. Auto-promoción a dueño de la cuenta en un request. La atrapó la suite de aislamiento, no un review: los ojos leen la intención; los tests leen lo que la policy realmente permite.",
            en: "An UPDATE policy let a user edit their own profile — including their role. Self-promotion to account owner in one request. The isolation suite caught it, not a review: eyes read intent; tests read what the policy actually allows.",
          },
        },
        {
          title: {
            es: "La competencia también enseña — qué no hacer",
            en: "Competitors teach too — what not to do",
          },
          body: {
            es: "Antes de construir, analicé la plataforma que el cliente ya rentaba: campos que aceptan HTML libre, tokens de sesión en localStorage, identificadores con emojis. Cada hallazgo se volvió un requisito inverso — sesión en cookies del lado del servidor, CSP estricta, entradas saneadas. Estudiar el sistema a reemplazar es levantamiento de requisitos gratis.",
            en: "Before building, I analyzed the platform the client was already renting: fields accepting free-form HTML, session tokens in localStorage, identifiers with emojis. Every finding became an inverse requirement — server-side session cookies, strict CSP, sanitized inputs. Studying the system you're replacing is free requirements gathering.",
          },
        },
      ],
    },
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
    study: {
      role: {
        es: "Diseño, desarrollo y puesta en vivo — único desarrollador",
        en: "Design, development and launch — sole developer",
      },
      period: { es: "2026", en: "2026" },
      status: { es: "En producción", en: "In production" },
      stack: ["Next.js", "Tailwind CSS v4", "Resend", "Vercel", "Cloudflare"],
      problem: {
        es: [
          "Un mayorista de línea blanca necesitaba enseñar producto y recibir solicitudes reales antes de tener “producto final”: una landing con cara de marca, catálogo navegable y un cotizador tipo carrito que convirtiera la visita en un correo accionable para ventas.",
          "Las restricciones: salir bajo el dominio del cliente sin tocar su correo corporativo, sin fotos oficiales de marcas (licencias), y con costo de infraestructura cero mientras la venta se cierra.",
        ],
        en: [
          "A white-goods wholesaler needed to show product and receive real requests before having a “final product”: a landing page with brand presence, a browsable catalog, and a cart-style quote builder that turns a visit into an actionable email for sales.",
          "The constraints: launch under the client's domain without touching their corporate email, no official brand photos (licensing), and zero infrastructure cost while the sale closes.",
        ],
      },
      decisions: [
        {
          title: {
            es: "Ilustraciones propias en vez de fotos",
            en: "Original illustrations instead of photos",
          },
          choice: {
            es: "Catálogo completo con ilustraciones SVG line-art dibujadas para el proyecto.",
            en: "A full catalog of SVG line-art illustrations drawn for the project.",
          },
          alternative: {
            es: "Fotos oficiales de producto o banco de imágenes.",
            en: "Official product photos or stock imagery.",
          },
          reason: {
            es: "Las fotos oficiales traen riesgo legal y el stock huele a plantilla. El line-art es coherente, pesa casi nada y de paso demuestra el sistema visual.",
            en: "Official photos carry legal risk and stock smells like a template. Line-art is coherent, weighs almost nothing, and doubles as proof of the visual system.",
          },
        },
        {
          title: {
            es: "El cotizador es un carrito sin precios",
            en: "The quote builder is a cart without prices",
          },
          choice: {
            es: "Cantidades por producto y marca, resumen flotante y un solo formulario al final.",
            en: "Quantities per product and brand, a floating summary, and a single form at the end.",
          },
          alternative: {
            es: "Un formulario de contacto plano.",
            en: "A flat contact form.",
          },
          reason: {
            es: "En mayoreo el precio depende del volumen: capturar cantidades es exactamente el dato que el vendedor necesita para contestar con números en lugar de preguntas.",
            en: "In wholesale, price depends on volume: capturing quantities is exactly the data the seller needs to reply with numbers instead of questions.",
          },
        },
        {
          title: {
            es: "Sin backend hasta que hubo venta que atender",
            en: "No backend until there was a sale to serve",
          },
          choice: {
            es: "Todo estático más una única server action para el correo, activada por variables de entorno.",
            en: "Everything static plus a single server action for email, switched on by environment variables.",
          },
          alternative: {
            es: "Backend completo desde el día uno.",
            en: "A full backend from day one.",
          },
          reason: {
            es: "Infraestructura antes de la venta es costo sin cliente. La única pieza con estado — el envío del correo — quedó detrás de un interruptor.",
            en: "Infrastructure before the sale is cost without a client. The only stateful piece — sending the email — sat behind a switch.",
          },
        },
      ],
      wentWrong: [
        {
          title: {
            es: "La cotización que nadie recibió",
            en: "The quote nobody received",
          },
          body: {
            es: "El envío de correo caía a “modo demo” si faltaban las variables de entorno: pantalla de éxito, folio generado — y nada guardado en ningún lado. Una cotización real de un prospecto se perdió para siempre. La regla que quedó: un sistema sin sus llaves no finge; se declara fuera de servicio y muestra el contacto directo.",
            en: "Email delivery fell back to “demo mode” if environment variables were missing: success screen, generated folio — and nothing stored anywhere. A real prospect's quote was lost forever. The rule that stuck: a system without its keys doesn't pretend; it declares itself out of service and shows direct contact.",
          },
        },
        {
          title: {
            es: "El CNAME que se guardó sin guardarse",
            en: "The CNAME that saved without saving",
          },
          body: {
            es: "El panel de DNS confirmó el registro; los nameservers autoritativos respondían NXDOMAIN. Verificar con dig contra el autoritativo — no contra el caché — se volvió el paso obligado de cada alta de dominio.",
            en: "The DNS panel confirmed the record; the authoritative nameservers answered NXDOMAIN. Verifying with dig against the authoritative server — not the cache — became the mandatory step of every domain setup.",
          },
        },
      ],
    },
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
    study: {
      role: {
        es: "Identidad visual, documentación y método",
        en: "Visual identity, documentation and method",
      },
      period: { es: "2025 — hoy", en: "2025 — present" },
      status: { es: "Siempre en curso", en: "Always in progress" },
      stack: ["Figma", "SVG", "Obsidian", "Playwright", "reportlab"],
      problem: {
        es: [
          "Un producto también necesita marca, manuales y memoria. El Taller es el trabajo que no es feature: el sistema de identidad — logo vectorizado en 7 variantes light/dark, de Figma a SVG limpio —, los manuales de uso en PDF, y una bitácora de ingeniería donde cada error de producción queda con causa raíz y prevención.",
          "La regla del taller: si dolió, se documenta; si se decidió, se escribe el porqué. El costo de no recordar es repetir.",
        ],
        en: [
          "A product also needs a brand, manuals and memory. The Workshop is the work that isn't a feature: the identity system — a logo vectorized into 7 light/dark variants, from Figma to clean SVG —, PDF user manuals, and an engineering log where every production error gets a root cause and a prevention.",
          "The workshop's rule: if it hurt, it gets documented; if it was decided, the why gets written down. The cost of not remembering is repeating.",
        ],
      },
      decisions: [
        {
          title: {
            es: "SVG limpio o no sale",
            en: "Clean SVG or it doesn't ship",
          },
          choice: {
            es: "Todo logo se exporta con textos convertidos a paths, gradientes sin canal alfa y validación en navegador antes de integrarse.",
            en: "Every logo exports with text converted to paths, gradients without an alpha channel, and browser validation before integration.",
          },
          alternative: {
            es: "Exportar del editor y confiar.",
            en: "Exporting from the editor and trusting it.",
          },
          reason: {
            es: "Un stop de gradiente con opacidad produce un logo lavado en producción; una fuente no instalada rompe el wordmark en un correo. El checklist existe porque cada punto fue un bug visual real.",
            en: "A gradient stop with opacity produces a washed-out logo in production; a missing font breaks the wordmark in an email. The checklist exists because every item was a real visual bug.",
          },
        },
        {
          title: {
            es: "Los errores terminan en notas enlazadas",
            en: "Errors end up as linked notes",
          },
          choice: {
            es: "Cada incidente de producción termina en una nota: síntoma, causa raíz, fix y prevención — y las notas se enlazan entre sí.",
            en: "Every production incident ends in a note: symptom, root cause, fix and prevention — and the notes link to each other.",
          },
          alternative: {
            es: "Arreglar y seguir.",
            en: "Fix it and move on.",
          },
          reason: {
            es: "El mismo tipo de error regresa con otra cara. 53 notas después, el diagnóstico de un bug nuevo empieza por buscar a su primo en la bitácora — y muchas veces ya está ahí.",
            en: "The same class of error comes back wearing a different face. 53 notes later, diagnosing a new bug starts by looking up its cousin in the log — and it's often already there.",
          },
        },
        {
          title: {
            es: "Reproducir antes de arreglar",
            en: "Reproduce before fixing",
          },
          choice: {
            es: "Los bugs “aleatorios” se reproducen con tests de navegador automatizados antes de proponer cualquier fix.",
            en: "“Random” bugs get reproduced with automated browser tests before any fix is proposed.",
          },
          alternative: {
            es: "Arreglar por hipótesis.",
            en: "Fixing by hypothesis.",
          },
          reason: {
            es: "Un fix sin reproducción es una apuesta. La reproducción convierte la discusión en evidencia — y se queda como test de regresión.",
            en: "A fix without a reproduction is a bet. The reproduction turns discussion into evidence — and stays behind as a regression test.",
          },
        },
      ],
      wentWrong: [
        {
          title: {
            es: "El selector que se rompió al quitar un encabezado",
            en: "The selector that broke by removing a header",
          },
          body: {
            es: "Reordenar la estructura de una etiqueta imprimible corrió un selector nth-child del CSS de impresión: la regla que estiraba el cuerpo terminó apuntando al pie. Los selectores posicionales son acoplamiento invisible; en documentos imprimibles, todo cambio estructural exige re-verificar la impresión.",
            en: "Reordering a printable label's structure shifted an nth-child selector in the print CSS: the rule that stretched the body ended up targeting the footer. Positional selectors are invisible coupling; in printable documents, every structural change demands re-verifying the print.",
          },
        },
        {
          title: {
            es: "La “preferencia” que era autocorrector",
            en: "The “preference” that was autocorrect",
          },
          body: {
            es: "Un alta de usuarios fallaba en silencio: el autocorrector del teléfono convertía el correo en una versión con acento y el input la aceptaba sin queja. La validación ahora normaliza antes de validar. Cuando el bug parece imposible, sospecha del teclado.",
            en: "A user signup failed silently: the phone's autocorrect turned the email into an accented version and the input accepted it without complaint. Validation now normalizes before validating. When a bug looks impossible, suspect the keyboard.",
          },
        },
      ],
    },
  },
];

export function getWorld(slug: string): World | undefined {
  return worlds.find((w) => w.slug === slug);
}
