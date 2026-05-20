import { absoluteUrl, siteConfig } from '@/lib/config';
import { contentPath, getPublishedContent } from '@/lib/content';

export function GET() {
  const items = getPublishedContent().map((item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${absoluteUrl(contentPath(item))}</link>
      <guid>${absoluteUrl(contentPath(item))}</guid>
      <pubDate>${new Date(item.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${item.summary}]]></description>
    </item>
  `).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${siteConfig.name}</title>
        <link>${siteConfig.url}</link>
        <description>${siteConfig.description}</description>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8'
    }
  });
}
