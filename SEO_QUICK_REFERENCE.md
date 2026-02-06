# SEO Quick Reference Card

## New Blog Post (5 Steps)

```bash
# 1. Create post file
touch blog_posts/{ID}_{slug}.md

# 2. Add front matter
---
id: 206400
title: Your Title Here (under 60 chars)
slug: your-post-slug
status: publish
date: 2026-02-06T10:00:00
---

# 3. Write content with:
# - H1 for title
# - 150-160 char excerpt
# - Keywords in first 100 words
# - FAQ section at end
# - 1,500+ words

# 4. Add to src/data/blogPosts.ts
{
  id: 206400,
  title: "Your Title",
  slug: "your-post-slug",
  excerpt: "150-160 char excerpt...",
  content: `...`,
  category: "Spiritual Growth",
  author: "Dr. Paul Enenche",
  date: "2026-02-06",
  readTime: "8 min read",
  featuredImage: "/blog-images/image.jpg",
  tags: ["tag1", "tag2"]
}

# 5. Add to public/sitemap.xml
<url>
  <loc>https://dusomabuja.org/blog/your-post-slug</loc>
  <lastmod>2026-02-06</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

## New Page Template

```typescript
// src/pages/NewPage.tsx
import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { pageSEO, generateBreadcrumbSchema } from "@/lib/seo";

const NewPage = () => {
  const seo = {
    title: "Page Title | DUSOM Abuja",  // Under 60 chars
    description: "150-160 char description with keywords...",
    keywords: ["keyword1", "keyword2", "keyword3"],
    ogType: "website" as const,
    ogImage: "/og-image.jpg"
  };

  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "New Page", url: "/new-page" }
    ])
  ];

  return (
    <Layout>
      <PageSEO {...seo} schemas={schemas} />
      {/* Content */}
    </Layout>
  );
};
```

## Meta Tag Limits

| Tag | Limit | Example |
|-----|-------|---------|
| Title | 60 chars | `Ministry Training | DUSOM Abuja` |
| Description | 160 chars | `Join DUSOM's training...` |
| Keywords | 5-10 terms | `DUSOM, bible school, abuja` |

## Priority Values for Sitemap

```xml
1.0   <!-- Homepage -->
0.95  <!-- Apply page -->
0.9   <!-- About, Admissions -->
0.8   <!-- Courses, Contact, Student Life -->
0.7   <!-- Blog posts, Student Affairs -->
0.3   <!-- Privacy Policy, Terms -->
```

## Available Schemas

```typescript
// Organization Schema
generateOrganizationSchema()

// Local Business (Contact page)
generateLocalBusinessSchema()

// Courses
generateCourseSchema()

// Blog Post
generateArticleSchema({
  title, description, url, image,
  publishedTime, author, tags
})

// FAQ Page
generateFAQSchema([
  { question: "...", answer: "..." }
])

// Breadcrumbs
generateBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Page", url: "/page" }
])
```

## Image SEO Checklist

- [ ] Descriptive filename: `dusom-graduation.jpg`
- [ ] Alt text: `alt="DUSOM graduation ceremony"`
- [ ] Compressed: < 200KB
- [ ] WebP format preferred

## Content Checklist

- [ ] H1 for main title (only one)
- [ ] H2/H3 for subsections
- [ ] Keyword in first 100 words
- [ ] Internal links included
- [ ] FAQ section added
- [ ] 1,500+ words

## Testing URLs

- Rich Results: https://search.google.com/test/rich-results
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- Schema: https://validator.schema.org/

## Quick Commands

```bash
# Development
npm run dev

# Build & Test
npm run build

# Check dist folder
ls dist/
```
