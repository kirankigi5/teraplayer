#!/bin/bash
set -e

# Vercel Build Script for TeraPlayer
echo "🔨 Starting Vercel build process..."

# Install dependencies at root (workspaces)
echo "📦 Installing dependencies..."
npm install

# Build frontend first
echo "🎨 Building frontend..."
npm run build --workspace=apps/frontend

# Build backend
echo "🔧 Building backend..."
npm run build --workspace=apps/backend

# Verify build artifacts
echo "🔍 Verifying build artifacts..."
if [ -d "apps/frontend/dist" ]; then
  echo "✅ Frontend build successful - dist folder found"
  echo "Frontend files:"
  ls -la apps/frontend/dist/ | head -10
else
  echo "❌ Frontend build failed - no dist folder"
  exit 1
fi

if [ -d "apps/backend/dist" ]; then
  echo "✅ Backend build successful - dist folder found"
  echo "Backend files:"
  ls -la apps/backend/dist/ | head -10
else
  echo "❌ Backend build failed - no dist folder"
  exit 1
fi

echo "✅ Vercel build completed successfully!"
