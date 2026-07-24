"use client";

import { useSyncExternalStore } from "react";
import {
  subscribeSound,
  getSoundEnabled,
  getSoundEnabledServer,
  toggleSound,
} from "@/lib/sfx";

export function SoundToggle({ label }: { label: string }) {
  const on = useSyncExternalStore(
    subscribeSound,
    getSoundEnabled,
    getSoundEnabledServer,
  );

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={on}
      title={label}
      className={`glass fixed right-5 top-[3.85rem] z-50 flex h-8 w-[4.6rem] items-center justify-center gap-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest transition-colors ${
        on ? "text-gold" : "text-mist hover:text-ink"
      }`}
    >
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 6v4h2.8L9 13V3L5.3 6H2.5z" fill="currentColor" stroke="none" />
        {on ? (
          <>
            <path d="M11 5.5a3.4 3.4 0 0 1 0 5" />
            <path d="M12.8 3.8a6 6 0 0 1 0 8.4" />
          </>
        ) : (
          <path d="M11 6l3.5 4M14.5 6L11 10" />
        )}
      </svg>
      {label}
    </button>
  );
}
