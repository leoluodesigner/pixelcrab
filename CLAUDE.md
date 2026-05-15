# Pixelcrab

Static game information website for "Everything is Crab" (Steam AppID: 3526710).

## Tech

- Pure HTML/CSS/JS, no framework, no build step
- Single `index.html` file (~875 lines): structure + styles + data + logic
- CSS custom properties for theming
- GitHub Pages deployment via `.github/workflows/static.yml`

## Data

All game data is hardcoded in `index.html` as a `newsData` array (8 items). No API calls. Steam API integration was attempted but blocked by CORS (browser) and IP filtering (cloud servers).

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main page: header, hero, news cards, guides, game info, footer, modal |
| `steam-scrape/images/` | 18 compressed JPEG news cover images (~3.3MB) |
| `image/logo.svg` | Site logo |
| `.github/workflows/static.yml` | GitHub Pages auto-deploy on push to main |

## Running

Open `index.html` in a browser. No install needed.

## Deploy

Push to `main` → GitHub Actions auto-deploys to Pages.

## Notes

- User is a UX designer (罗奥), not a developer. Keep explanations simple.
- News content includes both English and Chinese articles from official Steam announcements.
- Images were compressed from PNG to JPEG (max 1200px, quality 80%) for faster loading.
