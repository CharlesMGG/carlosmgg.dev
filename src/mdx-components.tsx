import type { MDXComponents } from "mdx/types";

/** Estilos de prosa para las notas de campo — sin plugin de tipografía */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="mt-10 font-display text-xl font-semibold text-ink"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-8 font-display text-lg font-semibold text-ink"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-5 leading-relaxed text-mist" {...props} />
    ),
    ul: (props) => (
      <ul
        className="mt-5 list-disc space-y-2 pl-5 leading-relaxed text-mist marker:text-gold"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mt-5 list-decimal space-y-2 pl-5 leading-relaxed text-mist marker:text-gold"
        {...props}
      />
    ),
    strong: (props) => <strong className="font-semibold text-ink" {...props} />,
    code: (props) => (
      <code
        className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.85em] text-gold-soft"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-sm leading-relaxed text-ink"
        {...props}
      />
    ),
    blockquote: (props) => (
      <blockquote
        className="mt-5 border-l-2 border-gold/50 pl-4 italic text-mist"
        {...props}
      />
    ),
    a: (props) => (
      <a
        className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold-soft"
        {...props}
      />
    ),
    hr: () => <hr className="mt-8 border-white/10" />,
    ...components,
  };
}
