@echo off
echo ===================================================
echo   Starting Futuro Property Real Estate Website
echo ===================================================

echo.
echo 1. Ensuring Database is running...
cd backend
docker-compose up -d
if %ERRORLEVEL% NEQ 0 (
    echo Failed to start Docker containers. Please ensure Docker Desktop is running.
    pause
    exit /b
)
cd ..

echo.
echo 2. Starting Backend Server (Port 4000)...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo 3. Starting Frontend Application (Port 5173)...
start "Frontend App" cmd /k "cd frontend && npm run dev"

echo.
echo 4. Starting Admin Panel (Port 5174)...
start "Admin Panel" cmd /k "cd admin && npm run dev"

echo.
echo ===================================================
echo   All services have been launched in new windows.
echo   You can close this window now.
echo ===================================================
timeout /t 10
