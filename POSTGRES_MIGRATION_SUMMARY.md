# DUSOM PostgreSQL Migration - Summary

## What Was Done

I have prepared a complete migration from Supabase to a self-hosted PostgreSQL database. Here's what was created:

### 1. Database Migration (`migrations/001_initial_schema.sql`)
A comprehensive SQL migration that:
- Creates a `dusom` database schema with all required tables
- Replaces Supabase Auth with a custom `users` table
- Creates all application tables:
  - `users` - User accounts with bcrypt password hashing
  - `user_roles` - Role-based access control
  - `site_settings` - Configuration storage
  - `gallery_images` - Photo gallery
  - `contact_submissions` - Contact form submissions
  - `newsletter_subscriptions` - Newsletter signups
  - `admission_applications` - Admission form data
  - `storage_objects` - File metadata (replaces Supabase Storage)
  - `sessions` & `refresh_tokens` - JWT token management
  - `audit_logs` - Change tracking
- Sets up triggers for `updated_at` timestamps
- Creates functions for application number generation
- Includes a default admin user (admin@dusomabuja.org / admin123)
- Enables `uuid-ossp`, `pgcrypto`, and `vector` extensions

### 2. Backend API (`backend/`)
A complete Express.js backend that replaces Supabase:

**Structure:**
```
backend/
├── src/
│   ├── index.ts           # Main server file
│   ├── routes/
│   │   ├── auth.ts        # Authentication endpoints
│   │   ├── applications.ts # Admission applications
│   │   ├── gallery.ts     # Gallery management
│   │   ├── contact.ts     # Contact form submissions
│   │   ├── newsletter.ts  # Newsletter subscriptions
│   │   ├── settings.ts    # Site settings
│   │   └── uploads.ts     # File upload handling
│   ├── middleware/
│   │   └── auth.ts        # JWT authentication middleware
│   └── utils/
│       ├── db.ts          # PostgreSQL connection pool
│       └── auth.ts        # Password hashing & JWT utilities
├── uploads/               # File storage directory
│   ├── gallery/
│   └── application-documents/
├── package.json
├── tsconfig.json
└── .env                   # Environment configuration
```

**API Endpoints:**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/applications` - Create new application
- `GET /api/applications/token/:token` - Get application by token
- `PATCH /api/applications/token/:token` - Update application
- `POST /api/applications/token/:token/submit` - Submit application
- `GET /api/gallery` - List gallery images
- `POST /api/gallery` - Upload image (admin)
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/settings` - Get site settings

### 3. Frontend API Client (`src/lib/api.ts`)
A new API client that:
- Replaces the Supabase client
- Handles JWT token storage and refresh
- Provides typed API methods for all endpoints

### 4. Compatibility Layer (`src/integrations/api/client.ts`)
A Supabase-compatible wrapper around the new API:
- Mimics the Supabase client interface
- Makes migration easier by requiring minimal code changes
- Provides `auth`, `from`, `storage`, and `functions` methods

### 5. Helper Scripts (`scripts/`)
- `migrate-db.sh` - Bash script for database operations (Linux/Mac)
- `migrate-db.ps1` - PowerShell script for database operations (Windows)

Actions: `create`, `migrate`, `reset`, `status`, `setup`

### 6. Documentation
- `MIGRATION_GUIDE.md` - Complete step-by-step migration instructions
- `backend/README.md` - Backend API documentation

## Next Steps to Complete Migration

Since the database server was not accessible from this environment, you need to:

### Step 1: Create the Database
Connect to your PostgreSQL server and create the database:

```bash
# Connect to PostgreSQL
psql postgres://postgres:5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm@158.158.1.40:5432/postgres?sslmode=prefer

# Create database
CREATE DATABASE dusom;
\q
```

Or use the helper script:
```bash
# Linux/Mac
./scripts/migrate-db.sh setup

# Windows
.\scripts\migrate-db.ps1 setup
```

### Step 2: Run the Migration

```bash
# Run the SQL migration
psql postgres://postgres:5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm@158.158.1.40:5432/dusom?sslmode=prefer -f migrations/001_initial_schema.sql
```

### Step 3: Start the Backend

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:3001`

### Step 4: Update Frontend Environment

Edit `.env` in the project root:
```
VITE_API_URL=http://localhost:3001/api
```

### Step 5: Start the Frontend

```bash
npm run dev
```

### Step 6: Test the Application

1. Go to `http://localhost:5173/admin/login`
2. Login with:
   - Email: `admin@dusomabuja.org`
   - Password: `admin123`
3. Change the default password immediately!

## File Structure After Migration

```
dusom-abuja/
├── .env                          # Updated frontend env
├── migrations/
│   └── 001_initial_schema.sql    # Database schema
├── scripts/
│   ├── migrate-db.sh             # Linux/Mac helper
│   └── migrate-db.ps1            # Windows helper
├── backend/
│   ├── .env                      # Backend configuration
│   ├── package.json
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   └── uploads/                  # File storage
├── src/
│   ├── lib/
│   │   └── api.ts               # New API client
│   └── integrations/
│       ├── api/
│       │   └── client.ts        # Supabase compatibility layer
│       └── supabase/            # Old Supabase client (kept for reference)
├── MIGRATION_GUIDE.md           # Detailed migration guide
└── POSTGRES_MIGRATION_SUMMARY.md # This file
```

## Key Differences from Supabase

| Feature | Supabase | New Setup |
|---------|----------|-----------|
| Authentication | Supabase Auth | Custom JWT-based |
| Database | Hosted Postgres | Self-hosted Postgres |
| Storage | Supabase Storage | Local filesystem |
| Row Level Security | PostgreSQL RLS | Application-level |
| Edge Functions | Supabase Functions | Express routes |
| API | Supabase client | REST API + custom client |

## Important Security Notes

1. **Change Default Password**: The admin password `admin123` must be changed immediately
2. **JWT Secret**: Update `JWT_SECRET` in `backend/.env` to a strong, random value
3. **HTTPS**: Always use HTTPS in production
4. **Database Access**: Restrict database access to only the backend server
5. **File Uploads**: Files are validated for type and size server-side

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

### Backend (backend/.env)
```
DATABASE_URL=postgres://postgres:5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm@158.158.1.40:5432/dusom?sslmode=prefer
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3001
CORS_ORIGINS=http://localhost:5173
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

## Troubleshooting

If you encounter issues:

1. **Database connection fails**: Check network connectivity and firewall rules
2. **Migration errors**: Ensure the `dusom` database exists and is empty
3. **Backend won't start**: Check that all dependencies are installed (`npm install`)
4. **File uploads fail**: Ensure the `uploads/` directory exists and is writable
5. **CORS errors**: Update `CORS_ORIGINS` in backend `.env` to match your frontend URL

## Need Help?

Refer to:
- `MIGRATION_GUIDE.md` - Detailed step-by-step instructions
- `backend/README.md` - Backend API documentation
- Check backend logs for errors
