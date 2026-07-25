"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { sfxEnter } from "@/lib/sfx";

type Props = {
  href: string;
  /** Color de la joya del mundo destino — tiñe el warp */
  from: string;
  to: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
};

const WARP_MS = 470;

type Warp = { x: number; y: number; phase: "expand" | "full" | "fade" };

/**
 * Link que navega a través de un "warp": un círculo del color de la
 * joya que se expande desde el punto exacto del clic (clip-path),
 * llena la pantalla y se desvanece al llegar al destino. Con
 * prefers-reduced-motion navega como un Link normal.
 */
export function PortalLink({
  href,
  from,
  to,
  className,
  children,
  "aria-label": ariaLabel,
}: Props) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const [warp, setWarp] = useState<Warp | null>(null);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (event.button !== 0) return;
    sfxEnter();
    if (reduced) return;
    event.preventDefault();
    let { clientX: x, clientY: y } = event;
    if (x === 0 && y === 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      x = rect.left + rect.width / 2;
      y = rect.top + rect.height / 2;
    }
    setWarp({ x, y, phase: "expand" });
  };

  useEffect(() => {
    if (!warp) return;
    if (warp.phase === "expand") {
      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() =>
          setWarp((w) => (w ? { ...w, phase: "full" } : w)),
        ),
      );
      return () => cancelAnimationFrame(raf);
    }
    if (warp.phase === "full") {
      const timer = setTimeout(() => router.push(href), WARP_MS);
      return () => clearTimeout(timer);
    }
  }, [warp, href, router]);

  const clip =
    warp?.phase === "expand"
      ? `circle(0px at ${warp.x}px ${warp.y}px)`
      : `circle(150% at ${warp?.x}px ${warp?.y}px)`;

  return (
    <>
      <Link href={href} onClick={onClick} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
      {warp &&
        createPortal(
          <div
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[210]"
            style={{
              background: `radial-gradient(circle at ${warp.x}px ${warp.y}px, ${to}, ${from} 60%, #060b1a 150%)`,
              clipPath: clip,
              transition: "clip-path .55s cubic-bezier(.6,0,.2,1)",
            }}
          />,
          document.body,
        )}
    </>
  );
}
