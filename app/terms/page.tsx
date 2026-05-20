import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Disclaimer',
  description: 'Pixelcrab terms, source attribution, and editorial disclaimer.'
};

export default function TermsPage() {
  return (
    <article className="container legal-page">
      <h1>Terms & Disclaimer</h1>
      <p>
        Pixelcrab is an independent fan and editorial aggregation project. Game names, screenshots, trailers, and
        external platform names belong to their respective owners.
      </p>
      <p>
        Public content should link back to original sources. Imported content remains in a review queue until approved
        to reduce duplicate, inaccurate, or low-value pages.
      </p>
    </article>
  );
}
