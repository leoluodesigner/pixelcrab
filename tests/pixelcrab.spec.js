const { test, expect } = require('@playwright/test');

test.describe('Pixelcrab MVP public pages', () => {
  test('home, game page, detail page, admin shell, and safe external links work', async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Pixel game updates, guides, and events in one clean hub.' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Open game hub' })).toBeVisible();

    const unsafeBlankLinksHome = await page.locator('a[target="_blank"]:not([rel~="noopener"]), a[target="_blank"]:not([rel~="noreferrer"])').count();
    expect(unsafeBlankLinksHome).toBe(0);

    await page.goto('/games/everything-is-crab');
    await expect(page.getByRole('heading', { name: 'Everything is Crab', exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Latest News' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Guides & Walkthroughs' })).toBeVisible();

    const unsafeBlankLinksGame = await page.locator('a[target="_blank"]:not([rel~="noopener"]), a[target="_blank"]:not([rel~="noreferrer"])').count();
    expect(unsafeBlankLinksGame).toBe(0);

    await page.goto('/games/everything-is-crab/news/how-shucking-250k-sales');
    await expect(page.getByRole('heading', { name: 'How Shucking! Everything is Crab passes 250,000 Sales' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Original source' })).toBeVisible();

    await page.goto('/admin');
    await expect(page.getByRole('heading', { name: 'Admin review queue' })).toBeVisible();
    await expect(page.getByText('B 站攻略手动录入位')).toBeVisible();

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
  });
});
