import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';

function Home() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: darkMode
          ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)'
          : 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        position: 'relative',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: darkMode ? '#ffd700' : '#333',
          color: darkMode ? '#333' : 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>

      <h1 style={{ fontSize: '48px', color: darkMode ? 'white' : '#333', marginBottom: '10px' }}>
        🌐 SocialConnect
      </h1>
      <p style={{ fontSize: '18px', color: darkMode ? '#ccc' : '#555', marginBottom: '40px', maxWidth: '400px' }}>
        Share your moments, connect with friends, and stay in touch with the world.
      </p>

      <div style={{ display: 'flex', gap: '15px' }}>
        <button
          onClick={() => navigate('/auth', { state: { isLogin: true } })}
          style={{
            padding: '14px 35px',
            background: '#ff6b9d',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <button
          onClick={() => navigate('/auth', { state: { isLogin: false } })}
          style={{
            padding: '14px 35px',
            background: 'white',
            color: '#ff6b9d',
            border: '2px solid #ff6b9d',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Home;