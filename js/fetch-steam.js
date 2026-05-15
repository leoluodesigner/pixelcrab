const https = require('https');
const fs = require('fs');
const path = require('path');

const APP_ID = 3526710;
const API_KEY = process.env.STEAM_API_KEY;

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Pixelcrab/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error: ${e.message}`)); }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching Steam data...');

  const [appData, reviewsData, newsData] = await Promise.all([
    fetch(`https://store.steampowered.com/api/appdetails?appids=${APP_ID}&l=schinese`),
    fetch(`https://store.steampowered.com/appreviews/${APP_ID}?json=1&num_per_page=0&language=all`),
    fetch(`https://store.steampowered.com/news/?appid=${APP_ID}&json=1&count=20`),
  ]);

  const app = appData[String(APP_ID)];
  const info = app?.data;

  const result = {
    fetchedAt: new Date().toISOString(),
    game: {
      name: info?.name || 'Everything is Crab',
      description: info?.short_description || '',
      developers: info?.developers || [],
      publishers: info?.publishers || [],
      releaseDate: info?.release_date?.date || '',
      isFree: info?.is_free || false,
      price: info?.price_overview
        ? { final: info.price_overview.final_formatted, discount: info.price_overview.discount_percent }
        : null,
      genres: (info?.genres || []).map(g => g.description),
      categories: (info?.categories || []).map(c => c.description),
      headerImage: info?.header_image || '',
      website: info?.website || '',
      metacritic: info?.metacritic?.score || null,
    },
    reviews: {
      total: reviewsData?.query_summary?.total_reviews || 0,
      positive: reviewsData?.query_summary?.total_positive || 0,
      negative: reviewsData?.query_summary?.total_negative || 0,
      score: reviewsData?.query_summary?.review_score_desc || '',
      recentReviews: reviewsData?.query_summary?.reviews_per_day || 0,
    },
    news: (newsData?.appnews?.newsitems || []).map(item => ({
      id: item.gid,
      title: item.title,
      url: item.url,
      date: item.date,
      contents: item.contents,
      author: item.author || '',
    })),
  };

  const outPath = path.join(__dirname, '..', 'data', 'steam.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log(`Wrote ${outPath}`);
  console.log(`Game: ${result.game.name}`);
  console.log(`Reviews: ${result.reviews.total} (${result.reviews.score})`);
  console.log(`News: ${result.news.length} items`);
}

main().catch(err => { console.error(err); process.exit(1); });
