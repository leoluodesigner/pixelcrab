import type { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Pixelcrab for corrections, source requests, and collaboration.'
};

export default function ContactPage() {
  return (
    <article className="container legal-page">
      <h1>Contact</h1>
      <p>For corrections, source requests, collaboration, or copyright concerns, contact:</p>
      <p><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></p>
    </article>
  );
}
