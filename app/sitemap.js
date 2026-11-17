import { config } from '@/lib/config';

// Only the site's own pages; people's content is never listed.
export default function sitemap() {
  const pages = ['', '/privacy', '/terms', '/delete-account'];
  return pages.map((p) => ({
    url: `${config.siteUrl}${p}`,
    changeFrequency: p ? 'yearly' : 'monthly',
    priority: p ? 0.3 : 1,
  }));
}

export const dynamic = 'force-dynamic';
