import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { timeAgo } from '../timeUtils';
import Avatar from '../components/Avatar';

function Profile() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const userId = localStorage.getItem('userId');
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBio, setEditingBio] = useState(false);
  const [bioText, setBioText] = useState('');
  const [picPreview, setPicPreview] = useState('');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/users/${userId}`);
      const data = await response.json();
      setProfile(data.user);
      setPosts(data.posts);
      setBioText(data.user.bio || '');
      setPicPreview(data.user.profilePic || '');
    } catch (error) {
      console.log('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicPreview(reader.result);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBio = async () => {
    try {
      await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio: bioText, profilePic: picPreview }),
      });
      setEditingBio(false);
      setMessage('✅ Profile updated!');
      fetchProfile();
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const bgColor = darkMode ? '#1a1a2e' : '#f5f5f5';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#333333';
  const subTextColor = darkMode ? '#aaaaaa' : '#666666';

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: bgColor, paddingTop: '50px' }}>
        <p style={{ textAlign: 'center', color: textColor }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: bgColor }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <button
          onClick={() => navigate('/feed')}
          style={{
            marginBottom: '20px',
            padding: '8px 16px',
            background: '#ff6b9d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          ← Back to Feed
        </button>

        <div
          style={{
            background: cardBg,
            borderRadius: '10px',
            padding: '25px',
            marginBottom: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
            <Avatar name={profile.name} profilePic={editingBio ? picPreview : profile.profilePic} size={80} />
          </div>
          <h2 style={{ color: textColor }}>{profile.name}</h2>
          <p style={{ color: subTextColor, fontSize: '14px', marginBottom: '15px' }}>{profile.email}</p>

          {editingBio ? (
            <div>
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                placeholder="Write something about yourself..."
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: darkMode ? '1px solid #444' : '1px solid #ccc',
                  minHeight: '60px',
                  fontFamily: 'inherit',
                  background: darkMode ? '#0f1729' : 'white',
                  color: textColor,
                  marginBottom: '10px',
                }}
              />

              <label
                style={{
                  display: 'block',
                  marginBottom: '10px',
                  padding: '10px',
                  border: darkMode ? '1px dashed #444' : '1px dashed #ccc',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  color: textColor,
                  fontSize: '13px',
                }}
              >
                📷 {uploading ? 'Uploading...' : 'Choose a photo from your device'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>

              <button
                onClick={handleSaveBio}
                style={{
                  padding: '8px 20px',
                  background: '#ff6b9d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  marginRight: '8px',
                }}
              >
                Save
              </button>
              <button
                onClick={() => setEditingBio(false)}
                style={{
                  padding: '8px 20px',
                  background: '#999',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p style={{ color: textColor, marginBottom: '10px' }}>
                {profile.bio || 'No bio yet.'}
              </p>
              <button
                onClick={() => setEditingBio(true)}
                style={{
                  padding: '6px 16px',
                  background: 'none',
                  color: '#ff6b9d',
                  border: '1px solid #ff6b9d',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                ✏️ Edit Profile
              </button>
            </div>
          )}

          {message && <p style={{ color: '#28a745', marginTop: '10px', fontSize: '13px' }}>{message}</p>}
        </div>

        <h3 style={{ color: textColor, marginBottom: '15px' }}>My Posts ({posts.length})</h3>

        {posts.length === 0 ? (
          <p style={{ color: subTextColor }}>You haven't posted anything yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              style={{
                background: cardBg,
                borderRadius: '10px',
                padding: '18px',
                marginBottom: '15px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <span style={{ color: subTextColor, fontSize: '12px' }}>{timeAgo(post.createdAt)}</span>
              <p style={{ color: textColor, marginTop: '8px' }}>{post.content}</p>
              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <span style={{ color: subTextColor, fontSize: '13px' }}>❤️ {post.likes.length}</span>
                <span style={{ color: subTextColor, fontSize: '13px' }}>💬 {post.comments.length}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;