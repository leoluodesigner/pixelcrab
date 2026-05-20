export const siteConfig = {
  name: 'Pixelcrab',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://leoluodesigner.github.io/pixelcrab',
  description: 'Curated news, guides, and event updates for pixel games.',
  contactEmail: 'luoao.hs@gmail.com'
};

export function absoluteUrl(path: string) {
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
