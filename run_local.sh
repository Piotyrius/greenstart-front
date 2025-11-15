#!/bin/bash
# GREWECO Frontend - Local Development Startup Script (Linux/Mac)

echo "============================================"
echo "GREWECO Frontend - Starting Development Server"
echo "============================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Start development server
echo "============================================"
echo "Starting Next.js development server..."
echo "Frontend will be available at: http://localhost:3000"
echo "Backend API should be running at: http://localhost:8000"
echo "============================================"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev

