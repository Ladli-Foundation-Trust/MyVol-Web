# myvol-web: the myvol.org website

The public website for **MyVol** (Ladli Foundation's volunteering app). It does three jobs:

1. **Homepage**, plus the **Privacy**, **Terms** and **Delete your account** pages (Google Play needs the
   last one).
2. **Share-link pages.** Everything the app shares is a myvol.org link:

   | Link | What the app shares |
   |---|---|
   | `https://myvol.org/post/<id>` | an activity |
   | `https://myvol.org/user/<id>` | a profile |
   | `https://myvol.org/ripple/<id>` | someone's ripple |

   With the app installed, Android opens these links **straight in the app**. Otherwise the page shows a
   preview (photo, title, who posted it) with **Open in the MyVol app** and **Get the app** buttons. WhatsApp,
   Instagram, X and others build their link cards from the page's Open Graph tags.
3. **App-link verification files**, which Android and iOS fetch to trust the app with myvol.org links:
   - `/.well-known/assetlinks.json` (Android App Links)
   - `/.well-known/apple-app-site-association` (iOS; returns 404 until there is an iOS app)

Built with Next.js 16 (App Router), React 19 and plain CSS. Node 20.9 or newer.

## Run it locally

```bash
npm install
cp .env.example .env      # then edit; see "Settings" below
npm run dev               # http://localhost:3000
```

Production build: `npm run build` then `npm start`.

## Settings (environment variables)

All are read when the server **runs**, so one build works everywhere; restart after changing one.

| Variable | Example | What it does |
|---|---|---|
| `SITE_URL` | `https://myvol.org` | This site's address (share links, Open Graph tags, sitemap). |
| `API_URL` | `https://api.myvol.org/api/v1` | The MyVol API. Only this site's **server** calls it (for previews), so no CORS setup is needed. |
| `ANDROID_CERT_SHA256` | `FA:C6:…:9C` | SHA-256 fingerprint(s) of the app's signing certificate, comma-separated. See "App Links" below. |
| `ANDROID_DOWNLOAD_URL` | `https://…/myvol.apk` | Where "Get the app" points (APK now, Play Store later). Empty = "coming soon". |
| `APPLE_TEAM_ID` | `ABCDE12345` | Apple Developer Team ID for iOS Universal Links. Empty = the file returns 404. |
| `CONTACT_EMAIL` | `support@myvol.org` | Shown on the legal pages and in the footer. **Make sure this inbox exists.** |

## Deploy

The site is a normal Node server. Any of these works:

- **Docker** (any VPS / cloud): `docker build -t myvol-web .` then
  `docker run -d -p 3000:3000 --env-file .env --restart unless-stopped myvol-web`, behind nginx/Caddy with HTTPS.
- **Plain Node**: `npm ci && npm run build`, then run `node .next/standalone/server.js` with
  `.next/static` copied to `.next/standalone/.next/static` and `public` to `.next/standalone/public`
  (`output: 'standalone'`). Keep it alive with pm2 or systemd.
- **Vercel / Netlify / Render**: import the folder and set the env vars. No other config needed.

### The rules that make App Links work (please check all four)

1. **HTTPS** on `https://myvol.org`, with a valid certificate.
2. **No redirects** for `https://myvol.org/.well-known/assetlinks.json` or for `/post/…`, `/user/…` and
   `/ripple/…`. In particular, **don't redirect myvol.org to www.myvol.org**. Redirecting www → myvol.org is
   fine.
3. `assetlinks.json` returns **200** with `Content-Type: application/json`. This app already does that; just
   make sure no proxy, CDN or "force download" rule changes it.
4. Nothing in front of the site (Cloudflare bot protection, a login wall, IP filtering) may block Google's
   verifier from fetching `/.well-known/assetlinks.json`.

After deploying, run the checker from any computer:

```bash
npm run check:links                         # checks https://myvol.org
npm run check:links -- https://staging.example.org
```

It fetches the files the way Android does and prints ✔ or ✖ for each rule. You can also use Google's tester:
`https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://myvol.org&relation=delegate_permission/common.handle_all_urls`

## App Links: the signing certificate

Android opens myvol.org links in the app only if `assetlinks.json` lists the SHA-256 fingerprint of the
certificate **the installed APK was signed with**.

- **Today** the app is signed with React Native's shared debug key
  (`FA:C6:17:45:DC:09:03:78:6F:B9:ED:E6:2A:96:2B:39:9F:73:48:F0:BB:6F:89:9B:83:32:66:75:91:03:3B:9C`). That's
  the default, so test APKs work as soon as the site is live.
- **Before the Play Store:** create a real release key, sign the app with it, and set `ANDROID_CERT_SHA256` to
  its fingerprint. When the app is on Play with Play App Signing, add the "App signing key certificate" SHA-256
  from Play Console › Setup › App integrity (comma-separated, keep both). Get a keystore's fingerprint with:

  ```bash
  keytool -list -v -keystore my-release.keystore -alias my-key-alias
  ```

## Testing share links on a phone

1. Deploy this site, and the API with its `/api/v1/previews` routes (myvolapp_backend).
2. Install a MyVol APK built **after** the site went live. Android checks `assetlinks.json` when the app is
   installed. If you installed it earlier, re-run the check over USB:
   `adb shell pm verify-app-links --re-verify org.ladlifoundation.myvolapp`
3. Check the result: `adb shell pm get-app-links org.ladlifoundation.myvolapp` should show `myvol.org: verified`.
   (Without a computer: Settings › Apps › MyVol › Open by default › "Open supported links" should list
   myvol.org.)
4. In the app, share a post to WhatsApp, then tap the link in WhatsApp. It should open the post in the app.
   On a phone without the app, the same link shows the preview page.

## Privacy

Share pages only show what a **logged-out stranger** may see (the API's `/previews` routes enforce this). A
private account's posts never appear, and its profile shows only name and photo. Share pages carry `noindex`,
so people's content stays out of search engines, while chat apps still get their link cards.

The Privacy, Terms and Delete-account texts describe how the app actually works today (data collected,
retention, deletion grace period). **Have someone at Ladli Foundation review them before the public
launch**, in particular the under-18 consent wording under India's DPDP Act.

## Where things are

```
app/
  page.js                                  homepage
  post/[postId]/page.js                    activity share page (+ Open Graph tags)
  user/[userId]/page.js                    profile share page
  ripple/[userId]/page.js                  ripple share page
  notifications/page.js                    "open your notifications in the app"
  privacy/ terms/ delete-account/          legal pages
  .well-known/assetlinks.json/route.js     Android App Links
  .well-known/apple-app-site-association/  iOS Universal Links
  opengraph-image.js                       default link-card image
  robots.js, sitemap.js, not-found.js, icon.png, apple-icon.png
components/   SiteHeader, SiteFooter, SharePage, OpenInApp (the "Open in app" button), Avatar
lib/          config.js (env vars), api.js (preview fetches)
scripts/      check-links.mjs
```
