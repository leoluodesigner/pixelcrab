export type ContentType = 'news' | 'guide' | 'event';
export type ContentStatus = 'draft' | 'pending' | 'published' | 'rejected';
export type ContentSource = 'steam' | 'youtube' | 'bilibili' | 'official' | 'manual';
export type Language = 'en' | 'zh';

export type Game = {
  id: string;
  slug: string;
  title: string;
  titleZh: string;
  steamAppId: number;
  description: string;
  descriptionZh: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  price: string;
  coverImage: string;
  tags: string[];
  officialUrl: string;
  steamUrl: string;
};

export type ContentItem = {
  id: string;
  gameId: string;
  slug: string;
  type: ContentType;
  source: ContentSource;
  sourceUrl: string;
  language: Language;
  status: ContentStatus;
  title: string;
  titleZh?: string;
  summary: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  bodyHtml: string;
  videoUrl?: string;
};

export type SourceConfig = {
  id: string;
  gameId: string;
  source: ContentSource;
  label: string;
  url: string;
  enabled: boolean;
};
