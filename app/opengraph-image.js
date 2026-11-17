import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

// The card WhatsApp, X, LinkedIn… show for myvol.org itself and for any page that has
// no image of its own (a text-only post, a private profile). Rendered once at build.

export const alt = 'MyVol: volunteer, inspire, see your ripple';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logo = await readFile(path.join(process.cwd(), 'public', 'logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 90px',
          gap: 64,
          color: '#fff',
          background: 'radial-gradient(circle at 70% 30%, #3a2a9a 0%, #14112a 45%, #0b0b0f 100%)',
        }}
      >
        <img src={logoSrc} width={300} height={275} alt="" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2 }}>MyVol</div>
          <div style={{ fontSize: 40, color: 'rgba(255,255,255,0.8)', marginTop: 12, maxWidth: 640, lineHeight: 1.25 }}>
            Volunteer. Inspire. See your ripple.
          </div>
          <div style={{ display: 'flex', marginTop: 36, height: 8, width: 360, borderRadius: 8, background: 'linear-gradient(90deg, #FF5A5F, #FF9F1C, #2EC4B6, #5B3DF5)' }} />
        </div>
      </div>
    ),
    size,
  );
}
