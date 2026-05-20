const { test, expect } = require('@playwright/test');

test.describe('Pixelcrab SEO and publishing rules', () => {
  test('sitemap, RSS, legal pages, and unpublished content rules are present', async ({ page, request }) => {
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.ok()).toBeTruthy();
    const sitemapText = await sitemap.text();
    expect(sitemapText).toContain('/games/everything-is-crab');
    expect(sitemapText).toContain('/games/everything-is-crab/news/how-shucking-250k-sales');
    expect(sitemapText).toContain('/games/everything-is-crab/events/future-update-preview');
    expect(sitemapText).not.toContain('bilibili-guide-manual-slot');

    const rss = await request.get('/rss.xml');
    expect(rss.ok()).toBeTruthy();
    expect(await rss.text()).toContain('How Shucking!');

    await page.goto('/privacy');
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();

    await page.goto('/terms');
    await expect(page.getByRole('heading', { name: 'Terms & Disclaimer' })).toBeVisible();

    await page.goto('/games/everything-is-crab/guides/bilibili-guide-manual-slot');
    await expect(page.getByText('404')).toBeVisible();
  });
});
