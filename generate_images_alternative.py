#!/usr/bin/env python3
"""Generate blog post images using alternative services"""

import requests
import time
from pathlib import Path

def generate_image_pollinations(prompt, filename, width=1024, height=768):
    """Generate an image using pollinations.ai with retry"""
    
    # Simple URL construction
    safe_prompt = prompt.replace(' ', '%20').replace(',', '%2C').replace("'", "%27")
    url = f"https://image.pollinations.ai/prompt/{safe_prompt}?width={width}&height={height}&nologo=true&seed=42"
    
    print(f"Generating: {filename}")
    
    for attempt in range(3):
        try:
            response = requests.get(url, timeout=180)
            if response.status_code == 200:
                output_path = Path("public/blog-images") / filename
                with open(output_path, "wb") as f:
                    f.write(response.content)
                print(f"  [OK] Saved: {filename} ({len(response.content)} bytes)")
                return True
            else:
                print(f"  Attempt {attempt+1}: HTTP {response.status_code}")
                time.sleep(2)
        except Exception as e:
            print(f"  Attempt {attempt+1}: {str(e)[:50]}")
            time.sleep(2)
    
    return False

def main():
    # Define images for each blog post - shorter prompts for reliability
    images = [
        # Blog 1: Royal Identity
        ("royal-identity-1.jpg", "golden royal crown with gems on dark blue velvet background, dramatic lighting, christian symbolism"),
        ("royal-identity-2.jpg", "person walking on golden light path, heavenly rays, spiritual authority, divine destiny, inspirational"),
        ("royal-identity-3.jpg", "person with raised hands speaking, surrounded by golden light and doves, declaring gods word, spiritual power"),
        
        # Blog 2: Divine Encounter  
        ("divine-encounter-1.jpg", "heavenly light breaking through dark storm clouds, golden divine rays, jacob ladder concept, dramatic sky"),
        ("divine-encounter-2.jpg", "angels ascending descending on glowing ladder of light between heaven earth, ethereal golden blue tones"),
        ("divine-encounter-3.jpg", "person kneeling in prayer in peaceful nature setting, surrounded by soft golden light, divine encounter"),
        
        # Blog 3: Blood Covenant
        ("blood-covenant-1.jpg", "cross silhouette against dramatic red gold sunset sky, blood covenant of christ, redemption, cinematic"),
        ("blood-covenant-2.jpg", "red wine in communion chalice with light shining through, symbolizing blood of jesus, sacred atmosphere"),
        ("blood-covenant-3.jpg", "protective shield of golden light surrounding family home, red threads of light, blood covering protection"),
    ]
    
    success_count = 0
    for filename, prompt in images:
        if generate_image_pollinations(prompt, filename):
            success_count += 1
        time.sleep(1)  # Rate limiting
        print()
    
    print("=" * 50)
    print(f"Generated {success_count}/{len(images)} images")

if __name__ == "__main__":
    main()
