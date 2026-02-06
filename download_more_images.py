#!/usr/bin/env python3
"""Download more stock images for new blog posts"""

import requests
from pathlib import Path

# Unsplash Image IDs for new blog posts
IMAGES = {
    # Prayer and Fasting
    "prayer-fasting-1.jpg": "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1024&h=768&fit=crop",
    "prayer-fasting-2.jpg": "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=1024&h=768&fit=crop",
    "prayer-fasting-3.jpg": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1024&h=768&fit=crop",
    
    # Spiritual Gifts
    "spiritual-gifts-1.jpg": "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1024&h=768&fit=crop",
    "spiritual-gifts-2.jpg": "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1024&h=768&fit=crop",
    "spiritual-gifts-3.jpg": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1024&h=768&fit=crop",
    
    # Financial Overflow
    "financial-overflow-1.jpg": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1024&h=768&fit=crop",
    "financial-overflow-2.jpg": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1024&h=768&fit=crop",
    "financial-overflow-3.jpg": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1024&h=768&fit=crop",
    
    # Holy Spirit
    "holy-spirit-1.jpg": "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=1024&h=768&fit=crop",
    "holy-spirit-2.jpg": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1024&h=768&fit=crop",
    "holy-spirit-3.jpg": "https://images.unsplash.com/photo-1490730141103-6cac27abb37f?w=1024&h=768&fit=crop",
    
    # Family Foundations
    "family-foundations-1.jpg": "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1024&h=768&fit=crop",
    "family-foundations-2.jpg": "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1024&h=768&fit=crop",
    "family-foundations-3.jpg": "https://images.unsplash.com/photo-1542037104857-4bb4b9fe2433?w=1024&h=768&fit=crop",
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
