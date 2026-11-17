import { config } from '@/lib/config';

// Google Play requires a web page explaining how to delete an account and its data
// (Play Console > App content > Data safety > "Delete account URL"). Use
// https://myvol.org/delete-account.

export const metadata = {
  title: 'Delete your account',
  description: 'How to delete your MyVol account and what happens to your data.',
  alternates: { canonical: '/delete-account' },
};

export default function DeleteAccountPage() {
  const email = config.contactEmail;
  const subject = encodeURIComponent('Delete my MyVol account');
  return (
    <article className="prose">
      <h1>Delete your MyVol account</h1>

      <h2>In the app (fastest)</h2>
      <ol>
        <li>Open MyVol and go to your Profile.</li>
        <li>Open Settings › Accounts Center.</li>
        <li>Tap Delete account and confirm with your password.</li>
      </ol>
      <p>
        Want a copy first? Use Accounts Center › Download your data before deleting.
      </p>

      <h2>Can’t use the app?</h2>
      <p>
        Email <a href={`mailto:${email}?subject=${subject}`}>{email}</a> from the email address on your account (or tell
        us your username and the phone number on it). We will confirm it’s you and delete the account within 30 days.
      </p>

      <h2>What happens next</h2>
      <ul>
        <li>Your profile, activities, stories and comments are hidden from everyone straight away.</li>
        <li>
          After a <strong>30-day grace period</strong> your account and everything in it is permanently erased: profile,
          photos and videos, activities, comments, likes, follows, notifications and settings. Signing in during those 30
          days cancels the deletion.
        </li>
        <li>
          Other people’s ripples keep the count of what you inspired, but no longer show you or your activities.
        </li>
        <li>
          Security records of past sign-ins may be kept for up to 180 days to protect against abuse, then deleted.
        </li>
      </ul>

      <div className="callout">
        Only want a break? <strong>Deactivate</strong> instead (Accounts Center › Deactivate account). It hides your
        account until you sign in again, and nothing is erased.
      </div>
    </article>
  );
}
