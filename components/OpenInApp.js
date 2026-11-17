'use client';

import { useEffect, useState } from 'react';

const APP_SCHEME = 'myvolapp';
const ANDROID_PACKAGE = 'org.ladlifoundation.myvolapp';

// The page someone lands on when a myvol.org link did NOT open the app by itself: the
// app isn't installed, they're on a computer, or an in-app browser (Instagram, some
// WhatsApp versions) kept the link inside itself. On a phone with the app, Android App
// Links open /post/… straight in the app and this page is never seen.
//
// "Open in the app" on Android uses an intent:// URL: Chrome opens the app if it's
// installed, and otherwise goes to `fallbackUrl` instead of showing an error. Elsewhere it
// is the app's custom scheme.
function androidIntent(path, fallbackUrl) {
  const fallback = fallbackUrl ? `S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};` : '';
  return `intent://${path}#Intent;scheme=${APP_SCHEME};package=${ANDROID_PACKAGE};${fallback}end`;
}

export default function OpenInApp({ path, downloadUrl, fallbackUrl }) {
  const [href, setHref] = useState(`${APP_SCHEME}://${path}`);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const android = /android/i.test(navigator.userAgent);
    setIsAndroid(android);
    if (android) setHref(androidIntent(path, fallbackUrl || downloadUrl));
  }, [path, downloadUrl, fallbackUrl]);

  return (
    <div className="open-actions">
      <a className="btn btn-primary" href={href} rel="nofollow">
        Open in the MyVol app
      </a>
      {downloadUrl ? (
        <a className="btn btn-secondary" href={downloadUrl}>
          {isAndroid ? 'Get MyVol for Android' : 'Get the app'}
        </a>
      ) : (
        <span className="btn btn-secondary" aria-disabled="true">
          App download coming soon
        </span>
      )}
    </div>
  );
}
