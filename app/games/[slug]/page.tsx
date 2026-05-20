import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentCard } from '@/components/content-card';
import { JsonLd } from '@/components/json-ld';
import { absoluteUrl } from '@/lib/config';
import { formatDisplayDate, getContentByType, getGameBySlug, getSourcesForGame, groupContentByMonth } from '@/lib/content';

export const revalidate = 900;

export function generateStaticParams() {
  return [{ slug: 'everything-is-crab' }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};

  return {
    title: `${game.title} News, Guides, Events`,
    description: `${game.titleZh} / ${game.title}: Steam announcements, curated guides, and official updates.`,
    alternates: { canonical: `/games/${game.slug}` },
    openGraph: {
      title: `${game.title} - Pixelcrab`,
      description: game.description,
      url: absoluteUrl(`/games/${game.slug}`),
      images: [game.coverImage]
    }
  };
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const news = getContentByType('news', game.id);
  const guides = getContentByType('guide', game.id);
  const events = getContentByType('event', game.id);
  const groupedNews = groupContentByMonth(news);
  const sources = getSourcesForGame(game.id);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'VideoGame',
          name: game.title,
          alternateName: game.titleZh,
          url: absoluteUrl(`/games/${game.slug}`),
          applicationCategory: 'Game',
          operatingSystem: 'Windows',
          publisher: { '@type': 'Organization', name: game.publisher }
        }}
      />
      <div className="container">
        <section className="game-hero">
          <div className="game-cover">
            <Image src={game.coverImage} alt={game.title} width={920} height={430} priority />
          </div>
          <div>
            <h1 className="game-title">{game.title}</h1>
            <p className="game-subtitle">{game.descriptionZh}</p>
            <div className="game-meta">
              <div className="meta-item">
                <span className="meta-label">Developer</span>
                <span className="meta-value">{game.developer}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Publisher</span>
                <span className="meta-value">{game.publisher}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Release Date</span>
                <span className="meta-value">{formatDisplayDate(game.releaseDate, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Price</span>
                <span className="meta-value">{game.price}</span>
              </div>
            </div>
            <div className="game-tags">
              {game.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
            <div className="quick-actions" style={{ marginTop: 20 }}>
              <a className="button primary" href={game.steamUrl} target="_blank" rel="noopener noreferrer">Steam Store</a>
              <a className="button" href={game.officialUrl} target="_blank" rel="noopener noreferrer">Official Site</a>
            </div>
          </div>
        </section>

        <section className="section" id="news">
          <div className="section-header">
            <div>
              <h2 className="section-title">Latest News</h2>
              <p className="section-kicker">Steam announcements grouped by publication month.</p>
            </div>
          </div>
          {Object.entries(groupedNews).map(([month, items]) => (
            <div className="month-group" key={month}>
              <h3 className="month-header">{month}</h3>
              <div className="card-grid">
                {items.map((item) => <ContentCard key={item.id} item={item} />)}
              </div>
            </div>
          ))}
        </section>

        <section className="section" id="guides">
          <div className="section-header">
            <div>
              <h2 className="section-title">Guides & Walkthroughs</h2>
              <p className="section-kicker">YouTube can be imported by API; Bilibili stays manually reviewed in MVP.</p>
            </div>
          </div>
          <div className="card-grid">
            {guides.map((item) => <ContentCard key={item.id} item={item} />)}
            <a href="https://www.ign.com/games/everything-is-crab" target="_blank" rel="noopener noreferrer" className="card">
              <div className="card-preview" style={{ display: 'grid', placeItems: 'center', color: 'var(--color-youtube)', fontWeight: 800 }}>IGN</div>
              <h3 className="card-title">Everything is Crab Guide</h3>
              <p className="card-summary">External reference slot retained from the prototype.</p>
            </a>
          </div>
        </section>

        <section className="section" id="events">
          <div className="section-header">
            <div>
              <h2 className="section-title">Official Events</h2>
              <p className="section-kicker">Official-site events can be added manually first, then automated per game.</p>
            </div>
          </div>
          <div className="card-grid">
            {events.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Source pipeline</h2>
              <p className="section-kicker">Separate source configuration keeps each game module reusable.</p>
            </div>
            <Link className="button" href="/admin">Open review queue</Link>
          </div>
          <div className="source-list">
            {sources.map((source) => (
              <span key={source.id} className={`card-source source-${source.source}`}>
                {source.label}: {source.enabled ? 'enabled' : 'manual'}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
