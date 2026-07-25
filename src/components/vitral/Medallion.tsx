import { Emblem } from "./Emblem";

/**
 * Medallón central del vitral — ESTÁTICO (no gira), ~20% del ancho.
 * Círculo navy con borde dorado + glow, con el emblema dentro.
 */
export function Medallion() {
  return (
    <div
      className="absolute left-1/2 top-1/2 z-[2] aspect-square w-[20%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
      style={{
        background: "#0A1024",
        border: "2px solid #E8C77A",
        boxShadow:
          "0 0 44px rgba(232,199,122,0.5), inset 0 0 26px rgba(232,199,122,0.16)",
      }}
    >
      <div className="absolute inset-[16%]">
        <Emblem className="h-full w-full" />
      </div>
    </div>
  );
}
