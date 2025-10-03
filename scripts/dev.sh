#!/bin/bash

# Development script to run both Astro and Worker dev servers
# This script starts both services in parallel for local development

echo "🚀 Starting development servers..."

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down development servers..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Set up trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Start Worker API dev server in background
echo "📡 Starting Cloudflare Worker API server..."
(cd "$PROJECT_ROOT/workers/api" && npm run dev) &
WORKER_PID=$!

# Wait a moment for Worker to start
sleep 3

# Start Astro site dev server in background
echo "🌟 Starting Astro site development server..."
(cd "$PROJECT_ROOT/workers/site" && npm run dev) &
ASTRO_PID=$!

echo "✅ Development servers started!"
echo "   - Astro Site: http://localhost:4321"
echo "   - Worker API: http://localhost:8787"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait