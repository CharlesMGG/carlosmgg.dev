"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { sfxDive } from "@/lib/sfx";
import { Vitral } from "./Vitral";

const SEEN_KEY = "dive-seen-v1";
const TOTAL_MS = 3600;

/** Motas de polvo que suben mientras caes: deterministas para no re-randomizar en render */
const DUST = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  height: 70 + ((i * 53) % 90),
  delay: -((i * 0.31) % 1.2),
  duration: 0.9 + ((i * 0.17) % 0.7),
  opacity: 0.25 + ((i * 0.13) % 0.45),
}));

export function DiveIntro({
  eyebrow,
  skipLabel,
}: {
  eyebrow: string;
  skipLabel: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduced) return;
    try {
      if (!localStorage.getItem(SEEN_KEY)) {
        // Hidratación desde localStorage: solo puede decidirse en cliente,
        // post-mount, para no romper la hidratación SSR (misma razón
        // documentada que el carrito de comercial-alvin-web).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShow(true);
        sfxDive();
      }
    } catch {
      /* sin localStorage: no molestamos en cada visita */
    }
  }, [reduced]);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* noop */
    }
    setShow(false);
  }, []);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(dismiss, TOTAL_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [show, dismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="dive"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center overflow-hidden bg-abyss"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
        >
          {/* Polvo dorado subiendo = tú cayendo */}
          <motion.div
            aria-hidden
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
          >
            {DUST.map((mote, i) => (
              <span
                key={i}
                className="dive-dust absolute w-px rounded-full"
                style={{
                  left: `${mote.left}%`,
                  height: mote.height,
                  animationDelay: `${mote.delay}s`,
                  animationDuration: `${mote.duration}s`,
                  opacity: mote.opacity,
                }}
              />
            ))}
          </motion.div>

          {/* El vitral sube a tu encuentro */}
          <motion.div
            className="relative w-[min(72vw,420px)]"
            initial={{ scale: 0.1, opacity: 0, filter: "blur(6px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 120px rgb(232 199 122 / 0.25)" }}
            />
            <Vitral className="h-auto w-full" />
          </motion.div>

          <motion.p
            className="mt-8 font-mono text-xs uppercase tracking-[0.35em] text-gold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
          >
            {eyebrow}
          </motion.p>

          <button
            type="button"
            onClick={dismiss}
            className="glass absolute right-5 top-5 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-mist transition-colors hover:text-gold"
          >
            {skipLabel} · Esc
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
