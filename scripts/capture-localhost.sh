#!/bin/bash

# Script to capture specifically the localhost:4322 editor window

# Check if description is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/capture-localhost.sh <description>"
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Clean the description for filename
description=$(echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')

# Generate timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")
filename="screenshots/${timestamp}_${description}.png"

# Function to find and capture localhost window
capture_localhost_window() {
    local browser=$1
    local port=${2:-4322}
    
    osascript <<EOF
tell application "$browser"
    set localhostWindow to 0
    set windowIndex to 0
    
    -- Search through all windows
    repeat with w in windows
        set windowIndex to windowIndex + 1
        repeat with t in tabs of w
            set tabURL to URL of t
            -- Check if this tab contains localhost:4322
            if tabURL contains "localhost:$port" or tabURL contains "127.0.0.1:$port" then
                set localhostWindow to windowIndex
                exit repeat
            end if
        end repeat
        if localhostWindow > 0 then exit repeat
    end repeat
    
    -- If localhost window found, bring it to front and capture
    if localhostWindow > 0 then
        set index of window localhostWindow to 1
        activate
        delay 0.5 -- Give time for window to come to front
        
        -- Get window bounds
        set windowBounds to bounds of window 1
        set x1 to item 1 of windowBounds
        set y1 to item 2 of windowBounds
        set x2 to item 3 of windowBounds
        set y2 to item 4 of windowBounds
        
        -- Calculate width and height
        set w to x2 - x1
        set h to y2 - y1
        
        -- Capture the window
        do shell script "screencapture -R" & x1 & "," & y1 & "," & w & "," & h & " $filename"
        
        return "captured"
    else
        return "not found"
    end if
end tell
EOF
}

# Try different browsers
echo "Searching for localhost:4322 editor window..."

# Array of browsers to check
browsers=("Google Chrome" "Safari" "Arc" "Microsoft Edge" "Brave Browser" "Firefox")

captured=false
for browser in "${browsers[@]}"; do
    # Check if browser is running
    if pgrep -f "$browser" > /dev/null 2>&1; then
        echo "Checking $browser..."
        result=$(capture_localhost_window "$browser" 4322)
        
        if [[ $result == "captured" ]]; then
            echo "✓ Found and captured localhost window in $browser"
            captured=true
            break
        fi
    fi
done

# Also check port 4321 if 4322 wasn't found
if [[ $captured == false ]]; then
    echo "Checking for localhost:4321..."
    for browser in "${browsers[@]}"; do
        if pgrep -f "$browser" > /dev/null 2>&1; then
            result=$(capture_localhost_window "$browser" 4321)
            
            if [[ $result == "captured" ]]; then
                echo "✓ Found and captured localhost window in $browser (port 4321)"
                captured=true
                break
            fi
        fi
    done
fi

# Check if screenshot was created
if [ -f "$filename" ]; then
    echo ""
    echo "✓ Screenshot saved: $filename"
    
    # Get file info
    size=$(ls -lh "$filename" | awk '{print $5}')
    dimensions=$(sips -g pixelHeight -g pixelWidth "$filename" | awk '/pixel/ {print $2}' | paste -sd "x" -)
    
    echo "  Size: $size"
    echo "  Dimensions: $dimensions"
    
    # Log entry
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $description - $filename - $dimensions" >> screenshots/changelog.txt
else
    echo ""
    echo "✗ Failed to capture screenshot"
    echo ""
    echo "Troubleshooting:"
    echo "1. Make sure the editor is open at http://localhost:4322/editor"
    echo "2. Check that the dev server is running (npm run dev)"
    echo "3. Try opening the editor in a supported browser: Chrome, Safari, Arc, Edge, Brave"
    echo ""
    echo "You can also use the manual capture mode:"
    echo "./scripts/capture-editor.sh '$1'"
fi