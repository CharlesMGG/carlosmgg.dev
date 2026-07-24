import { ImageResponse } from "next/og";
import { isLocale, getDictionary } from "@/i18n";
import { getNote } from "@/data/notes";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Field note";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "es";
  const note = getNote(slug);
  if (!note) return new Response("Not found", { status: 404 });
  const dict = getDictionary(locale);

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
            "radial-gradient(ellipse 60% 80% at 90% -10%, rgba(232,199,122,0.18), transparent 55%)",
          color: "#f2f4f8",
          border: "10px solid rgba(232,199,122,0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e8c77a",
          }}
        >
          {dict.notes.title} · {note.date}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 66,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {note.title[locale]}
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#96a1bc" }}>
          Carlos García · carlosmgg.dev
        </div>
      </div>
    ),
    size,
  );
}
