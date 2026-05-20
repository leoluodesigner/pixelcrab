import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Pixelcrab privacy policy for analytics, ads, accounts, and comments.'
};

export default function PrivacyPage() {
  return (
    <article className="container legal-page">
      <h1>Privacy Policy</h1>
      <p>
        Pixelcrab currently stores only the content needed to operate the site. Future account, comment, analytics,
        advertising, and membership features may process login identifiers, comment content, usage analytics, and
        payment status.
      </p>
      <p>
        When Google AdSense or analytics are enabled, third-party providers may use cookies or similar technologies
        according to their own policies. This page should be reviewed before production advertising launch.
      </p>
    </article>
  );
}
