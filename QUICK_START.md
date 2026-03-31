# Quick Start Guide - ReFURRM Scan Hub

## Running Locally (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file with your Supabase and Firebase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### 3. Start Development Server
```bash
npm run dev
```
Visit http://localhost:9002 in your browser.

### 4. Build for Production
```bash
npm run build
```

### 5. Lint
```bash
npm run lint
```

## Common Commands
- `npm run dev` - Start Next.js development server (port 9002)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Check code quality
- `npm run typecheck` - Check TypeScript types

## Project Structure
- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components
- `src/ai/` - AI flows powered by Genkit
- `src/lib/supabase.ts` - Supabase database connection
- `firebase/` - Firebase client and React hooks
- `.env.local` - Your secret credentials (never commit!)
