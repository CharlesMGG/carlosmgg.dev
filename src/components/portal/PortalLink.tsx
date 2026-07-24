"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type Props = {
  href: string;
  /** Colores de la joya del mundo destino — pintan el anillo del portal */
  from: string;
  to: string;
  className?: string;
  children: React.ReactNode;
};

const PORTAL_MS = 430;

/**
 * Link que navega a través de un "portal": anillo de luz que se expande
 * desde el punto del clic (el formchange de KH III, en CSS). Con
 * prefers-reduced-motion navega como un Link normal.
 */
export function PortalLink({ href, from, to, className, children }: Props) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const [burst, setBurst] = useState<{ x: number; y: number } | null>(null);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;
    event.preventDefault();
    let { clientX: x, clientY: y } = event;
    if (x === 0 && y === 0) {
      // Activación por teclado: el anillo nace del centro del link
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
    setBurst({ x, y });
  };

  useEffect(() => {
    if (!burst) return;
    const timer = setTimeout(() => router.push(href), PORTAL_MS);
    return () => clearTimeout(timer);
  }, [burst, href, router]);

  return (
    <>
      <Link href={href} onClick={onClick} className={className}>
        {children}
      </Link>
      {burst &&
        createPortal(
          <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
            <span
              className="portal-ring"
              style={
                {
                  left: burst.x,
                  top: burst.y,
                  "--pl-from": from,
                  "--pl-to": to,
                } as React.CSSProperties
              }
            />
            <span className="portal-veil" />
          </div>,
          document.body,
        )}
    </>
  );
}
