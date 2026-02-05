# DUSOM Standalone Setup (No Supabase Required)

This guide explains how to run DUSOM Abuja app completely standalone without Supabase.

## Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   React Frontend │──────▶  Express Backend │──────▶   PostgreSQL    │
│   (Port 8080)   │      │   (Port 3001)    │      │   (Port 5432)   │
└─────────────────┘      └──────────────────┘      └─────────────────┘
                                │
                                ▼
                        ┌──────────────────┐
                        │  ElevenLabs API  │
                        │  (Voice/Chat)    │
                        └──────────────────┘
```

## What Replaces Supabase?

| Supabase Feature | Standalone Replacement |
|-----------------|----------------------|
| Supabase Auth | Express + JWT (`backend/src/routes/auth.ts`) |
| Supabase Database | PostgreSQL + `pg` driver |
| Edge Functions | Express routes (`backend/src/routes/*.ts`) |
| Supabase Storage | Local file system or cloud storage |

## File Structure

```
dusom-abuja/
├── backend/                 # Express API Server
│   ├── src/
│   │   ├── routes/         # API Routes (replaces edge functions)
│   │   │   ├── auth.ts     # Authentication
│   │   │   ├── voice.ts    # ElevenLabs voice/chat
│   │   │   ├── applications.ts
│   │   │   ├── gallery.ts
│   │   │   ├── contact.ts
│   │   │   ├── newsletter.ts
│   │   │   └── settings.ts
│   │   ├── utils/
│   │   │   └── db.ts       # Database connection
│   │   └── index.ts        # Express app
│   ├── .env                # Backend env vars
│   └── dist/               # Compiled output
├── src/                    # React Frontend
│   ├── lib/
│   │   └── api.ts          # API client
│   └── components/
└── start-app.ps1           # Startup script
```

## Quick Start

### 1. Start PostgreSQL Database

Make sure your PostgreSQL is running on `158.158.1.40:5432` with the `dusom` database.

### 2. Configure Backend Environment

Create `backend/.env`:

```bash
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@158.158.1.40:5432/dusom?sslmode=disable
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
ELEVENLABS_API_KEY=sk_027f90b13194ce225c38bef6108ee4b5521eac5bacb1430e
ELEVENLABS_AGENT_ID=agent_2601kfx2xrd5emmbts6ss7m5146j
PORT=3001
CORS_ORIGINS=http://localhost:8080,http://localhost:5173
```

### 3. Start the App

```powershell
# Run the startup script
.\start-app.ps1
```

Or manually:

```powershell
# Terminal 1 - Backend
cd backend
npm run build
node dist/index.js

# Terminal 2 - Frontend
npm run dev
```

### 4. Access the App

- Frontend: http://localhost:8080
- Backend API: http://localhost:3001
- API Health: http://localhost:3001/api/health

## API Endpoints (Replaces Supabase)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth` | Login/register |
| GET | `/api/applications` | List applications |
| POST | `/api/applications` | Create application |
| GET | `/api/gallery` | List gallery images |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter` | Subscribe to newsletter |
| POST | `/api/voice/token` | Get ElevenLabs voice token |
| POST | `/api/voice/chat` | Text chat with agent |

## Frontend Configuration

The frontend is already configured to use the standalone backend:

```typescript
// src/lib/api.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
```

## Deployment Options

### Option A: Deploy Backend + Frontend Separately

1. **Backend**: Deploy to any Node.js host (Railway, Render, DigitalOcean, etc.)
2. **Frontend**: Deploy to Vercel/Netlify with `VITE_API_URL` pointing to your backend

### Option B: Deploy Together (Single Server)

Serve the built frontend from the Express backend:

```typescript
// backend/src/index.ts
app.use(express.static('../dist'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});
```

Then deploy the entire project to one server.

## Database Migrations

Run migrations manually using the SQL files in `supabase/migrations/`:

```bash
psql $DATABASE_URL -f supabase/migrations/20260120032445_3af41939-4ca4-46ff-a30e-54a9ed85062e.sql
psql $DATABASE_URL -f supabase/migrations/20260203032330_0d237df7-4a11-47d1-9031-3ab509965935.sql
```

## Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `JWT_SECRET` | ✅ | Secret for JWT tokens |
| `ELEVENLABS_API_KEY` | ✅ | ElevenLabs API key |
| `ELEVENLABS_AGENT_ID` | ✅ | ElevenLabs agent ID |
| `PORT` | ❌ | Server port (default: 3001) |
| `CORS_ORIGINS` | ❌ | Allowed CORS origins |

### Frontend (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | ✅ | Backend API URL |

## Advantages of Standalone Setup

1. **Full Control**: Own your entire stack
2. **No Vendor Lock-in**: Not tied to Supabase
3. **Local Development**: Easy to run locally
4. **Cost**: Only pay for your server/database
5. **Flexibility**: Customize anything

## Troubleshooting

### CORS Errors
Add your frontend URL to `CORS_ORIGINS` in `backend/.env`

### Database Connection Failed
- Check `DATABASE_URL` format
- Ensure PostgreSQL allows connections from your IP
- Check firewall rules

### Voice/Chat Not Working
- Verify `ELEVENLABS_API_KEY` is valid
- Check `ELEVENLABS_AGENT_ID` is correct
- Look at backend logs for errors
