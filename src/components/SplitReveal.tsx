"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Título que se revela letra por letra al entrar al viewport.
 * El texto completo vive en aria-label; los spans son decoración.
 * Con reduced-motion se renderiza plano.
 */
export function SplitReveal({
  text,
  className,
  as: Tag = "h2",
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Tag className={className} style={style}>
        {text}
      </Tag>
    );
  }

  const words = text.split(" ");
  let letterIndex = 0;

  return (
    <Tag className={className} style={style} aria-label={text}>
      {words.map((word, wi) => (
        <span
          key={`${word}-${wi}`}
          aria-hidden
          className="inline-block whitespace-nowrap"
        >
          {[...word].map((char, ci) => {
            const index = letterIndex++;
            return (
              <motion.span
                key={ci}
                className="inline-block"
                initial={{ opacity: 0, y: "0.6em", rotate: 4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.55,
                  delay: delay + index * 0.028,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
