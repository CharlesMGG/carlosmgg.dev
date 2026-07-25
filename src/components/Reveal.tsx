"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Reveal del handoff: opacity 0 → 1 con translateY(30px) al entrar al
 * viewport (IntersectionObserver de Motion, una sola vez). Con
 * prefers-reduced-motion aparece de inmediato.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
