#!/bin/bash

# Script to capture browser window screenshots on macOS

# Check if description is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/capture-browser.sh <description>"
    echo "Example: ./scripts/capture-browser.sh 'editor-height-expanded'"
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Clean the description for filename
description=$(echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')

# Generate timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")
filename="screenshots/${timestamp}_${description}.png"

# Function to capture using window mode
capture_window() {
    echo "Please click on the browser window you want to capture..."
    screencapture -w "$filename"
}

# Function to capture using AppleScript for specific browsers
capture_with_applescript() {
    local browser=$1
    local app_name=$2
    
    osascript <<EOF
tell application "$app_name"
    if (count of windows) > 0 then
        set windowID to id of front window
        do shell script "screencapture -l" & windowID & " $filename"
    else
        return "No windows found"
    end if
end tell
EOF
}

# Try to detect which browser is running
if pgrep -x "Google Chrome" > /dev/null; then
    echo "Detected Google Chrome - capturing front window..."
    capture_with_applescript "chrome" "Google Chrome"
elif pgrep -x "Safari" > /dev/null; then
    echo "Detected Safari - capturing front window..."
    capture_with_applescript "safari" "Safari"
elif pgrep -x "Firefox" > /dev/null; then
    echo "Detected Firefox - using interactive capture..."
    capture_window
elif pgrep -x "Arc" > /dev/null; then
    echo "Detected Arc - capturing front window..."
    capture_with_applescript "arc" "Arc"
else
    echo "No browser detected or browser not supported."
    echo "Using interactive window capture mode..."
    capture_window
fi

# Check if screenshot was created
if [ -f "$filename" ]; then
    echo "✓ Screenshot saved: $filename"
    
    # Get file size
    size=$(ls -lh "$filename" | awk '{print $5}')
    echo "  Size: $size"
    
    # Create a log entry
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $description - $filename" >> screenshots/changelog.txt
    
    # Optional: Open the screenshot to verify (comment out if not needed)
    # open "$filename"
else
    echo "✗ Failed to capture screenshot"
fi