# DUSOM Backend API

This is the backend API for DUSOM (Dunamis School of Ministry) application.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your database credentials.

4. Run migrations:
```bash
# First, create the database manually:
# psql postgres://postgres:password@158.158.1.40:5432/postgres -c "CREATE DATABASE dusom;"

# Then run the migration SQL:
psql $DATABASE_URL -f ../migrations/001_initial_schema.sql
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Applications
- `POST /api/applications` - Create new application
- `GET /api/applications/token/:token` - Get application by resume token
- `PATCH /api/applications/token/:token` - Update application
- `POST /api/applications/token/:token/submit` - Submit application
- `GET /api/applications` - List all applications (admin)
- `GET /api/applications/:id` - Get single application (admin)
- `PATCH /api/applications/:id/status` - Update application status (admin)

### Gallery
- `GET /api/gallery` - List active images
- `GET /api/gallery/admin` - List all images (admin)
- `POST /api/gallery` - Upload image (admin)
- `PATCH /api/gallery/:id` - Update image (admin)
- `DELETE /api/gallery/:id` - Delete image (admin)

### Contact Submissions
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - List submissions (admin)
- `PATCH /api/contact/:id/read` - Mark as read (admin)
- `DELETE /api/contact/:id` - Delete submission (admin)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe
- `POST /api/newsletter/unsubscribe` - Unsubscribe
- `GET /api/newsletter` - List subscriptions (admin)
- `DELETE /api/newsletter/:id` - Delete subscription (admin)

### Settings
- `GET /api/settings` - Get public settings
- `GET /api/settings/admin` - Get all settings (admin)
- `GET /api/settings/:key` - Get single setting
- `POST /api/settings` - Create setting (admin)
- `PATCH /api/settings/:key` - Update setting (admin)
- `DELETE /api/settings/:key` - Delete setting (admin)

### Uploads
- `POST /api/uploads/application/:token` - Upload application document

## Default Admin Credentials

- Email: `admin@dusomabuja.org`
- Password: `admin123`

**Important**: Change the admin password immediately after first login!
