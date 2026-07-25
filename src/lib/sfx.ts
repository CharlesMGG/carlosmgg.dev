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
  if (enabled) {
    sfxSelect();
    startAmbient();
  } else {
    stopAmbient();
  }
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

/* ── Piano ambiental generativo ──────────────────────────────────────
   Melodía lenta e infinita en pentatónica de La menor, sintetizada nota
   por nota. Cero archivos, cero licencia. Una nota-piano = dos osciladores
   (triángulo + seno) con ataque rápido y caída larga, sobre un delay para
   dar aire. Reemplaza a cualquier canción con copyright. */

let ambientGain: GainNode | null = null;
let ambientTimer: ReturnType<typeof setTimeout> | null = null;
let ambientStep = 0;

// La menor pentatónica en dos octavas (Hz), + una quinta grave de sostén
const AMBIENT_NOTES = [
  220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25,
];

function pianoNote(freq: number, when: number, velocity: number) {
  const context = ensureContext();
  if (!ambientGain) return;

  const osc1 = context.createOscillator();
  const osc2 = context.createOscillator();
  osc1.type = "triangle";
  osc2.type = "sine";
  osc1.frequency.value = freq;
  osc2.frequency.value = freq * 2.001; // armónico con leve batido cálido

  const env = context.createGain();
  const decay = 2.4 + Math.random() * 1.3;
  env.gain.setValueAtTime(0, when);
  env.gain.linearRampToValueAtTime(velocity, when + 0.014);
  env.gain.exponentialRampToValueAtTime(0.0001, when + decay);

  const tamber = context.createBiquadFilter();
  tamber.type = "lowpass";
  tamber.frequency.value = 2600;
  tamber.Q.value = 0.3;

  osc1.connect(env);
  osc2.connect(env);
  env.connect(tamber);
  tamber.connect(ambientGain);
  osc1.start(when);
  osc2.start(when);
  osc1.stop(when + decay + 0.1);
  osc2.stop(when + decay + 0.1);
}

function scheduleAmbient() {
  if (!getSoundEnabled() || !ambientGain) return;
  const context = ensureContext();
  const now = context.currentTime;

  // Nota melódica principal (recorre la escala con saltos suaves)
  ambientStep = (ambientStep + 1 + Math.floor(Math.random() * 2)) % AMBIENT_NOTES.length;
  pianoNote(AMBIENT_NOTES[ambientStep], now + 0.02, 0.16);

  // De vez en cuando, una segunda voz (tercera/quinta) para armonía
  if (Math.random() < 0.5) {
    const harmony = AMBIENT_NOTES[(ambientStep + 2) % AMBIENT_NOTES.length];
    pianoNote(harmony / 2, now + 0.18, 0.08);
  }

  const gap = 1900 + Math.random() * 1400; // 1.9–3.3 s entre notas
  ambientTimer = setTimeout(scheduleAmbient, gap);
}

function startAmbient() {
  try {
    const context = ensureContext();
    if (!ambientGain) {
      ambientGain = context.createGain();
      ambientGain.gain.value = 0.0001;
      // Delay con realimentación = cola de reverberación barata
      const delay = context.createDelay();
      delay.delayTime.value = 0.32;
      const feedback = context.createGain();
      feedback.gain.value = 0.34;
      ambientGain.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(context.destination);
      ambientGain.connect(context.destination);
    }
    const t = context.currentTime;
    ambientGain.gain.cancelScheduledValues(t);
    ambientGain.gain.setValueAtTime(Math.max(ambientGain.gain.value, 0.0001), t);
    ambientGain.gain.exponentialRampToValueAtTime(0.5, t + 2.0);
    if (ambientTimer === null) scheduleAmbient();
  } catch {
    /* sin audio disponible */
  }
}

function stopAmbient() {
  if (ambientTimer !== null) {
    clearTimeout(ambientTimer);
    ambientTimer = null;
  }
  if (ambientGain && ctx) {
    const t = ctx.currentTime;
    ambientGain.gain.cancelScheduledValues(t);
    ambientGain.gain.setValueAtTime(Math.max(ambientGain.gain.value, 0.0001), t);
    ambientGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
  }
}
