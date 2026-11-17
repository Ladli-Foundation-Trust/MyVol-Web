import { config } from '@/lib/config';

// iOS Universal Links. Apple fetches this (no file extension) from
// https://myvol.org/.well-known/apple-app-site-association. It needs the Apple Developer
// Team ID, so until there is an iOS app (APPLE_TEAM_ID unset) it is a plain 404.
// The paths match the Android intent filters and the app's linking config.

export const dynamic = 'force-dynamic';

const PATHS = ['/post/*', '/user/*', '/ripple/*'];

export function GET() {
  if (!config.appleTeamId) {
    return Response.json({ error: 'Not configured' }, { status: 404 });
  }
  const appID = `${config.appleTeamId}.${config.iosBundleId}`;
  return Response.json(
    {
      applinks: {
        details: [{ appIDs: [appID], components: PATHS.map((p) => ({ '/': p })) }],
      },
      webcredentials: { apps: [appID] },
    },
    { headers: { 'Cache-Control': 'public, max-age=3600' } },
  );
}
