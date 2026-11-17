import Link from 'next/link';

export default function SiteHeader({ downloadUrl }) {
  return (
    <header className="site-header">
      <div className="container">
        <Link href="/" className="brand" aria-label="MyVol home">
          <img src="/logo.png" alt="" width={32} height={29} />
          MyVol
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#features" className="nav-link">
            Features
          </Link>
          <Link href="/#ripple" className="nav-link">
            Ripple
          </Link>
          <a href={downloadUrl || '/#download'} className="btn btn-primary">
            Get the app
          </a>
        </nav>
      </div>
    </header>
  );
}
