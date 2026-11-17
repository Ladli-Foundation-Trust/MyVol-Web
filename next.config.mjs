// Security headers on every response. No CSP yet: Next's inline bootstrap scripts need
// a nonce setup, and this site has no user input or third-party scripts to protect.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A self-contained server in .next/standalone (see Dockerfile / README "Deploy").
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  // /post/abc and /post/abc/ must be the same page: Android verifies App Links against
  // the exact paths the app declares, and a redirect here would break them.
  trailingSlash: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
