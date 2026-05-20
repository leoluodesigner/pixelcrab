# Pixelcrab

Content aggregation MVP for pixel games, starting with "Everything is Crab" (Steam AppID `3526710`).

## Tech

- Next.js App Router + TypeScript
- React 19
- CSS custom properties in `app/globals.css`
- Supabase-ready schema in `supabase/migrations/`
- Playwright smoke tests via `npm test`
- Vercel is the intended app host; GitHub Actions runs CI only

## Current State

- The old static `index.html` is now a legacy visual prototype.
- The active app is the Next.js implementation under `app/`.
- Header logo is `public/image/logo.svg`.
- `npm run build` passes.
- `npm test` passes locally with 2 Playwright tests.

## Data

MVP data starts in `data/seed.ts` and mirrors the Supabase schema.

- `published` content renders publicly.
- `pending` content appears only in `/admin`.
- Bilibili remains manual in the MVP.
- Steam and YouTube import scripts write pending items for review.

## Key Files

| File | Purpose |
|------|---------|
| `app/` | Next.js public pages, detail routes, admin shell, SEO routes |
| `components/` | Shared UI components |
| `data/seed.ts` | Local seed data for one game and reviewed/pending content |
| `lib/` | Content helpers, config, Supabase helpers, types |
| `scripts/import-steam.mjs` | Steam news import to pending content |
| `scripts/import-youtube.mjs` | YouTube guide import to pending content |
| `supabase/migrations/0001_pixelcrab_mvp.sql` | Database schema and RLS policies |
| `public/image/logo.svg` | Header logo |
| `public/steam-scrape/images/` | Local cover images |
| `index.html` | Legacy static visual prototype |
| `.github/workflows/static.yml` | CI build/test workflow |

## Routes

- `/`
- `/games/everything-is-crab`
- `/games/everything-is-crab/news/[id]`
- `/games/everything-is-crab/guides/[id]`
- `/games/everything-is-crab/events/[id]`
- `/admin`
- `/about`, `/contact`, `/privacy`, `/terms`
- `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/llms.txt`

## Running

Always run commands from the project folder:

```bash
cd "/Users/luoao/Desktop/TC/UXfile/AI/pixelcrab"
npm install
npm run dev
```

## Verification

```bash
npm run build
npm test
```

Tests should pass locally. In restricted Codex sandbox sessions, Playwright may fail to bind `127.0.0.1:3000`; that is an environment limitation, not necessarily an app failure.

## Deploy

Deploy the Next.js app on Vercel. Pushes to `main` run CI in GitHub Actions.

## Notes

- User is a UX designer (罗奥), not a developer. Keep explanations simple.
- Imported content should enter `pending` and be reviewed before publication.
- Do not reintroduce automatic Bilibili scraping in the MVP without explicit approval.
