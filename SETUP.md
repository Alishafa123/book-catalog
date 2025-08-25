# Book Catalog - Setup Guide

## Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/book_catalog"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# JWT
JWT_SECRET="your-jwt-secret-here"
```

3. Generate Prisma client:
```bash
npx prisma generate
```

4. Run database migrations:
```bash
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

## Features

- **Authentication**: NextAuth.js with credentials provider
- **Database**: Prisma with PostgreSQL
- **User Management**: Sign up, sign in, sign out
- **Book Catalog**: CRUD operations for books
- **Modern UI**: Tailwind CSS with responsive design

## API Routes

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login (legacy)
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints
- `POST /api/auth/logout` - User logout (legacy)

## Authentication Flow

1. Users can sign up with email, password, and name
2. Passwords are hashed using bcrypt
3. JWT tokens are used for session management
4. NextAuth provides additional authentication features

## Database Schema

- **User**: id, email, name, password, createdAt
- **Book**: id, title, author, genre, createdAt, userId (relation to User)

## Development

- Run `npm run build` to check for build errors
- Run `npm run lint` to check code quality
- The app uses TypeScript for type safety 