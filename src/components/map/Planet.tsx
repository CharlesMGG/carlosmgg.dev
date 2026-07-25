import type { Jewel } from "@/data/worlds";
import { JEWELS } from "@/data/worlds";

/**
 * Planeta del mundo: esfera con brillo especular, dos anillos girando
 * en 3D y flotación suave. Todo CSS — sin WebGL. Decorativo.
 */
export function Planet({ jewel }: { jewel: Jewel }) {
  const { from, glow } = JEWELS[jewel];
  const ring = `${from}73`; // ~45% alpha

  return (
    <div className="float-orb relative aspect-square w-[clamp(200px,26vw,320px)]">
      {/* Cuerpo */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 34% 30%, rgb(255 255 255 / 0.85), ${from} 40%, #060b1a 94%)`,
          boxShadow: `0 0 90px -6px ${glow}, inset -30px -30px 70px rgb(6 11 26 / 0.75), inset 24px 24px 60px rgb(255 255 255 / 0.12)`,
        }}
      />
      {/* Anillo mayor, inclinado en 3D */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[150%] w-[150%] rounded-full border"
        style={{
          borderColor: ring,
          transform: "translate(-50%, -50%) rotate3d(1, 0.3, 0, 74deg)",
          animation: "ring-spin 26s linear infinite",
        }}
      />
      {/* Anillo tenue exterior, contrarrotando */}
      <div
        aria-hidden
        className="absolute rounded-full border opacity-45"
        style={{
          inset: "-7%",
          borderColor: ring,
          animation: "ring-spin 42s linear infinite reverse",
        }}
      />
      {/* Brillo especular */}
      <div
        aria-hidden
        className="absolute h-[26%] w-[26%] rounded-full"
        style={{
          top: "14%",
          left: "22%",
          background: "radial-gradient(circle, rgb(255 255 255 / 0.5), transparent 70%)",
          filter: "blur(4px)",
        }}
      />
    </div>
  );
}
