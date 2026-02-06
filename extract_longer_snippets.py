#!/usr/bin/env python3
"""Extract 60-second audio snippets for better transcription"""

import subprocess
from pathlib import Path

def extract_and_transcribe(video_file, duration=60):
    """Extract audio and transcribe"""
    import speech_recognition as sr
    
    wav_path = f"temp_{video_file.stem}.wav"
    
    # Extract audio
    cmd = [
        'ffmpeg', '-y', '-i', str(video_file),
        '-vn', '-t', str(duration),
        '-acodec', 'pcm_s16le', '-ar', '16000', '-ac', '1',
        wav_path
    ]
    subprocess.run(cmd, capture_output=True)
    
    # Transcribe
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(wav_path) as source:
            audio = recognizer.record(source)
        text = recognizer.recognize_google(audio)
    except:
        text = ""
    finally:
        Path(wav_path).unlink(missing_ok=True)
    
    return text

def main():
    testimonies_dir = Path('testimonies')
    
    # Process videos that had some content
    videos_to_process = [
        '20240212_103715.mp4',  # Mr Innocent
        '20240212_102945.mp4',  # Woman about husband
        '20240212_100523.mp4',  # Olamide
        '20240212_103159.mp4',  # Bible understanding
        '20240212_101619.mp4',  # Communion/landlord
    ]
    
    for video_name in videos_to_process:
        video_path = testimonies_dir / video_name
        if video_path.exists():
            print(f"\n=== {video_name} ===")
            transcript = extract_and_transcribe(video_path, duration=60)
            print(transcript)

if __name__ == '__main__':
    main()
