import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n";
import { getWorld, JEWELS } from "@/data/worlds";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "es";
  const world = getWorld(slug);
  if (!world) return new Response("Not found", { status: 404 });
  const jewel = JEWELS[world.jewel];

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
          backgroundImage: `radial-gradient(ellipse 70% 90% at 85% -15%, ${jewel.glow}, transparent 55%)`,
          color: "#f2f4f8",
          border: "10px solid rgba(232,199,122,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 30,
              height: 30,
              borderRadius: 999,
              backgroundImage: `linear-gradient(135deg, ${jewel.to}, ${jewel.from})`,
              boxShadow: `0 0 32px ${jewel.glow}`,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#96a1bc",
            }}
          >
            {world.origin}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              maxWidth: 1000,
            }}
          >
            {world.title[locale]}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "#96a1bc",
              maxWidth: 950,
            }}
          >
            {world.tagline[locale]}
          </div>
        </div>

        <div style={{ display: "flex", gap: 48 }}>
          {world.stats.map((stat) => (
            <div
              key={stat.label[locale]}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#e8c77a" }}>
                {stat.value[locale]}
              </div>
              <div style={{ display: "flex", fontSize: 20, color: "#96a1bc" }}>
                {stat.label[locale]}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
