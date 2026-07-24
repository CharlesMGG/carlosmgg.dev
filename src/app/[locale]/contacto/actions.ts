"use server";

import { headers } from "next/headers";

export type ContactState = {
  status: "idle" | "ok" | "error";
};

/**
 * Rate limit in-memory por IP (5 envíos / 10 min por instancia).
 * Suficiente para un portafolio; no hay estado compartido que proteger.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Envío del form de contacto. Regla heredada con cicatriz: este action
 * NUNCA finge éxito. Sin llaves configuradas, el form ni siquiera se
 * renderiza (lo decide la página); si Resend contesta error, se reporta
 * error de verdad.
 */
export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return { status: "error" };

  // Honeypot: campo invisible que los humanos dejan vacío
  if (String(formData.get("website") ?? "") !== "") return { status: "ok" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 2 || name.length > 80) return { status: "error" };
  if (!EMAIL_RE.test(email) || email.length > 120) return { status: "error" };
  if (message.length < 10 || message.length > 3000) return { status: "error" };

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!allow(ip)) return { status: "error" };

  try {
    // Fetch directo a la API de Resend: el contrato de error es nuestro,
    // no del SDK — un !ok es un fallo, sin ambigüedad.
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portafolio — mensaje de ${name}`,
        text: `Nombre: ${name}\nCorreo: ${email}\n\n${message}`,
      }),
    });
    if (!response.ok) {
      console.error("[contact] Resend respondió", response.status);
      return { status: "error" };
    }
    return { status: "ok" };
  } catch (error) {
    console.error("[contact] fallo de red hacia Resend", error);
    return { status: "error" };
  }
}
