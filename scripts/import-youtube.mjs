import { getArg, slugify, upsertPendingItems } from './_supabase-import.mjs';

const apiKey = process.env.YOUTUBE_API_KEY;
if (!apiKey) {
  throw new Error('Missing YOUTUBE_API_KEY.');
}

const gameId = getArg('game', 'everything-is-crab');
const query = getArg('query', 'Everything is Crab guide');
const maxResults = getArg('maxResults', '10');
const params = new URLSearchParams({
  part: 'snippet',
  type: 'video',
  q: query,
  maxResults,
  key: apiKey
});

const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);
if (!response.ok) {
  throw new Error(`YouTube import failed: ${response.status} ${response.statusText}`);
}

const payload = await response.json();
const items = (payload.items || []).map((video) => {
  const videoId = video.id.videoId;
  const snippet = video.snippet;
  const publishedAt = snippet.publishedAt || new Date().toISOString();

  return {
    game_id: gameId,
    slug: slugify(snippet.title || videoId),
    type: 'guide',
    source: 'youtube',
    source_url: `https://www.youtube.com/watch?v=${videoId}`,
    language: /[\u4e00-\u9fa5]/.test(`${snippet.title} ${snippet.description}`) ? 'zh' : 'en',
    status: 'pending',
    title: snippet.title || 'YouTube guide',
    summary: (snippet.description || '').slice(0, 220),
    cover_image: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || null,
    author: snippet.channelTitle || 'YouTube',
    body_html: `<p>${snippet.description || 'Imported YouTube guide. Review before publishing.'}</p>`,
    video_url: `https://www.youtube.com/watch?v=${videoId}`,
    published_at: publishedAt,
    updated_at: publishedAt
  };
});

await upsertPendingItems(items);
