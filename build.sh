#!/bin/bash
set -e

echo "🔨 Starting Vercel build..."

# Install dependencies in workspaces
echo "📦 Installing frontend dependencies..."
cd apps/frontend
npm ci
echo "📦 Installing backend dependencies..."
cd ../backend
npm ci
cd ../..

# Build frontend first
echo "🎨 Building frontend..."
cd apps/frontend
npm run build
cd ../..

# Build backend
echo "🔧 Building backend..."
cd apps/backend
npm run build
cd ../..

echo "✅ Build completed!"

# Verify artifacts
echo "📁 Verifying build artifacts..."
ls -la apps/frontend/dist/
ls -la apps/backend/dist/
