@echo off
echo 🧹 Starting project cleanup...

REM Remove build artifacts
echo 🗑️  Removing build artifacts...
for /d /r . %%d in (dist) do @if exist "%%d" rd /s /q "%%d"
for /d /r . %%d in (build) do @if exist "%%d" rd /s /q "%%d"
for /d /r . %%d in (.cache) do @if exist "%%d" rd /s /q "%%d"

REM Remove lock files
echo 🔓 Removing lock files...
del /s /q package-lock.json 2>nul
del /s /q yarn.lock 2>nul
del /s /q pnpm-lock.yaml 2>nul

REM Remove log files
echo 📋 Removing log files...
del /s /q *.log 2>nul
del /s /q npm-debug.log* 2>nul

REM Remove temporary files
echo 🗂️  Removing temporary files...
del /s /q *.tmp 2>nul
del /s /q *.temp 2>nul
del /s /q .DS_Store 2>nul
del /s /q Thumbs.db 2>nul

REM Remove cache files
echo 💾 Removing cache directories...
del /s /q .eslintcache 2>nul
for /d /r . %%d in (.parcel-cache) do @if exist "%%d" rd /s /q "%%d"

REM Remove unused assets
echo 🎨 Removing unused assets...
del /s /q vite.svg 2>nul
del /s /q react.svg 2>nul

echo.
echo 🖼️  Image optimization notes:
echo    - Compress gadget_zone_logo.png (currently 367KB)
echo    - Consider converting to WebP format
echo    - Use TinyPNG or Squoosh for compression

echo.
echo ✅ Cleanup complete!
echo.
echo 💡 Additional optimization suggestions:
echo    1. Compress the logo file (367KB → ^<50KB)
echo    2. Remove unused CSS rules
echo    3. Minify CSS/JS in production
echo    4. Use lazy loading for images
echo    5. Implement code splitting

pause
