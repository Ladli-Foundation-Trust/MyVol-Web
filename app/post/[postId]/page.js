import SharePage, { Unavailable, SHARE_ROBOTS } from '@/components/SharePage';
import Avatar from '@/components/Avatar';
import { getPostPreview } from '@/lib/api';

// myvol.org/post/<id>: what the app's "Share" on an activity sends (MyVolApp
// utils/share.js → config/linking.js postUrl). With the app installed, Android opens it
// in the app (App Links) and this page is never seen.

const truncate = (s, n) => (s && s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

export async function generateMetadata({ params }) {
  const { postId } = await params;
  const data = await getPostPreview(postId);
  if (!data) {
    return { title: 'An activity on MyVol', description: 'Open it in the MyVol app.', robots: SHARE_ROBOTS };
  }
  const { post, author } = data;
  const title = `${post.title} · ${author.name}`;
  const description = truncate(post.description || `${author.name} volunteered for ${post.category} on MyVol.`, 200);
  return {
    title,
    description,
    robots: SHARE_ROBOTS,
    alternates: { canonical: `/post/${post.id}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/post/${post.id}`,
      ...(post.image?.url && {
        images: [{ url: post.image.url, width: post.image.width || undefined, height: post.image.height || undefined, alt: post.title }],
      }),
    },
    twitter: { card: post.image?.url ? 'summary_large_image' : 'summary', title, description },
  };
}

export default async function PostPage({ params }) {
  const { postId } = await params;
  const data = await getPostPreview(postId);
  return (
    <SharePage path={`post/${postId}`}>
      {data ? (
        <PostCard {...data} />
      ) : (
        <Unavailable
          title="This activity is in the MyVol app"
          text="It may be from a private account, or it was removed. Open the app to see it if you can."
        />
      )}
    </SharePage>
  );
}

function PostCard({ post, author }) {
  const meta = [
    post.category,
    post.location,
    post.beneficiaries ? `${post.beneficiaries} beneficiaries` : null,
    post.hours ? `${post.hours} hours` : null,
  ].filter(Boolean);
  return (
    <article className="card preview">
      {post.image?.url && (
        <div className="preview-media">
          <img src={post.image.url} alt={post.title} />
          {post.isVideo && (
            <span className="play" aria-label="Video">
              ▶
            </span>
          )}
        </div>
      )}
      <div className="preview-body">
        <div className="person">
          <Avatar user={author} />
          <div>
            <div className="person-name">{author.name}</div>
            <div className="muted small">@{author.username}</div>
          </div>
        </div>
        <h1>{post.title}</h1>
        {post.description && <p className="muted">{post.description}</p>}
        <div className="meta">
          {meta.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
        <div className="meta">
          <span>❤ {post.likesCount}</span>
          <span>💬 {post.commentsCount}</span>
        </div>
      </div>
    </article>
  );
}
