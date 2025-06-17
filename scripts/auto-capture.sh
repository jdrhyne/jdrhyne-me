#!/bin/bash

# Automated browser screenshot capture using AppleScript

# Check if description is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/auto-capture.sh <description>"
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Clean the description for filename
description=$(echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')

# Generate timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")
filename="screenshots/${timestamp}_${description}.png"

# Create AppleScript to capture the frontmost browser window
osascript <<EOF
-- Get the frontmost application
tell application "System Events"
    set frontApp to name of first application process whose frontmost is true
end tell

-- Define supported browsers
set browserList to {"Google Chrome", "Safari", "Firefox", "Arc", "Microsoft Edge", "Brave Browser"}

-- Check if frontmost app is a browser
if frontApp is in browserList then
    tell application frontApp
        if (count of windows) > 0 then
            -- Get window bounds
            set windowBounds to bounds of front window
            set x1 to item 1 of windowBounds
            set y1 to item 2 of windowBounds
            set x2 to item 3 of windowBounds
            set y2 to item 4 of windowBounds
            
            -- Calculate width and height
            set w to x2 - x1
            set h to y2 - y1
            
            -- Capture the window area
            do shell script "screencapture -R" & x1 & "," & y1 & "," & w & "," & h & " $filename"
        end if
    end tell
else
    display dialog "Please make sure your browser window is in the foreground" buttons {"OK"} default button 1
end if
EOF

# Check if screenshot was created
if [ -f "$filename" ]; then
    echo "✓ Screenshot saved: $filename"
    
    # Get file info
    size=$(ls -lh "$filename" | awk '{print $5}')
    dimensions=$(sips -g pixelHeight -g pixelWidth "$filename" | awk '/pixel/ {print $2}' | paste -sd "x" -)
    
    echo "  Size: $size"
    echo "  Dimensions: $dimensions"
    
    # Log entry
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $description - $filename - $dimensions" >> screenshots/changelog.txt
else
    echo "✗ Failed to capture screenshot"
    echo "Make sure your browser window is in the foreground and try again"
fi