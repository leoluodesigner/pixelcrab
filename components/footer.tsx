import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-links">
          <Link href="/about">About</Link>
          <span>|</span>
          <Link href="/contact">Contact</Link>
          <span>|</span>
          <Link href="/privacy">Privacy Policy</Link>
          <span>|</span>
          <Link href="/terms">Terms</Link>
        </div>
        <p>Contact Us: {siteConfig.contactEmail}</p>
      </div>
    </footer>
  );
}
