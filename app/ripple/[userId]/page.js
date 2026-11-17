import SharePage, { Unavailable, SHARE_ROBOTS } from '@/components/SharePage';
import Avatar from '@/components/Avatar';
import { getRipplePreview } from '@/lib/api';

// myvol.org/ripple/<id>: the app's "Share my ripple" link (and the badge celebration's
// Share). Only totals: the tree names other people, so it stays in the app.

const BADGE_LABELS = {
  spark: 'Spark',
  wave: 'Wave',
  tide: 'Tide',
  tsunami: 'Tsunami',
  city_hopper: 'City Hopper',
  six_degrees: 'Six Degrees',
  full_circle: 'Full Circle',
  spotlight: 'Spotlight',
};

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function headline(user, ripple) {
  if (!ripple?.people) return `${user.name} is building a ripple of volunteering on MyVol.`;
  const where = ripple.cities > 1 ? ` across ${ripple.cities} cities` : '';
  return `${user.name}'s volunteering has inspired ${plural(ripple.people, 'person', 'people')}${where} to do the same.`;
}

export async function generateMetadata({ params }) {
  const { userId } = await params;
  const data = await getRipplePreview(userId);
  if (!data) return { title: 'A ripple on MyVol', robots: SHARE_ROBOTS };
  const title = `${data.user.name}'s ripple`;
  const description = headline(data.user, data.ripple);
  return {
    title,
    description,
    robots: SHARE_ROBOTS,
    alternates: { canonical: `/ripple/${data.user.id}` },
    openGraph: {
      title,
      description,
      url: `/ripple/${data.user.id}`,
      ...(data.user.avatarUrl && { images: [{ url: data.user.avatarUrl, alt: data.user.name }] }),
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function RipplePage({ params }) {
  const { userId } = await params;
  const data = await getRipplePreview(userId);
  return (
    <SharePage path={`ripple/${userId}`}>
      {data ? (
        <RippleCard {...data} />
      ) : (
        <Unavailable icon="🌊" title="This ripple is in the MyVol app" text="Open the app to see it." />
      )}
    </SharePage>
  );
}

function RippleCard({ user, ripple }) {
  return (
    <article className="card gradient-edge profile-card">
      <Avatar user={user} large />
      <h1 style={{ fontSize: 24 }}>{headline(user, ripple)}</h1>
      {ripple ? (
        <>
          <div className="stats">
            <div className="stat">
              <strong>{ripple.people}</strong>
              <span>inspired</span>
            </div>
            <div className="stat">
              <strong>{ripple.depth}</strong>
              <span>levels deep</span>
            </div>
            <div className="stat">
              <strong>{ripple.cities}</strong>
              <span>cities</span>
            </div>
          </div>
          {ripple.badges?.length > 0 && (
            <div className="badges" style={{ justifyContent: 'center', marginTop: 12 }}>
              {ripple.badges.map((b) => (
                <span className="badge" key={b}>
                  {BADGE_LABELS[b] ?? b}
                </span>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="muted small">{user.name} keeps their impact numbers private.</p>
      )}
    </article>
  );
}
