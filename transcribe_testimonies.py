#!/usr/bin/env python3
"""Transcribe testimony videos using Google Speech Recognition"""

import os
import subprocess
import json
from pathlib import Path

def extract_audio(video_path, output_audio_path):
    """Extract audio from video using ffmpeg"""
    cmd = [
        'ffmpeg', '-y', '-i', video_path,
        '-vn', '-acodec', 'libmp3lame', '-q:a', '4',
        '-ar', '16000', '-ac', '1',
        output_audio_path
    ]
    subprocess.run(cmd, capture_output=True)
    return output_audio_path

def get_video_duration(video_path):
    """Get video duration using ffprobe"""
    cmd = [
        'ffprobe', '-v', 'error', '-show_entries', 'format=duration',
        '-of', 'default=noprint_wrappers=1:nokey=1', video_path
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    return float(result.stdout.strip())

def transcribe_audio(audio_path):
    """Transcribe audio using Google Speech Recognition"""
    import speech_recognition as sr
    
    recognizer = sr.Recognizer()
    
    # Convert to wav for speech recognition
    wav_path = audio_path.replace('.mp3', '.wav')
    cmd = ['ffmpeg', '-y', '-i', audio_path, '-ar', '16000', '-ac', '1', wav_path]
    subprocess.run(cmd, capture_output=True)
    
    try:
        with sr.AudioFile(wav_path) as source:
            # Record the entire audio file
            audio = recognizer.record(source)
            
        # Use Google's speech recognition
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return "[Could not understand audio]"
    except sr.RequestError as e:
        return f"[Error: {e}]"
    finally:
        # Clean up wav file
        if os.path.exists(wav_path):
            os.remove(wav_path)

def main():
    testimonies_dir = Path('testimonies')
    output_dir = Path('testimonies_transcriptions')
    output_dir.mkdir(exist_ok=True)
    
    # Find all video files
    video_files = sorted(testimonies_dir.glob('*.mp4'))
    
    results = []
    
    for video_file in video_files:
        print(f"\nProcessing: {video_file.name}")
        
        # Get duration
        try:
            duration = get_video_duration(video_file)
            print(f"  Duration: {duration:.1f}s")
        except:
            duration = 0
            print("  Could not get duration")
        
        # Extract audio
        audio_path = output_dir / f"{video_file.stem}.mp3"
        if not audio_path.exists():
            print(f"  Extracting audio...")
            extract_audio(video_file, audio_path)
        
        # Transcribe (only if audio is reasonable size - under 1MB for API limits)
        if audio_path.exists() and audio_path.stat().st_size < 5 * 1024 * 1024:  # 5MB limit
            print(f"  Transcribing...")
            transcript = transcribe_audio(str(audio_path))
            print(f"  Transcript: {transcript[:100]}...")
        else:
            transcript = "[Audio file too large for transcription]"
            print(f"  {transcript}")
        
        results.append({
            'video': video_file.name,
            'duration': duration,
            'transcript': transcript
        })
    
    # Save results
    with open(output_dir / 'transcriptions.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n\nTranscriptions saved to {output_dir / 'transcriptions.json'}")

if __name__ == '__main__':
    main()
