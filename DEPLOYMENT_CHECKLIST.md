# DUSOM Website Deployment Checklist

## Pre-Deployment Summary

### Assets Ready for Deployment

#### 1. Blog Images (24 images)
Location: `public/blog-images/`
- royal-identity-1/2/3.jpg (3 images)
- divine-encounter-1/2/3.jpg (3 images)
- blood-covenant-1/2/3.jpg (3 images)
- prayer-fasting-1/2/3.jpg (3 images)
- spiritual-gifts-1/2/3.jpg (3 images)
- financial-overflow-1/2/3.jpg (3 images)
- holy-spirit-1/2/3.jpg (3 images)
- family-foundations-1/2/3.jpg (3 images)

#### 2. Testimony Images (5 images)
Location: `public/testimonies/`
- innocent-power.jpg
- blessing-okonkwo.jpg
- olamide-israel.jpg
- sunday-oluwaseun.jpg
- grace-adeyemi.jpg

#### 3. Gallery Images (271 images)
Location: `public/gallery/`
- 271 optimized gallery images
- Categories: Worship, Academics, Campus Life, Fellowship, Events

### Files Modified/Created

#### Source Code
- `src/data/blogPosts.ts` - Blog posts data with 8 posts
- `src/pages/Blog.tsx` - Updated blog listing page
- `src/pages/BlogPost.tsx` - Individual blog post page (NEW)
- `src/pages/Index.tsx` - Updated homepage with TestimonialsPreview
- `src/components/home/TestimonialsPreview.tsx` - Testimonials section (NEW)
- `src/pages/Testimonies.tsx` - Full testimonies page (NEW)
- `src/pages/Courses.tsx` - Updated with actual courses
- `src/pages/About.tsx` - Updated vision/mission
- `src/App.tsx` - Added new routes

#### Configuration
- `vercel.json` - Vercel deployment config (already exists)
- `.gitignore` - Git ignore rules (does NOT exclude public assets)

#### Assets
- `public/blog-images/*` - 24 blog images
- `public/testimonies/*` - 5 testimony images
- `public/gallery/*` - 271 gallery images

### New Routes Added
- `/blog/:slug` - Individual blog posts
- `/testimonies` - Testimonies page

### Build Configuration
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: Vite

## Deployment Steps

### 1. Commit to GitHub
```bash
# Add all changes
git add .

# Commit with descriptive message
git commit -m "feat: Add 8 blog posts with images, testimony section, gallery updates

- Add 8 rewritten blog posts with spiritual content
- Add 24 blog images (3 per post)
- Add 5 testimony images with transcribed content
- Update Courses page with actual DUSOM courses
- Update About page with official vision/mission
- Add new color scheme (#01339A primary, #F69400 accent)
- Update gallery to 3x3 grid with load more
- Add TestimonialsPreview to homepage
- Create full Testimonies page
- Fix image positioning for faces"

# Push to GitHub
git push origin main
```

### 2. Vercel Deployment
Vercel will automatically deploy when you push to GitHub if:
- Vercel project is connected to your GitHub repo
- GitHub integration is enabled

If manual deployment is needed:
```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Post-Deployment Verification

Check these URLs after deployment:
- [ ] Homepage loads correctly
- [ ] Blog page shows 8 posts
- [ ] Individual blog posts load with images
- [ ] Testimonies page loads with 5 testimonies
- [ ] Gallery shows 9 images initially with load more
- [ ] All images display correctly (no broken images)
- [ ] New color scheme applied (blue/orange)
- [ ] Courses page shows correct course names
- [ ] About page shows updated vision/mission

### Environment Variables (if needed on Vercel)
Make sure these are set in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

## Important Notes

1. **All public assets are included**: The `.gitignore` does NOT exclude `public/` folder, so all images will be committed and deployed.

2. **Gallery images**: 271 images are in `public/gallery/` - these are large in total size but optimized for web.

3. **Build output**: The `dist/` folder is in `.gitignore` and should NOT be committed. Vercel builds this automatically.

4. **Routing**: `vercel.json` has a catch-all rewrite to `index.html` for client-side routing to work.

## Troubleshooting

If images don't appear after deployment:
1. Check that images are in the repo: `git ls-files public/blog-images/`
2. Verify image paths in code start with `/` (e.g., `/blog-images/image.jpg`)
3. Check Vercel build logs for any asset copying errors
4. Clear browser cache and refresh

If build fails:
1. Check `npm run build` works locally
2. Verify Node.js version compatibility
3. Check for any case-sensitivity issues in imports
