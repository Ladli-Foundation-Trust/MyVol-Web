import Link from 'next/link';

export default function SiteFooter({ contactEmail }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <strong style={{ color: 'var(--text)' }}>MyVol</strong>
          <p className="small" style={{ margin: '4px 0 0' }}>
            A Ladli Foundation initiative. © {new Date().getFullYear()}
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/delete-account">Delete your account</Link>
          <a href={`mailto:${contactEmail}`}>Contact</a>
        </nav>
      </div>
    </footer>
  );
}
