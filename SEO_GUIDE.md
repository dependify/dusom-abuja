# DUSOM Website SEO Guide

This guide explains how to maintain and extend SEO features when adding new content to the DUSOM website.

## Table of Contents

1. [Adding a New Blog Post](#adding-a-new-blog-post)
2. [Adding a New Page](#adding-a-new-page)
3. [Updating the Sitemap](#updating-the-sitemap)
4. [SEO Best Practices](#seo-best-practices)

---

## Adding a New Blog Post

### Step 1: Create the Blog Post File

Create a new Markdown file in the `blog_posts/` directory with the following naming convention:
```
{ID}_{slug}.md
```

Example: `206400_new-blog-post-title.md`

### Step 2: Add Front Matter

Every blog post must include front matter at the top:

```markdown
---
id: 206400
title: Your Blog Post Title
slug: your-blog-post-slug
status: publish
date: 2026-02-06T10:00:00
---
```

**Front Matter Fields:**
- `id`: Unique numeric identifier
- `title`: Full title of the post (keep under 60 characters for SEO)
- `slug`: URL-friendly version of title (lowercase, hyphenated)
- `status`: Always "publish" for published posts
- `date`: ISO 8601 format date

### Step 3: Write SEO-Optimized Content

```markdown
# Your Blog Post Title (H1 - should match front matter title)

## Excerpt
<p>Write a compelling 150-160 character excerpt that summarizes the post. This appears in search results and social shares.</p>

## Content

### Introduction (Use H3 for sections)
Your introduction should include your primary keyword naturally within the first 100 words.

### Key Takeaways
- Bullet points improve readability
- Include keywords where natural
- Aim for 1,500+ words for better rankings

### Conclusion
Summarize key points and include a call-to-action.

### FAQs (Important for SEO)
Include a Frequently Asked Questions section:

1. **What is [topic]?**
   Answer with 2-3 sentences.

2. **How does [topic] work?**
   Provide clear, concise answers.
```

**Content SEO Checklist:**
- [ ] Use H1 for main title (only one per post)
- [ ] Use H2/H3 for subsections
- [ ] Include primary keyword in first paragraph
- [ ] Use keywords naturally throughout (1-2% density)
- [ ] Add internal links to other pages/posts
- [ ] Include at least one image with alt text
- [ ] Add FAQ section (helps with featured snippets)
- [ ] Write 1,500+ words for pillar content

### Step 4: Update Blog Data File

Add the post to `src/data/blogPosts.ts`:

```typescript
export const blogPosts: BlogPost[] = [
  // ... existing posts
  
  {
    id: 206400,
    title: "Your Blog Post Title",
    slug: "your-blog-post-slug",
    excerpt: "Compelling 150-160 character excerpt for search results...",
    content: `Full markdown content here...`,
    category: "Spiritual Growth", // or appropriate category
    author: "Dr. Paul Enenche", // or author name
    date: "2026-02-06",
    readTime: "8 min read",
    featuredImage: "/blog-images/your-post-image.jpg",
    images: ["/blog-images/your-post-image.jpg"],
    tags: ["keyword1", "keyword2", "keyword3"],
    status: "published"
  }
];
```

### Step 5: Update the Sitemap

Add the new post to `public/sitemap.xml`:

```xml
<url>
  <loc>https://dusomabuja.org/blog/your-blog-post-slug</loc>
  <lastmod>2026-02-06</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

### Step 6: Test the Post

1. Navigate to `/blog/your-blog-post-slug`
2. Check that PageSEO component is applied
3. Verify meta tags in browser dev tools
4. Test social sharing preview (Facebook Debugger, Twitter Card Validator)

---

## Adding a New Page

### Step 1: Create the Page Component

Create a new file in `src/pages/`:

```typescript
// src/pages/NewPage.tsx
import { Layout } from "@/components/layout/Layout";
import { PageSEO } from "@/components/PageSEO";
import { pageSEO, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

const NewPage = () => {
  // Define SEO configuration
  const seo = {
    title: "Page Title | DUSOM Abuja",
    description: "Compelling 150-160 character description of the page content.",
    keywords: ["keyword1", "keyword2", "keyword3"],
    ogType: "website" as const,
    ogImage: "/og-image.jpg"
  };

  // Define schemas
  const schemas = [
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "New Page", url: "/new-page" }
    ]),
    // Add FAQ schema if page has FAQs
    generateFAQSchema([
      {
        question: "Common question?",
        answer: "Clear, concise answer."
      }
    ])
  ];

  return (
    <Layout>
      <PageSEO {...seo} schemas={schemas} />
      {/* Page content */}
    </Layout>
  );
};

export default NewPage;
```

### Step 2: Add Route

Add the route to `src/App.tsx`:

```typescript
import NewPage from "./pages/NewPage";

// In Routes component:
<Route path="/new-page" element={<NewPage />} />
```

### Step 3: Update Navigation (if needed)

Add to header navigation in `src/components/layout/Header.tsx`:

```typescript
const navItems = [
  // ... existing items
  { label: "New Page", href: "/new-page" },
];
```

Add to footer links in `src/components/layout/Footer.tsx`:

```typescript
const quickLinks = [
  // ... existing links
  { label: "New Page", href: "/new-page" },
];
```

### Step 4: Add to Sitemap

Add to `public/sitemap.xml`:

```xml
<url>
  <loc>https://dusomabuja.org/new-page</loc>
  <lastmod>2026-02-06</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

### Step 5: Update SEO Configuration (Optional)

If this is a major page, add to `src/lib/seo.ts`:

```typescript
export const pageSEO: Record<string, SEOProps> = {
  // ... existing pages
  newPage: {
    title: "Page Title | DUSOM Abuja",
    description: "Page description...",
    keywords: ["keyword1", "keyword2"],
    ogType: "website"
  }
};
```

---

## Updating the Sitemap

### When to Update

Update `public/sitemap.xml` when:
- Adding new pages or blog posts
- Changing page URLs
- Major content updates (update `<lastmod>`)

### Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dusomabuja.org/page-url</loc>
    <lastmod>2026-02-06</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Priority Guidelines:**
- `1.0` - Homepage
- `0.9` - Apply, Admissions, About
- `0.8` - Courses, Student Life, Alumni, Contact
- `0.7` - Blog posts, Student Affairs
- `0.3` - Privacy Policy, Terms

**Changefreq Guidelines:**
- `weekly` - Homepage, Admissions, Apply
- `monthly` - Most content pages
- `yearly` - Privacy Policy, Terms

---

## SEO Best Practices

### Title Tags
- Keep under 60 characters
- Include primary keyword near the beginning
- Format: "Primary Keyword | DUSOM Abuja"
- Example: "Ministry Training Courses | DUSOM Abuja"

### Meta Descriptions
- Keep under 160 characters
- Include primary keyword
- Include call-to-action
- Example: "Join DUSOM's 6-month ministry training program. 22 courses, spiritual impartation from Dr. Paul Enenche. Apply for 2026 session."

### Keywords
- Include 5-10 relevant keywords
- Include location keywords (Abuja, Nigeria)
- Include long-tail keywords
- Example: `["DUSOM", "ministry training", "bible school abuja", "christian education nigeria"]`

### Content Optimization
- Use descriptive headings (H1, H2, H3)
- Include keywords in first 100 words
- Use alt text for all images
- Include internal links
- Add FAQ section for featured snippets
- Write 1,500+ words for pillar content

### Images
- Use descriptive file names: `dusom-graduation-ceremony.jpg`
- Include alt text: `alt="DUSOM graduation ceremony with Dr. Paul Enenche"`
- Compress images for web (< 200KB)
- Use WebP format when possible

### Structured Data
Always include relevant schemas:
- **Organization Schema** - About, Alumni pages
- **LocalBusiness Schema** - Contact page
- **Course Schema** - Courses page
- **Article Schema** - Blog posts
- **FAQ Schema** - Pages with FAQs
- **Breadcrumb Schema** - All pages

---

## Testing SEO

### Browser DevTools
1. Open page in browser
2. Right-click > Inspect
3. Check `<head>` section for:
   - `<title>` tag
   - `<meta name="description">`
   - `<meta property="og:*">` tags
   - `<link rel="canonical">`
   - `<script type="application/ld+json">`

### Online Tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema Markup Validator](https://validator.schema.org/)

### Build Verification
```bash
npm run build
```
Ensure:
- No build errors
- Sitemap.xml is in dist/
- robots.txt is in dist/

---

## Quick Reference Checklist

### New Blog Post
- [ ] File created in `blog_posts/`
- [ ] Front matter complete
- [ ] Excerpt written (150-160 chars)
- [ ] Content optimized with keywords
- [ ] FAQ section included
- [ ] Added to `src/data/blogPosts.ts`
- [ ] Added to `public/sitemap.xml`
- [ ] Images uploaded to `/blog-images/`
- [ ] Tested and verified

### New Page
- [ ] Component created in `src/pages/`
- [ ] PageSEO component implemented
- [ ] Schemas added
- [ ] Route added to `src/App.tsx`
- [ ] Navigation updated (Header/Footer)
- [ ] Added to `public/sitemap.xml`
- [ ] Tested and verified

---

## Need Help?

Contact the development team or refer to:
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/docs/documents.html)
- [Open Graph Protocol](https://ogp.me/)
