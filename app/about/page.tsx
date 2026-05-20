import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About Pixelcrab and its curated pixel game content model.'
};

export default function AboutPage() {
  return (
    <article className="container legal-page">
      <h1>About Pixelcrab</h1>
      <p>
        Pixelcrab is a curated information hub for pixel games. The MVP starts with Everything is Crab and organizes
        official Steam announcements, video guide references, and official event updates into game-specific pages.
      </p>
      <p>
        The long-term goal is to support multiple games, reviewed imports, community comments, AdSense, and future
        member-only features without losing a clean editorial experience.
      </p>
    </article>
  );
}
