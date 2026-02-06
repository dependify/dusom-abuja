#!/usr/bin/env python3
"""Extract short audio snippets from testimonies for transcription"""

import os
import subprocess
import json
from pathlib import Path

def extract_audio_snippet(video_path, output_path, duration=30):
    """Extract first N seconds of audio from video"""
    cmd = [
        'ffmpeg', '-y', '-i', video_path,
        '-vn', '-t', str(duration),  # Only first N seconds
        '-acodec', 'pcm_s16le', '-ar', '16000', '-ac', '1',
        output_path
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return output_path

def transcribe_wav(wav_path):
    """Transcribe wav using Google Speech Recognition"""
    import speech_recognition as sr
    
    recognizer = sr.Recognizer()
    
    try:
        with sr.AudioFile(wav_path) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return ""
    except sr.RequestError as e:
        return f"[Error: {e}]"

def main():
    testimonies_dir = Path('testimonies')
    output_dir = Path('testimonies_snippets')
    output_dir.mkdir(exist_ok=True)
    
    # Find all video files, sorted by size (smaller first)
    video_files = sorted(testimonies_dir.glob('*.mp4'), key=lambda x: x.stat().st_size)
    
    results = []
    
    for i, video_file in enumerate(video_files, 1):
        print(f"\n[{i}/{len(video_files)}] Processing: {video_file.name}")
        size_mb = video_file.stat().st_size / (1024 * 1024)
        print(f"  Size: {size_mb:.1f} MB")
        
        # Extract audio snippet
        wav_path = output_dir / f"{video_file.stem}.wav"
        print(f"  Extracting 30s audio snippet...")
        extract_audio_snippet(video_file, wav_path)
        
        # Transcribe
        if wav_path.exists():
            print(f"  Transcribing...")
            transcript = transcribe_wav(str(wav_path))
            print(f"  Result: {transcript[:150]}..." if len(transcript) > 150 else f"  Result: {transcript}")
            
            results.append({
                'id': i,
                'video': video_file.name,
                'transcript': transcript
            })
            
            # Clean up wav file
            wav_path.unlink()
    
    # Save results
    with open(output_dir / 'transcriptions.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n\n=== RESULTS ===")
    for r in results:
        print(f"\n{r['id']}. {r['video']}")
        print(f"   {r['transcript'][:200]}...")

if __name__ == '__main__':
    main()
