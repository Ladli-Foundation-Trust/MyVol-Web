import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { config } from '@/lib/config';
import './globals.css';

// The app's fonts (MyVolApp/src/theme/fonts.js): Inter for text, Plus Jakarta Sans for
// headlines. Self-hosted by next/font at build time; no request to Google at runtime.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-jakarta', display: 'swap' });

// Render per request so the env vars (download link, contact email, site URL) are read
// when the server runs, not frozen at build time: one build works for any environment.
export const dynamic = 'force-dynamic';

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0f' },
  ],
};

export async function generateMetadata() {
  const description = 'Share your volunteering, inspire others to do the same, and see the ripple your good work creates. A Ladli Foundation initiative.';
  return {
    metadataBase: new URL(config.siteUrl),
    title: { default: 'MyVol: volunteer, inspire, see your ripple', template: '%s · MyVol' },
    description,
    applicationName: 'MyVol',
    openGraph: { type: 'website', siteName: 'MyVol', locale: 'en_IN', description },
    twitter: { card: 'summary_large_image' },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        <SiteHeader downloadUrl={config.androidDownloadUrl} />
        <main>{children}</main>
        <SiteFooter contactEmail={config.contactEmail} />
      </body>
    </html>
  );
}
