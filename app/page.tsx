import Image from 'next/image';
import Link from 'next/link';
import { ContentCard } from '@/components/content-card';
import { JsonLd } from '@/components/json-ld';
import { absoluteUrl, siteConfig } from '@/lib/config';
import { getAllGames, getLatestContent } from '@/lib/content';

export const revalidate = 900;

export default function HomePage() {
  const [featuredGame] = getAllGames();
  const latest = getLatestContent(6);

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description
        }}
      />
      <div className="container">
        <section className="hero">
          <div className="hero-copy">
            <h1>Pixel game updates, guides, and events in one clean hub.</h1>
            <p>
              Pixelcrab starts with Everything is Crab and grows into a curated content layer for Steam news,
              video guides, official events, and future community discussion.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href={`/games/${featuredGame.slug}`}>Open game hub</Link>
              <Link className="button" href="/admin">Review queue</Link>
            </div>
          </div>
          <div className="hero-panel">
            <Image src={featuredGame.coverImage} alt={featuredGame.title} width={960} height={540} priority />
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured game</h2>
              <p className="section-kicker">The first reusable module for the MVP content architecture.</p>
            </div>
          </div>
          <div className="card-grid">
            {getAllGames().map((game) => (
              <Link key={game.id} href={`/games/${game.slug}`} className="card">
                <div className="card-preview">
                  <Image src={game.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <h3 className="card-title">{game.title}</h3>
                <p className="card-summary">{game.descriptionZh}</p>
                <div className="card-meta">
                  <span>{game.developer}</span>
                  <span className="card-source source-steam">AppID {game.steamAppId}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <div className="section-header">
            <div>
              <h2 className="section-title">Latest published content</h2>
              <p className="section-kicker">Only reviewed items appear on public pages.</p>
            </div>
            <Link className="button" href={absoluteUrl('/rss.xml')}>RSS</Link>
          </div>
          <div className="card-grid">
            {latest.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
        </section>
      </div>
    </>
  );
}
