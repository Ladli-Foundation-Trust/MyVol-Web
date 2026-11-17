import 'server-only';

// Everything deploy-specific, read from the environment at runtime (.env.example lists
// them). Server-only: nothing here is sent to the browser except what pages render.

const trimSlash = (s) => s.replace(/\/+$/, '');

// React Native's shared debug key: what the app is signed with until a release key exists.
const RN_DEBUG_KEY = 'FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C';

export const config = {
  siteUrl: trimSlash(process.env.SITE_URL || 'https://myvol.org'),
  apiUrl: trimSlash(process.env.API_URL || 'https://api.myvol.org/api/v1'),
  androidPackage: 'org.ladlifoundation.myvolapp',
  androidCertSha256: (process.env.ANDROID_CERT_SHA256 ?? RN_DEBUG_KEY)
    .split(',')
    .map((s) => s.trim().toUpperCase())
    .filter((s) => /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/.test(s)),
  androidDownloadUrl: process.env.ANDROID_DOWNLOAD_URL || null,
  appleTeamId: process.env.APPLE_TEAM_ID || null,
  iosBundleId: 'org.ladlifoundation.myvolapp',
  contactEmail: process.env.CONTACT_EMAIL || 'support@myvol.org',
};

// The app's custom scheme (MyVolApp app.json "scheme"). Share links use https://myvol.org;
// this is only the fallback for opening the app from a page.
export const APP_SCHEME = 'myvolapp';
