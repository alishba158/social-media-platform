# 🌐 SocialConnect — Social Media Platform

A full-stack social media web application built with the MERN stack, where users can share posts, connect with others, and interact through likes and comments.

![Status](https://img.shields.io/badge/status-active-success)
![Tech](https://img.shields.io/badge/stack-MERN-blue)

---

## ✨ Features

- 🔐 **Authentication** — Secure Register/Login/Logout using JWT
- 📝 **Posts** — Create, view, and delete posts
- ❤️ **Likes** — Like/unlike posts in real time
- 💬 **Comments** — Comment on posts and view discussions
- 👤 **Profile** — View bio, upload profile picture, see your posts
- 🌙 **Dark/Light Mode** — Toggle between themes
- ⏱️ **Timestamps** — "X minutes ago" style relative time
- 🎨 **Avatars** — Auto-generated colored avatars or uploaded profile pictures

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Router, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT, bcryptjs |

---

## 📂 Project Structure
CodeAlpha_SocialMediaApp/
├── backend/
│ ├── controllers/ # Route logic (auth, posts, users)
│ ├── models/ # Mongoose schemas (User, Post)
│ ├── routes/ # API routes
│ └── server.js # Entry point
└── frontend/
└── src/
├── pages/ # Home, Auth, Feed, Profile
├── components/ # Reusable components (Avatar)
└── App.jsx
---

## 🚀 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/alishba158/social-media-platform.git
cd social-media-platform
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_keyRun the backend:
```bash
node server.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📸 Screenshots

*(Add screenshots or a demo video link here)*

---

## 👩‍💻 Author

Built as part of an internship project by **Alishba**.