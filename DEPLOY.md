# TeraPlayer - Railway Deployment Guide

## Quick Deploy to Railway

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - TeraPlayer with dark mode"
   git branch -M main
   git remote add origin https://github.com/yourusername/teraplayer.git
   git push -u origin main
   ```

2. **Deploy on Railway:**
   - Visit [railway.app](https://railway.app)
   - Click "Deploy from GitHub repo"
   - Select your `teraplayer` repository
   - Railway will automatically detect and deploy your app

3. **Environment Variables:**
   Railway will automatically set:
   - `PORT` (Railway provides this)
   - `NODE_ENV=production`
   - `FRONTEND_ORIGIN=*` (for CORS)

## What's Included

✅ **Frontend:** React + TypeScript + Vite + Tailwind CSS  
✅ **Backend:** Express + TypeScript  
✅ **Dark Mode:** Full theme support with toggle  
✅ **SEO Optimized:** Meta tags, Open Graph, JSON-LD  
✅ **Production Ready:** Static file serving, error handling  
✅ **Railway Config:** `railway.json` and `Dockerfile`  

## Features

- 🎨 **Dark/Light Mode Toggle**
- 📱 **Mobile Responsive Design**
- ⚡ **Fast Vite Dev Server**
- 🔒 **Security Headers (Helmet)**
- 🌐 **CORS Configured**
- 📊 **SEO Optimized**
- 🎯 **TeraBox Keywords Integrated**

## Local Development

```bash
# Install dependencies
npm install

# Run both frontend and backend
npm run dev

# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

The app will serve the frontend static files and handle API requests on the same port in production.

## Railway Deployment Notes

- Railway automatically installs dependencies
- Frontend is built and served by the backend in production
- Health check available at `/health`
- API endpoints at `/api/*`
- All other routes serve the React app
