# Club Cocobongo Admin Portal

## Overview

The Admin Portal allows you to manage weekly program posters, dates, and daily event descriptions for Club Cocobongo's website.

## Features

✨ **Weekly Program Management**
- Upload and manage weekly program posters
- Set custom week date ranges
- Automatic week calculation

📅 **Daily Program Editor**
- Edit event titles for each day
- Update host/DJ names
- Modify event descriptions
- Manage event highlights (add/remove/edit)

☁️ **Netlify Integration**
- Uses Netlify Blobs for data storage
- Serverless functions for API
- No external database required
- Automatic deployment

## Accessing the Admin Portal

1. Navigate to: `https://your-domain.com/admin`
2. Enter the admin password (default: `cocobongo2024`)
3. Start managing your programs!

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in your project root:

```env
ADMIN_PASSWORD=your-secure-password
```

**Important:** Change the default password before deploying to production!

### 2. Netlify Configuration

The project includes a `netlify.toml` configuration file. Make sure it's in your project root.

### 3. Deploy to Netlify

#### Option A: Deploy from Git

1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Set build command: `pnpm build`
6. Set publish directory: `.next`
7. Add environment variable:
   - Key: `ADMIN_PASSWORD`
   - Value: `your-secure-password`
8. Click "Deploy site"

#### Option B: Deploy with Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize your site
netlify init

# Deploy
netlify deploy --prod
```

### 4. Set Environment Variables in Netlify

1. Go to Site settings → Environment variables
2. Add `ADMIN_PASSWORD` with your secure password
3. Save and redeploy if necessary

## Using the Admin Portal

### Updating Weekly Program

1. **Set Week Dates**
   - Start Date: Monday of the week
   - End Date: Sunday of the week
   - Dates are automatically calculated but can be customized

2. **Upload Weekly Poster**
   - Click "Choose File" under "Weekly Program Poster"
   - Select an image (JPG, PNG, etc.)
   - Preview will appear automatically

3. **Edit Daily Programs**
   - For each day (Monday-Sunday):
     - Event Title: Main event name
     - Host/DJ: Who's hosting/performing
     - Description: Event details
     - Highlights: Key features (can add/remove)

4. **Save Changes**
   - Click the "Save Changes" button at the bottom
   - Wait for confirmation message
   - Changes appear on the main site immediately

### Managing Highlights

- Click "+ Add Highlight" to add more features
- Type in each highlight text box
- Click "Remove" to delete a highlight
- Each event can have unlimited highlights

## API Endpoints

The system creates serverless functions automatically:

- `/.netlify/functions/get-program` - Fetch current program (public)
- `/.netlify/functions/update-program` - Update program (requires auth)
- `/.netlify/functions/upload-image` - Upload images (requires auth)
- `/.netlify/functions/images/:filename` - Serve uploaded images (public)

## Data Storage

Data is stored using **Netlify Blobs**:
- `programs` store: Program data (JSON)
- `program-images` store: Uploaded images

No external database required! Everything runs on Netlify's infrastructure.

## Security

🔒 **Authentication:**
- Password-based access to admin portal
- Bearer token authentication for API calls
- Environment variable for password (not in code)

🔐 **Best Practices:**
- Change default password immediately
- Use a strong, unique password
- Don't share admin credentials
- Use HTTPS (automatic with Netlify)

## Troubleshooting

### "Failed to save" Error
- Check your internet connection
- Verify the admin password is correct
- Check Netlify function logs in dashboard

### Images Not Uploading
- Ensure image file size is under 10MB
- Use common formats (JPG, PNG, WebP)
- Check Netlify Blob storage limits

### Data Not Showing on Main Site
- Clear browser cache
- Check if save was successful
- Verify Netlify deployment is complete

## Development

### Local Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Access at http://localhost:3000
# Admin portal at http://localhost:3000/admin
```

### Testing Netlify Functions Locally

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Run with Netlify Dev
netlify dev
```

## Support

For issues or questions:
- Check Netlify function logs
- Review browser console for errors
- Contact: StdioX Labs - https://soldoutafrica.com/

## License

Copyright © 2024 Club Cocobongo. All rights reserved.
Developed by StdioX Labs.

