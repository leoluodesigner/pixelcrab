import Link from 'next/link';

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link href="/" className="brand" aria-label="Pixelcrab home">
          <img className="brand-logo" src="/image/logo.svg" alt="Pixelcrab" width="143" height="36" />
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/games/everything-is-crab" className="nav-link">Games</Link>
          <Link href="/games/everything-is-crab#news" className="nav-link">News</Link>
          <Link href="/games/everything-is-crab#guides" className="nav-link">Guides</Link>
        </nav>
      </div>
      <div className="header-right">
        <Link href="/admin" className="admin-link">Admin</Link>
      </div>
    </header>
  );
}
