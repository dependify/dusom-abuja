#!/usr/bin/env python3
"""Update WordPress posts with rewritten content and images"""

import requests
import base64
from pathlib import Path
import json

# WordPress credentials
WP_URL = "https://dusomabuja.org"
WP_USER = "admin_40c93p7z"
WP_PASS = "Kvfl 5CGx 5zZP ydop sh2w rRAy"

def get_auth_header():
    """Create Basic Auth header"""
    credentials = f"{WP_USER}:{WP_PASS}"
    encoded = base64.b64encode(credentials.encode()).decode()
    return {"Authorization": f"Basic {encoded}"}

def upload_image(image_path):
    """Upload an image to WordPress"""
    url = f"{WP_URL}/wp-json/wp/v2/media"
    headers = get_auth_header()
    
    with open(image_path, "rb") as f:
        files = {"file": (image_path.name, f, "image/jpeg")}
        response = requests.post(url, headers=headers, files=files)
    
    if response.status_code == 201:
        return response.json()["id"], response.json()["source_url"]
    else:
        print(f"  Error uploading image: {response.status_code}")
        print(f"  Response: {response.text[:200]}")
        return None, None

def update_post(post_id, title, content, excerpt, featured_image_id=None):
    """Update a WordPress post"""
    url = f"{WP_URL}/wp-json/wp/v2/posts/{post_id}"
    headers = get_auth_header()
    headers["Content-Type"] = "application/json"
    
    data = {
        "title": title,
        "content": content,
        "excerpt": excerpt,
    }
    
    if featured_image_id:
        data["featured_media"] = featured_image_id
    
    response = requests.post(url, headers=headers, json=data)
    
    if response.status_code == 200:
        return True
    else:
        print(f"  Error updating post: {response.status_code}")
        print(f"  Response: {response.text[:200]}")
        return False

def main():
    # Define the posts to update
    posts = [
        {
            "id": 206302,
            "title": "Awaken Your Royal Identity: Reigning in Life Through Christ",
            "slug": "awaken-your-royal-identity-reigning-in-life-through-christ",
            "images": [
                "public/blog-images/royal-identity-1.jpg",
                "public/blog-images/royal-identity-2.jpg",
                "public/blog-images/royal-identity-3.jpg"
            ],
            "md_file": "blog_posts/rewritten/01-awaken-your-royal-identity.md"
        },
        {
            "id": 206285,
            "title": "When Heaven Breaks Through: Experiencing Life-Changing Divine Encounters",
            "slug": "when-heaven-breaks-through-experiencing-divine-encounters",
            "images": [
                "public/blog-images/divine-encounter-1.jpg",
                "public/blog-images/divine-encounter-2.jpg",
                "public/blog-images/divine-encounter-3.jpg"
            ],
            "md_file": "blog_posts/rewritten/02-when-heaven-breaks-through.md"
        },
        {
            "id": 206256,
            "title": "Covered by the Blood: The Power of Divine Preservation",
            "slug": "covered-by-the-blood-divine-preservation-power",
            "images": [
                "public/blog-images/blood-covenant-1.jpg",
                "public/blog-images/blood-covenant-2.jpg",
                "public/blog-images/blood-covenant-3.jpg"
            ],
            "md_file": "blog_posts/rewritten/03-covered-by-the-blood.md"
        }
    ]
    
    headers = get_auth_header()
    
    for post in posts:
        print(f"\nProcessing: {post['title']}")
        print("=" * 60)
        
        # Upload images
        image_urls = []
        featured_image_id = None
        
        for img_path in post["images"]:
            img_file = Path(img_path)
            if img_file.exists():
                print(f"Uploading: {img_file.name}")
                img_id, img_url = upload_image(img_file)
                if img_id and img_url:
                    image_urls.append(img_url)
                    if featured_image_id is None:
                        featured_image_id = img_id
                        print(f"  Set as featured image (ID: {img_id})")
                else:
                    print(f"  Failed to upload")
            else:
                print(f"  Image not found: {img_path}")
        
        # Read the markdown content
        md_file = Path(post["md_file"])
        if md_file.exists():
            with open(md_file, "r", encoding="utf-8") as f:
                md_content = f.read()
            
            # Extract content (skip YAML frontmatter)
            content_parts = md_content.split("---")
            if len(content_parts) >= 3:
                html_content = content_parts[2].strip()
            else:
                html_content = md_content
            
            # Replace image placeholders with actual URLs
            for i, url in enumerate(image_urls, 1):
                placeholder = f"/blog-images/{post['slug'].split('-')[0]}-{i}.jpg"
                html_content = html_content.replace(placeholder, url)
            
            # Create excerpt (first paragraph after introduction)
            excerpt = ""
            lines = html_content.split("\n")
            for line in lines:
                if line.strip() and not line.startswith("#") and not line.startswith("!"):
                    excerpt = line.strip()[:300] + "..."
                    break
            
            # Update the post
            print(f"\nUpdating post ID {post['id']}...")
            if update_post(post["id"], post["title"], html_content, excerpt, featured_image_id):
                print(f"  [OK] Post updated successfully!")
                print(f"  View: {WP_URL}/{post['slug']}/")
            else:
                print(f"  [FAILED] Could not update post")
        else:
            print(f"  [ERROR] Markdown file not found: {md_file}")

if __name__ == "__main__":
    main()
