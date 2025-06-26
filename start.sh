#!/bin/bash
echo "🚀 Starting TeraPlayer on Railway..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "PORT: $PORT"
echo "NODE_ENV: $NODE_ENV"

# Start the application
exec npm start
