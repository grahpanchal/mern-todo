# 📝 MERN Todo App — A to Z Setup Guide

## 🗂️ Project Structure
```
mern-todo/
├── backend/
│   ├── models/Todo.js       ← MongoDB Schema
│   ├── routes/todos.js      ← API Routes
│   ├── server.js            ← Express Server
│   ├── .env                 ← Environment variables
│   └── package.json
├── frontend/
│   ├── public/index.html
│   ├── src/
│   │   ├── App.jsx          ← Main React component
│   │   ├── App.css
│   │   └── components/
│   │       ├── TodoList.jsx
│   │       └── TodoList.css
│   └── package.json
├── setup-hooks.sh           ← Git Hook automation script 🪝
└── README.md
```

---

## ✅ STEP 1 — Install Prerequisites

Make sure you have these installed:
```bash
node --version   # v16 or above
npm --version
mongod --version # MongoDB
git --version
```

---

## ✅ STEP 2 — Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (new terminal)
cd ../frontend
npm install
```

---

## ✅ STEP 3 — MongoDB Setup

```bash
# Start MongoDB (Mac/Linux)
mongod

# Windows me
net start MongoDB
```

---

## ✅ STEP 4 — Run the App

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
# Server: http://localhost:5000
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm start
# App: http://localhost:3000
```

---

## ✅ STEP 5 — GitHub Repository Banao

1. GitHub.com pe jao → New Repository → Name: `mern-todo`
2. README mat banao (already hai)
3. Create Repository karo
4. URL copy karo (SSH ya HTTPS)

---

## ✅ STEP 6 — SSH Key Setup (One-time only)

```bash
# 1. SSH key generate karo
ssh-keygen -t ed25519 -C "tumhari@email.com"
# Sab Enter press karo

# 2. Public key copy karo
cat ~/.ssh/id_ed25519.pub

# 3. GitHub → Settings → SSH and GPG Keys → New SSH Key → Paste karo

# 4. Test karo
ssh -T git@github.com
# Output: "Hi username! You've successfully authenticated" ✅
```

---

## ✅ STEP 7 — Git Initialize & Remote Add

```bash
# Project root folder mein jao
cd mern-todo

# Git init
git init

# Remote add karo (SSH URL use karo)
git remote add origin git@github.com:YOUR_USERNAME/mern-todo.git

# Verify karo
git remote -v
```

---

## ✅ STEP 8 — Git Hook Setup (Auto Push Magic 🪝)

```bash
# Setup script run karo
bash setup-hooks.sh

# Output:
# ✅ post-commit hook created!
# ✅ pre-push hook created!
# 🎉 Git Hooks Setup Complete!
```

---

## ✅ STEP 9 — First Push (Manual - Sirf Ek Baar)

```bash
git add .
git commit -m "🚀 Initial MERN Todo App commit"
# → Hook trigger hoga → Auto push ho jayega!

# Pehli baar main branch set karo
git branch -M main
git push -u origin main
```

---

## ✅ STEP 10 — Ab Sirf Itna Karo! 🎉

```bash
# Koi bhi change karo, phir:
git add .
git commit -m "your message here"

# → 🪝 Hook automatically trigger hoga
# → 🚀 Push automatically ho jayega
# → GitHub pe code live! ✅
```

---

## 🔌 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/todos | Sab todos fetch karo |
| POST | /api/todos | Naya todo add karo |
| PUT | /api/todos/:id | Todo toggle complete |
| DELETE | /api/todos/:id | Todo delete karo |

---

## 🐛 Troubleshooting

**Hook run nahi hua?**
```bash
chmod +x .git/hooks/post-commit
```

**Push mein permission denied?**
```bash
# SSH URL set karo
git remote set-url origin git@github.com:USERNAME/mern-todo.git
```

**MongoDB connect nahi ho raha?**
```bash
# .env file check karo
MONGO_URI=mongodb://localhost:27017/mern-todo
```
