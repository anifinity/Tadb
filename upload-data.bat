@echo off
echo ========================================
echo   TADB Data Upload Script
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    echo Or use GitHub Desktop instead.
    pause
    exit /b 1
)

echo Checking for changes...
git status

echo.
echo Adding data files...
git add data/

echo.
echo Committing changes...
set /p message="Enter commit message (or press Enter for default): "
if "%message%"=="" set message=Update anime data

git commit -m "%message%"

echo.
echo Pushing to GitHub...
git push

echo.
echo ========================================
echo   Upload Complete! ✅
echo ========================================
echo Your data is now live on GitHub!
echo.
pause
