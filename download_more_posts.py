#!/usr/bin/env python3
"""Download more blog posts from WordPress"""

import requests
import json
from pathlib import Path

def fetch_posts():
    """Fetch all posts from WordPress REST API"""
    all_posts = []
    page = 1
    
    while page <= 2:  # Try to get up to 2 pages
        url = f"https://dusomabuja.org/wp-json/wp/v2/posts?per_page=10&page={page}"
        print(f"Fetching page {page}...")
        
        try:
            response = requests.get(url, timeout=30)
            if response.status_code == 200:
                data = response.json()
                if not data:
                    break
                all_posts.extend(data)
                print(f"  Got {len(data)} posts")
                if len(data) < 10:
                    break
            else:
                print(f"  Error: HTTP {response.status_code}")
                break
        except Exception as e:
            print(f"  Error: {e}")
            break
        
        page += 1
    
    return all_posts

def main():
    posts = fetch_posts()
    print(f"\nTotal posts found: {len(posts)}")
    
    for p in posts:
        print(f"  ID {p['id']}: {p['title']['rendered']}")
    
    # Save all posts
    output_dir = Path("blog_posts")
    output_dir.mkdir(exist_ok=True)
    
    with open(output_dir / "all_posts_extended.json", "w", encoding="utf-8") as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)
    
    print(f"\nSaved to {output_dir / 'all_posts_extended.json'}")

if __name__ == "__main__":
    main()
