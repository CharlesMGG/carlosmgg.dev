/**
 * Emblema del medallón: corazón de luz ORIGINAL (nunca el logo de la saga).
 * Si existe /brand/emblem.png (PNG propio de Carlos, cuadrado y transparente)
 * el hero lo usa en su lugar — ver Medallion.
 */
export function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        d="M12 21 C12 21 3 14 3 8.6 C3 5.5 5.4 3 8.4 3 C10.2 3 11.5 4 12 5.1 C12.5 4 13.8 3 15.6 3 C18.6 3 21 5.5 21 8.6 C21 14 12 21 12 21 Z"
        fill="#E8C77A"
        stroke="#8A6D2E"
        strokeWidth={0.6}
      />
    </svg>
  );
}
