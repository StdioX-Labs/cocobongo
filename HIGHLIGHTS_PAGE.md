# Highlights Page - TikTok-Style Video/Image Display 🎥

## Overview
A fully immersive, TikTok-style highlights page showcasing Club Cocobongo's best moments with artists like Kaligraph Jones and Okello Max.

## Features

### 🎬 TikTok-Style Interface
- **Vertical Full-Screen Display** - Immersive experience similar to TikTok/Instagram Stories
- **Smooth Transitions** - Seamless sliding between highlights
- **Auto-Play Videos** - Videos automatically play when visible
- **Mute/Unmute Control** - Toggle sound for video highlights

### 📱 Navigation Methods
1. **Scroll/Swipe** - Scroll with mouse wheel or swipe on mobile
2. **Keyboard** - Arrow Up/Down keys
3. **Touch Gestures** - Swipe up/down on touch devices
4. **Side Indicators** - Click dots on the right side (desktop)
5. **Bottom Hint** - "Swipe Up" indicator for next highlight

### 🎨 Design Features
- **Progress Bars** - Top bar showing viewing progress
- **Gradient Overlays** - Professional dark gradients for readability
- **Artist Information** - Name, title, and location display
- **Responsive Layout** - Perfect on mobile, tablet, and desktop
- **Smooth Animations** - All transitions are fluid and professional

### 🎵 Current Highlights

#### Kaligraph Jones (2 highlights)
1. **Live Performance** (Image)
   - `IMG_0186.JPG` ✅
2. **Exclusive Show** (Video)
   - `IMG_2138.MOV` ✅
3. ❌ `IMG_2932.DNG` - Skipped (needs conversion)

#### Okello Max (3 highlights)
1. **Live at Cocobongo** (Video)
   - `IMG_2809.MOV` ✅
2. **Unforgettable Performance** (Video)
   - `IMG_2871.MOV` ✅
3. **Epic Night** (Image)
   - `IMG_3270.JPG` ✅

#### Cocobongo Nights (5 highlights)
1. **The Vibe** (Image)
   - `IMG_0187.JPG` ✅
2. **Club Atmosphere** (Image)
   - `IMG_0238.JPG` ✅
3. **Party Energy** (Video)
   - `IMG_0445.MOV` ✅
4. **Dance Floor Action** (Video)
   - `IMG_1626.MP4` ✅
5. **Weekend Vibes** (Video)
   - `IMG_2796.MOV` ✅
6. ❌ `IMG_3050.DNG` - Skipped (needs conversion)

**Total Active Highlights:** 10 highlights
**Total Files:** 12 files (10 active + 2 DNG to convert)

## File Structure

```
app/
  highlights/
    page.tsx          # Main highlights page component

public/
  highlights/
    kaligraph jones/
      IMG_0186.JPG    # Image ✅
      IMG_2138.MOV    # Video ✅
      IMG_2932.DNG    # (Skipped - needs conversion)
    okello max/
      IMG_2809.MOV    # Video ✅
      IMG_2871.MOV    # Video ✅
      IMG_3270.JPG    # Image ✅
    cocobongo nights/
      IMG_0187.JPG    # Image ✅
      IMG_0238.JPG    # Image ✅
      IMG_0445.MOV    # Video ✅
      IMG_1626.MP4    # Video ✅
      IMG_2796.MOV    # Video ✅
      IMG_3050.DNG    # (Skipped - needs conversion)
```

## How to Add More Highlights

### Step 1: Add Media Files
Place your images/videos in the appropriate artist folder:
```
public/highlights/[artist name]/your-file.jpg
```

### Step 2: Update the Data
Edit `app/highlights/page.tsx` and add to the `highlights` array:

```tsx
{
  id: '5',
  type: 'image', // or 'video'
  src: '/highlights/artist name/filename.jpg',
  artist: 'Artist Name',
  title: 'Event Title'
}
```

### Supported Formats

#### Images (Browser-Compatible)
- **JPG/JPEG** ✅ - Fully supported
- **PNG** ✅ - Fully supported
- **GIF** ✅ - Fully supported (including animated)
- **WEBP** ✅ - Modern format, great compression
- **SVG** ✅ - Vector images

#### Videos (Browser-Compatible)
- **MP4** ✅ - Best compatibility (H.264 codec recommended)
- **WEBM** ✅ - Modern format, good compression
- **MOV** ✅ - Supported (converts well, currently in use)
- **OGG** ✅ - Older format, still supported

#### NOT Supported (Raw/Professional Formats)
- **DNG** ❌ - Digital Negative (RAW format) - **Not browser-compatible**
- **CR2/CR3** ❌ - Canon RAW
- **NEF** ❌ - Nikon RAW
- **ARW** ❌ - Sony RAW

**Note:** The file `IMG_2932.DNG` in the Kaligraph Jones folder cannot be displayed in browsers. To use it:
1. Open in photo editing software (Adobe Lightroom, Photoshop, etc.)
2. Export as JPG or PNG
3. Replace the DNG file or add the converted version
4. Update the highlights array in the code

### Current Files Status

**Kaligraph Jones folder:**
- ✅ `IMG_0186.JPG` - **Active** (Image)
- ✅ `IMG_2138.MOV` - **Active** (Video)
- ❌ `IMG_2932.DNG` - **Skipped** (Unsupported format - needs conversion)

**Okello Max folder:**
- ✅ `IMG_2809.MOV` - **Active** (Video)
- ✅ `IMG_2871.MOV` - **Active** (Video)
- ✅ `IMG_3270.JPG` - **Active** (Image)

**Cocobongo Nights folder:** (NEW!)
- ✅ `IMG_0187.JPG` - **Active** (Image)
- ✅ `IMG_0238.JPG` - **Active** (Image)
- ✅ `IMG_0445.MOV` - **Active** (Video)
- ✅ `IMG_1626.MP4` - **Active** (Video)
- ✅ `IMG_2796.MOV` - **Active** (Video)
- ❌ `IMG_3050.DNG` - **Skipped** (Unsupported format - needs conversion)

## Navigation Integration

The Highlights page has been added to:
- ✅ Main homepage navigation (desktop & mobile)
- ✅ Menu page navigation (desktop & mobile)
- ✅ Accessible at `/highlights`

## Technical Details

### Technologies Used
- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management (useState, useRef, useEffect, useCallback)

### Key Components
1. **Video Auto-Play** - Automatically plays current video
2. **Mute Control** - Toggle audio on/off
3. **Scroll Detection** - Multiple input methods supported
4. **Touch Gestures** - Mobile-optimized swipe detection
5. **Progress Tracking** - Visual indicators of viewing progress

### Performance Optimizations
- **Lazy Loading** - Only current highlight loads with priority
- **Video Pausing** - Non-visible videos are paused
- **Smooth Transitions** - CSS transforms for 60fps animations
- **Debounced Scrolling** - Prevents rapid scroll events

## User Experience

### Desktop
- Scroll with mouse wheel
- Use arrow keys (Up/Down)
- Click side indicators
- Click share/mute buttons

### Mobile/Tablet
- Swipe up/down
- Tap to pause/play video
- Tap mute button for audio
- Follow "Swipe Up" hint

### Accessibility
- Keyboard navigation
- Clear visual indicators
- Smooth, non-jarring transitions
- Mute option for videos

## Future Enhancements (Optional)

### Potential Additions:
1. **Like/React Button** - Allow users to react to highlights
2. **Download Button** - Share highlights directly
3. **Fullscreen Mode** - Expand to fullscreen
4. **Comments Section** - User engagement
5. **Filter by Artist** - View specific artist highlights
6. **Date Sorting** - Chronological ordering
7. **Admin Panel** - Upload highlights via dashboard
8. **Instagram Integration** - Auto-sync from IG stories

## Styling

### Color Scheme
- **Primary**: Amber (#f59e0b)
- **Background**: Black (#000000)
- **Text**: White with opacity variations
- **Accents**: Orange gradient (#ea580c)

### Animations
- **Slide Transitions**: 500ms ease-out
- **Fade Effects**: Smooth opacity changes
- **Hover States**: 300ms transitions
- **Progress Bars**: Real-time fill animations

## Browser Support
- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)

## Notes

### Format Compatibility
- **Videos auto-play muted** - Browser autoplay policy requires muted videos
- **DNG files are NOT supported** - RAW image formats cannot be displayed in browsers
  - Convert DNG to JPG/PNG using photo editing software before use
  - Recommended: Adobe Lightroom, Photoshop, or free tools like RawTherapee
- **MOV files work** - Currently being used successfully for videos
- **Optimal video format**: MP4 with H.264 codec for best compatibility
- **Recommended image size**: 1080x1920 (9:16 ratio) for vertical display

### File Conversions
If you have RAW files (DNG, CR2, NEF, ARW):
1. **Free Tools:**
   - RawTherapee (Windows/Mac/Linux)
   - GIMP with UFRaw plugin
   - Adobe DNG Converter (DNG to JPEG)

2. **Professional Tools:**
   - Adobe Lightroom
   - Adobe Photoshop
   - Capture One

3. **Online Converters:**
   - raw.pics.io
   - convertio.co
   - (Use with caution for private content)

### Video Format Tips
- **MOV to MP4**: Use HandBrake (free) or FFmpeg
- **Compress large videos**: Use HandBrake with H.264 preset
- **Recommended settings**:
  - Codec: H.264
  - Resolution: 1080x1920 (vertical) or 1920x1080 (horizontal)
  - Bitrate: 5-8 Mbps for good quality
  - Audio: AAC codec

## Status: ✅ COMPLETE

The highlights page is fully functional with:
- ✅ TikTok-style vertical scrolling
- ✅ Video and image support
- ✅ Multiple navigation methods
- ✅ Fully responsive design
- ✅ Integrated into site navigation
- ✅ Professional animations
- ✅ Artist information display
- ✅ Progress tracking
- ✅ Mute controls for videos

---

**Page URL:** `/highlights`  
**Created:** November 5, 2025  
**Developer:** StdioX Labs - https://soldoutafrica.com/

