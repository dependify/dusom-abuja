# Vercel Deployment Guide

This app is now configured as a monolithic full-stack application ready for Vercel deployment.

## Architecture

- **Frontend**: Vite + React (static files)
- **Backend**: Vercel Serverless Functions (`/api/*`)
- **Database**: PostgreSQL (external)

## Environment Variables (Vercel Dashboard)

Set these in your Vercel project settings:

```
# Required
DATABASE_URL=postgres://username:password@host:port/database?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
ELEVENLABS_API_KEY=sk_...
ELEVENLABS_AGENT_ID=agent_...

# Optional
NODE_ENV=production
```

## File Structure

```
/
├── api/                    # Serverless functions
│   ├── lib/
│   │   └── db.ts          # Database connection
│   ├── health.ts          # Health check endpoint
│   ├── auth.ts            # Auth endpoints
│   ├── applications.ts    # Applications CRUD
│   ├── contact.ts         # Contact form
│   ├── gallery.ts         # Gallery CRUD
│   ├── newsletter.ts      # Newsletter subscriptions
│   ├── settings.ts        # Site settings
│   └── voice.ts           # ElevenLabs voice/chat
├── src/                   # Frontend React app
├── dist/                  # Build output (frontend)
└── vercel.json            # Vercel config
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/auth` | POST | Login, register, verify |
| `/api/applications` | GET, POST, PUT | Applications CRUD |
| `/api/contact` | GET, POST | Contact form |
| `/api/gallery` | GET, POST, PUT, DELETE | Gallery CRUD |
| `/api/newsletter` | GET, POST, DELETE | Newsletter subscriptions |
| `/api/settings` | GET, POST, PUT | Site settings |
| `/api/voice` | POST | Voice token & chat |

## Deployment Steps

1. **Push to Git**:
   ```bash
   git add .
   git commit -m "Convert to monolithic Vercel app"
   git push
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Import your Git repository
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Configure Environment Variables**:
   - Add all required env vars in Vercel dashboard
   - `DATABASE_URL` must point to a PostgreSQL with SSL

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically

## Local Development

```bash
# Install dependencies
npm install

# Set up local environment
cp .env.example .env.local
# Edit .env.local with your values

# Run dev server
npm run dev

# For API testing, you need a local PostgreSQL running
# Or use Vercel's `vercel dev` command
```

## Important Notes

1. **Database**: The serverless functions connect to PostgreSQL using connection pooling
2. **SSL**: Production database requires SSL (`sslmode=require`)
3. **ElevenLabs**: Voice features require valid ElevenLabs API key with `convai_write` permission
4. **CORS**: All API endpoints include CORS headers for the deployed domain
