import type { ReactNode } from "react";

/**
 * Vitral — rosetón de cristal emplomado en SVG puro. Puerto fiel del
 * buildVitral() del handoff de diseño: anillos de cuñas, pétalos ojivales,
 * radios dorados, banda de borde con coronas y diamantes, y hub central.
 * Lenguaje original que evoca la estación del despertar — cero activos del
 * juego. viewBox 0 0 500 500.
 */

const JEWELS = ["#1E3A8A", "#7C3AED", "#0EA5A4", "#C026D3", "#3B6BE8"];
const CX = 250;
const CY = 250;

function p(r: number, a: number): [string, string] {
  return [(CX + r * Math.cos(a)).toFixed(2), (CY + r * Math.sin(a)).toFixed(2)];
}

export function Vitral({ className }: { className?: string }) {
  const els: ReactNode[] = [];

  // Anillos de cuñas: interior [62–114]×12, medio [114–164]×18
  ([
    [62, 114, 12],
    [114, 164, 18],
  ] as const).forEach(([ir, or, n], ri) => {
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2 - Math.PI / 2;
      const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
      const A = p(or, a0);
      const B = p(or, a1);
      const C = p(ir, a1);
      const D = p(ir, a0);
      const d = `M${A} A${or} ${or} 0 0 1 ${B} L${C} A${ir} ${ir} 0 0 0 ${D} Z`;
      els.push(
        <path
          key={`w${ri}-${i}`}
          d={d}
          fill={JEWELS[(i + ri * 2) % JEWELS.length]}
          fillOpacity={0.55 + 0.16 * ((i + ri) % 2)}
          stroke="#E8C77A"
          strokeOpacity={0.28}
          strokeWidth={1}
          strokeLinejoin="round"
        />,
      );
    }
  });

  // Anillo de pétalos ojivales [164–206]×16
  {
    const pir = 164;
    const por = 206;
    const pn = 16;
    for (let i = 0; i < pn; i++) {
      const a0 = (i / pn) * Math.PI * 2 - Math.PI / 2;
      const a1 = ((i + 1) / pn) * Math.PI * 2 - Math.PI / 2;
      const mid = (a0 + a1) / 2;
      const base = p(pir, mid);
      const tip = p(por, mid);
      const l = p((pir + por) / 2, a0 + 0.03);
      const r = p((pir + por) / 2, a1 - 0.03);
      els.push(
        <path
          key={`p${i}`}
          d={`M${base} Q${l} ${tip} Q${r} ${base} Z`}
          fill={JEWELS[i % JEWELS.length]}
          fillOpacity={0.82}
          stroke="#E8C77A"
          strokeOpacity={0.45}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />,
      );
    }
  }

  // 12 radios dorados
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const s = p(60, a);
    const e = p(208, a);
    els.push(
      <line
        key={`s${i}`}
        x1={s[0]}
        y1={s[1]}
        x2={e[0]}
        y2={e[1]}
        stroke="#E8C77A"
        strokeOpacity={0.2}
        strokeWidth={1}
      />,
    );
  }

  // Banda de borde
  els.push(<circle key="ob1" cx={CX} cy={CY} r={208} fill="none" stroke="#E8C77A" strokeOpacity={0.5} strokeWidth={2} />);
  els.push(<circle key="ob2" cx={CX} cy={CY} r={238} fill="none" stroke="#E8C77A" strokeOpacity={0.75} strokeWidth={3} />);
  els.push(<circle key="ob3" cx={CX} cy={CY} r={244} fill="none" stroke="#E8C77A" strokeOpacity={0.3} strokeWidth={1} />);

  // 8 coronas alternando con 8 diamantes en r223
  {
    const on = 8;
    const orr = 223;
    for (let i = 0; i < on; i++) {
      const a = (i / on) * Math.PI * 2 - Math.PI / 2;
      const pt = p(orr, a);
      const deg = (a * 180) / Math.PI + 90;
      els.push(
        <g key={`cr${i}`} transform={`translate(${pt[0]} ${pt[1]}) rotate(${deg}) scale(1.7)`}>
          <path
            d="M-10 5 L-10 -2 L-5 2.5 L0 -6 L5 2.5 L10 -2 L10 5 Z"
            fill="#E8C77A"
            stroke="#8A6D2E"
            strokeWidth={0.8}
            strokeLinejoin="round"
          />
          <circle cx={-10} cy={-3} r={1.5} fill="#F6E3A6" />
          <circle cx={0} cy={-7} r={1.9} fill="#F6E3A6" />
          <circle cx={10} cy={-3} r={1.5} fill="#F6E3A6" />
        </g>,
      );
      const a2 = ((i + 0.5) / on) * Math.PI * 2 - Math.PI / 2;
      const p2 = p(orr, a2);
      const d2 = (a2 * 180) / Math.PI + 45;
      els.push(
        <rect
          key={`dm${i}`}
          x={Number(p2[0]) - 6.5}
          y={Number(p2[1]) - 6.5}
          width={13}
          height={13}
          rx={1.5}
          fill={JEWELS[i % JEWELS.length]}
          stroke="#E8C77A"
          strokeWidth={1.1}
          transform={`rotate(${d2} ${p2[0]} ${p2[1]})`}
        />,
      );
    }
  }

  // Hub central (el medallón estático lo cubre encima)
  els.push(<circle key="h1" cx={CX} cy={CY} r={60} fill="#0A1024" stroke="#E8C77A" strokeWidth={2} />);
  els.push(<circle key="h2" cx={CX} cy={CY} r={60} fill="none" stroke="rgb(232 199 122 / 0.35)" strokeWidth={8} />);

  return (
    <svg viewBox="0 0 500 500" className={className} aria-hidden focusable="false" style={{ display: "block" }}>
      <defs>
        <radialGradient id="vglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#16244c" />
          <stop offset="68%" stopColor="#0A1024" />
          <stop offset="100%" stopColor="#060B1A" />
        </radialGradient>
      </defs>
      <circle cx={CX} cy={CY} r={244} fill="url(#vglow)" />
      {els}
    </svg>
  );
}
