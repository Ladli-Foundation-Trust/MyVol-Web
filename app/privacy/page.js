import { config } from '@/lib/config';

export const metadata = {
  title: 'Privacy policy',
  description: 'What MyVol collects, why, who it is shared with, and the choices you have.',
  alternates: { canonical: '/privacy' },
};

const UPDATED = '16 November 2026';

export default function PrivacyPage() {
  const email = config.contactEmail;
  return (
    <article className="prose">
      <h1>Privacy policy</h1>
      <p className="small">Last updated: {UPDATED}</p>
      <p>
        MyVol (“we”, “us”) is a volunteering app run by Ladli Foundation. This policy explains what information we
        collect when you use the MyVol app and myvol.org, why we collect it, and the choices you have. We do not sell
        your personal data, and MyVol shows no advertising.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account details:</strong> your name, username, email address and/or phone number, date of birth and a
          password (stored only as a secure hash). If you sign in with Google, we receive your name and email from Google.
        </li>
        <li>
          <strong>Profile details you choose to add:</strong> photo, bio, gender, city, state, country, education,
          skills, availability and the causes you care about.
        </li>
        <li>
          <strong>What you post:</strong> activities (photos, videos, title, description, cause, location, hours and
          beneficiaries), stories, comments, likes, follows, pledges, vouches and reports. We remove GPS location data
          embedded in photos and videos when you upload them.
        </li>
        <li>
          <strong>Device and security information:</strong> the device name, IP address and app version of each
          sign-in, so you can see where you are signed in and we can warn you about new sign-ins and protect your
          account.
        </li>
        <li>
          <strong>Notification token:</strong> a push token from Google Firebase Cloud Messaging, so we can send
          notifications to your phone. It is tied to your sign-in and removed when you sign out.
        </li>
        <li>
          <strong>Settings:</strong> your privacy, notification and display preferences.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To run your account and show your activities to the people your settings allow.</li>
        <li>To review activities before they are published and to keep MyVol safe (reports, moderation, abuse prevention).</li>
        <li>To calculate your impact: medals, ripples and badges.</li>
        <li>To send you notifications you have turned on, and security emails such as verification codes and sign-in alerts.</li>
      </ul>

      <h2>Who can see what</h2>
      <p>
        You control this in the app under Settings. A private account is visible only to followers you approve. You
        can also limit who sees your activities (everyone, followers, or only you), hide your location on posts, and
        hide your impact numbers. Public links on myvol.org show only what a person who is not signed in is allowed to
        see.
      </p>

      <h2>Who we share it with</h2>
      <p>We share personal data only with service providers that help us run MyVol, and only for that purpose:</p>
      <ul>
        <li>
          <strong>Google Firebase Cloud Messaging</strong> delivers notifications to your phone. It receives the
          notification text (for example, “Priya commented: Great work!”) and your device’s push token.
        </li>
        <li>
          <strong>Hosting and email providers</strong> that store our data and send our emails.
        </li>
      </ul>
      <p>We may also disclose information when the law requires it.</p>

      <h2>How long we keep it</h2>
      <ul>
        <li>Stories disappear after 24 hours. Notifications are kept for 90 days. Security records of sign-ins are kept for 180 days.</li>
        <li>Your account and content are kept until you delete them.</li>
        <li>
          When you delete your account, it is hidden at once and permanently erased after a 30-day grace period (sign
          in during that time to cancel). See <a href="/delete-account">Delete your account</a>.
        </li>
      </ul>

      <h2>Your rights and choices</h2>
      <ul>
        <li>Download a copy of your data in the app: Settings › Accounts Center › Download your data.</li>
        <li>Correct your details in the app at any time.</li>
        <li>Deactivate or delete your account in the app, or by writing to us.</li>
        <li>Turn notifications off in the app or in your phone’s settings.</li>
      </ul>
      <p>
        Under India’s Digital Personal Data Protection Act, 2023 you can also ask us about the data we hold on you, ask
        us to correct or erase it, and nominate someone to exercise these rights for you. Write to us at the address
        below.
      </p>

      <h2>Children</h2>
      <p>
        You must be at least 13 years old to use MyVol. If you are under 18, please use MyVol with the knowledge and
        consent of a parent or guardian.
      </p>

      <h2>Security</h2>
      <p>
        Data is encrypted in transit. Passwords are stored as hashes, sign-in tokens on your phone are kept in its secure
        storage, and you can sign out of other devices in the app at any time.
      </p>

      <h2>Changes</h2>
      <p>If we change this policy in a way that matters, we will tell you in the app before the change takes effect.</p>

      <h2>Contact</h2>
      <p>
        Questions or requests: <a href={`mailto:${email}`}>{email}</a>.
      </p>
    </article>
  );
}
