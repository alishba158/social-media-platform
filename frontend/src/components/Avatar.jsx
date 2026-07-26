function Avatar({ name, profilePic, size = 40 }) {
  const initial = name ? name.charAt(0).toUpperCase() : '?';

  const colors = ['#ff6b9d', '#6b9dff', '#9dff6b', '#ffb86b', '#b86bff'];
  const colorIndex = name ? name.charCodeAt(0) % colors.length : 0;

  if (profilePic) {
    return (
      <img
        src={profilePic}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: colors[colorIndex],
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: size * 0.4,
        flexShrink: 0,
      }}
    >
      {initial}
    </div>
  );
}

export default Avatar;