import SharePage, { Unavailable, SHARE_ROBOTS } from '@/components/SharePage';

// myvol.org/notifications: the app's inbox route (config/linking.js "Activity"). Only
// reachable from inside the app; here it just offers to open it.

export const metadata = { title: 'Your notifications', robots: SHARE_ROBOTS };

export default function NotificationsPage() {
  return (
    <SharePage path="notifications">
      <Unavailable icon="🔔" title="Your notifications are in the app" text="Open MyVol to see your likes, comments, followers and ripples." />
    </SharePage>
  );
}
