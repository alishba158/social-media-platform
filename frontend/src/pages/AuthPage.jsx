import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import './AuthPage.css';

function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const url = isLogin
      ? 'http://localhost:5001/api/auth/login'
      : 'http://localhost:5001/api/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('userId', data._id);
        localStorage.setItem('userName', data.name);
        navigate('/feed');
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Something went wrong. Check if backend is running.');
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)'
          : 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        position: 'relative',
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

      <div
        className="auth-box"
        style={{
          background: darkMode ? '#16213e' : 'white',
        }}
      >
        <h2 style={{ color: darkMode ? '#ffffff' : '#333333' }}>{isLogin ? 'Login' : 'Register'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                background: darkMode ? '#0f1729' : 'white',
                color: darkMode ? '#ffffff' : '#333333',
                border: darkMode ? '1px solid #444' : '1px solid #ccc',
              }}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              background: darkMode ? '#0f1729' : 'white',
              color: darkMode ? '#ffffff' : '#333333',
              border: darkMode ? '1px solid #444' : '1px solid #ccc',
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              background: darkMode ? '#0f1729' : 'white',
              color: darkMode ? '#ffffff' : '#333333',
              border: darkMode ? '1px solid #444' : '1px solid #ccc',
            }}
          />
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </p>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default AuthPage;