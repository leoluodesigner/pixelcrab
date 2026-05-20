# Pixelcrab

Pixelcrab is a Next.js content aggregation MVP for pixel games. The original `index.html` remains as a visual reference only.

## Current Architecture

- `app/`: Next.js App Router pages, SEO routes, legal pages, admin shell
- `components/`: shared UI components
- `data/seed.ts`: local MVP seed data
- `lib/`: content helpers, config, Supabase helpers, shared types
- `scripts/`: Steam and YouTube import scripts
- `supabase/migrations/`: database schema and RLS policies
- `public/image/logo.svg`: active header logo
- `public/steam-scrape/images/`: local cover images

## Workflow

Run from the project folder:

```bash
cd "/Users/luoao/Desktop/TC/UXfile/AI/pixelcrab"
npm install
npm run dev
```

Run checks:

```bash
npm run build
npm test
```

Both build and tests pass locally as of the Next.js MVP migration.

## Content Rule

All imports should create `pending` content first. Only `published` content appears on public pages and in SEO feeds.

## MVP Scope

- One game: Everything is Crab.
- Steam news import prepared.
- YouTube guide import prepared.
- Bilibili entries remain manual.
- Supabase tables and RLS are prepared for admin review and future comments.
