import Link from 'next/link';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="share-page">
      <div className="share-wrap">
        <div className="card empty">
          <div className="icon-dot" aria-hidden="true">
            🧭
          </div>
          <h1 style={{ fontSize: 24 }}>This page doesn’t exist</h1>
          <p className="muted">The link may be mistyped, or the page has moved.</p>
          <Link href="/" className="btn btn-primary" style={{ marginTop: 8 }}>
            Go to the homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
