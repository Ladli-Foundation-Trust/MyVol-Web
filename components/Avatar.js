// A person's photo, or their initial on violet when they have none (as in the app).
export default function Avatar({ user, large = false }) {
  const cls = `avatar${large ? ' avatar-lg' : ''}`;
  const size = large ? 96 : 44;
  if (user?.avatarUrl) {
    return <img className={cls} src={user.avatarUrl} alt="" width={size} height={size} loading="lazy" />;
  }
  return (
    <span className={cls} aria-hidden="true">
      {(user?.name || '?').trim().charAt(0).toUpperCase()}
    </span>
  );
}
