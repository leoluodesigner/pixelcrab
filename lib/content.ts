import { contentItems, games, sourceConfigs } from '@/data/seed';
import type { ContentItem, ContentStatus, ContentType, Game } from '@/lib/types';

export function getAllGames(): Game[] {
  return games;
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((game) => game.slug === slug);
}

export function getPublishedContent(gameId?: string): ContentItem[] {
  return getContentByStatus('published')
    .filter((item) => (gameId ? item.gameId === gameId : true))
    .sort(sortByPublishedDesc);
}

export function getPendingContent(): ContentItem[] {
  return getContentByStatus('pending').sort(sortByPublishedDesc);
}

export function getContentByStatus(status: ContentStatus): ContentItem[] {
  return contentItems.filter((item) => item.status === status);
}

export function getContentByType(type: ContentType, gameId?: string): ContentItem[] {
  return getPublishedContent(gameId).filter((item) => item.type === type);
}

export function getContentItem(gameId: string, type: ContentType, slug: string): ContentItem | undefined {
  return getPublishedContent(gameId).find((item) => item.type === type && item.slug === slug);
}

export function getLatestContent(limit = 8): ContentItem[] {
  return getPublishedContent().slice(0, limit);
}

export function getSourcesForGame(gameId: string) {
  return sourceConfigs.filter((source) => source.gameId === gameId);
}

export function getGameForContent(item: ContentItem): Game | undefined {
  return games.find((game) => game.id === item.gameId);
}

export function groupContentByMonth(items: ContentItem[]) {
  return items.reduce<Record<string, ContentItem[]>>((groups, item) => {
    const key = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(item.publishedAt));
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}

export function formatDisplayDate(date: string, options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }) {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

export function contentPath(item: ContentItem) {
  const section = item.type === 'guide' ? 'guides' : item.type === 'event' ? 'events' : 'news';
  return `/games/${item.gameId}/${section}/${item.slug}`;
}

export function sortByPublishedDesc(a: ContentItem, b: ContentItem) {
  return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
}
