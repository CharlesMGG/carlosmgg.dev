import { JEWELS, type Jewel } from "@/data/worlds";

/**
 * El vitral: círculo de cristal emplomado construido en SVG puro.
 * Lenguaje visual original que evoca la estación del despertar —
 * cero activos del juego. La refracción viene de feTurbulence +
 * feDisplacementMap; el plomo es el trazo dorado.
 */

const CX = 200;
const CY = 200;

function polar(r: number, angle: number): [number, number] {
  return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

/** Sector anular (gajo de vitral) entre radios r0..r1 y ángulos a0..a1 */
function wedge(r0: number, r1: number, a0: number, a1: number): string {
  const [x0, y0] = polar(r0, a0);
  const [x1, y1] = polar(r1, a0);
  const [x2, y2] = polar(r1, a1);
  const [x3, y3] = polar(r0, a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return [
    `M${x0.toFixed(2)} ${y0.toFixed(2)}`,
    `L${x1.toFixed(2)} ${y1.toFixed(2)}`,
    `A${r1} ${r1} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
    `L${x3.toFixed(2)} ${y3.toFixed(2)}`,
    `A${r0} ${r0} 0 ${large} 0 ${x0.toFixed(2)} ${y0.toFixed(2)}`,
    "Z",
  ].join(" ");
}

const INNER_JEWELS: Jewel[] = [
  "sapphire",
  "amethyst",
  "tide",
  "rose",
  "sapphire",
  "gold",
  "amethyst",
  "tide",
  "rose",
  "amethyst",
];

const OUTER_COUNT = 14;

export function Vitral({ className }: { className?: string }) {
  const innerStep = (Math.PI * 2) / INNER_JEWELS.length;
  const outerStep = (Math.PI * 2) / OUTER_COUNT;
  const tilt = -Math.PI / 2;

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-hidden
      focusable="false"
    >
      <defs>
        {(Object.keys(JEWELS) as Jewel[]).map((jewel) => (
          <radialGradient key={jewel} id={`vg-${jewel}`} cx="38%" cy="32%" r="80%">
            <stop offset="0%" stopColor={JEWELS[jewel].to} />
            <stop offset="100%" stopColor={JEWELS[jewel].from} />
          </radialGradient>
        ))}
        <radialGradient id="vg-night" cx="40%" cy="35%" r="85%">
          <stop offset="0%" stopColor="#25346e" />
          <stop offset="100%" stopColor="#0e1633" />
        </radialGradient>
        <radialGradient id="vg-shine" cx="32%" cy="26%" r="60%">
          <stop offset="0%" stopColor="rgb(242 244 248 / 0.28)" />
          <stop offset="100%" stopColor="rgb(242 244 248 / 0)" />
        </radialGradient>
        <filter id="vitral-glass" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.02"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
        </filter>
      </defs>

      {/* Cama del vitral */}
      <circle cx={CX} cy={CY} r={192} fill="#060b1a" />

      <g filter="url(#vitral-glass)">
        {/* Banda exterior: cristal nocturno con destellos de joya */}
        {Array.from({ length: OUTER_COUNT }, (_, i) => {
          const a0 = tilt + i * outerStep;
          const a1 = tilt + (i + 1) * outerStep;
          const jewelAccent = i % 4 === 1;
          const fill = jewelAccent
            ? `url(#vg-${INNER_JEWELS[i % INNER_JEWELS.length]})`
            : "url(#vg-night)";
          return (
            <path
              key={`outer-${i}`}
              d={wedge(152, 186, a0, a1)}
              fill={fill}
              opacity={jewelAccent ? 0.75 : 0.95}
              stroke="rgb(232 199 122 / 0.45)"
              strokeWidth="1.4"
            />
          );
        })}

        {/* Banda interior: los gajos de joya */}
        {INNER_JEWELS.map((jewel, i) => {
          const a0 = tilt + i * innerStep;
          const a1 = tilt + (i + 1) * innerStep;
          return (
            <path
              key={`inner-${i}`}
              d={wedge(66, 148, a0, a1)}
              fill={`url(#vg-${jewel})`}
              opacity={0.9}
              stroke="rgb(232 199 122 / 0.5)"
              strokeWidth="1.6"
            />
          );
        })}
      </g>

      {/* Medallón central — aquí va el retrato */}
      <circle cx={CX} cy={CY} r={62} fill="url(#vg-night)" />
      <text
        x={CX}
        y={CY + 12}
        textAnchor="middle"
        fill="#e8c77a"
        style={{
          font: "700 34px var(--font-round), sans-serif",
          letterSpacing: "0.08em",
        }}
      >
        CG
      </text>

      {/* Plomo: anillos dorados */}
      <circle cx={CX} cy={CY} r={190} fill="none" stroke="#e8c77a" strokeWidth="3" opacity={0.85} />
      <circle cx={CX} cy={CY} r={150} fill="none" stroke="rgb(232 199 122 / 0.6)" strokeWidth="2" />
      <circle cx={CX} cy={CY} r={64} fill="none" stroke="#e8c77a" strokeWidth="2.5" opacity={0.9} />

      {/* Brillo de cristal */}
      <circle cx={CX} cy={CY} r={190} fill="url(#vg-shine)" />
    </svg>
  );
}
