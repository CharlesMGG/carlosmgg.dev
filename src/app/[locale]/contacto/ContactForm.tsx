"use client";

import { useActionState } from "react";
import type { Dictionary } from "@/i18n/types";
import { sendContact, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm({ labels }: { labels: Dictionary["contact"]["form"] }) {
  const [state, action, pending] = useActionState(sendContact, initialState);

  if (state.status === "ok") {
    return (
      <p className="glass mt-8 max-w-xl rounded-2xl p-6 text-sm leading-relaxed text-ink">
        <span aria-hidden className="mr-2 text-gold">✦</span>
        {labels.success}
      </p>
    );
  }

  return (
    <form action={action} className="mt-8 max-w-xl space-y-4">
      {/* Honeypot — invisible para humanos, irresistible para bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-widest text-mist">
            {labels.name}
          </span>
          <input
            type="text"
            name="name"
            required
            minLength={2}
            maxLength={80}
            className="glass mt-1.5 w-full rounded-xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-mist/50 focus:border-gold/50"
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-widest text-mist">
            {labels.email}
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={120}
            className="glass mt-1.5 w-full rounded-xl px-4 py-2.5 text-sm text-ink outline-none placeholder:text-mist/50 focus:border-gold/50"
          />
        </label>
      </div>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-widest text-mist">
          {labels.message}
        </span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          className="glass mt-1.5 w-full resize-y rounded-xl px-4 py-2.5 text-sm leading-relaxed text-ink outline-none placeholder:text-mist/50 focus:border-gold/50"
        />
      </label>

      {state.status === "error" && (
        <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {labels.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="glass rounded-full px-6 py-3 text-sm font-medium text-gold transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {pending ? labels.sending : labels.send}
      </button>
    </form>
  );
}
