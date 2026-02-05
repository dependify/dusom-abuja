# DUSOM Database Migration Guide

This guide explains how to migrate from Supabase to a self-hosted PostgreSQL database with pgvector support.

## Overview

The migration involves:
1. Setting up the new PostgreSQL database
2. Running the database schema migration
3. Deploying the new backend API
4. Updating the frontend to use the new API

## Prerequisites

- Access to the PostgreSQL server at `158.158.1.40:5432`
- PostgreSQL 14+ with pgvector extension installed
- Node.js 18+ for the backend

## Step 1: Create the Database

Connect to the PostgreSQL server and create the database:

```bash
# Connect to the default postgres database
psql postgres://postgres:5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm@158.158.1.40:5432/postgres?sslmode=prefer

# Create the database
CREATE DATABASE dusom;

# Verify the database was created
\l
```

## Step 2: Run the Schema Migration

Run the migration SQL file to create all tables, functions, and triggers:

```bash
# From the project root directory
psql postgres://postgres:5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm@158.158.1.40:5432/dusom?sslmode=prefer -f migrations/001_initial_schema.sql
```

This will create:
- User management tables (replacing Supabase Auth)
- All application tables (gallery, applications, contact, newsletter)
- Storage metadata tables
- Session and audit logging tables
- Default admin user

## Step 3: Setup and Run the Backend

### Install Dependencies

```bash
cd backend
npm install
```

### Configure Environment Variables

Copy the example environment file and update it:

```bash
cp .env.example .env
```

Edit `.env` and ensure the database URL is correct:
```
DATABASE_URL=postgres://postgres:5kDSaWZSSqUDUIZ4x2iK16Ehg3YeGa6P6CiOUb5VtAwIkJqKXUbieKqcMQryoQhm@158.158.1.40:5432/dusom?sslmode=prefer
JWT_SECRET=your-strong-secret-key-here
```

### Start the Backend

For development:
```bash
npm run dev
```

For production:
```bash
npm run build
npm start
```

The backend will start on port 3001 by default.

## Step 4: Update Frontend Configuration

Update the frontend `.env` file:

```
VITE_API_URL=http://localhost:3001/api
```

For production, update this to point to your deployed backend URL:

```
VITE_API_URL=https://api.dusomabuja.org/api
```

## Step 5: Migrate Existing Data (Optional)

If you have existing data in Supabase that you need to migrate:

### Export from Supabase

1. Go to the Supabase Dashboard
2. Use the SQL Editor to export data:

```sql
-- Export users
COPY (SELECT * FROM auth.users) TO '/tmp/users.csv' CSV HEADER;

-- Export other tables
COPY (SELECT * FROM public.gallery_images) TO '/tmp/gallery.csv' CSV HEADER;
COPY (SELECT * FROM public.contact_submissions) TO '/tmp/contact.csv' CSV HEADER;
-- etc.
```

### Import to New Database

Convert the data format if needed and import:

```bash
# Example: Import gallery images
psql $DATABASE_URL -c "\COPY gallery_images(id, title, alt_text, category, image_url, display_order, is_active, created_at, updated_at, created_by) FROM '/tmp/gallery.csv' CSV HEADER"
```

**Note**: User passwords cannot be migrated directly since they're hashed differently. Users will need to reset their passwords.

## Step 6: Update File Storage

The migration replaces Supabase Storage with local file storage. You'll need to:

1. Download existing files from Supabase Storage
2. Upload them to the new server's `uploads/` directory:
   - `uploads/gallery/` - Gallery images
   - `uploads/application-documents/` - Application documents

## Step 7: Test the Migration

1. Start the backend: `npm run dev` (in backend directory)
2. Start the frontend: `npm run dev` (in root directory)
3. Test the following:
   - Admin login (default: admin@dusomabuja.org / admin123)
   - Gallery management
   - Contact form submission
   - Newsletter subscription
   - Application form submission

## Default Admin Credentials

After migration, you can log in with:

- **Email**: `admin@dusomabuja.org`
- **Password**: `admin123`

**Important**: Change this password immediately after first login!

## Architecture Changes

### Before (Supabase)
```
Frontend (React) <-> Supabase (Auth + DB + Storage)
```

### After (Self-hosted)
```
Frontend (React) <-> Backend API (Express + Node.js) <-> PostgreSQL
                          |
                          +-> Local File Storage
```

### Key Differences

| Feature | Supabase | New Setup |
|---------|----------|-----------|
| Auth | Supabase Auth | Custom JWT-based |
| Database | Supabase Postgres | Self-hosted Postgres |
| Storage | Supabase Storage | Local filesystem |
| RLS | PostgreSQL RLS | Application-level authorization |
| Functions | Edge Functions | Express routes |

## Environment Variables Reference

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | Access token expiration |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh token expiration |
| `PORT` | Server port |
| `CORS_ORIGINS` | Allowed CORS origins |
| `MAX_FILE_SIZE` | Maximum upload file size |
| `UPLOAD_DIR` | Directory for uploaded files |

## Troubleshooting

### Connection Issues

If you can't connect to the database:

1. Check network connectivity:
   ```bash
   telnet 158.158.1.40 5432
   ```

2. Verify PostgreSQL is listening:
   ```sql
   SHOW listen_addresses;
   ```

3. Check pg_hba.conf for access rules

### Migration Errors

If the migration fails:

1. Drop and recreate the database:
   ```sql
   DROP DATABASE dusom;
   CREATE DATABASE dusom;
   ```

2. Re-run the migration

### File Upload Issues

Ensure the uploads directory exists and is writable:

```bash
mkdir -p uploads/gallery uploads/application-documents
chmod -R 755 uploads
```

## Security Considerations

1. **Change Default Password**: The default admin password should be changed immediately
2. **JWT Secret**: Use a strong, random JWT secret in production
3. **HTTPS**: Always use HTTPS in production
4. **Database**: Restrict database access to the backend server only
5. **File Uploads**: Validate file types and sizes server-side
6. **Rate Limiting**: The backend includes rate limiting but adjust as needed

## Rollback Plan

If you need to rollback:

1. Update frontend `.env` to point back to Supabase
2. Restart frontend
3. The Supabase database remains unchanged during migration

## Support

For issues or questions:
1. Check the backend logs: `npm run dev` output
2. Review the API documentation in `backend/README.md`
3. Check the migration SQL file for schema details
