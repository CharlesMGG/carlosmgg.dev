import { ImageResponse } from "next/og";
import { isLocale, getDictionary } from "@/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Carlos García — Full-Stack";

const JEWEL_DOTS = ["#3b6fd4", "#22d3ee", "#a78bfa", "#f472b6", "#e8c77a"];

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(isLocale(locale) ? locale : "es");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#060b1a",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 75% -10%, rgba(30,58,138,0.45), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 110%, rgba(124,58,237,0.3), transparent 60%)",
          color: "#f2f4f8",
          border: "10px solid rgba(232,199,122,0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#e8c77a",
          }}
        >
          {dict.hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {dict.hero.headline}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {JEWEL_DOTS.map((color) => (
            <div
              key={color}
              style={{
                display: "flex",
                width: 22,
                height: 22,
                borderRadius: 999,
                backgroundColor: color,
                boxShadow: `0 0 24px ${color}`,
              }}
            />
          ))}
          <div style={{ display: "flex", fontSize: 26, color: "#96a1bc", marginLeft: 12 }}>
            carlosmgg.dev
          </div>
        </div>
      </div>
    ),
    size,
  );
}
