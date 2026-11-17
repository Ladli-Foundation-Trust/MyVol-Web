import { config } from '@/lib/config';

// The app's causes and their colours (MyVolApp/src/theme/colors.js CAUSES, light theme).
const CAUSES = [
  ['Health', '#FFE9EA', '#C8323C'],
  ['Education', '#E8EEFF', '#2F55D4'],
  ['Hunger & Poverty', '#FFF1DC', '#A85A00'],
  ['Gender Equality', '#F6E8FF', '#8E36C4'],
  ['Animal Welfare', '#FFEDE2', '#B4501A'],
  ['Environment', '#E2F6EA', '#16804A'],
  ['Child Rights', '#DFF5F3', '#0F7F78'],
  ['Youth & Sports', '#E6F2FF', '#1C6CBB'],
  ['Drug Prevention', '#EFECF8', '#54458A'],
];

const FEATURES = [
  ['📸', 'Share what you did', 'Post your volunteering with photos, videos and reels: the cause, the city, the people you helped and the hours you gave.'],
  ['🏅', 'Earn medals', 'Every approved activity counts. Reach Bronze at 3, Silver at 6, Gold at 12 and Platinum at 25.'],
  ['🌊', 'See your ripple', 'When someone volunteers because of your post, it joins your ripple. Watch it grow across people and cities.'],
  ['🤝', 'Vouched by real people', 'Friends who were there vouch for your activity, so every ripple is genuine.'],
  ['🧭', 'Find causes near you', 'Explore what volunteers in your city are doing, by cause, and join in.'],
  ['🔔', 'Stay in the loop', 'Likes, comments, new followers and ripples arrive as notifications, the moment they happen.'],
];

const BADGES = ['Spark', 'Wave', 'Tide', 'Tsunami', 'City Hopper', '+ 3 secret badges'];

export default function Home() {
  const download = config.androidDownloadUrl;
  return (
    <>
      <section className="hero">
        <div className="container">
          <div>
            <span className="eyebrow">Volunteer · Inspire · Repeat</span>
            <h1>Most apps show what you posted. MyVol shows who you inspired.</h1>
            <p className="lead">
              Share your volunteering, inspire friends to do the same, and watch the ripple of your good work spread
              from person to person and city to city.
            </p>
            <div className="hero-actions" id="download">
              {download ? (
                <a className="btn btn-primary" href={download}>
                  Get MyVol for Android
                </a>
              ) : (
                <span className="btn btn-on-night" aria-disabled="true">
                  Android app coming soon
                </span>
              )}
              <a className="btn btn-on-night" href="#features">
                See how it works
              </a>
            </div>
          </div>
          <div className="hero-art">
            <img src="/logo.png" alt="MyVol logo" width={463} height={424} />
          </div>
        </div>
      </section>

      <section className="section container" id="features">
        <div className="section-head">
          <span className="eyebrow">Features</span>
          <h2>Your volunteering, finally seen</h2>
          <p>MyVol is a social app built only for doing good: no ads, no noise, just the work volunteers do.</p>
        </div>
        <div className="grid">
          {FEATURES.map(([icon, title, text]) => (
            <div className="card" key={title}>
              <div className="icon-dot" aria-hidden="true">
                {icon}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" id="ripple">
        <div className="card gradient-edge ripple-band">
          <div>
            <span className="eyebrow">The ripple</span>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)' }}>One act of kindness rarely stays one.</h2>
            <p className="muted">
              Tap <strong>“I’ll do this too”</strong> on an activity that moves you. When you post yours, it links back,
              and the person who inspired you sees their ripple grow. Badges mark the milestones.
            </p>
          </div>
          <div className="badges" aria-label="Ripple badges">
            {BADGES.map((b) => (
              <span className="badge" key={b}>
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">Causes</span>
          <h2>Whatever you care about</h2>
        </div>
        <div className="chips">
          {CAUSES.map(([label, soft, fg]) => (
            <span className="chip" key={label} style={{ background: soft, color: fg }}>
              {label}
            </span>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Three steps to your first ripple</h2>
        </div>
        <div className="grid steps">
          <div className="card">
            <h3>Volunteer</h3>
            <p>Teach, clean, feed, mentor. Any cause, any size.</p>
          </div>
          <div className="card">
            <h3>Share it on MyVol</h3>
            <p>Add photos, the cause and who was with you. A reviewer approves it.</p>
          </div>
          <div className="card">
            <h3>Inspire others</h3>
            <p>Share the link. Every person who follows your lead grows your ripple.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="card cta">
          <h2>Start your ripple today</h2>
          <p>Free, for every volunteer. Built by Ladli Foundation.</p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            {download ? (
              <a className="btn btn-primary" href={download}>
                Get MyVol for Android
              </a>
            ) : (
              <span className="btn btn-secondary" aria-disabled="true">
                Android app coming soon
              </span>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
