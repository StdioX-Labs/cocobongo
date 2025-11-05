# Git Push Failed - Large Files Issue

## ❌ Problem Identified

Your Git push is failing because you're trying to push large video files (980+ MB total) to GitHub. The errors you're seeing:

```
error: RPC failed; HTTP 408 curl 22 The requested URL returned error: 408
fatal: the remote end hung up unexpectedly
```

This happens because:
1. GitHub has a 100 MB file size limit
2. Your video files are very large (especially the highlights videos)
3. The push timeout occurs when transferring large files

## ✅ Solution: Use Git LFS (Large File Storage)

Git LFS is designed specifically for handling large files like videos, images, and audio files.

### Step 1: Install Git LFS

**Windows:**
1. Download Git LFS from: https://git-lfs.github.com/
2. Run the installer
3. Or use Chocolatey: `choco install git-lfs`

**Alternative:**
Git LFS might already be installed with your Git installation. Try running:
```bash
git lfs install
```

### Step 2: Configure Git LFS for Your Project

Run these commands in your project directory:

```bash
# Initialize Git LFS
git lfs install

# Track video files
git lfs track "*.mp4"
git lfs track "*.MP4"
git lfs track "*.mov"
git lfs track "*.MOV"

# Track image files (optional but recommended)
git lfs track "*.jpg"
git lfs track "*.JPG"
git lfs track "*.png"
git lfs track "*.PNG"
```

### Step 3: Add .gitattributes

The above commands will create a `.gitattributes` file. Make sure it's committed:

```bash
git add .gitattributes
git commit -m "Configure Git LFS for media files"
```

### Step 4: Migrate Existing Files to LFS

Since you already have large files in your recent commit, you need to migrate them:

```bash
# This will rewrite history to use LFS for large files
git lfs migrate import --include="*.mp4,*.MP4,*.mov,*.MOV,*.jpg,*.JPG" --everything
```

### Step 5: Push Again

```bash
git push origin main
```

## 🚀 Quick Fix (Recommended)

Here's a complete command sequence to run:

```bash
# 1. Install Git LFS
git lfs install

# 2. Track media files
git lfs track "*.mp4"
git lfs track "*.MP4"
git lfs track "*.mov"
git lfs track "*.MOV"
git lfs track "*.jpg"
git lfs track "*.JPG"
git lfs track "*.png"
git lfs track "*.PNG"

# 3. Add .gitattributes
git add .gitattributes
git commit -m "Add Git LFS configuration"

# 4. Migrate existing files
git lfs migrate import --include="*.mp4,*.MP4,*.mov,*.MOV,*.jpg,*.JPG,*.png,*.PNG" --everything

# 5. Force push (this rewrites history)
git push origin main --force
```

## 🔄 Alternative: Remove Large Files from Git

If you don't want to use Git LFS, you can remove the large files from Git tracking:

### Option A: Use .gitignore

1. Create/edit `.gitignore`:
```
# Ignore large media files
public/highlights/**/*.mp4
public/highlights/**/*.MP4
public/highlights/**/*.mov
public/highlights/**/*.MOV
public/programs/**/*.jpg
public/programs/**/*.JPG
```

2. Remove files from Git (keeps them locally):
```bash
git rm --cached -r public/highlights/
git rm --cached -r public/programs/
git commit -m "Remove large media files from Git"
git push origin main
```

3. Store media files elsewhere:
   - Use a CDN (Cloudflare R2, AWS S3)
   - Use Vercel Blob Storage
   - Use external image hosting

### Option B: Reduce File Sizes

Compress your video files before committing:

**For Videos:**
- Use HandBrake or FFmpeg
- Target: 720p resolution
- Bitrate: 2-3 Mbps
- Format: MP4 with H.264

**For Images:**
- Resize to 1920px max width
- Compress with tools like TinyPNG
- Format: JPG at 80-90% quality

## 📋 File Size Limits

### GitHub Limits:
- **Individual file**: 100 MB max
- **Repository**: 1 GB recommended
- **Push size**: Limited by timeout

### With Git LFS:
- **Individual file**: 2 GB max
- **Storage**: 1 GB free, then paid
- **Bandwidth**: 1 GB/month free

## 🎯 Recommended Approach

**For Production:**
1. Use Git LFS for your media files
2. Or use a CDN for hosting videos/images
3. Keep only compressed/optimized files in Git

**For Development:**
1. Add large files to `.gitignore`
2. Share files via cloud storage (Google Drive, Dropbox)
3. Document where to download media files

## 📝 Current File Sizes

Your push was trying to upload ~980 MB, which includes:
- Multiple MP4/MOV video files
- Large JPG images
- Highlights folder content

## ✅ Next Steps

1. **Choose your approach:**
   - Git LFS (recommended for this project)
   - CDN hosting
   - File compression

2. **Implement the solution**
3. **Test with a small push first**
4. **Update documentation**

## 💡 Best Practice

For a production website with media content:
- **Code**: Git repository
- **Media**: CDN or cloud storage
- **Benefits**: Faster Git operations, better performance, lower costs

---

**Issue:** Git push failing with large files  
**Solution:** Git LFS or external media hosting  
**Status:** Awaiting your choice of solution  
**Developer:** StdioX Labs - https://soldoutafrica.com/

