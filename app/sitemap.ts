import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/config';
import { contentPath, getAllGames, getPublishedContent } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['/', '/about', '/contact', '/privacy', '/terms'];
  const gamePages = getAllGames().map((game) => `/games/${game.slug}`);
  const contentPages = getPublishedContent().map(contentPath);

  return [...staticPages, ...gamePages, ...contentPages].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date()
  }));
}
