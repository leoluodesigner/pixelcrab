import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/json-ld';
import { absoluteUrl } from '@/lib/config';
import { contentPath, formatDisplayDate } from '@/lib/content';
import type { ContentItem, Game } from '@/lib/types';

export function ArticlePage({ game, item }: { game: Game; item: ContentItem }) {
  const isVideo = item.type === 'guide' && item.videoUrl;

  return (
    <div className="container article-layout">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': isVideo ? 'VideoObject' : 'Article',
          headline: item.title,
          description: item.summary,
          image: absoluteUrl(item.coverImage),
          datePublished: item.publishedAt,
          dateModified: item.updatedAt,
          author: { '@type': 'Organization', name: item.author },
          mainEntityOfPage: absoluteUrl(contentPath(item))
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
            { '@type': 'ListItem', position: 2, name: game.title, item: absoluteUrl(`/games/${game.slug}`) },
            { '@type': 'ListItem', position: 3, name: item.title, item: absoluteUrl(contentPath(item)) }
          ]
        }}
      />
      <article className="article">
        <Link className="button" href={`/games/${game.slug}`}>Back to {game.title}</Link>
        <h1 style={{ marginTop: 24 }}>{item.title}</h1>
        <div className="article-meta">
          <span>{formatDisplayDate(item.publishedAt, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>{item.author}</span>
          <span className={`card-source source-${item.source}`}>{item.source}</span>
          <span>{item.language.toUpperCase()}</span>
        </div>
        <div className="article-cover">
          <Image src={item.coverImage} alt="" fill sizes="(max-width: 1000px) 100vw, 760px" priority />
        </div>
        <p className="card-summary" style={{ marginBottom: 24 }}>{item.summary}</p>
        <div className="article-body" dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
        <div className="quick-actions" style={{ marginTop: 28 }}>
          <a className="button primary" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Original source</a>
          {item.videoUrl ? <a className="button" href={item.videoUrl} target="_blank" rel="noopener noreferrer">Open video search</a> : null}
        </div>
      </article>
      <aside className="sidebar-box">
        <h2 className="card-title">Editorial note</h2>
        <p className="card-summary">
          Pixelcrab stores source, language, publish state, and update time for each item so future imports can be reviewed before going public.
        </p>
      </aside>
    </div>
  );
}
