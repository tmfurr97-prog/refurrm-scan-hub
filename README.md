# ReFURRM Scan Hub

ReFURRM is reforming the storage industry with AI-powered valuation, sentimental item rescue, and ethical resale.

## Overview

This repository is the result of merging two codebases:
- **ReFURRM Platform** (`refurrm-platform`) — the core Vite/React app with scanner, profile, and marketplace features backed by Supabase
- **ValuScan / Firebase Studio** — the Next.js app with AI listing generation, ethical pricing tools, and Firebase integration

The unified project runs as a **Next.js** application with:
- Next.js App Router pages in `src/app/`
- Shared React components in `src/components/` and `components/`
- AI flows (Genkit) in `src/ai/`
- Firebase integration in `firebase/`
- Supabase integration in `src/lib/supabase.ts`

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create a `.env.local` file with your credentials:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
```

### Start Development Server

```bash
npm run dev
```

Visit http://localhost:9002 in your browser.

### Build for Production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── ai/               # Genkit AI flows and schemas
│   ├── components/       # Shared React components
│   │   ├── ui/           # shadcn/ui component library
│   │   └── ...
│   ├── contexts/         # React context providers (Supabase auth)
│   ├── data/             # Static data files
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities (Supabase client, utils)
│   ├── pages/            # Vite/React Router pages (legacy)
│   └── types/            # TypeScript types
├── components/           # Next.js components (UI library, layout, valuscan)
├── firebase/             # Firebase client provider and hooks
├── lib/                  # Root-level utilities
├── genkit/               # Genkit API route
├── stripe/               # Stripe payment routes
└── scan-hub/             # Original scan-hub source files
```

