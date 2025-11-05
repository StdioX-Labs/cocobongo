# Converting DNG Files for Highlights Page

## Problem
The file `IMG_2932.DNG` in `/public/highlights/kaligraph jones/` cannot be displayed in web browsers because DNG is a RAW image format.

## Solution
Convert the DNG file to JPG or PNG format.

## Quick Conversion Methods

### Method 1: Adobe Lightroom (Professional)
1. Open Adobe Lightroom
2. Import `IMG_2932.DNG`
3. Make any adjustments (optional)
4. Export as JPG:
   - File > Export
   - Format: JPEG
   - Quality: 90-100%
   - Save as: `IMG_2932.JPG`
5. Place in same folder
6. Update highlights array in code

### Method 2: Adobe Photoshop
1. Open Photoshop
2. File > Open > Select `IMG_2932.DNG`
3. Adjust settings in Camera Raw (optional)
4. Click "Open Image"
5. File > Save As
6. Format: JPEG
7. Quality: Maximum (10-12)
8. Save as `IMG_2932.JPG`

### Method 3: RawTherapee (Free - Recommended)
1. Download from: https://rawtherapee.com/
2. Install RawTherapee
3. Open RawTherapee
4. Navigate to the file location
5. Select `IMG_2932.DNG`
6. Make adjustments (optional)
7. Click "Save Current Image"
8. Choose JPG format
9. Quality: 95-100%
10. Save as `IMG_2932.JPG`

### Method 4: GIMP (Free)
1. Download GIMP: https://www.gimp.org/
2. Install UFRaw plugin (usually included)
3. Open GIMP
4. File > Open
5. Select `IMG_2932.DNG`
6. UFRaw will open - adjust settings
7. Click OK
8. File > Export As
9. Choose JPG format
10. Adjust quality (90-100%)
11. Export as `IMG_2932.JPG`

### Method 5: Adobe DNG Converter (Free)
1. Download: https://helpx.adobe.com/camera-raw/using/adobe-dng-converter.html
2. Install Adobe DNG Converter
3. Select input folder (highlights/kaligraph jones/)
4. Select output folder (same or different)
5. Choose preferences:
   - Convert to: Linear (Demosaiced)
   - JPEG Preview: Medium Size or Full Size
6. Click Convert
7. Open the converted file in any image editor
8. Save as JPG

### Method 6: Online Converter (Quick but Less Control)
**⚠️ Warning: Only use for non-sensitive images**

1. Go to: https://raw.pics.io/ or https://convertio.co/dng-jpg/
2. Upload `IMG_2932.DNG`
3. Convert to JPG
4. Download converted file
5. Rename to `IMG_2932.JPG`
6. Place in highlights folder

## After Conversion

### Update the Highlights Code

Open `app/highlights/page.tsx` and add the new image:

```typescript
const highlights: HighlightItem[] = [
  // ...existing highlights...
  {
    id: '5',
    type: 'image',
    src: '/highlights/kaligraph jones/IMG_2932.JPG',
    artist: 'Kaligraph Jones',
    title: 'Your Title Here'
  },
];
```

## Recommended Settings

### For Best Quality:
- **Format**: JPG (good compression, widely supported)
- **Quality**: 90-100% (balances quality and file size)
- **Resolution**: Keep original or resize to 1080x1920 for vertical display
- **Color Space**: sRGB (for web)

### For Smaller File Size:
- **Format**: WEBP (modern browsers only)
- **Quality**: 80-90%
- **Resolution**: 1080x1920 (if original is larger)

## File Location

After conversion, your folder should look like:
```
public/highlights/kaligraph jones/
  ├── IMG_0186.JPG ✅ (Currently active)
  ├── IMG_2138.MOV ✅ (Currently active)
  ├── IMG_2932.DNG ❌ (Cannot be used)
  └── IMG_2932.JPG ✅ (New - ready to use!)
```

## Quick Reference

| Format | Browser Support | Recommended Use |
|--------|----------------|-----------------|
| JPG    | ✅ Excellent   | General photos  |
| PNG    | ✅ Excellent   | Graphics, transparency |
| WEBP   | ✅ Good        | Modern browsers, smaller files |
| GIF    | ✅ Excellent   | Animations |
| DNG    | ❌ None        | Must convert first |

## Need Help?

If you're having trouble converting the file:
1. Check if the DNG file is corrupted
2. Try multiple conversion methods
3. Ensure you have the latest software versions
4. Consider using professional tools for best results

## Alternative

If you don't want to convert:
- Simply leave the DNG file out
- Use only the JPG and MOV files that are already working
- Add more JPG/PNG photos instead

The highlights page will work perfectly with just the supported formats!

---

**Created:** November 5, 2025  
**Developer:** StdioX Labs - https://soldoutafrica.com/

