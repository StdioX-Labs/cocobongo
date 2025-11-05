@echo off
echo =========================================
echo Git LFS Setup for Club Cocobongo
echo =========================================
echo.

echo Step 1: Installing Git LFS...
git lfs install
if %errorlevel% neq 0 (
    echo ERROR: Git LFS is not installed!
    echo Please install from: https://git-lfs.github.com/
    pause
    exit /b 1
)
echo ✓ Git LFS installed successfully
echo.

echo Step 2: Tracking media files...
git lfs track "*.mp4"
git lfs track "*.MP4"
git lfs track "*.mov"
git lfs track "*.MOV"
git lfs track "*.jpg"
git lfs track "*.JPG"
git lfs track "*.png"
git lfs track "*.PNG"
echo ✓ Media file types configured
echo.

echo Step 3: Adding .gitattributes...
git add .gitattributes
git commit -m "Configure Git LFS for media files"
echo ✓ Git LFS configuration committed
echo.

echo Step 4: Migrating existing files...
echo This may take a few minutes...
git lfs migrate import --include="*.mp4,*.MP4,*.mov,*.MOV,*.jpg,*.JPG,*.png,*.PNG" --everything
echo ✓ Existing files migrated to LFS
echo.

echo =========================================
echo Setup Complete!
echo =========================================
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main --force
echo 2. Verify LFS is working: git lfs ls-files
echo.
pause

