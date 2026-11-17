import OpenInApp from './OpenInApp';
import { config } from '@/lib/config';

// Every share link's page (/post, /user, /ripple, /notifications): the preview card,
// then "Open in the app" + "Get the app". `path` is the app's own path for it
// (post/<id>), the same one config/linking.js in the app routes.
export default function SharePage({ path, children }) {
  return (
    <div className="share-page">
      <div className="share-wrap">
        {children}
        <OpenInApp path={path} downloadUrl={config.androidDownloadUrl} />
        <p className="note">Have the app? Links to myvol.org open in it directly.</p>
      </div>
    </div>
  );
}

// Shown when there's no public preview: private, removed, or the API is unreachable.
// The app (signed in) may still show it, so the buttons stay.
export function Unavailable({ icon = '🔒', title, text }) {
  return (
    <div className="card empty">
      <div className="icon-dot" aria-hidden="true">
        {icon}
      </div>
      <h1 style={{ fontSize: 22 }}>{title}</h1>
      <p className="muted" style={{ margin: 0 }}>
        {text}
      </p>
    </div>
  );
}

// Share pages show people's content: keep them out of search results (link previews in
// chat apps still work; they read the Open Graph tags, not robots).
export const SHARE_ROBOTS = { index: false, follow: false };
