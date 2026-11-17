import { config } from '@/lib/config';

// Android App Links (https://developer.android.com/training/app-links/verify-android-applinks).
// When the app is installed, Android fetches https://myvol.org/.well-known/assetlinks.json
// and, if it names the app's package and signing certificate, opens myvol.org/post/…,
// /user/… and /ripple/… links straight in the app with no chooser.
//
// Android's requirements: served over HTTPS, status 200, Content-Type application/json,
// NO redirect (so myvol.org must not redirect to www, and this path must not either).

export const dynamic = 'force-dynamic';

export function GET() {
  const statements = config.androidCertSha256.length
    ? [
        {
          relation: ['delegate_permission/common.handle_all_urls'],
          target: {
            namespace: 'android_app',
            package_name: config.androidPackage,
            sha256_cert_fingerprints: config.androidCertSha256,
          },
        },
      ]
    : [];
  return Response.json(statements, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}
