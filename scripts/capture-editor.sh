#!/bin/bash

# Simple and reliable browser window capture script

# Check if description is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/capture-editor.sh <description>"
    echo "Example: ./scripts/capture-editor.sh 'editor-height-expanded'"
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Clean the description for filename
description=$(echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')

# Generate timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")
filename="screenshots/${timestamp}_${description}.png"

echo "==================================="
echo "Browser Window Screenshot Capture"
echo "==================================="
echo ""
echo "1. After pressing Enter, your cursor will change to a camera icon"
echo "2. Click on the browser window showing the editor at http://localhost:4322/editor"
echo "3. The screenshot will be captured automatically"
echo ""
echo "Press Enter when ready..."
read -r

# Use window capture mode (user clicks on window)
screencapture -w "$filename"

# Check if screenshot was created
if [ -f "$filename" ]; then
    echo ""
    echo "✓ Screenshot saved: $filename"
    
    # Get file size and dimensions
    size=$(ls -lh "$filename" | awk '{print $5}')
    dimensions=$(sips -g pixelHeight -g pixelWidth "$filename" | awk '/pixel/ {print $2}' | paste -sd "x" -)
    
    echo "  Size: $size"
    echo "  Dimensions: $dimensions"
    
    # Create a log entry
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $description - $filename - $dimensions" >> screenshots/changelog.txt
    
    echo ""
    echo "Screenshot captured successfully!"
else
    echo "✗ Failed to capture screenshot"
fi