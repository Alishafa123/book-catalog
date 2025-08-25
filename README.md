# 📚 Book Catalog  

A full-stack **Book Catalog** web application built with **Next.js 13 (App Router)**, **Prisma ORM**, **PostgreSQL (Neon)**, and **JWT-based authentication**.  
The app allows users to **sign up, log in, and manage books** in a personal catalog.  

Deployed on **Vercel**.  

---

## 🚀 Live Demo
🔗 [Book Catalog on Vercel](https://book-catalog-zeta.vercel.app/)  

---

## ✨ Features
- 🔑 **Authentication**: Signup, login, and logout using JWT stored in secure cookies.  
- 📚 **Book Management**: Add, list, and delete books (CRUD).  
- 🔒 **Protected Routes**: Middleware ensures only authenticated users can access `/books`.  
- 🎨 **UI/UX**: Responsive interface styled with Tailwind CSS.  
- ⚡ **Deployed** seamlessly with Vercel + Neon (PostgreSQL hosting).  

---

## 🛠️ Tech Stack
- **Frontend/Backend**: Next.js 13 (App Router)  
- **ORM**: Prisma  
- **Database**: PostgreSQL (Neon)  
- **Auth**: Custom JWT authentication with cookies  
- **Styling**: Tailwind CSS  
- **Deployment**: Vercel  

---

## 📦 Setup Instructions (Run Locally)

### 1. Clone the repository
```bash
git clone https://github.com/Alishafa123/book-catalog.git
cd book-catalog

npm install

DATABASE_URL=postgresql://neondb_owner:npg_uKsvn32dmSeU@ep-still-truth-adhbwpy8-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
JWT_SECRET="b2f86c139a63f97adbc6e5cb1575c348f3dbe177e9d6a28cf0490ff0c0f49e3b"


npx prisma migrate dev --name init
npm run dev

