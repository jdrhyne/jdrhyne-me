#!/bin/bash

# Script to capture screenshots of the development UI

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Generate timestamp for filename
timestamp=$(date +"%Y%m%d_%H%M%S")

# Default to capturing the entire screen
if [ "$1" == "window" ]; then
    # Capture active window
    screencapture -w "screenshots/screenshot_${timestamp}_window.png"
    echo "Window screenshot saved: screenshots/screenshot_${timestamp}_window.png"
elif [ "$1" == "area" ]; then
    # Capture selected area
    screencapture -i "screenshots/screenshot_${timestamp}_area.png"
    echo "Area screenshot saved: screenshots/screenshot_${timestamp}_area.png"
else
    # Capture entire screen
    screencapture "screenshots/screenshot_${timestamp}_full.png"
    echo "Full screenshot saved: screenshots/screenshot_${timestamp}_full.png"
fi

# List recent screenshots
echo -e "\nRecent screenshots:"
ls -lt screenshots/ | head -6