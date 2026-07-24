"use client";

/**
 * SFX sintetizados con Web Audio API — cero archivos, cero licencias.
 * Apagado por default; el estado vive en localStorage y se expone como
 * store externo para useSyncExternalStore.
 */

const STORAGE_KEY = "sfx-on";

type Listener = () => void;
const listeners = new Set<Listener>();
let enabled: boolean | null = null;
let ctx: AudioContext | null = null;

export function subscribeSound(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSoundEnabled(): boolean {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      enabled = false;
    }
  }
  return enabled;
}

export function getSoundEnabledServer(): boolean {
  return false;
}

export function toggleSound() {
  enabled = !getSoundEnabled();
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    /* modo incógnito: el toggle vive solo esta sesión */
  }
  listeners.forEach((listener) => listener());
  if (enabled) sfxSelect();
}

function ensureContext(): AudioContext {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  frequency: number,
  delay: number,
  duration: number,
  type: OscillatorType = "sine",
  peak = 0.08,
) {
  const context = ensureContext();
  const start = context.currentTime + delay;
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(peak, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.05);
}

/** Selección en el menú: dos tonos cortos ascendentes */
export function sfxSelect() {
  if (!getSoundEnabled()) return;
  try {
    tone(920, 0, 0.09);
    tone(1380, 0.045, 0.12);
  } catch {
    /* sin audio disponible */
  }
}

/** Entrar a un mundo: arpegio ascendente */
export function sfxEnter() {
  if (!getSoundEnabled()) return;
  try {
    tone(523.25, 0, 0.14);
    tone(783.99, 0.07, 0.16);
    tone(1046.5, 0.14, 0.22, "sine", 0.07);
  } catch {
    /* sin audio disponible */
  }
}

/** La caída inicial: swell grave que sube */
export function sfxDive() {
  if (!getSoundEnabled()) return;
  try {
    tone(196, 0, 0.6, "sine", 0.05);
    tone(392, 0.12, 0.5, "sine", 0.04);
    tone(587.33, 0.28, 0.6, "sine", 0.05);
  } catch {
    /* sin audio disponible */
  }
}
