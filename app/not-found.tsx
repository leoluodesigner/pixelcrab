import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container legal-page">
      <h1>404</h1>
      <p>This page is not published or does not exist.</p>
      <Link className="button primary" href="/">Back home</Link>
    </div>
  );
}
