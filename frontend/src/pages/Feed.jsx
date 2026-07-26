import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import { timeAgo } from '../timeUtils';
import Avatar from '../components/Avatar';

function Feed() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.log('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await fetch('http://localhost:5001/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, content: newPost }),
      });
      setNewPost('');
      fetchPosts();
    } catch (error) {
      console.log('Error creating post:', error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await fetch(`http://localhost:5001/api/posts/${postId}/like`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      fetchPosts();
    } catch (error) {
      console.log('Error liking post:', error);
    }
  };

  const handleComment = async (postId) => {
    const text = commentText[postId];
    if (!text || !text.trim()) return;

    try {
      await fetch(`http://localhost:5001/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text }),
      });
      setCommentText({ ...commentText, [postId]: '' });
      fetchPosts();
    } catch (error) {
      console.log('Error adding comment:', error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await fetch(`http://localhost:5001/api/posts/${postId}`, {
        method: 'DELETE',
      });
      fetchPosts();
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const bgColor = darkMode ? '#1a1a2e' : '#f5f5f5';
  const cardBg = darkMode ? '#16213e' : 'white';
  const textColor = darkMode ? '#ffffff' : '#333333';
  const subTextColor = darkMode ? '#aaaaaa' : '#666666';

  return (
    <div style={{ minHeight: '100vh', background: bgColor, transition: 'all 0.3s' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div
            onClick={() => navigate('/profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <Avatar name={userName} size={45} />
            <h1 style={{ color: textColor, fontSize: '22px' }}>Hi, {userName}</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={toggleTheme}
              style={{
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
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                background: '#ff6b9d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handlePost} style={{ marginBottom: '30px' }}>
          <textarea
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: darkMode ? '1px solid #444' : '1px solid #ccc',
              minHeight: '80px',
              fontFamily: 'inherit',
              fontSize: '14px',
              resize: 'vertical',
              background: darkMode ? '#16213e' : 'white',
              color: textColor,
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: '10px',
              padding: '10px 25px',
              background: '#ff6b9d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Post
          </button>
        </form>

        {loading ? (
          <p style={{ color: textColor }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={{ color: textColor }}>No posts yet. Be the first to post!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              style={{
                background: cardBg,
                borderRadius: '10px',
                padding: '18px',
                marginBottom: '18px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <Avatar name={post.user?.name} size={40} />
                  <div>
                    <h3 style={{ color: textColor, fontSize: '15px' }}>{post.user?.name}</h3>
                    <span style={{ color: subTextColor, fontSize: '12px' }}>{timeAgo(post.createdAt)}</span>
                  </div>
                </div>
                {post.user?._id === userId && (
                  <button
                    onClick={() => handleDelete(post._id)}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '5px 12px',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
              <p style={{ marginBottom: '12px', color: textColor }}>{post.content}</p>

              <div style={{ display: 'flex', gap: '15px', marginBottom: '12px' }}>
                <button
                  onClick={() => handleLike(post._id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: post.likes.includes(userId) ? '#ff6b9d' : subTextColor,
                  }}
                >
                  ❤️ {post.likes.length} Like{post.likes.length !== 1 ? 's' : ''}
                </button>
                <span style={{ color: subTextColor, fontSize: '14px' }}>
                  💬 {post.comments.length} Comment{post.comments.length !== 1 ? 's' : ''}
                </span>
              </div>

              {post.comments.map((c, i) => (
                <div key={i} style={{ fontSize: '13px', color: subTextColor, marginBottom: '5px' }}>
                  <strong style={{ color: textColor }}>{c.user?.name}:</strong> {c.text}
                </div>
              ))}

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[post._id] || ''}
                  onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: darkMode ? '1px solid #444' : '1px solid #ccc',
                    fontSize: '13px',
                    background: darkMode ? '#0f1729' : 'white',
                    color: textColor,
                  }}
                />
                <button
                  onClick={() => handleComment(post._id)}
                  style={{
                    padding: '8px 14px',
                    background: '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;