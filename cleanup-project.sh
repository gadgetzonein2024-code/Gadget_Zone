 .!/bin/bash

 . Project Size Optimization Script
 . Run this script to clean up and reduce project size

echo "🧹 Starting project cleanup..."

 . Remove build artifacts
echo "🗑️  Removing build artifacts..."
find . -name "dist" -type d -exec rm -rf {} + 2>/dev/null
find . -name "build" -type d -exec rm -rf {} + 2>/dev/null
find . -name ".cache" -type d -exec rm -rf {} + 2>/dev/null

 . Remove lock files (can be regenerated)
echo "🔓 Removing lock files..."
find . -name "package-lock.json" -delete 2>/dev/null
find . -name "yarn.lock" -delete 2>/dev/null
find . -name "pnpm-lock.yaml" -delete 2>/dev/null

 . Remove log files
echo "📋 Removing log files..."
find . -name "*.log" -delete 2>/dev/null
find . -name "npm-debug.log*" -delete 2>/dev/null

 . Remove temporary files
echo "🗂️  Removing temporary files..."
find . -name "*.tmp" -delete 2>/dev/null
find . -name "*.temp" -delete 2>/dev/null
find . -name ".DS_Store" -delete 2>/dev/null
find . -name "Thumbs.db" -delete 2>/dev/null

 . Remove cache directories
echo "💾 Removing cache directories..."
find . -name ".eslintcache" -delete 2>/dev/null
find . -name ".parcel-cache" -type d -exec rm -rf {} + 2>/dev/null

 . Remove unused assets
echo "🎨 Removing unused assets..."
find . -name "vite.svg" -delete 2>/dev/null
find . -name "react.svg" -delete 2>/dev/null

 . Optimize images (note: requires external tools)
echo "🖼️  Image optimization notes:"
echo "   - Compress gadget_zone_logo.png (currently 367KB)"
echo "   - Consider converting to WebP format"
echo "   - Use TinyPNG or Squoosh for compression"

 . Show size before and after
echo ""
echo "📊 Project size analysis:"
echo "Before cleanup: $(du -sh . | cut -f1)"
echo "After cleanup:  $(du -sh . | cut -f1)"

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "💡 Additional optimization suggestions:"
echo "   1. Compress the logo file (367KB → <50KB)"
echo "   2. Remove unused CSS rules"
echo "   3. Minify CSS/JS in production"
echo "   4. Use lazy loading for images"
echo "   5. Implement code splitting"
