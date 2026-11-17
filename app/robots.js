import { config } from '@/lib/config';

// Everything is crawlable on purpose. Share pages (people's posts and profiles) carry a
// `noindex` meta tag instead, which keeps them out of search results. Disallowing them
// here would backfire: X and LinkedIn honour robots.txt and would stop showing link
// cards, and Google can't see a noindex tag on a page it may not fetch.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${config.siteUrl}/sitemap.xml`,
  };
}

export const dynamic = 'force-dynamic';
