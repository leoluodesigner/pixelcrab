# Pixelcrab - Everything is Crab Game Hub

Game information website for [Everything is Crab](https://store.steampowered.com/app/3526710/) (Steam AppID: 3526710).

## Live Site

https://leoluodesigner.github.io/pixelcrab/

## What's Here

- **News** — 8 official Steam announcements, grouped by month, with modal popups for full content
- **Guides** — Links to IGN, Gamersky, and Steam store page
- **Game Info** — Developer (Odd Dreams Digital), publisher (Secret Mode), release date, pricing

## Tech Stack

- Static HTML/CSS/JS (no framework)
- CSS custom properties for theming
- GitHub Pages deployment via GitHub Actions

## Project Structure

```
├── index.html              # Main page (all-in-one: structure + styles + data + logic)
├── image/
│   └── logo.svg            # Site logo
├── steam-scrape/
│   └── images/             # Compressed news cover images (JPEG, ~3.3MB total)
└── .github/workflows/
    └── static.yml          # GitHub Pages deployment
```

## Development

Open `index.html` in a browser. No build step needed.

## Deployment

Push to `main` branch. GitHub Actions deploys to GitHub Pages automatically.
