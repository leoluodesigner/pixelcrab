# Pixelcrab

Pixelcrab is a content aggregation MVP for pixel games. It starts with **Everything is Crab** (Steam AppID `3526710`) and is structured for Steam news, YouTube guides, manual Bilibili guide entries, official events, SEO/GEO foundations, and future community features.

## Current Status

- Migrated from a single static `index.html` prototype to a Next.js App Router app.
- MVP covers one game: Everything is Crab.
- Public pages render only `published` content; imported/manual content starts as `pending`.
- Header logo uses `public/image/logo.svg`.
- `npm run build` passes.
- `npm test` passes locally with 2 Playwright smoke tests.

## Stack

- Next.js App Router + TypeScript
- React 19
- Supabase-ready schema and helper client
- Local seed data fallback for development
- Playwright smoke tests
- Vercel-ready deployment

## Project Structure

| Path | Purpose |
|------|---------|
| `app/` | Next.js pages, SEO routes, legal pages, admin review shell |
| `components/` | Shared UI components |
| `data/seed.ts` | Local MVP seed data for games, content, and sources |
| `lib/` | Config, content helpers, Supabase helpers, shared types |
| `scripts/` | Steam and YouTube import scripts |
| `supabase/migrations/` | Database schema, RLS policies, initial game/source rows |
| `public/image/logo.svg` | Site header logo |
| `public/steam-scrape/images/` | Local news cover images used by the Next.js app |
| `index.html` | Legacy static prototype kept for visual reference |
| `.github/workflows/static.yml` | CI build/test workflow |

## Local Development

Always run commands from the project folder:

```bash
cd "/Users/luoao/Desktop/TC/UXfile/AI/pixelcrab"
npm install
npm run dev
```

Open `http://127.0.0.1:3000`.

## Scripts

```bash
npm run dev       # Start local Next.js dev server
npm run build     # Production build
npm test          # Playwright smoke tests
npm run lint      # Next.js lint command
```

## Content Imports

Steam news imports create `pending` rows for human review:

```bash
npm run import:steam -- --appid=3526710 --game=everything-is-crab
```

YouTube guide imports require `YOUTUBE_API_KEY`:

```bash
npm run import:youtube -- --query="Everything is Crab guide" --game=everything-is-crab
```

Bilibili is manual in the MVP. Add Bilibili entries through the admin/review workflow instead of automatic scraping.

## Environment

Copy `.env.example` to `.env.local` when Supabase or YouTube imports are needed:

```bash
cp .env.example .env.local
```

Important variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `YOUTUBE_API_KEY`

## Supabase

Apply:

```text
supabase/migrations/0001_pixelcrab_mvp.sql
```

Main tables:

- `games`
- `sources`
- `content_items`
- `profiles`
- `comments`

RLS is enabled. Public visitors can read games, sources, and published content. Admin policies are prepared for review/publish workflows.

## SEO/GEO

Implemented foundations:

- Per-page metadata and canonical URLs
- `robots.txt`
- `sitemap.xml`
- `rss.xml`
- `llms.txt`
- JSON-LD for game/content pages
- Legal/compliance pages: About, Contact, Privacy Policy, Terms & Disclaimer

## Testing

```bash
npm run build
npm test
```

The Playwright tests verify:

- Home, game page, detail page, and admin shell load.
- External links that open a new tab use safe `rel` attributes.
- Sitemap and RSS are available.
- Pending content is not included in public sitemap output.
- Legal pages exist.

## Deployment

Deploy the Next.js app on Vercel. GitHub Actions currently runs CI on pushes and pull requests.

## Notes

- Keep explanations simple for non-developer handoff.
- Keep imported content in `pending` until reviewed.
- Keep the legacy `index.html` only as a reference while the Next.js MVP becomes the production path.
