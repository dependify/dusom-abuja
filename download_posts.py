#!/usr/bin/env python3
"""Download all blog posts from DUSOM WordPress site"""

import requests
import json
from pathlib import Path

def fetch_all_posts(base_url="https://dusomabuja.org"):
    """Fetch all posts from WordPress REST API"""
    posts = []
    page = 1
    per_page = 20
    
    while True:
        url = f"{base_url}/wp-json/wp/v2/posts?per_page={per_page}&page={page}"
        print(f"Fetching page {page}...")
        
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            if not data:
                break
                
            posts.extend(data)
            print(f"  Got {len(data)} posts (total: {len(posts)})")
            
            # Check if there are more pages
            if len(data) < per_page:
                break
                
            page += 1
            
        except requests.exceptions.RequestException as e:
            print(f"Error: {e}")
            break
    
    return posts

def main():
    posts = fetch_all_posts()
    
    # Save to file
    output_dir = Path("blog_posts")
    output_dir.mkdir(exist_ok=True)
    
    # Save raw data
    with open(output_dir / "all_posts.json", "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
    
    # Save individual posts as markdown
    for post in posts:
        post_id = post.get("id", "unknown")
        title = post.get("title", {}).get("rendered", "Untitled")
        slug = post.get("slug", f"post-{post_id}")
        content = post.get("content", {}).get("rendered", "")
        excerpt = post.get("excerpt", {}).get("rendered", "")
        status = post.get("status", "unknown")
        date = post.get("date", "")
        
        # Create markdown file
        md_content = f"""---
id: {post_id}
title: {title}
slug: {slug}
status: {status}
date: {date}
---

# {title}

**Status:** {status}
**Date:** {date}

## Excerpt

{excerpt}

## Content

{content}
"""
        
        filename = f"{post_id}_{slug}.md"
        with open(output_dir / filename, "w", encoding="utf-8") as f:
            f.write(md_content)
        
        print(f"Saved: {filename}")
    
    print(f"\nTotal posts downloaded: {len(posts)}")
    print(f"Saved to: {output_dir}")

if __name__ == "__main__":
    main()
