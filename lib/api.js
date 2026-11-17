import 'server-only';
import { cache } from 'react';
import { config } from './config';

// Link previews from the MyVol API (GET /previews/..., no login; backend decision D78).
// Each resolves to the `data` object, or null when the thing isn't public (private,
// removed, unknown) or the API can't be reached. A preview is a nicety: the page still
// renders, and the "Open in app" button still works, without one.

const TIMEOUT_MS = 4000;

async function getPreview(path) {
  try {
    const res = await fetch(`${config.apiUrl}/previews${path}`, {
      headers: { Accept: 'application/json' },
      // Same as the API's own Cache-Control: a post made private disappears from
      // previews within five minutes.
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body?.data ?? null;
  } catch {
    return null;
  }
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
// An id or a username (the app links by id; usernames work too).
const USER_KEY = /^[A-Za-z0-9._-]{1,64}$/;

// cache(): generateMetadata and the page share one request per render.
export const getPostPreview = cache((postId) => (UUID.test(postId) ? getPreview(`/posts/${postId}`) : null));
export const getUserPreview = cache((user) => (USER_KEY.test(user) ? getPreview(`/users/${encodeURIComponent(user)}`) : null));
export const getRipplePreview = cache((user) => (USER_KEY.test(user) ? getPreview(`/ripple/${encodeURIComponent(user)}`) : null));
