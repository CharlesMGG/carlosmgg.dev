# carlosmgg.dev

Personal portfolio of **Carlos García** — full-stack developer. Bilingual (ES/EN), fully static, themed after the visual grammar of a certain stained-glass-and-starlight RPG.

**Live:** [carlosmgg.dev](https://carlosmgg.dev)

## Why this repo is public

Most of my production work — multi-tenant logistics SaaS, field-operations portals, an iOS app — belongs to clients and stays private. This site is 100% my own code, so it doubles as the code sample: the thing you're looking at *is* the portfolio piece.

## Stack

- **Next.js 16** (App Router, fully static output — every route is SSG)
- **Tailwind CSS v4** (CSS-first config, custom design tokens)
- **Motion** for world-to-world transitions
- **TypeScript** strict, no `any`
- i18n with no library: a `[locale]` segment plus typed dictionaries (~50 lines)
- Sound effects synthesized at runtime with the Web Audio API — no audio files, no licenses, no bytes

## Architecture notes

- `src/i18n/` — locale config + typed `Dictionary` per language. Adding a language = one file.
- `src/data/worlds.ts` — each case study ("world") is typed data, not markup. Adding a project touches one file.
- `src/app/[locale]/` — the locale segment is the root layout; `/` redirects to `/es` at the edge.
- No database, no auth, no cookies. The only server code is the contact form.

## Running locally

```bash
pnpm install
pnpm dev
```

## License

Code is MIT. The content (texts, case studies, images) is © Carlos García — please don't republish it as your own.
