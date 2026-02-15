# Gallery Images

This directory contains historical photos from past KCD New York events.

## Directory Structure

- `2024/` - Photos from KCD New York 2024
- `2025/` - Photos from KCD New York 2025

## Photo Requirements

### Download Source
Visit https://www.flickr.com/photos/kcdnewyork/albums/ to download photos.

### Selection Criteria
- High quality (well-lit, in-focus)
- Diverse content (speakers, attendees, venue, activities)
- Shows community energy
- Respectful representation
- 10-15 photos per year

### Image Processing
Before adding to repository:
1. **Resize**: 1920x1280px max (full size)
2. **Format**: JPEG with WebP support via Gatsby
3. **Compression**: 80% quality
4. **Tool**: Use Squoosh.app, ImageOptim, or sharp CLI

### File Naming Convention
Format: `kcd-ny-{year}-{category}-{number}.jpg`

Examples:
- `kcd-ny-2024-keynote-01.jpg`
- `kcd-ny-2024-networking-01.jpg`
- `kcd-ny-2025-workshop-01.jpg`

### Categories
- `keynote` - Main stage presentations
- `sessions` - Breakout sessions and talks
- `workshops` - Hands-on workshop activities
- `networking` - Community interaction moments
- `venue` - Facility and space shots
- `community` - Group photos and gathering shots

## Metadata

After adding photos, update `/src/data/gallery-photos.json` with metadata for each image:
- `id` - Unique identifier
- `filename` - File name (must match actual file)
- `year` - Event year (2024, 2025, 2026)
- `category` - One of the categories above
- `caption` - Brief description for display
- `featured` - Boolean, true for homepage highlights
- `alt` - Descriptive alt text for accessibility
