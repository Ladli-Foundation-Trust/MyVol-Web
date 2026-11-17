import SharePage, { Unavailable, SHARE_ROBOTS } from '@/components/SharePage';
import Avatar from '@/components/Avatar';
import { getUserPreview } from '@/lib/api';

// myvol.org/user/<id or username>: the app's "Share profile" link.

export async function generateMetadata({ params }) {
  const { userId } = await params;
  const data = await getUserPreview(userId);
  if (!data) return { title: 'A volunteer on MyVol', robots: SHARE_ROBOTS };
  const { user } = data;
  const title = `${user.name} (@${user.username})`;
  const description = user.isPrivate
    ? `${user.name} is on MyVol.`
    : user.bio || `See ${user.name}'s volunteering and impact on MyVol.`;
  return {
    title,
    description,
    robots: SHARE_ROBOTS,
    alternates: { canonical: `/user/${user.id}` },
    openGraph: {
      type: 'profile',
      title,
      description,
      url: `/user/${user.id}`,
      ...(user.avatarUrl && { images: [{ url: user.avatarUrl, alt: user.name }] }),
    },
    twitter: { card: 'summary', title, description },
  };
}

export default async function UserPage({ params }) {
  const { userId } = await params;
  const data = await getUserPreview(userId);
  return (
    <SharePage path={`user/${userId}`}>
      {data ? (
        <ProfileCard user={data.user} />
      ) : (
        <Unavailable icon="👤" title="This profile is in the MyVol app" text="It may have been deactivated. Open the app to look for it." />
      )}
    </SharePage>
  );
}

function ProfileCard({ user }) {
  return (
    <article className="card profile-card">
      <Avatar user={user} large />
      <h1 style={{ fontSize: 26, marginBottom: 2 }}>{user.name}</h1>
      <div className="muted">@{user.username}</div>
      {user.isPrivate ? (
        <p className="muted small" style={{ marginTop: 16 }}>
          🔒 This account is private. Follow them in the app to see their activities.
        </p>
      ) : (
        <>
          {user.bio && <p style={{ marginTop: 14 }}>{user.bio}</p>}
          <div className="stats">
            {user.postsCount !== null && (
              <div className="stat">
                <strong>{user.postsCount}</strong>
                <span>activities</span>
              </div>
            )}
            <div className="stat">
              <strong>{user.followersCount}</strong>
              <span>followers</span>
            </div>
            <div className="stat">
              <strong>{user.followingCount}</strong>
              <span>following</span>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
