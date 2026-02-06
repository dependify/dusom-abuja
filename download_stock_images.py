#!/usr/bin/env python3
"""Download stock images from Unsplash for blog posts"""

import requests
from pathlib import Path

# Unsplash Image IDs for relevant Christian/spiritual themes
IMAGES = {
    # Royal Identity - crown, authority, royalty
    "royal-identity-1.jpg": "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?w=1024&h=768&fit=crop",  # golden crown
    "royal-identity-2.jpg": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1024&h=768&fit=crop",  # person walking into light
    "royal-identity-3.jpg": "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1024&h=768&fit=crop",  # raised hands worship
    
    # Divine Encounter - light, heaven, prayer
    "divine-encounter-1.jpg": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1024&h=768&fit=crop",  # light breaking through clouds
    "divine-encounter-2.jpg": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1024&h=768&fit=crop",  # stairs to light
    "divine-encounter-3.jpg": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1024&h=768&fit=crop",  # person praying in nature
    
    # Blood Covenant - cross, sunset, protection
    "blood-covenant-1.jpg": "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1024&h=768&fit=crop",  # cross at sunset
    "blood-covenant-2.jpg": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1024&h=768&fit=crop",  # communion/wine
    "blood-covenant-3.jpg": "https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=1024&h=768&fit=crop",  # light protection
}

def download_image(url, filename):
    """Download image from URL"""
    try:
        print(f"Downloading: {filename}")
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        response = requests.get(url, headers=headers, timeout=60)
        response.raise_for_status()
        
        output_path = Path("public/blog-images") / filename
        with open(output_path, "wb") as f:
            f.write(response.content)
        
        print(f"  [OK] Saved: {filename} ({len(response.content)} bytes)")
        return True
    except Exception as e:
        print(f"  [ERROR] {str(e)[:60]}")
        return False

def main():
    success = 0
    for filename, url in IMAGES.items():
        if download_image(url, filename):
            success += 1
    
    print("\n" + "=" * 50)
    print(f"Downloaded {success}/{len(IMAGES)} images")
    print(f"Location: public/blog-images/")

if __name__ == "__main__":
    main()
