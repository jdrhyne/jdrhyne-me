#!/bin/bash

# Script to capture UI changes with descriptive names

# Check if description is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/capture-ui-change.sh <description>"
    echo "Example: ./scripts/capture-ui-change.sh 'editor-height-expanded'"
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Clean the description for filename
description=$(echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')

# Generate timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")

# Capture screenshot
filename="screenshots/${timestamp}_${description}.png"
screencapture -x "$filename"

if [ -f "$filename" ]; then
    echo "✓ Screenshot saved: $filename"
    
    # Get file size
    size=$(ls -lh "$filename" | awk '{print $5}')
    echo "  Size: $size"
    
    # Create a log entry
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $description - $filename" >> screenshots/changelog.txt
else
    echo "✗ Failed to capture screenshot"
fi