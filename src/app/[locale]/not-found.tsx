import Link from "next/link";

/** 404 bilingüe: aquí no hay locale confiable, así que hablamos ambos */
export default function NotFound() {
  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">
        Este mundo no existe · This world doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-md text-mist">
        El corredor que buscas se cerró o nunca se abrió.
        <br />
        The corridor you&apos;re looking for closed, or never opened.
      </p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/es"
          className="glass rounded-full px-5 py-2.5 text-sm font-medium text-gold transition-transform hover:scale-[1.03]"
        >
          ← Volver al mapa
        </Link>
        <Link
          href="/en"
          className="glass rounded-full px-5 py-2.5 text-sm font-medium text-mist transition-colors hover:text-gold"
        >
          Back to the map
        </Link>
      </div>
    </div>
  );
}
