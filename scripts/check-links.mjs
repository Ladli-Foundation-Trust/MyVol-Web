// Checks a deployed site the way Android does before trusting it for App Links.
//
//   npm run check:links                      → https://myvol.org
//   npm run check:links -- http://localhost:3000
//
// Exit code 0 = everything Android needs is in place.

const site = (process.argv[2] || 'https://myvol.org').replace(/\/+$/, '');
const PACKAGE = 'org.ladlifoundation.myvolapp';
let failed = 0;

const ok = (msg) => console.log(`  ✔ ${msg}`);
const bad = (msg) => {
  failed++;
  console.log(`  ✖ ${msg}`);
};

async function check(name, fn) {
  console.log(name);
  try {
    await fn();
  } catch (err) {
    bad(err.message);
  }
}

await check(`${site}/.well-known/assetlinks.json`, async () => {
  const res = await fetch(`${site}/.well-known/assetlinks.json`, { redirect: 'manual' });
  if (res.status >= 300 && res.status < 400) return bad(`redirects to ${res.headers.get('location')}: Android does not follow redirects here`);
  res.status === 200 ? ok('status 200') : bad(`status ${res.status}`);
  const type = res.headers.get('content-type') || '';
  type.includes('application/json') ? ok(`content-type ${type}`) : bad(`content-type is "${type}", must be application/json`);
  if (site.startsWith('https://')) ok('served over HTTPS');
  else console.log('  ! not HTTPS: fine for a local test, Android requires HTTPS');
  const body = await res.json();
  const entry = Array.isArray(body) && body.find((s) => s?.target?.package_name === PACKAGE);
  if (!entry) return bad(`no statement for ${PACKAGE}`);
  ok(`names ${PACKAGE}`);
  entry.relation?.includes('delegate_permission/common.handle_all_urls') ? ok('relation handle_all_urls') : bad('missing relation handle_all_urls');
  const fps = entry.target.sha256_cert_fingerprints || [];
  fps.length ? ok(`${fps.length} certificate fingerprint(s): ${fps.join(', ')}`) : bad('no certificate fingerprints');
});

for (const path of ['/', '/post/00000000-0000-4000-8000-000000000000', '/user/someone', '/ripple/someone', '/privacy', '/terms', '/delete-account']) {
  await check(`${site}${path}`, async () => {
    const res = await fetch(`${site}${path}`, { redirect: 'manual' });
    res.status === 200 ? ok('status 200, no redirect') : bad(`status ${res.status}${res.headers.get('location') ? ` → ${res.headers.get('location')}` : ''}`);
  });
}

console.log(failed ? `\n${failed} problem(s) found.` : '\nAll good. Android can verify myvol.org for the app.');
process.exit(failed ? 1 : 0);
