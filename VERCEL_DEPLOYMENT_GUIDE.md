# VERCEL_DEPLOYMENT_GUIDE.md

## TeraPlayer Vercel Deployment Guide

### Framework Selection
**Choose: "Other" or "Node.js"** when prompted in Vercel dashboard.

### Project Configuration

#### 1. Vercel Configuration
- **Root Directory**: `.` (root of repository)
- **Framework Preset**: Other
- **Build Command**: `npm run vercel:build`
- **Output Directory**: `apps/frontend/dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

#### 2. Environment Variables
Set these in Vercel dashboard:
```
NODE_ENV=production
FRONTEND_ORIGIN=https://your-vercel-app.vercel.app
```

#### 3. Build Settings
The project uses a monorepo structure:
- **Frontend**: React + Vite + TypeScript + Tailwind
- **Backend**: Express.js + TypeScript
- **Deployment**: Backend serves frontend static files

### Key Files

#### vercel.json
✅ Configured with:
- Node.js runtime for Express backend
- Proper routing for API and static files
- Health check endpoints
- 30-second function timeout
- Static file optimization

#### package.json Scripts
✅ Available scripts:
- `npm run vercel:build` - Builds both frontend and backend
- `npm run dev` - Development mode with hot reload
- `npm run start` - Production server

#### Build Process
1. Frontend builds to `apps/frontend/dist/`
2. Backend builds to `apps/backend/dist/`
3. Backend serves frontend static files in production

### Deployment Steps

#### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
cd /path/to/teraplayer
vercel

# Follow prompts:
# Framework: Other
# Build Command: npm run vercel:build
# Output Directory: apps/frontend/dist
```

#### Method 2: GitHub Integration
1. Push code to GitHub repository
2. Connect repository in Vercel dashboard
3. Set framework to "Other"
4. Configure build settings as above
5. Deploy

### Verification

#### Health Checks
- `https://your-app.vercel.app/health` - Full health status
- `https://your-app.vercel.app/healthz` - Simple OK response
- `https://your-app.vercel.app/` - Frontend application

#### API Endpoints
- `https://your-app.vercel.app/api/parse` - TeraBox link parser
- `https://your-app.vercel.app/api` - API information

#### Static Files
- All frontend assets served correctly
- Dark mode toggle working
- Responsive design on all devices

### Features Included

#### Backend Features
✅ TeraBox link parsing for all domains
✅ Universal domain support (terabox.com, 1024tera.com, etc.)
✅ Shortlink resolution
✅ CORS configuration
✅ Security headers (Helmet)
✅ Error handling and logging
✅ Health check endpoints
✅ Static file serving

#### Frontend Features
✅ Modern React with TypeScript
✅ Dark mode with system preference detection
✅ Responsive Tailwind CSS design
✅ SEO optimized (meta tags, sitemap, robots.txt)
✅ Progressive Web App ready
✅ Copy to clipboard functionality
✅ Error handling and user feedback

### Performance Optimizations

#### Build Optimizations
- Vite for fast builds and small bundles
- Tree shaking for unused code elimination
- CSS purging with Tailwind
- Gzip compression enabled

#### Runtime Optimizations
- Static file caching (1 day)
- ETag and Last-Modified headers
- Efficient React rendering
- Minimal API payload

### Troubleshooting

#### Build Issues
1. **Dependencies**: Ensure all workspaces have dependencies installed
2. **TypeScript**: Check for type errors in both frontend and backend
3. **Build Order**: Frontend must build before backend

#### Runtime Issues
1. **Static Files**: Backend automatically finds frontend dist folder
2. **CORS**: Configured for Vercel domain
3. **Health Checks**: Multiple endpoints available for monitoring

#### Common Fixes
```bash
# Clean and rebuild
npm run clean
npm install
npm run vercel:build

# Check build artifacts
ls -la apps/frontend/dist/
ls -la apps/backend/dist/
```

### Production URLs
Once deployed, your app will be available at:
- **Main App**: `https://your-app-name.vercel.app`
- **Custom Domain**: Configure in Vercel dashboard

### Next Steps After Deployment
1. ✅ Test all functionality
2. ✅ Verify health checks
3. ✅ Test API endpoints
4. ✅ Configure custom domain (optional)
5. ✅ Set up monitoring
6. ✅ Add analytics (optional)

---

**Your TeraPlayer app is ready for Vercel deployment!** 🚀
