# DUSOM Abuja - AI Agent Guide

## Project Overview

DUSOM (Dunamis School of Ministry) Abuja is a React-based web application for a Christian ministry training institution based in Abuja, Nigeria. The website serves as a digital presence for the school, providing information about courses, admissions, student life, and a complete online application system.

**Key Features:**
- Public-facing website with multiple pages (Home, About, Courses, Admissions, Student Life, Blog, Contact)
- Multi-step online admission application form with resume capability
- Admin dashboard for managing applications, gallery, settings, and analytics
- AI-powered voice and text chat assistant (ElevenLabs integration)
- Newsletter subscription and contact form management
- Photo gallery with admin CRUD operations
- Email notifications for application submissions and status changes

---

## Technology Stack

| Category | Technology |
|----------|------------|
| **Build Tool** | Vite 5.x with SWC plugin |
| **Framework** | React 18.x |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 3.x |
| **UI Components** | shadcn/ui + Radix UI primitives |
| **Backend** | Supabase (PostgreSQL + Auth + Storage + Edge Functions) |
| **State Management** | TanStack Query (React Query) |
| **Routing** | React Router DOM 6.x |
| **Forms** | React Hook Form + Zod validation |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Voice AI** | ElevenLabs Conversational AI |
| **Testing** | Vitest + React Testing Library |
| **Linting** | ESLint 9.x with TypeScript |

---

## Project Structure

```
src/
├── components/
│   ├── admissions/          # Admission form components
│   │   ├── AdmissionForm.tsx
│   │   ├── FileUpload.tsx
│   │   ├── FormProgress.tsx
│   │   └── form-steps/      # 7-step form components
│   │       ├── Step1Requirements.tsx
│   │       ├── Step2PersonalDetails.tsx
│   │       ├── Step3ChristianLife.tsx
│   │       ├── Step4References.tsx
│   │       ├── Step5MedicalFinancial.tsx
│   │       ├── Step6Documents.tsx
│   │       └── Step7Agreement.tsx
│   ├── home/                # Homepage sections
│   │   ├── AnimatedCounter.tsx
│   │   ├── CTASection.tsx
│   │   ├── FeaturedCourses.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   └── ValueProposition.tsx
│   ├── layout/              # Layout components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   ├── student-life/        # Student life page components
│   │   └── PhotoGallery.tsx
│   ├── ui/                  # shadcn/ui components (50+ components)
│   ├── voice-agent/         # AI voice assistant
│   │   └── VoiceAgentButton.tsx
│   ├── GoogleAnalytics.tsx
│   ├── NavLink.tsx
│   └── SEOHead.tsx
├── hooks/                   # Custom React hooks
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── useParallax.ts
├── integrations/
│   └── supabase/            # Supabase client & types
│       ├── client.ts
│       └── types.ts
├── lib/                     # Utility functions
│   └── utils.ts             # cn() for Tailwind class merging
├── pages/                   # Route pages
│   ├── Index.tsx            # Homepage
│   ├── About.tsx
│   ├── Admissions.tsx
│   ├── Apply.tsx            # Application form page
│   ├── Blog.tsx
│   ├── Contact.tsx
│   ├── Courses.tsx
│   ├── NotFound.tsx
│   ├── StudentLife.tsx
│   └── admin/               # Admin dashboard pages
│       ├── AdminAnalytics.tsx
│       ├── AdminApplications.tsx
│       ├── AdminAuth.tsx
│       ├── AdminDashboard.tsx
│       ├── AdminGallery.tsx
│       ├── AdminNewsletter.tsx
│       ├── AdminOverview.tsx
│       ├── AdminSettings.tsx
│       └── AdminSubmissions.tsx
├── test/                    # Test setup
│   ├── setup.ts
│   └── example.test.ts
├── App.tsx                  # Root component with routes
├── index.css                # Global styles + CSS variables
├── main.tsx                 # Entry point
└── vite-env.d.ts

supabase/
├── config.toml              # Supabase configuration
├── functions/               # Edge functions
│   ├── elevenlabs-conversation-token/  # Voice AI token generation
│   ├── elevenlabs-text-chat/           # Text chat with AI
│   └── send-application-email/         # Email notifications
└── migrations/              # Database migrations
    ├── 20260120032445_3af41939-4ca4-46ff-a30e-54a9ed85062e.sql
    └── 20260203032330_0d237df7-4a11-47d1-9031-3ab509965935.sql

public/                      # Static assets
├── favicon.png
└── (other static files)
```

---

## Build and Development Commands

```bash
# Development server (runs on port 8080)
npm run dev

# Production build
npm run build

# Development build
npm run build:dev

# Preview production build
npm run preview

# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

---

## Database Schema

The application uses Supabase PostgreSQL with the following main tables:

### Core Tables

| Table | Purpose |
|-------|---------|
| `admission_applications` | Stores all application data with 7-step form fields |
| `user_roles` | Role-based access control (admin, editor, user) |
| `gallery_images` | Photo gallery entries with metadata |
| `contact_submissions` | Contact form submissions |
| `newsletter_subscriptions` | Newsletter subscriber emails |
| `site_settings` | Configurable site settings (GA4 ID, webhooks, SEO) |

### Storage Buckets

| Bucket | Purpose | Access |
|--------|---------|--------|
| `gallery` | Photo gallery images | Public read, Admin write |
| `application-documents` | Application certificates & documents | Public (token-based) |

### Row Level Security (RLS)

All tables have RLS enabled with these key policies:
- **Public**: Can create draft applications, view active gallery images
- **Authenticated Users**: Can view own roles, manage own applications
- **Admins**: Full access to all resources via `has_role()` function

---

## Supabase Edge Functions

| Function | Purpose | Auth Required |
|----------|---------|---------------|
| `elevenlabs-conversation-token` | Generates tokens for voice AI | No |
| `elevenlabs-text-chat` | Text-based AI chat endpoint | No |
| `send-application-email` | Sends email notifications via Resend | Service role |

Email notifications are sent for:
- New application submissions
- Application status changes (under_review, accepted, rejected)

---

## Code Style Guidelines

### TypeScript Conventions

1. **Strict mode is disabled** - The project uses relaxed TypeScript settings (`noImplicitAny: false`, `strictNullChecks: false`)
2. **Path aliases**: Use `@/` prefix for imports from src (e.g., `@/components/ui/button`)
3. **Component exports**: Use default exports for pages, named exports for components
4. **Types**: Prefer interface over type for object shapes

### React Conventions

1. **Functional components** with hooks only
2. **File naming**: PascalCase for components (e.g., `AdmissionForm.tsx`)
3. **Hook naming**: camelCase starting with "use" (e.g., `useParallax.ts`)
4. **Props interfaces**: Define inline or in the same file

### Styling Conventions

1. **Tailwind first**: Use Tailwind utilities for all styling
2. **CSS Variables**: Brand colors defined in `src/index.css` using HSL format
3. **Component classes**: Use `cn()` utility from `@/lib/utils` for conditional classes
4. **Animation**: Use Framer Motion for complex animations, Tailwind for simple ones

### Brand Design System

Colors (from `src/index.css`):
- **Primary**: Deep Navy Blue `hsl(215 70% 28%)`
- **Primary Dark**: `hsl(215 85% 18%)`
- **Accent Gold**: `hsl(42 85% 50%)` - Used for CTAs and highlights
- **Accent Orange**: `hsl(32 95% 55%)`
- **Accent Green**: `hsl(142 45% 45%)` - Success states
- **Accent Teal**: `hsl(194 75% 50%)`

Typography:
- **Headings**: Plus Jakarta Sans (weights: 400, 500, 600, 700, 800)
- **Body**: Inter (weights: 400, 500, 600, 700)

---

## Testing Strategy

- **Framework**: Vitest with jsdom environment
- **Setup**: `src/test/setup.ts` configures `matchMedia` mock
- **Pattern**: `src/**/*.{test,spec}.{ts,tsx}`
- **Current state**: Minimal test coverage (example test only)

Testing utilities configured:
- `@testing-library/react`
- `@testing-library/jest-dom`

---

## Security Considerations

### Environment Variables

Required in `.env`:
```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_SUPABASE_PROJECT_ID
```

**Important:**
- Supabase service role key is NOT exposed to frontend
- Edge functions use `Deno.env.get()` for secrets
- Row Level Security is enabled on all tables
- Application documents bucket allows public upload (token-based access)

### Authentication Flows

1. **Admin Dashboard**: Uses Supabase Auth with role-based access
2. **Application Form**: Token-based resume capability (no login required)
3. **AI Voice Agent**: Public access with rate limiting via Supabase

---

## Development Workflow

### Adding New Pages

1. Create page component in `src/pages/` (PascalCase)
2. Add route in `src/App.tsx`
3. Use `Layout` component for consistent header/footer

### Adding New UI Components

1. Prefer shadcn/ui components: `npx shadcn add <component>`
2. Custom components go in `src/components/ui/`
3. Always use the `cn()` utility for class merging

### Database Migrations

1. Create migration in `supabase/migrations/`
2. Use timestamp prefix format: `YYYYMMDDHHMMSS_description.sql`
3. Enable RLS on new tables
4. Define policies for public/admin access

### Working with Supabase Types

The file `src/integrations/supabase/types.ts` is auto-generated. To update:
```bash
supabase gen types typescript --project-id <project-id> --schema public > src/integrations/supabase/types.ts
```

---

## Key Dependencies Notes

- **@elevenlabs/react**: Voice AI conversation hook
- **@tanstack/react-query**: Server state management
- **@supabase/supabase-js**: Database client
- **framer-motion**: Page transitions and animations
- **react-hook-form**: Form state management
- **zod**: Schema validation
- **sonner**: Toast notifications
- **embla-carousel-react**: Carousels
- **recharts**: Analytics charts in admin

---

## Deployment

The project is configured for deployment on Lovable platform:
- Build command: `vite build`
- Output directory: `dist`
- Environment variables must be configured in Lovable dashboard

For custom domain setup, see Lovable documentation.

---

## Troubleshooting

### Common Issues

1. **Supabase connection errors**: Check `.env` variables are set
2. **Voice agent not working**: Verify ElevenLabs agent ID is correct in `VoiceAgentButton.tsx`
3. **Email not sending**: Check Resend API key is set in Supabase secrets
4. **Build failures**: Ensure Node.js version supports the lockfile (bun.lockb present)

### Development Tips

- The dev server runs on port 8080 with host `::` (IPv6)
- HMR overlay is disabled in Vite config
- Use `lovable-tagger` plugin for component inspection in dev mode
