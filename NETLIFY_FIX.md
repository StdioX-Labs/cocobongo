# Netlify Environment Detection Fix

## Problem
The error `ENOENT: no such file or directory, open '/var/task/data/program.json'` occurred because:

1. The code was trying to use the file system on Netlify's serverless environment
2. The `process.env.NETLIFY` check wasn't working correctly
3. The `/var/task/` directory is read-only on Netlify serverless functions

## Solution Applied

### 1. Enhanced Environment Detection
Updated all API routes to detect Netlify environment more reliably:

```typescript
const isNetlify = process.env.NETLIFY === 'true' || 
                  process.env.NETLIFY_DEV === 'true' ||
                  !!process.env.NETLIFY_BUILD_BASE ||
                  process.env.CONTEXT !== undefined;
```

### 2. Fallback Logic
Added try-catch blocks to gracefully fall back to file system if Netlify Blobs fails:

- **Production/Netlify**: Try Netlify Blobs first
- **If Blobs fails**: Fall back to file system (for local dev)
- **Better error logging**: Track which storage method is being used

### 3. Files Updated
- ✅ `app/api/update-program/route.ts` - Enhanced detection + fallback
- ✅ `app/api/get-program/route.ts` - Enhanced detection + fallback  
- ✅ `app/api/upload-image/route.ts` - Enhanced detection + fallback

## Verification Steps

After deploying these changes:

1. **Check Netlify Function Logs** for environment detection:
   ```
   Environment check: {
     NETLIFY: 'true',
     CONTEXT: 'production',
     isNetlify: true
   }
   ```

2. **Verify Blobs are being used**:
   ```
   Attempting to use Netlify Blobs
   Successfully saved to Netlify Blobs
   ```

3. **Test Admin Portal**:
   - Log in to `/admin`
   - Update a program
   - Upload an image
   - Verify changes appear on main site

## How Netlify Blobs Work

### Storage
- **Programs**: Stored in `programs` store as `current-program` key
- **Images**: Stored in `program-images` store with timestamped filenames

### Access
- **Read**: `await store.get("current-program", { type: "json" })`
- **Write**: `await store.set("current-program", JSON.stringify(data))`

### Limits (Free Tier)
- 1 GB storage
- 1 million reads per month
- 100,000 writes per month

## Troubleshooting

### If Blobs Still Fail

1. **Check Netlify Blobs is enabled**:
   - Go to Netlify Dashboard → Site Settings → Blobs
   - Ensure it's enabled for your site

2. **Verify @netlify/blobs package**:
   ```bash
   npm list @netlify/blobs
   ```
   Should show version 7.x or higher

3. **Check Function Logs**:
   - Go to Netlify Dashboard → Functions
   - Look for error messages in logs

4. **Manual Blob Creation**:
   You can manually create initial data via Netlify CLI:
   ```bash
   netlify blobs:set current-program '{"currentWeek":null,"previousWeeks":[]}' --store programs
   ```

### If File System Errors Persist

The fallback to file system won't work on Netlify serverless (read-only). If you see this:
- Blobs must be properly configured
- Check that `@netlify/blobs` is in `dependencies` (not `devDependencies`)
- Redeploy after ensuring Blobs are enabled

## Environment Variables

Netlify automatically sets these in production:
- `NETLIFY=true`
- `CONTEXT=production` (or `deploy-preview`, `branch-deploy`)
- `NETLIFY_BUILD_BASE=/opt/build/repo`

You don't need to manually set these.

## Next Steps

1. **Commit and push** the updated code:
   ```bash
   git add .
   git commit -m "Fix: Improve Netlify environment detection and add Blobs fallback"
   git push
   ```

2. **Monitor the deployment** in Netlify dashboard

3. **Check function logs** to verify Blobs are being used

4. **Test the admin portal** thoroughly

---

**Fixed**: November 7, 2025  
**Issue**: ENOENT file system errors on Netlify  
**Solution**: Enhanced environment detection + Netlify Blobs integration

