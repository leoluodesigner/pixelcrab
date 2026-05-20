import { absoluteUrl, siteConfig } from '@/lib/config';
import { contentPath, getAllGames, getPublishedContent } from '@/lib/content';

export function GET() {
  const games = getAllGames().map((game) => `- ${game.title}: ${absoluteUrl(`/games/${game.slug}`)}`).join('\n');
  const content = getPublishedContent().slice(0, 12).map((item) => `- ${item.title}: ${absoluteUrl(contentPath(item))}`).join('\n');

  return new Response(`# ${siteConfig.name}

${siteConfig.description}

## Games
${games}

## Published Content
${content}
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
