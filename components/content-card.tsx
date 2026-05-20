import Image from 'next/image';
import Link from 'next/link';
import { contentPath, formatDisplayDate } from '@/lib/content';
import type { ContentItem } from '@/lib/types';

const sourceLabels: Record<string, string> = {
  steam: 'Steam',
  youtube: 'YouTube',
  bilibili: 'Bilibili',
  official: 'Official',
  manual: 'Manual'
};

export function ContentCard({ item }: { item: ContentItem }) {
  return (
    <Link href={contentPath(item)} className="card content-card">
      <div className="card-preview">
        <Image src={item.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" />
      </div>
      <div className="card-info">
        <div className="content-type">{item.type}</div>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-summary">{item.summary}</p>
      </div>
      <div className="card-meta">
        <span className="card-date">{formatDisplayDate(item.publishedAt)}</span>
        <span className={`card-source source-${item.source}`}>{sourceLabels[item.source] || item.source}</span>
      </div>
    </Link>
  );
}
