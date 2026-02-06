# DUSOM Abuja - Dunamis School of Ministry Website

[![Website](https://img.shields.io/badge/Website-dusomabuja.org-blue)](https://dusomabuja.org)
[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)

The official website for Dunamis School of Ministry (DUSOM) Abuja - a ministry training institution established in 2000 by Dr. Paul Enenche. The website serves as a digital presence for the school, providing information about courses, admissions, and a complete online application system.

![DUSOM Abuja](public/og-image.jpg)

## Features

- **Multi-page Website**: Home, About, Courses, Admissions, Student Life, Alumni, Blog, Contact
- **Online Application System**: 7-step admission form with resume capability
- **Admin Dashboard**: Manage applications, gallery, settings, and analytics
- **AI Voice Agent**: ElevenLabs integration for voice and text chat
- **Newsletter System**: Subscription management with Supabase
- **Photo Gallery**: Dynamic gallery with admin CRUD operations
- **SEO Optimized**: Complete SEO implementation with structured data

## Technology Stack

| Category | Technology |
|----------|------------|
| **Build Tool** | Vite 5.x with SWC plugin |
| **Framework** | React 18.x |
| **Language** | TypeScript 5.x |
| **Styling** | Tailwind CSS 3.x |
| **UI Components** | shadcn/ui + Radix UI primitives |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **State Management** | TanStack Query (React Query) |
| **Routing** | React Router DOM 6.x |
| **Forms** | React Hook Form + Zod validation |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Voice AI** | ElevenLabs Conversational AI |

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dusom-abuja.git
cd dusom-abuja

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

The development server runs on `http://localhost:8080`.

### Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── admissions/          # Admission form components
│   ├── home/                # Homepage sections
│   ├── layout/              # Header, Footer, Layout
│   ├── student-life/        # Student life page components
│   ├── ui/                  # shadcn/ui components
│   ├── voice-agent/         # AI voice assistant
│   ├── PageSEO.tsx          # SEO component for pages
│   └── SEOHead.tsx          # Global SEO head component
├── hooks/                   # Custom React hooks
├── integrations/
│   └── supabase/            # Supabase client & types
├── lib/
│   ├── utils.ts             # Utility functions
│   └── seo.ts               # SEO utilities & schemas
├── pages/                   # Route pages
│   ├── Index.tsx            # Homepage
│   ├── About.tsx
│   ├── Courses.tsx
│   ├── Admissions.tsx
│   ├── Apply.tsx            # Application form
│   ├── StudentLife.tsx
│   ├── StudentAffairs.tsx   # Code of conduct, policies
│   ├── Alumni.tsx           # Alumni network
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   └── Contact.tsx
├── data/
│   └── blogPosts.ts         # Blog posts data
├── App.tsx                  # Root component with routes
└── index.css                # Global styles

public/
├── sitemap.xml              # XML sitemap for SEO
├── robots.txt               # Robots.txt for crawlers
└── blog-images/             # Blog post images

blog_posts/                  # Source blog post markdown files
```

## SEO Implementation

This project includes comprehensive SEO features:

- **Structured Data**: Schema.org JSON-LD for Organization, LocalBusiness, Course, Article, FAQ, and Breadcrumb
- **Meta Tags**: Dynamic title, description, Open Graph, Twitter Cards
- **Sitemap**: Complete XML sitemap at `/sitemap.xml`
- **Robots.txt**: Crawler instructions at `/robots.txt`
- **Canonical URLs**: Prevents duplicate content issues
- **Geo-targeting**: Location meta tags for local SEO

### Adding New Blog Posts

See [SEO_GUIDE.md](./SEO_GUIDE.md) for detailed instructions on adding blog posts with proper SEO.

Quick steps:
1. Create markdown file in `blog_posts/`
2. Add front matter with title, slug, date
3. Write SEO-optimized content with FAQ section
4. Add to `src/data/blogPosts.ts`
5. Update `public/sitemap.xml`

### Adding New Pages

1. Create component in `src/pages/`
2. Import and use `PageSEO` component
3. Add route to `src/App.tsx`
4. Update navigation in Header/Footer
5. Add to `public/sitemap.xml`

See [SEO_GUIDE.md](./SEO_GUIDE.md) for complete documentation.

## Environment Variables

Create a `.env` file with:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id

# Optional: Analytics
VITE_GA4_ID=your_google_analytics_id
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Development build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests |
| `npm run lint` | Lint code |

## Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

Configuration in `vercel.json`:
```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

### Custom Domain

1. Add domain in Vercel project settings
2. Update DNS records
3. Update `BASE_URL` in `src/lib/seo.ts`
4. Update canonical URLs in `index.html`

## Database Schema

The application uses Supabase PostgreSQL with the following main tables:

- `admission_applications` - Application data
- `user_roles` - Role-based access control
- `gallery_images` - Photo gallery
- `contact_submissions` - Contact form submissions
- `newsletter_subscriptions` - Newsletter subscribers
- `site_settings` - Configurable site settings

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## SEO Checklist for Contributors

When adding new content:

- [ ] Page/component has `PageSEO` with title, description, keywords
- [ ] Relevant schemas added (Organization, FAQ, etc.)
- [ ] Images have descriptive alt text
- [ ] URL added to sitemap.xml
- [ ] Internal links use relative paths
- [ ] Content is 1,500+ words for pillar pages
- [ ] FAQ section included where relevant

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is proprietary and owned by Dunamis School of Ministry.

## Support

For technical support or questions:
- Email: dusomabuja@gmail.com
- Phone: +234 808 327 5342

## Resources

- [SEO Guide](./SEO_GUIDE.md) - Comprehensive SEO documentation
- [AGENTS.md](./AGENTS.md) - Development guidelines and conventions
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Dunamis School of Ministry (DUSOM)**  
Area 1, Behind Old Federal Secretariat, Abuja, Nigeria  
[www.dusomabuja.org](https://dusomabuja.org)
