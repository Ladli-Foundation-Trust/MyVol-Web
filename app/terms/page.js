import { config } from '@/lib/config';

export const metadata = {
  title: 'Terms of use',
  description: 'The rules for using MyVol.',
  alternates: { canonical: '/terms' },
};

const UPDATED = '16 November 2026';

export default function TermsPage() {
  const email = config.contactEmail;
  return (
    <article className="prose">
      <h1>Terms of use</h1>
      <p className="small">Last updated: {UPDATED}</p>
      <p>
        These terms apply to the MyVol app and myvol.org, run by Ladli Foundation. By creating an account you agree to
        them and to our <a href="/privacy">privacy policy</a>.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>You must be at least 13. If you are under 18, use MyVol with a parent’s or guardian’s knowledge and consent.</li>
        <li>Give accurate details, keep your password private, and tell us if you think someone else has accessed your account.</li>
        <li>One person, one account. Don’t pretend to be someone else.</li>
      </ul>

      <h2>What you post</h2>
      <ul>
        <li>
          Post only real volunteering you took part in. Activities are reviewed before they are published, and ripples
          count only when someone who was there vouches for them or a reviewer confirms them.
        </li>
        <li>
          You keep ownership of what you post. You give MyVol permission to store it and show it to the people your
          settings allow, and to show it in previews when you share a link.
        </li>
        <li>
          Get permission before posting photos of other people, and take extra care with children: avoid showing faces,
          names or schools without a guardian’s consent.
        </li>
      </ul>

      <h2>Not allowed</h2>
      <ul>
        <li>Harassment, hate, threats, sexual content, or anything illegal.</li>
        <li>Fake activities, fake vouches, or anything meant to game medals, ripples or badges.</li>
        <li>Spam, scams, or advertising.</li>
        <li>Trying to break, overload or get around the security of MyVol.</li>
      </ul>
      <p>
        You can report a post, comment, story or account from the app. We may remove content, or suspend or close
        accounts, that break these rules.
      </p>

      <h2>The service</h2>
      <p>
        MyVol is free. We work hard to keep it running, but it is provided “as is”: we can’t promise it will always be
        available or error-free, and we may change or end features. To the extent the law allows, Ladli Foundation is
        not liable for indirect losses arising from your use of MyVol.
      </p>

      <h2>Ending your account</h2>
      <p>
        You can deactivate or delete your account at any time in the app (see <a href="/delete-account">Delete your
        account</a>).
      </p>

      <h2>Changes and law</h2>
      <p>
        We will tell you in the app before material changes to these terms take effect. These terms are governed by the
        laws of India.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
    </article>
  );
}
