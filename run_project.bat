@echo off
echo ===================================================
echo   Starting Futuro Property Real Estate Website
echo ===================================================

echo.
echo 1. Ensuring Database is running...
cd backend
docker-compose up -d
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [WARNING] Failed to start Docker containers.
    echo If you have local MongoDB installed or don't use Docker, you can continue.
    echo.
    set /p continue_wo_docker="Continue launch sequence anyway? (Y/N): "
    if /i "%continue_wo_docker%" NEQ "Y" (
        pause
        exit /b
    )
)
cd ..

echo.
echo 2. Clearing port 4000 (if in use)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4000 ^| findstr LISTENING') do (
    echo Killing process %%a on port 4000...
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 2 /nobreak >nul

echo.
echo 3. Starting Backend Server (Port 4000)...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo 4. Starting Frontend Application (Port 5173)...
start "Frontend App" cmd /k "cd frontend && npm run dev"

echo.
echo 5. Starting Admin Panel (Port 5174)...
start "Admin Panel" cmd /k "cd admin && npm run dev"

echo.
echo ===================================================
echo   All services have been launched in new windows.
echo   You can close this window now.
echo ===================================================
timeout /t 10
