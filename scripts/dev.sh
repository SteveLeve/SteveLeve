#!/bin/bash

# Development script to run both Astro and Worker dev servers
# This script starts both services in parallel for local development

echo "🚀 Starting development servers..."

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down development servers..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Set up trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start Worker dev server in background
echo "📡 Starting Cloudflare Worker API server..."
cd workers/api && npm run dev &
WORKER_PID=$!

# Wait a moment for Worker to start
sleep 3

# Start Astro dev server in background
echo "🌟 Starting Astro development server..."
cd ../../src/consulting-website && npm run dev &
ASTRO_PID=$!

echo "✅ Development servers started!"
echo "   - Astro: http://localhost:4321"
echo "   - Worker API: http://localhost:8787"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait