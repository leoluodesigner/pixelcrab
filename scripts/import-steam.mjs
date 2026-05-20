import { getArg, slugify, stripHtml, upsertPendingItems } from './_supabase-import.mjs';

const appid = getArg('appid', '3526710');
const gameId = getArg('game', 'everything-is-crab');
const count = Number(getArg('count', '20'));
const url = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${appid}&count=${count}&maxlength=5000&format=json`;

const response = await fetch(url);
if (!response.ok) {
  throw new Error(`Steam import failed: ${response.status} ${response.statusText}`);
}

const payload = await response.json();
const newsItems = payload?.appnews?.newsitems || [];

const items = newsItems.map((item) => {
  const summary = stripHtml(item.contents).slice(0, 220);
  const date = new Date((item.date || Math.floor(Date.now() / 1000)) * 1000).toISOString();

  return {
    game_id: gameId,
    slug: slugify(item.title || item.gid),
    type: 'news',
    source: 'steam',
    source_url: item.url || `https://store.steampowered.com/news/app/${appid}/view/${item.gid}`,
    language: /[\u4e00-\u9fa5]/.test(item.title + item.contents) ? 'zh' : 'en',
    status: 'pending',
    title: item.title || 'Steam announcement',
    summary,
    cover_image: null,
    author: item.author || 'Steam Announcement',
    body_html: item.contents || summary,
    published_at: date,
    updated_at: date
  };
});

await upsertPendingItems(items);
