@echo off
REM GREWECO Frontend - Local Development Startup Script (Windows)

echo ============================================
echo GREWECO Frontend - Starting Development Server
echo ============================================
echo.

REM Check if .env.local exists
if not exist .env.local (
    echo Creating .env.local file...
    echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
    echo.
)

REM Check if node_modules exists
if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo.
)

REM Start development server
echo ============================================
echo Starting Next.js development server...
echo Frontend will be available at: http://localhost:3000
echo Backend API should be running at: http://localhost:8000
echo ============================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

