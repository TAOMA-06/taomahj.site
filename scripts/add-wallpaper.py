#!/usr/bin/env python3
"""
Add a wallpaper to the gallery.

Usage:
    python3 scripts/add-wallpaper.py ~/Pictures/sunset.jpg --title "Mountain Sunset"
    python3 scripts/add-wallpaper.py ~/Pictures/*.jpg
    python3 scripts/add-wallpaper.py ~/Pictures/wall.png -t "My Wall" --no-thumb

What it does:
    1. Copies original image to gallery/images/
    2. Generates a 400px-wide thumbnail to gallery/thumbnails/
    3. Updates gallery/manifest.json with metadata
    4. Shows a summary

Requirements: Pillow (pip install Pillow)
"""

import argparse
import json
import os
import sys
from pathlib import Path
from datetime import date

try:
    from PIL import Image
except ImportError:
    print("❌ Pillow not installed. Run: pip install Pillow")
    sys.exit(1)

GALLERY_DIR = Path(__file__).resolve().parent.parent / "gallery"
IMAGES_DIR = GALLERY_DIR / "images"
THUMBS_DIR = GALLERY_DIR / "thumbnails"
MANIFEST = GALLERY_DIR / "manifest.json"
THUMB_WIDTH = 400


def slugify(title):
    """Generate a safe filename from a title."""
    import re
    s = title.lower().strip()
    s = re.sub(r'[^\w\s-]', '', s)
    s = re.sub(r'[-\s]+', '-', s)
    return s.strip('-') or "wallpaper"


def add_wallpaper(image_path, title=None, no_thumb=False):
    image_path = Path(image_path).expanduser().resolve()
    if not image_path.exists():
        print(f"❌ File not found: {image_path}")
        return False

    # Determine title
    if not title:
        title = image_path.stem.replace('_', ' ').replace('-', ' ').title()

    # Determine filename
    ext = image_path.suffix.lower()
    safe_title = slugify(title)
    dest_name = f"{safe_title}{ext}"

    # Avoid collisions
    counter = 1
    while (IMAGES_DIR / dest_name).exists():
        dest_name = f"{safe_title}-{counter}{ext}"
        counter += 1

    # Copy original
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    dest_path = IMAGES_DIR / dest_name

    with open(image_path, 'rb') as src, open(dest_path, 'wb') as dst:
        dst.write(src.read())

    file_size = dest_path.stat().st_size
    print(f"✓ Copied: {dest_name} ({format_size(file_size)})")

    # Get resolution
    try:
        with Image.open(dest_path) as img:
            width, height = img.size
            resolution = f"{width}x{height}"
    except Exception:
        width, height = 0, 0
        resolution = ""

    # Generate thumbnail
    thumb_name = None
    if not no_thumb and width > THUMB_WIDTH:
        THUMBS_DIR.mkdir(parents=True, exist_ok=True)
        thumb_name = f"{safe_title}-thumb.jpg"
        thumb_path = THUMBS_DIR / thumb_name
        try:
            with Image.open(dest_path) as img:
                ratio = THUMB_WIDTH / width
                thumb_h = int(height * ratio)
                thumb = img.resize((THUMB_WIDTH, thumb_h), Image.LANCZOS)
                if thumb.mode in ('RGBA', 'P'):
                    thumb = thumb.convert('RGB')
                thumb.save(thumb_path, 'JPEG', quality=85)
            print(f"✓ Thumbnail: {thumb_name} ({THUMB_WIDTH}x{thumb_h})")
        except Exception as e:
            print(f"⚠ Thumbnail failed: {e}")
            thumb_name = None

    # Update manifest
    manifest = {"images": [], "updated": str(date.today())}
    if MANIFEST.exists():
        try:
            manifest = json.loads(MANIFEST.read_text())
        except json.JSONDecodeError:
            pass

    entry = {
        "id": safe_title,
        "filename": dest_name,
        "title": title,
        "resolution": resolution,
        "format": ext.upper().lstrip('.'),
        "size": file_size,
        "date": str(date.today()),
    }
    if thumb_name:
        entry["thumbnail"] = thumb_name

    manifest["images"].append(entry)
    manifest["updated"] = str(date.today())

    MANIFEST.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    print(f"✓ Manifest updated ({len(manifest['images'])} total)")

    return True


def format_size(size):
    if size < 1024:
        return f"{size} B"
    elif size < 1024 * 1024:
        return f"{size / 1024:.1f} KB"
    else:
        return f"{size / (1024 * 1024):.1f} MB"


def main():
    parser = argparse.ArgumentParser(description="Add wallpaper to gallery")
    parser.add_argument("images", nargs="+", help="Image file(s) to add")
    parser.add_argument("--title", "-t", help="Display title (optional, uses filename)")
    parser.add_argument("--no-thumb", action="store_true", help="Skip thumbnail generation")
    args = parser.parse_args()

    for img_path in args.images:
        title = args.title if len(args.images) == 1 else None
        add_wallpaper(img_path, title=title, no_thumb=args.no_thumb)
        print()


if __name__ == "__main__":
    main()
