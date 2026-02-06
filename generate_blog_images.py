#!/usr/bin/env python3
"""Generate blog post images using pollinations.ai"""

import requests
import os
from pathlib import Path
from urllib.parse import quote

def generate_image(prompt, filename, width=1024, height=768):
    """Generate an image using pollinations.ai"""
    
    # URL encode the prompt
    encoded_prompt = quote(prompt)
    
    # Construct the URL
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={width}&height={height}&nologo=true&seed=42&enhance=true"
    
    print(f"Generating: {filename}")
    print(f"Prompt: {prompt[:80]}...")
    
    try:
        response = requests.get(url, timeout=120)
        response.raise_for_status()
        
        # Save the image
        output_path = Path("public/blog-images") / filename
        with open(output_path, "wb") as f:
            f.write(response.content)
        
        print(f"  [OK] Saved: {output_path} ({len(response.content)} bytes)")
        return True
        
    except Exception as e:
        print(f"  [ERROR] {e}")
        return False

def main():
    # Define images for each blog post
    images = [
        # Blog 1: Royal Identity
        {
            "filename": "royal-identity-1.jpg",
            "prompt": "A majestic golden royal crown with precious gems on a dark blue velvet background, dramatic lighting, cinematic photography, representing divine royalty and kingdom authority, Christian symbolism, elegant and spiritual atmosphere"
        },
        {
            "filename": "royal-identity-2.jpg", 
            "prompt": "A confident person walking on a path of golden light, silhouetted against bright heavenly rays, representing walking in spiritual authority and divine destiny, cinematic composition, inspirational, modern Christian art style"
        },
        {
            "filename": "royal-identity-3.jpg",
            "prompt": "A person with hands raised speaking with authority, surrounded by golden light and doves, representing declaring God's Word with power, spiritual warfare, modern worship setting, photorealistic, dramatic lighting"
        },
        
        # Blog 2: Divine Encounter
        {
            "filename": "divine-encounter-1.jpg",
            "prompt": "Heavenly light breaking through dark storm clouds, rays of golden divine light streaming down to earth, representing heaven breaking through, spiritual breakthrough, Jacob's ladder concept, dramatic sky, cinematic photography"
        },
        {
            "filename": "divine-encounter-2.jpg",
            "prompt": "Angelic beings ascending and descending on a glowing ladder of light between heaven and earth, Jacob's vision at Bethel, ethereal atmosphere, golden and blue tones, spiritual vision, classical religious art style with modern touch"
        },
        {
            "filename": "divine-encounter-3.jpg",
            "prompt": "A person kneeling in prayer in a peaceful natural setting, surrounded by soft golden light, representing intimate worship and divine encounter, morning mist, sun rays, photorealistic, serene and spiritual atmosphere"
        },
        
        # Blog 3: Blood Covenant
        {
            "filename": "blood-covenant-1.jpg",
            "prompt": "A powerful image of a cross silhouette against a dramatic red and gold sunset sky, representing the blood covenant of Christ, spiritual protection, redemption, cinematic photography, epic and moving composition"
        },
        {
            "filename": "blood-covenant-2.jpg",
            "prompt": "Abstract artistic representation of red wine in a communion chalice with light shining through, symbolizing the blood of Jesus, warm golden lighting, close-up photography, reverent and sacred atmosphere, Christian symbolism"
        },
        {
            "filename": "blood-covenant-3.jpg",
            "prompt": "A protective shield of golden light surrounding a family home, with red threads of light weaving through, representing the blood covering and divine protection, safe and peaceful atmosphere, spiritual warfare concept, modern digital art"
        }
    ]
    
    # Generate each image
    success_count = 0
    for img in images:
        if generate_image(img["prompt"], img["filename"]):
            success_count += 1
        print()
    
    print(f"=" * 50)
    print(f"Generated {success_count}/{len(images)} images")
    print(f"Saved to: public/blog-images/")

if __name__ == "__main__":
    main()
