import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticlePage } from '@/components/article-page';
import { absoluteUrl } from '@/lib/config';
import { getContentByType, getContentItem, getGameBySlug } from '@/lib/content';

export const revalidate = 900;

export function generateStaticParams() {
  return getContentByType('event', 'everything-is-crab').map((item) => ({
    slug: 'everything-is-crab',
    id: item.slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; id: string }> }): Promise<Metadata> {
  const { slug, id } = await params;
  const game = getGameBySlug(slug);
  const item = game ? getContentItem(game.id, 'event', id) : undefined;
  if (!game || !item) return {};

  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/games/${game.slug}/events/${item.slug}` },
    openGraph: {
      title: item.title,
      description: item.summary,
      url: absoluteUrl(`/games/${game.slug}/events/${item.slug}`),
      images: [item.coverImage],
      type: 'article'
    }
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const game = getGameBySlug(slug);
  const item = game ? getContentItem(game.id, 'event', id) : undefined;
  if (!game || !item) notFound();

  return <ArticlePage game={game} item={item} />;
}
